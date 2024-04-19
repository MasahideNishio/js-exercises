import { escapeStringIfElse, escapeStringSwitch } from "./index.js";
const testCases = [
  ["", ""],
  ["Hello, world!", "Hello, world!"],
  ["Hello\nworld!", "Hello\\nworld!"],
  ["Hello\rworld!", "Hello\\rworld!"],
  ["Hello\tworld!", "Hello\\tworld!"],
  ["Hello\bworld!", "Hello\\bworld!"],
  ["Hello\fworld!", "Hello\\fworld!"],
  ["Hello\\world!", "Hello\\\\world!"],
  ["Hello'world!", "Hello\\'world!"],
  ['Hello"world!', 'Hello\\"world!'],
  ["\\n\\t\\r\\b\\f\\'\\\"", "\\\\n\\\\t\\\\r\\\\b\\\\f\\\\\\'\\\\\\\""],
];
describe("escapeStringIfElse Test", () => {
  it.each(testCases)("input : %s, expected : %s", (inputStr, expectedStr) => {
    expect(escapeStringIfElse(inputStr)).toEqual(expectedStr);
  });
});
describe("escapeStringSwitch Test", () => {
  it.each(testCases)("input : %s, expected : %s", (inputStr, expectedStr) => {
    expect(escapeStringSwitch(inputStr)).toEqual(expectedStr);
  });
});
