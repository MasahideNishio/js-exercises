// このような関数は絶対に書いてはならない。
function set42(key) {
  eval(`${key} = 42;`);
}

// 無限ループになる例
set42("let a; while(true) a");
