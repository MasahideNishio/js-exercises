// f はオブジェクトを1つ引数に取る関数
function cache(f) {
  // この関数を実装する
  const weakMap = new WeakMap();
  return function (obj) {
    if (weakMap.has(obj)) {
      return weakMap.get(obj); // すでに登録済みならその結果を返す
    } else {
      const retval = f(obj);
      weakMap.set(obj, retval); // 登録されてなかったらfの結果を登録する
      return retval;
    }
  };
}

function slowFn(obj) {
  // 時間のかかる処理
  let sum = 0;
  for (let i = 0; i < 1000000000; i++) {
    sum++;
  }
  return { object: obj, sum: sum };
}

// cachedSlowFnを同じ引数で複数回呼び出すと、2回目以降はキャッシュが返る
const cachedSlowFn = cache(slowFn);
const testObj1 = { a: 1, b: 2 };
const testObj2 = { a: 3, b: 4 };
console.log(cachedSlowFn(testObj1)); // ここと
console.log(cachedSlowFn(testObj1));
console.log(cachedSlowFn(testObj1));
console.log(cachedSlowFn(testObj2)); // ここで遅くなる
console.log(cachedSlowFn(testObj1));
console.log(cachedSlowFn(testObj1));
console.log(cachedSlowFn(testObj2));
console.log(cachedSlowFn(testObj2));
