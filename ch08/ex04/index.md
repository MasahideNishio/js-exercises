# 予想

- 1つめのconsole.log : false,true
- 2つめのconsole.log : true,false
  -- 通常の関数のthisは呼び出しコンテキストに依存する。
  -- アロー関数なのでthisは関数が定義された環境のthisを継承する
  -- obj.om()のthisはobjオブジェクト
  -- nest.nm()は通常の関数のため、thisは関数を呼び出したnestオブジェクトそのものとなる
  -- nest.arrow()はアロー関数のため、thisは定義されたときのthisを継承するため、om()のthisであるobjが継承されthisとなる

# 結果

- false true
- true false
