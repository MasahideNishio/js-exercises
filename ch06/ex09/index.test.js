import { jest } from "@jest/globals";
const mock = jest.fn(); // 新しいモックオブジェクトを作成
// 作成されたモックオブジェクトはmockプロパティをもち、
// 関数が呼び出された際の引数や結果を保持できるようになります。

const obj = {
  x: 0,
  y: 0,
  sum() {
    mock();
    return this.x + this.y;
  },
};

// ここに１行のコードを書く
obj.toJSON = function () {
  return { x: this.x, y: this.y, sum: this.sum() };
};
obj.x = 1;
obj.y = 2;

test("これを書かないとJestで実行できなかったので追加", () => {
  expect(JSON.stringify(obj)).toBe(`{"x":1,"y":2,"sum":3}`);
  expect(mock).toHaveBeenCalled(); // 呼ばれたかを確認している
});
