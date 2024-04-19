import { isHolidayIfElse, isHolidaySwitch } from "./index.js";
const testCases = [
  ["月", false],
  ["火", false],
  ["水", false],
  ["木", false],
  ["金", false],
  ["土", true],
  ["日", true],
  ["日月", false],
  ["あ", false],
  ["", false],
];
describe("isHolidayIfElse Test", () => {
  it.each(testCases)("%s", (testDay, expected) => {
    expect(isHolidayIfElse(testDay)).toEqual(expected);
  });
});

describe("isHolidayIfSwitch Test", () => {
  it.each(testCases)("%s", (testDay, expected) => {
    expect(isHolidaySwitch(testDay)).toEqual(expected);
  });
});
