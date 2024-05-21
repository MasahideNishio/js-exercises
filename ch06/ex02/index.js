const hoge = { fuga: "abc" };
const foo = Object.create(hoge);

console.log(hoge === Object.getPrototypeOf(foo)); // true

// 値が同じか
console.log(JSON.stringify(hoge));
console.log(JSON.stringify(Object.getPrototypeOf(foo)));
