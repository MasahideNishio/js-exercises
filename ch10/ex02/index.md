# CommonJS

- CommonJSとは、サーバーサイドなどのウェブブラウザ環境外におけるJavaScriptの各種仕様を定めることを目標としたプロジェクトである。
- Node.jsで使われている方式。
- Node.jsはデフォルトで全てのモジュールをCommonJSで扱うが、Node.jsは最近のバージョンでES Modulesに対応するなどしていて、潮流はES Modulesに流れつつある。
- 他のモジュールを呼び出す際にはrequireで呼び出す
- const functions = require('./libs/functions');

# ES Modules

- ECMA Script Modulesの略。
- Node.jsはデフォルトで全てのモジュールをCommonJSで扱うので、モジュールシステムを変える必要がある。
- export / importを使った方式
  https://ics.media/entry/16511/

# 上記以外 : AMD

- Asynchronous module definition
- define()に配列でモジュール名を指定する方式
  define(['jquery', 'underscore'], function ($, \_) {
  function a(){}; // public
  function b(){}; // private
  return a;
  });
- https://qiita.com/nanocloudx/items/70f1316debf05b93ac82
- https://qiita.com/opengl-8080/items/196213867b859daea719
- https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Modules
