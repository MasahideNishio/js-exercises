import { add, sub, mul, div } from "./index.js";
describe("complex test", () => {
  it.each([
    [
      { real: 0, imaginary: 0 },
      { real: 1, imaginary: 1 },
      { real: 1, imaginary: 1 },
    ],
    [
      { real: 1, imaginary: 1 },
      { real: 1, imaginary: 1 },
      { real: 2, imaginary: 2 },
    ],
    [
      { real: 0, imaginary: 0 },
      { real: 0, imaginary: 0 },
      { real: 0, imaginary: 0 },
    ],
    [
      { real: Infinity, imaginary: Infinity },
      { real: 1, imaginary: 1 },
      { real: Infinity, imaginary: Infinity },
    ],
    [
      { real: NaN, imaginary: NaN },
      { real: 1, imaginary: 1 },
      { real: NaN, imaginary: NaN },
    ],
    [{ real: null, imaginary: null }, { real: 1, imaginary: 1 }, NaN],
  ])("%s + %s = %s", (obj1, obj2, ans) => {
    expect(add(obj1, obj2)).toEqual(ans);
  });
  it.each([
    [
      { real: 0, imaginary: 0 },
      { real: 1, imaginary: 1 },
      { real: -1, imaginary: -1 },
    ],
    [
      { real: 2, imaginary: 2 },
      { real: 1, imaginary: 1 },
      { real: 1, imaginary: 1 },
    ],
    [
      { real: 0, imaginary: 0 },
      { real: 0, imaginary: 0 },
      { real: 0, imaginary: 0 },
    ],
    [
      { real: Infinity, imaginary: Infinity },
      { real: Infinity, imaginary: Infinity },
      { real: NaN, imaginary: NaN },
    ],
    [
      { real: NaN, imaginary: NaN },
      { real: 1, imaginary: 1 },
      { real: NaN, imaginary: NaN },
    ],
    [{ real: null, imaginary: null }, { real: 1, imaginary: 1 }, undefined],
  ])("%s - %s = %s", (obj1, obj2, ans) => {
    expect(sub(obj1, obj2)).toEqual(ans);
  });
  it.each([
    [
      { real: 0, imaginary: 0 },
      { real: 1, imaginary: 1 },
      { real: 0, imaginary: 0 },
    ],
    [
      { real: 1, imaginary: 1 },
      { real: 1, imaginary: 1 },
      { real: 1, imaginary: 1 },
    ],
    [
      { real: 0, imaginary: 0 },
      { real: 0, imaginary: 0 },
      { real: 0, imaginary: 0 },
    ],
    [
      { real: Infinity, imaginary: Infinity },
      { real: Infinity, imaginary: Infinity },
      { real: Infinity, imaginary: Infinity },
    ],
    [
      { real: NaN, imaginary: NaN },
      { real: 1, imaginary: 1 },
      { real: NaN, imaginary: NaN },
    ],
    [{ real: null, imaginary: null }, { real: 1, imaginary: 1 }, undefined],
  ])("%s * %s = %s", (obj1, obj2, ans) => {
    expect(mul(obj1, obj2)).toEqual(ans);
  });
  it.each([
    [
      { real: 0, imaginary: 0 },
      { real: 1, imaginary: 1 },
      { real: 0, imaginary: 0 },
    ],
    [
      { real: 1, imaginary: 1 },
      { real: 1, imaginary: 1 },
      { real: 1, imaginary: 1 },
    ],
    [
      { real: 0, imaginary: 0 },
      { real: 0, imaginary: 0 },
      { real: NaN, imaginary: NaN },
    ],
    [
      { real: Infinity, imaginary: Infinity },
      { real: 1, imaginary: 1 },
      { real: Infinity, imaginary: Infinity },
    ],
    [
      { real: NaN, imaginary: NaN },
      { real: 1, imaginary: 1 },
      { real: NaN, imaginary: NaN },
    ],
    [{ real: null, imaginary: null }, { real: 1, imaginary: 1 }, undefined],
  ])("%s / %s = %s", (obj1, obj2, ans) => {
    expect(div(obj1, obj2)).toEqual(ans);
  });
});
