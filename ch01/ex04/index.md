### 予想

- 開発者ツールのコンソールに、最初の console.log は{answer:42}、2 つ目の console.log は{answer:0}が表示される

### 実行結果

- HTML を開いた状態のタブで開発者ツールを開く場合：{answer:0}が 2 つ表示される
- 開発者ツールを開いた状態のタブで HTML を開く場合：{answer:42}と{answer:0}が表示される

### 考察

- console.log(obj)はオブジェクト参照のため、参照元の値が変化した場合出力した値も変化する
- HTML を実行後に開発者ツールを開くと life.answer=0 が実行された後での life オブジェクトを参照するため両方 0 になってしまう

### 対策

- console.log(life)を console.log(JSON.stringify(life))にする

### 参考リンク

- [mdn web docs : console.log()](https://developer.mozilla.org/ja/docs/Web/API/console/log_static#%E5%BC%95%E6%95%B0)
