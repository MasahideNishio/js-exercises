export class MyArrayLike {
  constructor(length) {
    this.length = length; // 配列のようなクラスのために長さを持つ
  }

  // 配列のように動作するためにSymbol.iteratorを実装する
  [Symbol.iterator]() {
    let index = 0;
    return {
      next: () => {
        if (index < this.length) {
          return { value: this[index++], done: false };
        } else {
          return { done: true };
        }
      },
    };
  }
}

export class MyArray extends Array {
  constructor(items) {
    super(...items);
  }

  // Symbol.speciesをオーバーライドする
  static get [Symbol.species]() {
    return MyArrayLike;
  }
}
