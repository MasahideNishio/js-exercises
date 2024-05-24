import { assign } from "./index.js";
const testCases = [
  { target: {}, sources: [{}] },
  { target: { x: 1 }, sources: [{ y: 2, z: 3 }, { hoge: "fuga" }] }, // sourcesが複数ある場合
  {
    // sourcesが複数あり、同名の独自プロパティがある場合
    target: { x: 1 },
    sources: [
      { x: 15, y: 2, z: 3 },
      { x: 30, a: 10 },
    ],
  },
  {
    // Symbolのケース
    target: {},
    sources: [
      { [Symbol("sym1")]: "value1" },
      { [Symbol("sym2")]: "value2", y: 11 },
    ],
  },
  {
    target: { [Symbol("sym0")]: "value0" },
    sources: [
      { [Symbol("sym1")]: "value1" },
      { [Symbol("sym2")]: "value2", y: 11 },
    ],
  },
];

describe("Object Assign Test", () => {
  it.each(testCases)("case : %j", ({ target, sources }) => {
    // 比較用にコピー
    const targetCopy = {};
    Object.assign(targetCopy, target);
    // テスト実施
    assign(target, sources);
    Object.assign(targetCopy, sources);
    // 結果確認
    expect(target).toEqual(targetCopy);
  });
});
