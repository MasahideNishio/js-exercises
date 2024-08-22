// P363のfilter関数
function filter(iterable, predicate) {
  const iterator = iterable[Symbol.iterator]();
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      for (;;) {
        const v = iterator.next();
        if (v.done || predicate(v.value)) {
          return v;
        }
      }
    },
  };
}

// 呼ばれるたびに1大きな整数を返すジェネレーター
function* integers(start = 2) {
  let n = start;
  while (true) {
    yield n++;
  }
}

function* primes() {
  let it = integers(2); // 2から始まる整数ジェネレーター
  while (true) {
    const prime = it.next().value; // 最初の素数を取得
    yield prime; // 素数を出力
    it = filter(it, (n) => n % prime !== 0); // その素数の倍数をふるい落とす(割り切れない数値になるまで回す)
  }
}

// 動作確認
// 2
// 3
// 5
// 7
// 11
// 13
// 17
// 19
// 23
// 29

const primeGen = primes();
for (let i = 0; i < 10; i++) {
  console.log(primeGen.next().value);
}
