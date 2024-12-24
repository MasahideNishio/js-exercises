import fs from "fs";
import path from "path";
import fetch from "node-fetch";

const filePath = path.resolve("file.txt"); // file.txt の絶対パスを取得

// ファイルをアップロードする
fetch("http://localhost:8000/uploads/hello.txt", {
  method: "PUT", // PUT メソッドで送信
  body: fs.createReadStream(filePath), // アップロードするファイルの内容
})
  .then((res) => res.text()) // サーバーからの応答を取得
  .then((text) => console.log(text)) // 応答をコンソールに表示
  .catch((err) => console.error(err)); // エラーを表示
