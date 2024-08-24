import * as fs from "node:fs";
import * as fsPromises from "node:fs/promises";
import { join } from "node:path";

export function fetchFirstFileSize(path) {
  return fsPromises
    .readdir(path)
    .then((files) => {
      // readdirの結果=file一覧
      if (files.length === 0) {
        return null;
      }
      return fsPromises.stat(join(path, files[0])).then((stats) => stats.size); // readdirの結果のfile[0]を使ってstatを実行するPromiseを返す
    })
    .catch((err) => {
      throw err;
    });
}

export function fetchSumOfFileSizes(path) {
  return fsPromises
    .readdir(path)
    .then((files) => {
      // readdirの結果=file一覧
      let total = 0; // ファイルサイズの合計
      const promises = files.map((file) =>
        fsPromises.stat(join(path, file)).then((stats) => {
          total += stats.size;
        })
      ); // 各ファイルをstatしてサイズを取得し、totalに加算するPromiseの配列
      return Promise.all(promises).then(() => total);
    })
    .catch((err) => {
      throw err;
    });
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

// fetchFirstFileSize の動作確認
fetchFirstFileSize(testPath)
  .then((size) => {
    console.log("First file size:", size);
  })
  .catch((err) => {
    console.error("Error:", err);
  });

// fetchFirstFileSize_old の動作確認
fetchFirstFileSize_old(testPath, (err, size) => {
  if (err) {
    console.error("Error:", err);
    return;
  }
  console.log("First file size (old):", size);
});
// fetchSumOfFileSizes の動作確認
fetchSumOfFileSizes(testPath)
  .then((totalSize) => {
    console.log("Total size of all files:", totalSize);
  })
  .catch((err) => {
    console.error("Error:", err);
  });

// fetchSumOfFileSizes_old の動作確認
fetchSumOfFileSizes_old(testPath, (err, totalSize) => {
  if (err) {
    console.error("Error:", err);
    return;
  }
  console.log("Total size of all files (old):", totalSize);
});
