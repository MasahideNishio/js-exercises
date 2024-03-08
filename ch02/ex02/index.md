### $を変数名として使うライブラリ : jQuery

- jQueryで生成されたオブジェクト変数(例：const $element = $(id);)の頭に$をつけるのが作法(jQueryオブジェクトであることを分かりやすくするため)
- jQueryにおいて$は"jQuery"と等しい(window.jQuery = window.$ = jQuery;)
  - windowsオブジェクトはグローバルオブジェクトで、このオブジェクトのプロパティはwebページ内のスクリプトからプロパティ名だけで参照可能になる。つまり、jQueryのスクリプトファイル内で生成したjQueryというオブジェクトを、他のスクリプトからドルマークまたはjQueryという名前で呼び出せる。
- [jQuery](https://jquery.com/)

### \_を変数名として使うライブラリ : Underscore.js

- 配列、オブジェクトの操作をはじめ、関数、オブジェクトなどを扱う際の便利関数が80あまり定義されたライブラリ。
- 「⁠\_」という変数の中にそれぞれ便利な機能が入っている。
- [Underscore.js(github)](https://github.com/jashkenas/underscore/)
