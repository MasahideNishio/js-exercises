"use strict";

// エラーになる(SyntaxError: Duplicate parameter name not allowed in this context)
function hoge(a, a) {
  console.log(a);
}
hoge(1, 2);
