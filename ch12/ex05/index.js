import { openSync, readSync, closeSync } from "fs";

function* readLines(filePath, bufferSize = 1024) {
  const fd = openSync(filePath, "r"); // ファイルを開く
  const buffer = Buffer.alloc(bufferSize); // 読み込むバッファを作成
  let leftover = ""; // 改行がバッファ内に収まらなかったときのための残り部分

  try {
    while (true) {
      const bytesRead = readSync(fd, buffer, 0, bufferSize, null); // 一定サイズごとにファイルを読み込む

      if (bytesRead === 0) {
        if (leftover) yield leftover; // 末尾まで読んだ場合残り部分だけを返す
        break;
      }

      const content = leftover + buffer.toString("utf8", 0, bytesRead); // 残り部分と新しいバッファを結合
      const lines = content.split("\n"); // 改行で分割

      leftover = lines.pop(); // 残り部分を保存（次のバッファと結合するため)

      // このバッファ分の改行で区切った分を返す
      for (const line of lines) {
        yield line; // 1行ずつ返す
      }
    }
  } finally {
    closeSync(fd); // 必ずファイルクローズする
  }
}

// 動作確認
// ch12/ex05のディレクトリで実行すること
for (const line of readLines("./test.txt")) {
  console.log(line); // ファイルの各行を表示
  console.log("改行"); // ちゃんと切れてるか確認
}
