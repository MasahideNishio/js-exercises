import { instanceOf } from "./index.js"; // ts でも可

class Grandma {
  constructor() {}
}
class Mother extends Grandma {}
class Child extends Mother {} // Me
class Aunt extends Grandma {}
class Cassin extends Aunt {}
class Father {}
describe("instanceOf", () => {
  // テストケースを定義
  const testCases = [
    { object: new Grandma(), constructor: Grandma, expected: true }, // 自分自身
    { object: new Mother(), constructor: Grandma, expected: true }, // 一段継承
    { object: new Child(), constructor: Grandma, expected: true }, // 二段継承
    { object: new Cassin(), constructor: Grandma, expected: true }, // 二段継承2
    { object: new Cassin(), constructor: Mother, expected: false }, // 継承関係なし
    { object: new Father(), constructor: Grandma, expected: false }, // 継承関係なし2
    { object: null, constructor: Grandma, expected: false }, // 例外ケース
    { object: new Grandma(), constructor: undefined, expected: false }, // 例外ケース
  ];

  // テストケースを実行
  it.each(testCases)("%s", ({ object, constructor, expected }) => {
    expect(instanceOf(object, constructor)).toBe(expected);
  });
});
