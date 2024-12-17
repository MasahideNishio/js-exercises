// 必要なモジュールをインポート
import fs from "fs"; // ファイルシステムモジュール
import iconv from "iconv-lite"; // Shift_JISを扱うためのライブラリ

// Shift_JISで保存されたテキストファイルを読み込み、文字化けしないように表示する関数
function readShiftJISTextFile(filePath) {
  // fsモジュールを使ってファイルを読み込む（バイナリモードで読み込み）
  const buffer = fs.readFileSync(filePath); // ファイルをバッファとして読み込む

  // iconv-liteを使ってShift_JISからUTF-8にデコードする
  const content = iconv.decode(buffer, "Shift_JIS");

  // コンソールに表示
  console.log("ファイルの内容:");
  console.log(content);

  // バッファそのもの
  console.log("バッファそのもの:");
  console.log(buffer);
}

// ファイルのパスを指定（同じフォルダにある hello.txt）
const filePath = "hello.txt";

// 関数を呼び出して、ファイル内容を表示
readShiftJISTextFile(filePath);
