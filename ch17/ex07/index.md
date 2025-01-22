# TypeScriptのトランスパイルは@babel/preset-typescriptやtscによって可能だが、それぞれの違いを調べなさい。

# @babel/preset-typescript

- BabelはES2020などの最新のJavaScriptコードをIE11などのブラウザでも動作するJavaScriptコードに変換するトランパイラ
- BabelでTypeScriptのコードをJavaScriptに変換することができる
- 型チェックが行われないことがデメリット

# tsc

- TypeScriptの開発チームが提供しているTypeScriptのトランスパイラ
- @babel/preset-typescriptが出る前は、その都度にtscコマンドによって以下の処理を行う必要があった

  - 型チェック（静的解析）をして、コードに型のエラーが無いか確認する。
  - TypeScriptのコードをJavaScriptに変換する。
  - 必要に応じて、コード変換と同時に型定義ファイル（.d.tsファイル）の生成もする。ライブラリをTypeScriptで書く際などに行われる処理。

- @babel/preset-typescriptによって、「TypeScriptのコードをJavaScriptに変換する」の部分がBabelで担当できるようになった
- 変わらず、型チェックなどはtscの実施が必要

# 参考

- https://t-yng.jp/post/tsc-and-babel
- https://ja.stackoverflow.com/questions/68603/babel%E3%81%A7typescript%E3%82%92%E3%82%B3%E3%83%B3%E3%83%91%E3%82%A4%E3%83%AB%E3%81%99%E3%82%8B%E3%81%AE%E3%81%A8tsc%E3%81%A7typescript%E3%82%92%E3%82%B3%E3%83%B3%E3%83%91%E3%82%A4%E3%83%AB%E3%81%99%E3%82%8B%E3%81%AE%E3%81%AB%E3%81%A9%E3%81%AE%E3%82%88%E3%81%86%E3%81%AA%E9%81%95%E3%81%84%E3%81%8C%E3%81%82%E3%82%8A%E3%81%BE%E3%81%99%E3%81%8B
- https://qiita.com/nacam403/items/edf3e2c8ff364aff910f
