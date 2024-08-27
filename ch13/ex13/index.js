// ch12/ex06のwalk
// export function* walk(rootPath) {
//   const stats = statSync(rootPath); // fs.statsオブジェクトを取得する
//   const isDirectory = stats.isDirectory(); // ルートがディレクトリか判定

//   if (isDirectory) {
//     const files = readdirSync(rootPath); // ディレクトリ内のエントリの名前を配列で取得
//     for (const file of files) {
//       const filePath = `${rootPath}/${file}`;
//       // オブジェクトを返す
//       yield { path: filePath, isDirectory: statSync(filePath).isDirectory() };
//       // 再帰的に呼び出す
//       yield* walk(filePath);
//     }
//   } else {
//     yield { path: rootPath, isDirectory: false };
//   }
// }

import { promises as fs } from "fs";
import { join } from "path";

export async function* walk(rootPath) {
  const stats = await fs.stat(rootPath); // fs.statsオブジェクトを取得する
  const isDirectory = stats.isDirectory(); // ルートがディレクトリか判定

  if (isDirectory) {
    const files = await fs.readdir(rootPath); // ディレクトリ内のエントリの名前を取得
    for (const file of files) {
      const filePath = join(rootPath, file);
      const fileStats = await fs.stat(filePath); // ファイルのfs.statsオブジェクトを取得
      yield { path: filePath, isDirectory: fileStats.isDirectory() }; // オブジェクトを返す
      if (fileStats.isDirectory()) {
        // 再帰的に非同期ジェネレータを呼び出す
        yield* walk(filePath);
      }
    }
  } else {
    yield { path: rootPath, isDirectory: false };
  }
}

// 動作確認
// ch13/ex13のディレクトリで実行すること

(async () => {
  for await (const elem of walk("./testDir")) {
    console.log(elem);
  }
})();

// 動作結果
// { path: 'testDir\\emptyDir', isDirectory: true }
// { path: 'testDir\\foo.txt', isDirectory: false }
// { path: 'testDir\\subDir', isDirectory: true }
// { path: 'testDir\\subDir\\fuga.txt', isDirectory: false }
// { path: 'testDir\\subDir\\subsubDir', isDirectory: true }
// { path: 'testDir\\subDir\\subsubDir\\hoge.txt', isDirectory: false }
