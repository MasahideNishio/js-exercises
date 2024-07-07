# 予想

- index.cjsでは3回Importしているが、Importは巻き上げられて実行されるため、3回最初にimported.cjsが評価され、その後呼び出し元のそれぞれのBefore/Afterが順に実行される
  imported called
  imported called
  imported called
  Before importing 1
  After importing 1
  Before importing 2
  After importing 2
  Before importing 3
  After importing 3

# 結果

- 呼び出し元の処理が順番に実行され、requireを書いたタイミングで一度Importされ、その後はrequireを書いている箇所は実行されなかった
  Before importing 1
  imported called
  After importing 1
  Before importing 2
  After importing 2
  Before importing 3
  After importing 3
- Node.jsでキャッシュされるため、最初のインポートだけ評価されてその後は評価されない
- 巻き上げられると予想したのはESModules(import)との勘違いだった。requireは巻き上げられない
