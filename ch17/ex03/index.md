# npm に同梱されている npx を利用することにはどのような利点があるのか

- npmに同梱されているコマンドで、Nodeのパッケージをインストールすることなく簡易的に使用できるツール。
- インストールしていないモジュールを指定した場合、一時的にインストールして実行し、終了時に自動で削除してくれます。
- npxでできること
  - run-scriptを使用せずにローカルインストールしたコマンドを実行する
  - グローバルインストールせずに一度だけコマンドを実行する
  - GitHubやGistで公開されているスクリプトを実行する
- npmを使用してパッケージを実行するにはpackage.jsonファイルで実行するパッケージを指定する必要がある
  - node_modulesのパスを使うか、package.jsonのscriptsセクションに記載が必要
- npxだと npx <モジュール名>だけでインストール済みモジュールの実行、未インストールのモジュールを実行ができる。

# 参考

- https://qiita.com/kohta9521/items/ee3ed4a2360add80ad79
- https://www.stylagy.co.jp/blog/skill_240716#:~:text=npm%E3%81%AB%E5%90%8C%E6%A2%B1%E3%81%95%E3%82%8C,%E5%89%8A%E9%99%A4%E3%81%97%E3%81%A6%E3%81%8F%E3%82%8C%E3%81%BE%E3%81%99%E3%80%82
- https://dev.classmethod.jp/articles/node-npm-npx-getting-started/
