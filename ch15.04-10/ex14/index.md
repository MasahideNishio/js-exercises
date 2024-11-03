# それではブラウザの開発者ツールで以下を実行し pushState の呼び出しがログに出力されるようにした状態でリンクを選択するとどうなるだろうか？

## ブラウザの開発者ツールの「ネットワーク」タブを確認してみよう。リンクをクリックしたときに通信は発生しているだろうか？

- GET http://localhost:3000/bar?\_rsc=163xj のようなリクエストが発生する
- しかし、最初に開いたときに比べるとfaviconの取得など、ページリソースのロードは最小限のみになる
- レスポンスは下記

```
HTTP/1.1 200 OK
Vary: RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch, Accept-Encoding
Cache-Control: no-store, must-revalidate
Content-Type: text/x-component
Content-Encoding: gzip
Date: Sun, 03 Nov 2024 11:21:14 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Transfer-Encoding: chunked
```

- クエリに"\_rsc"がついているが、これがReact Server Componentsと呼ばれるReactの機能
- ページ全体のデータを取得するのではなく、差分のみをサーバから取得する機能になっている

- 参考 : https://zenn.dev/yuu104/articles/react-server-component

## pushState はいつ実行されているだろうか？

- pushStateは実行されている(/foo、/bar)

## 15.4-10.12 では pushState を使った実装でページのリロード時に正しく動作しなかったが、この問題ではどうだろうか？

- pushStateは実行される
