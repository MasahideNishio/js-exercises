function* resettableCounter() {
  let count = 0;

  while (true) {
    try {
      count++;
      yield count;
    } catch (e) {
      // throw()が呼ばれたらリセット
      count = 0;
      // 次に呼び出される際、リセットされた値からカウントを再開する
      yield count;
    }
  }
}

// 動作確認
const counter = resettableCounter();

console.log(counter.next().value); // 1
console.log(counter.next().value); // 2
console.log(counter.next().value); // 3
counter.throw();

console.log(counter.next().value); // 1
