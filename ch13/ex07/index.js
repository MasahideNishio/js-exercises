import {
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

// 予想:3秒後にAが出力され、その2秒後にBが出力され、その1秒後にCが出力される。
// 結果:予想通り
// 理由:awaitでそれぞれwaitが呼ばれるため、waitの処理が終わるまで待ってからlogが呼ばれるため。
async function h1() {
  try {
    await wait3();
    logA();
    await wait2();
    logB();
    await wait1();
    logC();
  } catch (e) {
    log(e.message);
  }
}

// 予想:Xが出力される
// 結果:予想通り
// 理由:Promiseの中でエラーが発生し、catchでエラーがキャッチされてlog関数でエラーメッセージが出力されるため
function h2() {
  // NOTE: h3 との比較用
  new Promise(() => {
    errX();
  }).catch((e) => log(e.message));
}

// 予想:Xが出力される
// 結果:例外は補足されず、Error:Xが出力された
// 理由:async関数はPromiseを返すため、外側のnew PromiseのPromiseオブジェクトとは別のPromiseである。
// async関数のPromise内で発生した例外はnew Promiseで生成されるpromiseオブジェクトのcatchでは補足されない
function h3() {
  // NOTE: new Promise の引数が async function の場合、例外はどう扱われるだろう
  new Promise(async () => {
    errX();
  }).catch((e) => log(e.message));
}

// 予想:例外は補足されず、Error Xが出力される
// 結果:例外は補足されなかったが、Error:Yが出力された
// 理由:await p1、await p2はそれぞれpromiseが完了するまで処理を待つが、Promiseの処理自体はp1もp2も並行して進んでおり、
// p2の方がwaitが短く先に例外が発生する。例外はawaitで完了を待たずにスローされるためYが出力される。
// 図解:
//  wait2
// |---------------|
//                  errX()
//                 |-|
//   wait1
//   |----------|
//        errY() ←先に例外がスローされる
async function h4() {
  // NOTE: 2つの例外は両方 catch できるか？
  try {
    const p1 = wait2().then(() => {
      errX();
    });
    const p2 = wait1().then(() => {
      errY();
    });
    await p1;
    await p2;
  } catch (e) {
    log(e.message);
  }
}

// h1();
// h2();
// h3();
// h4();
