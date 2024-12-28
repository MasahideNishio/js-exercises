const threads = require("worker_threads");

if (threads.isMainThread) {
  //★ex15で追加: メインスレッドで使用するカウンタ変数 num
  let num = 0;

  //★ex15で変更: ワーカースレッドを作成
  const worker = new threads.Worker(__filename);

  //★ex15で追加: ワーカースレッドからのメッセージを受け取る
  worker.on("message", (message) => {
    if (message === "increment") {
      num++; //★ex15で変更: ワーカーからのリクエストで num をインクリメント
    } else if (message === "done") {
      console.log("Final count:", num); // 最終結果を出力
    }
  });

  //★ex15で追加: メインスレッドでカウントを進める
  for (let i = 0; i < 10_000_000; i++) {
    num++; // 単純なインクリメント
  }

  //★ex15で追加: メインスレッドの処理終了後にワーカーに通知
  worker.postMessage("main_done");
} else {
  //★ex15で追加: サブスレッド (ワーカースレッド)
  let workerCount = 0;

  //★ex15で追加: ワーカーのカウント処理
  for (let i = 0; i < 10_000_000; i++) {
    //★ex15で変更: メインスレッドにインクリメントのメッセージ送信
    threads.parentPort.postMessage("increment");
    workerCount++; // ワーカー自身の処理もカウントしておく
  }

  //★ex15で追加: ワーカーの処理が完了したら通知
  threads.parentPort.postMessage("done");
}

// このようないわゆるメッセージパッシングによって排他制御処理相当を行う並行処理モデルをアクターモデルと呼ぶ
// https://ja.wikipedia.org/wiki/%E3%82%A2%E3%82%AF%E3%82%BF%E3%83%BC%E3%83%A2%E3%83%87%E3%83%AB
// https://qiita.com/azarasi1226/items/771d39b11f59d4407ea8#%E3%82%A2%E3%82%AF%E3%82%BF%E3%83%BC%E3%83%A2%E3%83%87%E3%83%AB%E3%82%92%E4%BD%BF%E3%81%86%E3%81%A8%E3%81%AA%E3%81%AB%E3%81%8C%E5%AC%89%E3%81%97%E3%81%84%E3%81%AE%E3%81%8B
