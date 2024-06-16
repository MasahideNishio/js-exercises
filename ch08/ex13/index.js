// Functionコンストラクタの第二引数はevalと同様に文字列として関数が実行されてしまうので、
// ユーザーによる入力文字列をそのまま使うと悪意のあるコードが実行されてしまう可能性がある。

function f(input) {
  const f = new Function(`return "Hello, " + ${input}`);
  console.log(f());
}
f("(function() { while(true){console.log('Hacked!');} })()"); // 無限ループの関数を渡す
