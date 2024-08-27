import * as fsPromises from "node:fs/promises";
import { join } from "node:path";

async function fetchSumOfFileSizes(path) {
  const files = await fsPromises.readdir(path); // readdirの結果 = ファイル一覧

  // 各ファイルのサイズ取得を並行で実行するために、Promiseの配列を生成
  const sizePromises = files.map(async (file) => {
    const stats = await fsPromises.stat(join(path, file)); // 各ファイルのstatを非同期に取得
    return stats.size; // ファイルサイズを返す
  });

  // Promise.allで全てのサイズ取得が完了するまで待つ
  const sizes = await Promise.all(sizePromises);

  // ファイルサイズの合計を計算
  const total = sizes.reduce((sum, size) => sum + size, 0);

  return total;
}

// ex08の関数
async function fetchSumOfFileSizes_ex08(path) {
  const files = await fsPromises.readdir(path); // readdirの結果 = ファイル一覧
  let total = 0; // ファイルサイズの合計
  for (const file of files) {
    const stats = await fsPromises.stat(join(path, file)); // 各ファイルのstatを取得
    total += stats.size; // サイズを合計
  }
  return total;
}

// 動作確認
const testPath = "./ch13/ex04/test_dir"; // js_excercises上でnode ch13/ex04を実行する想定のパス

// async関数で実行する必要があるため、テスト用関数を作成
async function test_async() {
  try {
    // fetchSumOfFileSizes の動作確認
    const totalSize1 = await fetchSumOfFileSizes(testPath);
    console.log("Total size of all files:", totalSize1);
    // fetchSumOfFileSizes_ex08 の動作確認
    const totalSize2 = await fetchSumOfFileSizes_ex08(testPath);
    console.log("Total size of all files:", totalSize2);
  } catch (err) {
    console.error("Error:", err);
  }
}

test_async();

// 実行結果、修正前と後で同じ結果
// Total size of all files: 17
// Total size of all files: 17
