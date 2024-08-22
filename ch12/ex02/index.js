// function* fibonacciSequence() {
//   let x = 0,
//     y = 1;
//   for (;;) {
//     yield y;
//     [x, y] = [y, x + y];
//   }
// }

function fibonacciSequence() {
  let x = 0,
    y = 1;

  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      // 現在の y を返して、次のフィボナッチ数に更新
      const value = y;
      [x, y] = [y, x + y];
      return { value, done: false };
    },
  };
}

// 動作確認
const fibIter = fibonacciSequence();

for (const value of fibIter) {
  console.log(value);
  if (value > 100) break; // 無限ループなので条件をつけて停止
}
