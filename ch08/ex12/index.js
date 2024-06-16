function f(baseFunc) {
  const args = []; // $1～$10を引数リストとして先に用意しておく(使わない部分もある)
  for (let i = 1; i <= 10; i++) {
    args.push("$" + i);
  }
  return new Function(...args, "return " + baseFunc); // Functionコンストラクタの第二引数に渡すことで、baseFuncを実行してreturnするようにする。
}

const arr = [2, 5, 3, 9, 1, 8, 5, 2, 10, 0];
console.log(arr.reduce(f("$1 + $2"), 0)); // 45
console.log(arr.sort(f("$1 - $2"))); // [  0, 1, 2, 2,  3,  5, 5, 8, 9, 10]
