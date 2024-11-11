# 設問

- このサーバでは Cookie を使ってクライアントのセッションを識別し、タスク一覧をセッションごとに分離して管理する簡易的な認証/認可を行っている。サーバが設定している Cookie の値は sid=<セッションに一意に割り当てた ID>; SameSite=Lax; Path=/; HttpOnly; である。ToDo アプリでいくつかのタスクを作成した後、以下に挙げる操作を実施したとき、それぞれどのような結果になるか記載し、その理由を説明しなさい。

1. index.js でdocument.cookie プロパティを console.logで表示する

- 表示は空になる
- server.jsのcookieAuthMiddlewareでHttpOnly属性をヘッダに付与しているため、WebブラウザのJavaScriptからCookieを読み取りに行けない
  https://e-words.jp/w/HttpOnly%E5%B1%9E%E6%80%A7.html

2. ブラウザの開発者コンソールで http://localhost:3000/ の Cookie を表示する

- sidとその値が表示される
- 開発者コンソールではHttpOnlyのCookieも表示できる

3. ToDo アプリのタブをリロードする

- 追加したタスクがそのままが表示され、リロードしてもタスクの状態が保持される
- Cookie(sid)によってセッションが識別されており、同じクライアントからのリクエストとみなされるため、リロード後もサーバーがこのsidに紐づくTasksを返すため、タスクの項目と状態が維持される

4. 同一ブラウザの異なるタブやウィンドウで http://localhost:3000/ を開いて ToDo リストの状態を確認する

- 同じタスク一覧・状態が表示される
- 同一ブラウザの異なるタブやウインドウでは同じCookie(sid)が送信されるため、サーバ側は同一のセッションだとみなすため。
-

5. シークレットウィンドウや異なるブラウザで http://localhost:3000/ を開いて ToDo リストの状態を確認する

- タスクが空の状態で表示される
- シークレットウィンドウや異なるブラウザだとCookie(sid)は異なるため、サーバ側は別のセッションとして識別するためTaskを返さない

6. http://127.0.0.1:3000/ を開いて ToDo リストの状態を確認する

- タスクが空の状態で表示される
- localhostと127.0.0.1は別のオリジンとして識別されるため、Cookie(sid)が共有されないため、新しいセッションとしてサーバは新しいsidを割り当てる