// 通常方式
class Counter {
  constructor() {
    this.count = 0;
  }
  increment() {
    return this.count++;
  }
}
module.exports = Counter;

// デフォルトエクスポート
// class Counter {
//   constructor() {
//     this.count = 0;
//   }

//   increment() {
//     return this.count++;
//   }
// }

// module.exports = Counter;
