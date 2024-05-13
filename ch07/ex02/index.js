function fizzbuzz(n) {
  [...new Array(n)].map((_, index) => {
    const i = index + 1;
    i % 15 === 0
      ? console.log("FizzBuzz")
      : i % 3 === 0
      ? console.log("Fizz")
      : i % 5 === 0
      ? console.log("Buzz")
      : console.log(i);
  }); // undefinedの配列に展開してから初期化(1から始まるように)
}
fizzbuzz(50);

function sumOfSquaredDifference_old(f, g) {
  let result = 0;
  for (let i = 0; i < f.length; i++) {
    result += (f[i] - g[i]) ** 2;
  }
  return result;
}
function sumOfSquaredDifference(f, g) {
  return f.map((_, i) => (f[i] - g[i]) ** 2).reduce((x, y) => x + y, 0); // mapでまず差の2乗を計算し、その結果の合計をreduceで計算
}
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
console.log("sumOfSquaredDifference");
console.log(
  "もともとの関数での結果 : ",
  sumOfSquaredDifference_old(arr1, arr2)
);
console.log("配列を使ったやり方", sumOfSquaredDifference(arr1, arr2));

function sumOfEvensIsLargerThan42_old(array) {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i] % 2 !== 0) {
      continue;
    }
    sum += array[i];
    if (sum >= 42) {
      return true;
    }
  }
  return false;
}
function sumOfEvensIsLargerThan42(array) {
  return array.filter((x) => x % 2 === 0).reduce((x, y) => x + y, 0) >= 42;
}
const arr3 = [10, 3, 20, 7, 5, 15]; // 42超えない
const arr4 = [10, 3, 20, 7, 30, 5, 15]; // 42超える
console.log("sumOfEvensIsLargerThan42");
console.log(arr3, "42超えない");
console.log("もともとの関数での結果 : ", sumOfEvensIsLargerThan42_old(arr3));
console.log("配列を使ったやり方", sumOfEvensIsLargerThan42(arr3));
console.log(arr4, "42超える");
console.log("もともとの関数での結果 : ", sumOfEvensIsLargerThan42_old(arr4));
console.log("配列を使ったやり方", sumOfEvensIsLargerThan42(arr4));
