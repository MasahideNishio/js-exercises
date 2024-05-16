import { bubbleSort } from "./index.js";

describe("Bubble Sort", () => {
  it.each([
    { input: [], expected: [] },
    { input: [2, 1], expected: [1, 2] },
    { input: [1, 5, 2], expected: [1, 2, 5] },
    { input: [3, 10, 5, 7, 4, 1, 9], expected: [1, 3, 4, 5, 7, 9, 10] },
    { input: ["abc", "bcd", "adb"], expected: ["abc", "adb", "bcd"] },
  ])("昇順", ({ input, expected }) => {
    bubbleSort(input);
    expect(input).toEqual(expected);
  });
  it.each([
    { input: [], expected: [] },
    { input: [1, 2], expected: [2, 1] },
    { input: [1, 5, 2], expected: [5, 2, 1] },
    { input: [3, 10, 5, 7, 4, 1, 9], expected: [10, 9, 7, 5, 4, 3, 1] },
  ])("降順(数値)", ({ input, expected }) => {
    bubbleSort(input, (a, b) => b - a);
    expect(input).toEqual(expected);
  });
  it.each([{ input: ["abc", "bcd", "adb"], expected: ["bcd", "adb", "abc"] }])(
    "降順(文字列)",
    ({ input, expected }) => {
      bubbleSort(input, (a, b) => {
        const aLower = a.toLowerCase();
        const bLower = b.toLowerCase();
        if (aLower < bLower) return 1;
        if (aLower > bLower) return -1;
        return 0;
      });
      expect(input).toEqual(expected);
    }
  );
});
