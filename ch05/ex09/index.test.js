import { JSONParse } from "./index.js";
const testCases = [
  // 空の文字列
  { input: "", expected: { success: false } },
  // 空白文字列
  { input: "   ", expected: { success: false } },
  // 正しい JSON 文字列
  {
    input: '{"key": "value"}',
    expected: { success: true, data: { key: "value" } },
  },
  // 不正な JSON 文字列
  { input: '{"key": "value"}invalid', expected: { success: false } },
];

describe("JSONParse Test", () => {
  it.each(testCases)("input : %s, expected : %s", ({ input, expected }) => {
    const result = JSONParse(input);
    console.log(JSON.stringify(result));
    if (expected.success) {
      expect(result.success).toBe(true);
      expect(result.data).toEqual(expected.data);
    } else {
      expect(result.success).toBe(false);
      expect(result).toHaveProperty("error"); // errorの文言はわからないのでプロパティがあればOKとした
    }
  });
});
