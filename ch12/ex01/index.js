function counterIter(max) {
  console.log("counterIter");
  let c = 1;
  return {
    [Symbol.iterator]() {
      console.log("counterIter: Symbol.iterator");
      return this;
    },
    next() {
      console.log("counterIter: next");
      if (c >= max + 1) {
        return { value: undefined, done: true };
      }
      const value = c;
      c++;
      return { value, done: false };
    },
    return(value) {
      console.log("counterIter: return:", value);
      return { value, done: true };
    },
    throw(e) {
      console.log("counterIter: throw:", e);
      throw e;
    },
  };
}

function* counterGen(max) {
  console.log("counterGen");
  try {
    for (let c = 1; c <= max; c++) {
      console.log("counterGen: next");
      yield c;
    }
  } catch (e) {
    console.log("counterGen: catch:", e);
  } finally {
    console.log("counterGen: finally");
  }
}

// 明示的にイテレータインタフェース のメソッドを呼んだり、間接的に呼んだりする
console.log("明示的な呼び出し");
const iter = counterIter(3);
console.log(iter.next()); // {value: 1, done: false}
console.log(iter.next()); // {value: 2, done: false}
console.log(iter.next()); // {value: 3, done: false}
console.log(iter.next()); // {value: undefined, done: true}

const iterForLoop = counterIter(3);
console.log("間接的呼び出し(for ... of)");
for (const value of iterForLoop) {
  console.log(value); // 1, 2, 3
}

// ジェネレータ関数によって生成されたオブジェクトがイテレータインタフェースを満たしていることを確認する
console.log("明示的な呼び出し");
const gen1 = counterGen(3);
console.log(gen1.next()); // {value: 1, done: false}
console.log(gen1.next()); // {value: 2, done: false}
console.log(gen1.next()); // {value: 3, done: false}
console.log(gen1.next()); // { value: undefined, done: true }

console.log("間接的呼び出し(for ... of)");
const genForLoop = counterGen(3);
for (const value of genForLoop) {
  console.log(value); // 1, 2, 3
}

// return() や throw() がどのようなときに呼ばれるのか確認する

console.log("for...of ループで途中で break してジェネレータを終了させる");
const gen2 = counterGen(5);
for (const value of gen2) {
  console.log(value);
  if (value === 2) {
    break; // ループを中断 → return() が呼ばれる
  }
}

const iter2 = counterIter(5);

try {
  for (const value of iter2) {
    console.log(value);
    if (value === 3) {
      // イテレータ内で例外が発生したとき、自動的に throw() が呼ばれる
      throw new Error("Loop error at value 3!");
    }
  }
} catch (e) {
  console.log("キャッチされた例外:", e.message); // throw() から発生した例外をキャッチ
}

// ジェネレータ関数の中身がどのタイミングで初めて実行されるか確認する
console.log("ジェネレータ関数呼び出し確認1");
const gen3 = counterGen(3);
console.log("ジェネレータ関数呼び出し確認2");

console.log(gen3.next()); // この呼び出し時に実行される
console.log("ジェネレータ関数呼び出し確認3");
