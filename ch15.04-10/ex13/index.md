# 15.4-10.11 では #/ や #/active といった URL を利用した。 少し昔だとこのような URL は #!/ や #!/active と ! を付けることもあった (もしかしたら職場でそのようなコードを見るかもしれない)。 このような形式を当時は hashbang と呼んだ。どうしてこのようなスタイルが存在したのだろうか。

- hashbangはshebangとも呼ばれる。

## ハッシュの背景

- もともとURLのハッシュ構文が存在しており、ブラウザがハッシュを含むURLを受信すると、ハッシュの前のアドレスがページ要求としてサーバに送信される(ex11/ex13で確認したように)ハッシュ部分はブラウザのクライアント側で処理され、ページの関連する位置に遷移するという動作となる。これはもともとハッシュ構文の意図した動作である。

## !#が使われていた理由

- Ajaxを使って、サーバでの完全なページレンダリングをせずにJavaScriptでページの一部のみを動的に更新するSPA(シングルページアプリケーション)を作るのが一般的になり、そのサイトを作るためにもハッシュを使ってページ遷移を実現していた。
- しかし、Ajaxでページの一部のみを更新するスタイルだとURL自体が更新されないため、Googleなどの検索エンジンがコンテンツをクロールしづらい。Googleはhashbangを見つけることでサーバ側のレンダリング済みHTMLを取得することを期待してクロールするようにしていたため、SEO対策で用いられていた。

# 参考

- https://mame0112.hatenablog.com/entry/2015/06/06/025650
- https://stackoverflow.com/questions/7846073/what-is-the-shebang-hashbang-for
- https://stackoverflow.com/questions/3009380/whats-the-shebang-hashbang-in-facebook-and-new-twitter-urls-for
- https://www.quora.com/What-are-Hashbang-URLs
