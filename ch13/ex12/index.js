setTimeout(() => console.log("Hello, world!"), 1000);

async function longRunningButAsyncFunction() {
  while (true) {
    // NOTE: ループの中で凄く時間のかかる処理 (大きい行列の処理とか...) を実行していると想像して下さい。
    // (適当な値で await するのが目的であり null に理由はない)
    await null;
  }
}

longRunningButAsyncFunction();

// 予想：1秒後にhello worldが表示されそうだが、出題意図からするとされないのだろう
// 結果：1秒経っても何も表示されない。処理が終わらない。
// 理由：
// longRunningButAsyncFunction が開始されると、await null; によって無限に続くマイクロタスクがキューに追加される。
// (await nullのようにすぐに解決されるPromiseを返す場合、このコードは「マイクロタスク」として扱われる)
// マイクロタスクはタスクの一種だが、キューにマイクロタスクを追加すると、新しく追加されたマイクロタスクは次のタスクが実行される前に実行される。
// イベントループはこのマイクロタスクを優先的に処理し続けるため、setTimeout で設定された1秒後のタスクが実行される前に、
// マイクロタスクが無限に実行され続ける。
// その結果、1秒後経ってもsetTimeoutのコールバックのconsole.logは実行されない。

// 参考：https://zenn.dev/estra/books/js-async-promise-chain-event-loop/viewer/d-epasync-task-microtask-queues
// 抜粋
// 「queue a microtask」と呼ばれるアルゴリズムによって作成されるタスクのことを指す俗称ということです。仕様的にはマイクロタスクはタスクの一種ということですね。
// マイクロタスク自体は、それを呼び出し関数やプログラムが実行された後にコールスタックが空になった後にのみ実行される短い関数です。
// API や Promise の then() メソッドなどの引数に渡すコールバック関数がマイクロタスクとして扱われます。
// Promise のプロトタイプメソッドである、then(), catch(), finally() の引数に渡すコールバック関数はすべてマイクロタスクとしてマイクロタスクキューへと送られます。
//基本的にはマイクロタスクを作成するのは、Promise 関連の処理(then(cb) や async/await など)ですが、他にもマイクロタスクをマイクロタスクキューに追加する API が存在しています。
