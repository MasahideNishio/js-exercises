import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// 現在のファイルのディレクトリ名を取得
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express(); // Express アプリケーションのインスタンスを作成

// 静的ファイルを配信するミドルウェアを設定
const rootDirectory = path.join(__dirname, "tmp"); // tmpフォルダをルートディレクトリとする
app.use(express.static(rootDirectory)); // Express に対して静的ファイルの配信を有効化

// /test/mirror エンドポイントを設定
app.all("/test/mirror", (req, res) => {
  res.setHeader("Content-Type", "text/plain; charset=UTF-8");

  // リクエストのメソッド、URL、HTTP バージョンを含むレスポンステキストを作成
  let responseText = `${req.method} ${req.url} HTTP/${req.httpVersion}\r\n`;

  // リクエストヘッダーをレスポンスに追加
  for (const [header, value] of Object.entries(req.headers)) {
    responseText += `${header}: ${value}\r\n`;
  }

  responseText += "\r\n";

  // リクエストボディがあればそれを追加
  req.on("data", (chunk) => {
    responseText += chunk; // ボディのデータをレスポンスに追加
  });

  // リクエストの読み込みが終了したらレスポンスを送信
  req.on("end", () => {
    res.status(200).send(responseText); // ステータス200でレスポンスを返す
  });
});

// ポート番号を指定してサーバーを開始
const port = 8000;
app.listen(port, () => {
  console.log(`Server Starting Port : ${port} `);
});

export default app; // 他のファイルで使えるようにエクスポート
