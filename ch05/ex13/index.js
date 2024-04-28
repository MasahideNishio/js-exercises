const NUM_MAX = 10; // とりあえず5回までとする

// ロジックは5-4から持ってきた
export function* fibGen() {
  let prev = 0;
  let curr = 1;
  yield curr;
  for (let i = 2; i <= NUM_MAX; i++) {
    const newFib = prev + curr;
    prev = curr;
    curr = newFib;
    yield curr;
  }
}
