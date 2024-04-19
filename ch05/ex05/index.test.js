import { removeOddProp } from "./index.js";
const testCases = [
  [{}, {}],
  [
    { a: 0, b: 1, c: 2 },
    { a: 0, c: 2 },
  ],
  [{ a: 1, b: 3, c: 5 }, {}],
  [
    { a: 2, b: 4, c: 6 },
    { a: 2, b: 4, c: 6 },
  ],
  [{ a: "1", b: "2", c: "3" }, {}], // 数値文字列の場合は数値じゃないと判断する
  [{ a: "a", b: 2 }, { b: 2 }],
  [{ a: undefined, b: null, c: 2 }, { c: 2 }],
];

describe("removeOddProp Test", () => {
  it.each(testCases)("input : %s, expect : %s", (inputObj, expectedObj) => {
    expect(removeOddProp(inputObj)).toEqual(expectedObj);
  });
});
