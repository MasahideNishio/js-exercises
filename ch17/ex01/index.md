# やったことメモ

1. インストール

- npm install --save-dev eslint prettier eslint-config-prettier eslint-plugin-prettier を実行
  - eslint-config-prettier : ESLint と Prettier の競合するルールを無効化
  - eslint-plugin-prettier : Prettier のフォーマットエラーを ESLint で表示するためのプラグイン

2. ESLint初期設定

- npx eslint --init

3. package.jsonにscriptを追加

4. GoogleのESLintをインストールと設定(この時点では.eslintrc.jsonを作成)

- npm install --save-dev eslint eslint-config-google

5. エラーが出た。Flat Configのためにeslint.config.jsに移行

- https://eslint.org/docs/latest/use/configure/migration-guide#predefined-and-shareable-configs
- フラットコンフィグとは https://qiita.com/masakinihirota/items/b61d595e4ea746adef57

# 参考

- ESLintとPretterの設定

  - https://blog.ojisan.io/prettier-eslint-cli/
  - https://zenn.dev/crsc1206/articles/d92548257fb445

- GoogleのESLint設定
  - https://www.npmjs.com/package/eslint-config-google
