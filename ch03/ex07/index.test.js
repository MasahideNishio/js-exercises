import { equalArrays } from "./index.js";
describe("equal array test", () => {
  it("数値の場合lengthがなくforループに入らないためreturn trueに到達してしまう", () => {
    expect(equalArrays(123, 45)).toBe(true);
  });
});
