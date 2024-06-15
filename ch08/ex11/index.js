function hoge(a, b) {
  return a + b;
}
// 自作関数は実装コードが返る
console.log(hoge.toString()); // function hoge(a, b) {  return a + b; }

// 組み込み関数はnative codeと表示される
console.log(Math.sqrt.toString()); // function sqrt() { [native code] }
