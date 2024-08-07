// N 回何もしないループの時間を返す
function costOfLoop(N) {
  const start = performance.now();
  console.log("costOfLoop : start" + start);
  for (let i = 0; i < N; i++) {}
  const end = performance.now();
  console.log("costOfLoop : end" + end);
  return end - start;
}

// N 回 "Hello".length を実行 + N 回何もしないループの時間を返す
function costOfLengthPlusLoop(N) {
  const str = "Hello";
  let res = 0;
  const start = performance.now();
  console.log("costOfLengthPlusLoop : start" + start);
  for (let i = 0; i < N; i++) {
    res = str.length;
  }
  const end = performance.now();
  console.log("costOfLengthPlusLoop : end" + end);

  if (res !== 5) {
    throw new Error("something is wrong");
  }
  return end - start;
}

// "Hello".length 1回あたりの時間を返す
function costOfLength(N) {
  const lhs = costOfLengthPlusLoop(N);
  const rhs = costOfLoop(N);
  return (lhs - rhs) / N;
}

// 以下を変更して実験しなさい
console.log(costOfLength(100));
console.log(costOfLength(1000000000));
