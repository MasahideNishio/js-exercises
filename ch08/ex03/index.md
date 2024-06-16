# 末尾再帰するとスタックオーバーフローが防げる理由

## 前提

- 再帰関数は自分自身を再帰的に呼び出すので、関数の呼び出し階層が深くなる。内部的には関数の呼び出しごとにメモリ領域が消費される。
- 具体的には、呼び出しのたびに関数自身のローカル変数や戻り先情報を保持するための情報をスタックフレームに保存し、関数はスタックフレームに保存したまま処理を行う。
- 関数の実行が終わると、対応するスタックフレームがpopされて呼び出し元のスタックに復帰して呼び出し元の関数の実行が再開される。

## 末尾再帰最適化されている場合

- スタックフレームは関数の計算途中の値を保持するのに必要だが、計算途中の値がそれ以上使用されないならスタックフレームも不要となる。
- 末尾呼び出しの場合、例えばf()がg()を末尾呼び出ししているならf()の結果はg()の結果になる。つまりg()の呼び出し後にf()のスタックフレームは使用されない。
- そのため、g()の呼び出し時にスタックフレームを新たに生成するのではなく、f()のスタックフレームをg()のスタックフレームとして再利用することができる。
- これをコンパイラや実行環境が行うことを末尾呼び出し最適化という。

# 末尾再帰最適化が実装されている処理系

- ES6で末尾再帰最適化を行うように定められたが、エンジン二依存する
- 2017年時点ではブラウザはSafariのみ→iPhoneで動作させ、エラー出ないことを確認
  https://speakerdeck.com/kota_yata/mo-wei-hu-bichu-sizui-shi-hua-tojavascript?slide=8
  https://thundermiracle.com/blog/2022-05-07-javascript-tco/

# 参考

- https://qiita.com/pebblip/items/cf8d3230969b2f6b3132
- https://speakerdeck.com/kota_yata/mo-wei-hu-bichu-sizui-shi-hua-tojavascript
- https://dev.to/diwakarkashyap/tail-call-optimization-in-es6javascript-in-easy-language-11e6
