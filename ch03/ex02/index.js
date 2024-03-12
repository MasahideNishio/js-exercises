console.log("最大値 :", Number.MAX_SAFE_INTEGER);
console.log("最小値 :", Number.MIN_SAFE_INTEGER);
console.log("最大値 + 1 :", Number.MAX_SAFE_INTEGER + 1);
console.log(
  "最大値 + 1 === 最大値 + 2 :",
  Number.MAX_SAFE_INTEGER + 1 === Number.MAX_SAFE_INTEGER + 2
); // true
console.log("最大値 + 1 : ", Number.MAX_SAFE_INTEGER + 1);
console.log("最大値 + 2 : ", Number.MAX_SAFE_INTEGER + 2);
console.log(
  "最大値に1を加えることでJavaScriptが正確に表せる整数範囲を1超えたことで、下位1ビットの精度が損なわれる。そのため、+1と+2の1の差は表現されなくなり誤差となりtrueになっている。"
);

console.log("最大値 + 3 : ", Number.MAX_SAFE_INTEGER + 3);
console.log(
  "最大値 + 1 === 最大値 + 3 :",
  Number.MAX_SAFE_INTEGER + 1 === Number.MAX_SAFE_INTEGER + 3
); // false
console.log(
  "最大値に3を加えると下位2ビット目が変わるため、1を加えた結果とは別の数値としてfalseで判定される"
);
