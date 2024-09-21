# グローバルオブジェクトを参照する方法

1. ブラウザ
   -- windowオブジェクトを直接参照する
   -- https://developer.mozilla.org/ja/docs/Glossary/Global_object
2. Node.js
   -- globalオブジェクトを直接参照する
3. ブラウザ・Node共通
   -- グローバルプロパティのglobalThisを使う。グローバルオブジェクトと同等であるグローバルなthisが格納されている
   -- https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/globalThis

# ブラウザのグローバルオブジェクト(window)の独自のプロパティ

- 実際に差分をとってみた結果をindex.jsに記載

# undefined:過去のES仕様での問題:

- ES3以前: undefined はグローバル変数として定義されており、ユーザーが変更できたため、undefined が他の値に上書きされることがあった。これによりundefined が予期せぬ値になる可能性があり、プログラムが正しく動作しないことがあった。

- ES5以降: undefined が読み取り専用のプロパティとして扱われるようになり、変更できないように設定された。これにより、undefined が意図しない値に変更されることを防げるようになった。
