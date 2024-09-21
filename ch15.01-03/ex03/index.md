# メモ

- ハッシュ値は下記で生成した
- openssl dgst -sha384 -binary script.js | openssl base64 -A

# 参考

- https://beginners-hp.com/html-tag/integrity.html
- https://www.srihash.org/

# 防げる攻撃

- ネットワーク上でスクリプトを改ざんされた場合に、スクリプトのハッシュ値が異なるため実行がブロックされる
