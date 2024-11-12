- 三菱UFJ銀行のインターネットバンキングのログインボタンを押したときに呼ばれる通信の中で、ヘッダーにAccess-Control-Allow-Origin: \* が設定されている通信があった。
- 要求URLはhttps://t.karte.io/trackで、そもそもの銀行のサイトのオリジンbk.mufg.jp とは異なるオリジンへのリクエストとなっている。
  ![alt text](sample.png)
