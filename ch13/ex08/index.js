import * as fs from "node:fs";
import * as fsPromises from "node:fs/promises";
import { join } from "node:path";

export async function fetchFirstFileSize(path) {
  const files = await fsPromises.readdir(path); // readdirの結果 = ファイル一覧
  if (files.length === 0) {
    return null;
  }
  const stats = await fsPromises.stat(join(path, files[0])); // readdirの結果のfile[0]を使ってstatを実行
  return stats.size;
}

export async function fetchSumOfFileSizes(path) {
  const files = await fsPromises.readdir(path); // readdirの結果 = ファイル一覧
  let total = 0; // ファイルサイズの合計
  for (const file of files) {
    const stats = await fsPromises.stat(join(path, file)); // 各ファイルのstatを取得
    total += stats.size; // サイズを合計
  }
  return total;
}

export function fetchFirstFileSize_old(path, callback) {
  fs.readdir(path, (err, files) => {
    if (err) {
      callback(err);
      return;
    }
    if (files.length === 0) {
      callback(null, null);
      return;
    }

    fs.stat(join(path, files[0]), (err, stats) => {
      if (err) {
        callback(err);
        return;
      }
      callback(null, stats.size);
    });
  });
}

export function fetchSumOfFileSizes_old(path, callback) {
  fs.readdir(path, (err, files) => {
    if (err) {
      callback(err);
      return;
    }

    let total = 0;
    const rest = [...files];

    function iter() {
      if (rest.length === 0) {
        callback(null, total);
        return;
      }

      const next = rest.pop();
      fs.stat(join(path, next), (err, stats) => {
        if (err) {
          callback(err);
          return;
        }
        total += stats.size;
        iter();
      });
    }
    iter();
  });
}

// 動作確認
const testPath = "./ch13/ex04/test_dir"; // js_excercises上でnode ch13/ex04を実行する想定のパス

// fetchFirstFileSize_old の動作確認
fetchFirstFileSize_old(testPath, (err, size) => {
  if (err) {
    console.error("Error:", err);
    return;
  }
  console.log("First file size (old):", size);
});
// fetchSumOfFileSizes_old の動作確認
fetchSumOfFileSizes_old(testPath, (err, totalSize) => {
  if (err) {
    console.error("Error:", err);
    return;
  }
  console.log("Total size of all files (old):", totalSize);
});

// async関数で実行する必要があるため、テスト用関数を作成
async function test_async() {
  try {
    // fetchFirstFileSize の動作確認
    const size = await fetchFirstFileSize(testPath);
    console.log("First file size:", size);

    // fetchSumOfFileSizes の動作確認
    const totalSize = await fetchSumOfFileSizes(testPath);
    console.log("Total size of all files:", totalSize);
  } catch (err) {
    console.error("Error:", err);
  }
}

test_async();
