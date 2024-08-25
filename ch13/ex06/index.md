# jQuery Deferredとは

- jQueryのv1.5から導入された、非同期処理をうまく扱うための標準モジュール
- 非同期処理を連結する際にコールバック地獄から開放される、エラー処理をうまく記述できる、一連の非同期処理を関数可して再利用しやすくできるといったメリットがある

1. $.Deferred()でDeferredオブジェクトを作る(Promiseは自動で生成される)
2. Deferredオブジェクトと非同期処理を関連付ける
3. Deferredオブジェクトが持っているPromiseオブジェクトを即座にreturnする

- 参考
  https://qiita.com/atti/items/17fd8b11305a5375a1de
  https://techblog.yahoo.co.jp/programming/jquery-deferred/

# Promise との関係性

- jQuery DeferredにもPromiseがあるが、ES6で標準化されたJSのPromiseとは異なる
- jQuery DeferredのPromiseオブジェクトは下記の3つを持っている
  - 状態(.state)→ES6のPromiseオブジェクトと考え方は似ている
    - pending : 処理が未完了。
    - resolved : 処理が成功
    - rejected : 処理が失敗
  - 状態がresolvedになった時に実行されるコールバック(.done)
  - 状態がrejectedになった時に実行されるコールバック(.fail)
- どちらもthenメソッドで処理をつなげることができる点は似ている
- ES6に対応していない環境(iOS9とか)で非同期処理をする際にはjQuery Deferredが使える
- 参考
  https://qiita.com/fakefurcoronet/items/cb2d2eba1a2e39f6643d
