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

// 予想 : 42が2つ出力される
// 結果 : 1秒後に42が出力され、2秒後に100が出力された
// 理由 :Promise.any は、渡された複数の Promise の中で最初に 成功（resolve）した Promise の結果を返す。
// 最初に成功した Promise があると、それ以外の Promise の結果には関係なく処理が進行する。
// 最初のlog(v)は42の方のPromiseが解決しているため、42が出力される。
// その後wait2で2秒待っている間に、v=100の方のPromiseが解決し、vの値は100に変わっているため、100が出力される。(最初に成功したPromiseがあるとそれで確定すると勘違いした)
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Promise/any
async function i1() {
  // NOTE: any で1つ Promise が解決された時に他の Promise はどうなるだろうか
  let v = 0;

  v = await Promise.any([
    wait1().then(() => 42),
    wait2()
      .then(() => (v = 100))
      .then(() => 0),
  ]);

  log(v);
  await wait2();
  log(v);
}
// 予想 : 1秒後C→2秒後B→3秒後A→["A", "B", "C"]が出力される
// 結果 : 予想と一致
// Promise.allですべてのPromiseが並行して処理される。
// wait1が最初に実行されるため、logC、続いてlogB、最後にlogAが出力される。
// すべてのPromiseが解決されたあと、log(v)で各Promise.thenでreturnされた文字の配列が出力される。
async function i2() {
  const v = await Promise.all([
    wait3().then(() => {
      logA();
      return "A";
    }),
    wait2().then(() => {
      logB();
      return "B";
    }),
    wait1().then(() => {
      logC();
      return "C";
    }),
  ]);
  log(v);
}

// 予想 : 1秒後にYと42、2秒後にB、3秒後にXと0が出力される
// 結果 : 1秒後にYと42、2秒後にB、3秒後に0が出力された(Xは出なかった)
// 理由 : Promise.all は、渡された複数の Promise が全て成功（resolve）した時に成功となる Promise を返す。
// 1つでも失敗(reject)した場合は、即座にcatchに飛び、その時点で残っている未完了のPromiseは結果を返さない。
// 最初にwait1でerrYが呼ばれ、例外がスローされてcatchに飛ぶ。そこで'Y'とv=42が出力される。
// catch節内でawait wait3()で3秒経過する間に、wait2が完了しlogBが実行されBが表示される。また、wait3も完了し、V = 0が実行される。
// catch節内でのlog(v)でv=0が表示される。
// errX()は実行されないのは、既に例外が発生していてcatch節の処理が実行されているため。
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
async function i3() {
  // NOTE: all で引数の1つが失敗すると他の Promise はどうなるだろうか
  let v = 42;
  try {
    await Promise.all([
      wait3().then(() => {
        v = 0;
        errX();
      }),
      wait2().then(() => {
        logB();
        return "B";
      }),
      wait1().then(() => {
        errY();
      }),
    ]);
  } catch (e) {
    log(e.message);
    log(v);
    await wait3();
    log(v);
  }
}

// 予想：5秒後に0、その4秒後に1、その3秒後に2、その2秒後に3、その1秒後に4、COMPLETEDが出力される
// 結果：予想通り
// 理由：p.thenでwait(5-i)秒後にlog(i)を実行するPromiseを生成し、それをpに代入している。
async function i4() {
  // NOTE: i5, i6 との比較用 (直列に処理を実行したいものとする)
  let p = Promise.resolve(null);
  for (let i = 0; i < 5; ++i) {
    p = p.then(() => wait((5 - i) * 1000).then(() => log(i)));
  }
  return p.then(() => log("COMPLETED"));
}

// 予想 : すぐにCOMPLETEDが出力され、その後1秒後に4、2秒後に3、3秒後に2、4秒後に1、5秒後に0が出力される
// 結果 : 予想通り
// 理由 : thenにコールバック関数ではなくpromiseを渡してしまっているため、すぐに処理が進みCOMPLETEDが出力される。
// その後、waitが終わるごとにlog(i)が出力される。
async function i5() {
  // NOTE: このコードは期待通りの挙動をすると考えられるだろうか？(典型的なミス)
  let p = Promise.resolve(null);
  for (let i = 0; i < 5; ++i) {
    p = p.then(wait((5 - i) * 1000).then(() => log(i)));
  }
  return p.then(() => log("COMPLETED"));
}

// 予想：1秒ごとに4、3、2、1、0、COMPLETEDが出力される
// 結果：予想通り
// 理由：Promise.allでPromiseの配列を渡すことで、並列に実行が進む。waitは5秒、4秒と１秒ずつ短くなっていくため、一番短い4から順番に1秒ずつ出力され、
// 全てのPromiseが完了するまで待つため最後にCOMPLETEDが表示される。
async function i6() {
  return Promise.all(
    [0, 1, 2, 3, 4].map((i) => wait((5 - i) * 1000).then(() => log(i)))
  ).then(() => log("COMPLETED"));
}

// 予想：11秒後に10が表示される
// 結果：予想通り
// 理由：p1は最初に1秒待った後に2秒間隔で vに1を5回加算する。p2は2秒間隔で vに1を5回加算する。両方が終わる11秒後にv=10が表示される。
async function i7() {
  // NOTE: i8 との比較用
  let v = 0;

  // 1秒待った後に2秒間隔で value の値を更新
  const p1 = async () => {
    await wait1();
    for (let i = 0; i < 5; i++) {
      const next = v + 1;
      v = next;
      await wait2();
    }
  };

  // 2秒間隔で value の値を更新
  const p2 = async () => {
    for (let i = 0; i < 5; i++) {
      const next = v + 1;
      v = next;
      await wait2();
    }
  };

  await Promise.all([p1(), p2()]);
  log(v);
}

// 予想：11秒後に10が表示される
// 結果：11秒後に5が表示された
// 理由：p1は最初に1秒待った後に2秒間隔で vに1を5回加算する。p2は2秒間隔で vに1を5回加算する。両方が終わる11秒後にその結果が表示される。
// しかし、await wait2()が next = v+1;とv=nextの間に入るため、vの値が更新される前に次の処理に進んでしまう。
// その結果p1でnext = 0 + 1 = 1が行われた後、wait2で待機し、その間にp2もnext = 0 + 1 = 1が行われる。
// p1に戻ってきたときにvに1が代入され、続いてp2でもvに1が代入される。このように進んでいくため、最終的にv=5となる。
async function i8() {
  // NOTE: 複数の非同期処理が1つの変数に対し書き込みを行う場合、読み込みと書き込みの間に await が入るとどうなるだろうか
  let v = 0;

  const p1 = async () => {
    await wait1();
    for (let i = 0; i < 5; i++) {
      // NOTE: value の読み込み (value + 1) と書き込み (value = ...) の間に await が...
      const next = v + 1;
      await wait2();
      v = next;
    }
  };

  const p2 = async () => {
    for (let i = 0; i < 5; i++) {
      const next = v + 1;
      await wait2();
      v = next;
    }
  };

  await Promise.all([p1(), p2()]);
  log(v);
}

// i1();
// i2();
// i3();
// i4();
// i5();
// i6();
// i7();
i8();
