# Active や Completed を選択後にブラウザのリロードを行うとどうなるだろうか。hashchange と pushState それぞれの実装について調べなさい (ヒント: 開発者ツールでどのような通信が発生しているか調べてみなさい)。

## リロード時のブラウザの表示

### ex12(pushstate)の場合

- Cannot GET /ch15.04-10/ex12/active と表示される
- completedも同じ

### ex11(hashchange)の場合

- http://127.0.0.1:5500/ch15.04-10/ex11/index.html#/active　のようにハッシュがついたままURLが開かれる
- hashchangeイベントをフックしているので、例えば#/completedを開いている状態で追加しても未完了状態でも表示され、改めてactive→completedと遷移すると消える

## 開発者ツールでの確認

### ex12(pushState)の場合

- GET http://127.0.0.1:5500/ch15.04-10/ex12/active　のように、URLに対してGETがコールされている

### ex11(hashchange)の場合

- 何もコールされない

### 考察

- pushStateを使用すると、URLに直接activeやcompletedのパスが加わる。そのため、ページをリロードする際にブラウザはそのURLのリソースを取得しに行く。しかし実際にサーバにそのリソースがあるわけではないため、Cannot GETになる。
- hashchangeの場合、ブラウザがURLのハッシュだけを変更する。ハッシュはクライアント側だけで処理されるので、リロードしてもサーバはルートのリソースを返すのみで、エラーにならない。

# ここまでの例は serve コマンドで HTML や JS といったファイル配信するサーバーを立ち上げてきた。 サーバー側がどのような挙動をすれば pushState を使った実装が期待通り動作するか考えて答えなさい。

- サーバ側で、指定のパス /activeや /completedがアクセスされた場合に、それらのリクエストをルートのindex.htmlにリダイレクトするようにする
