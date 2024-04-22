function measureTimeWith() {
  const startTime = performance.now();
  const obj = { prop: 0 };
  with (obj) {
    for (let i = 0; i < 10000; i++) {
      prop = i;
    }
  }
  return performance.now() - startTime;
}
function measureTimeNoWith() {
  const startTime = performance.now();
  const obj = { prop: 0 };
  for (let i = 0; i < 10000; i++) {
    obj.prop = i;
  }
  return performance.now() - startTime;
}

// withを使ったほうが約14倍くらいかかる
console.log("withを使った場合 : ", measureTimeWith()); // withを使った場合 :  1.2999999998137355
console.log("withを使わない場合 : ", measureTimeNoWith()); // withを使わない場合 :  0.09999999962747097
