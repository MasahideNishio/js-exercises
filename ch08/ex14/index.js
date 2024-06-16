function any(...funcs) {
  return function (n) {
    // 引数を1つ取る新たな関数を定義
    return funcs.some((x) => x(n)); // anyの引数で受け取った関数の配列に対し、nを渡してその戻り値が1つでもtrueならtrueを返すのでsomeを使う。
  };
}

const isNonZero = any(
  (n) => n > 0,
  (n) => n < 0
);

console.log(isNonZero(0)); // => false
console.log(isNonZero(42)); // => true
console.log(isNonZero(-0.5)); // => true

function catching(func1, func2) {
  return function (input) {
    try {
      return func1(input); // func1を呼び出し
    } catch (e) {
      return func2(e); // 例外発生時はそのままeをfunc2に渡す
    }
  };
}
const safeJsonParse = catching(JSON.parse, (e) => {
  return { error: e.toString() };
});

console.log(safeJsonParse('{"a": 1}')); // => {a: 1}
console.log(safeJsonParse("{Invalid Json}")); // => {error: "SyntaxError: ..."}
