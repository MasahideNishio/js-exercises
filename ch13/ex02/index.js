import {
  wait,
  wait1,
  wait2,
  wait3,
  logA,
  logB,
  logC,
  log,
  errX,
  errY,
} from "../util.js";
function f1() {
  // NOTE: f2 との比較用 (注: () => wait(...) は () => { return wait(...); } と同じことに注意
  //
  // 回答:
  // 3秒後に A が出力され、その2秒後に B が出力され、その1秒後に C が出力される。
  //
  // 説明:
  // wait3 の解決後に logA が実行され、wait2().then(logB) の解決後 (2秒後に B 出力) に wait1().then(logC) が実行されるため。
  //
  // 図解:
  //  wait3
  // |---------------|
  //                  logA
  //                 |-|
  //                    wait2
  //                   |----------|
  //                               logB
  //                              |-|
  //                                 wait1
  //                                |-----|
  //                                       logC
  //                                      |-|
  wait3()
    .then(logA)
    .then(() => wait2().then(logB))
    .then(() => wait1().then(logC));
}

function f2() {
  // NOTE: 2つ目の then の中で return が無くなっていることに注意 (典型的なミス)
  //
  // 解答例:
  // 3秒後に A が出力され、その1秒後に C が出力され、その1秒後に B が出力される。
  // 2つ目の .then のコールバック関数が値を return していないため、この .then が返す Promise は即解決される。
  // このため logA() の実行すぐ後に wait1().then(...) が実行され C が先に出力される。
  //
  // 図解:
  //  wait3
  // |---------------|
  //                  logA
  //                 |-|
  //                    wait2
  //                   |----------|
  //                               logB
  //                              |-|
  //                  wait1
  //                 |-----|
  //                        logC
  //                       |-|
  wait3()
    .then(logA)
    .then(() => {
      wait2().then(logB);
    })
    .then(() => wait1().then(logC));
}

// 予想: 0秒後に A → C の順で出力される
// 結果: C → Aのあと例外がスローされるがエラーになる。
// 理由: thenのコールバック関数で例外がスローされるが、try～catchは同期的なコードブロックにおける例外を補足するが、
// Promise.then()の内部で発生した非同期の例外はcatchでは補足されない。finallyは実行される。
// Cが先になっている理由は、wait(0)がすぐに解決され、logA()が非同期的に呼び出される準備をしている間にfinallyブロックが実行されてlogCが先に出力されるため。

function f3() {
  // NOTE: then のコールバック内の例外は try/catch でキャッチできるだろうか
  try {
    wait(0).then(logA).then(errX);
  } catch (e) {
    logB();
  } finally {
    logC();
  }
}

// 予想：2秒後A→1秒後B→100が表示される
// 結果：予想と同じ
// 理由：wait2()が解決された後にlogA()が実行され40を返し、
// 次のthenでwait(1000)が解決されlogB()が実行され100を返し、次のthenで渡された100が表示される。
function f4() {
  // NOTE: f5 との比較用
  wait2()
    .then(() => {
      logA();
      return 40;
    })
    .then((value) =>
      wait(1000).then(() => {
        logB();
        return 100;
      })
    )
    .then((v) => log(v));
}

// 予想：B→A→40が表示される
// 結果：予想通り
// 理由：2つ目のthenの引数が関数でなくPromiseになっており、wait2()の解決を待たずに即座に実行されるためBが先に表示される。
// その後、wait2()が解決されlogA()が実行され40を返し、次のthenで40が表示される。
function f5() {
  // NOTE: 2つ目の then の引数が関数でなく Promise になっている (典型的なミス)
  wait2()
    .then(() => {
      logA();
      return 40;
    })
    .then(
      wait1().then(() => {
        logB();
        return 100;
      })
    )
    .then((v) => log(v));
}
// 予想：1秒後にA、1秒後にB、2秒後にCが表示される
// 結果：予想通り
// 理由：wait1()が解決されるとlogA()が実行され、次のthenでwait1()が解決されlogB()が実行され、次のthenでwait2()が解決されlogC()が実行される。
function f6() {
  // NOTE: 1つの Promise に対し then を2回呼び出すとどうなるか

  const p = wait1().then(logA);
  p.then(() => wait1()).then(logB);
  p.then(() => wait2()).then(logC);
}

// 予想：1秒後にA、2秒後にBとCが表示される
// 結果：予想通り
// 理由：wait1()が解決するとlogAが実行される。
// wait2()の解決後、thenの中で解決済みのpのthenが呼ばれてlogBが実行され、その後すぐにlogCが実行される
function f7() {
  // NOTE: 2つ目の wait の引数が実行される差には p は解決済み
  // (= 解決済みの Promise の then を呼び出すとどうなるか)
  const p = wait1().then(logA);
  wait2()
    .then(() => {
      return p.then(logB);
    })
    .then(logC);
}

// 予想：1秒後にX→Aと表示される
// 結果：予想通り
// 理由：wait1()が解決されるとerrX()が実行され、例外がスローされる。
// catchで例外が補足されてXが表示され、その後finallyが実行され、Aが表示される。
function f8() {
  // NOTE: f9, f10 との比較用
  wait1()
    .then(errX)
    .then(errY)
    .catch((e) => log(e.message))
    .finally(logA);
}

// 予想：1秒後にY→Aと表示される
// 結果：予想通り
// 理由：wait1()が解決されると()=>42とerrY()が実行され、例外がスローされる。
// catchで例外が補足されてYが表示され、その後finallyが実行され、Aが表示される。
function f9() {
  // NOTE: f12 との比較用
  wait1()
    .then(() => 42)
    .then(errY)
    .catch((e) => log(e.message))
    .finally(logA);
}

// 予想：1秒後にY→Aと表示される
// 結果：Aが表示され、Error: Yは実行エラーとなる
// 理由：then().catch()の場合、thenの中で例外がスローされるとcatchで補足されるが、
// then(r,c)は、成功時にコールバックrが、失敗時にcが呼び出されるが、rで例外がスローされた場合にcでは補足されないため、Yが補足されず例外となる。
// finallyは必ず実行されるためlogAが実行される。
function f10() {
  // NOTE: then(r, c) と then(r).catch(c) は等しいか？
  wait1()
    .then(() => 42)
    .then(errY, (e) => log(e.message))
    .finally(logA);
}
// 予想 : Xが表示される
// 結果：予想通り
// Promiseのコールバックで関数が非同期に実行され、errXでエラーがスローされるが、
// catchブロックがあるためそこで例外を補足できるのでXが表示される。
function f11() {
  // f12 との比較用: new Promise 内の throw は .catch でキャッチできるか？
  new Promise((resolve, reject) => {
    errX();
  }).catch((e) => log(e.message));
}

// 予想：エラーXが補足されずにエラーとして表示される
// 結果：予想通り
// 理由：Promiseのコールバック関数は、setTimeoutを実行した時点で解決し、チェーンが終了するためcatchブロックも終了する。
// その後setTimeoutで渡したコールバック関数が実行され、例外をスローするが、チェーンとは違うところでスローされているため補足されない。、
function f12() {
  // new Promise 内だがコールバック関数で throw した場合は？
  new Promise((resolve, reject) => {
    setTimeout(() => errX(), 0);
  }).catch((e) => log(e.message));
}

// 動作確認
f12();
