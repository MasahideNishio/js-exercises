import { statSync, readdirSync } from "fs";

// ディレクトリかどうかを判定する(isDirectory)のためにstatを使う
// https://maku77.github.io/nodejs/io/is-directory.html

// ディレクトリ内の探索はreaddirSyncを使う
// https://qiita.com/shino365/items/595a8650cbef9eca02ab

export function* walk(rootPath) {
  const stats = statSync(rootPath); // fs.statsオブジェクトを取得する
  const isDirectory = stats.isDirectory(); // ルートがディレクトリか判定

  if (isDirectory) {
    const files = readdirSync(rootPath); // ディレクトリ内のエントリの名前を配列で取得
    for (const file of files) {
      const filePath = `${rootPath}/${file}`;
      // オブジェクトを返す
      yield { path: filePath, isDirectory: statSync(filePath).isDirectory() };
      // 再帰的に呼び出す
      yield* walk(filePath);
    }
  } else {
    yield { path: rootPath, isDirectory: false };
  }
}

// 動作確認
// ch12/ex06のディレクトリで実行すること

// 実行結果
// $ node index.js
// { path: './testDir/emptyDir', isDirectory: true }
// { path: './testDir/subDir', isDirectory: true }
// { path: './testDir/subDir/fuga.txt', isDirectory: false }
// { path: './testDir/subDir/fuga.txt', isDirectory: false }
// { path: './testDir/subDir/subsubDir', isDirectory: true }
// { path: './testDir/subDir/subsubDir/hoge.txt', isDirectory: false }
// { path: './testDir/subDir/subsubDir/hoge.txt', isDirectory: false }

const rootPath = "./testDir";
const walker = walk(rootPath);

for (const entry of walker) {
  console.log(entry);
}
