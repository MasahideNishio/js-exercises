// index.test.js
import { sequenceToObject } from "./index";

describe("sequenceToObject", () => {
  test("空のケース", () => {
    expect(sequenceToObject()).toEqual({});
  });

  test("成功ケース(1つ)", () => {
    expect(sequenceToObject("a", 1)).toEqual({ a: 1 });
  });

  test("成功ケース(2つ)", () => {
    expect(sequenceToObject("a", 1, "b", 2)).toEqual({ a: 1, b: 2 });
  });
  test("成功ケース(3つ)", () => {
    expect(sequenceToObject("a", 1, "b", 2, "c", 3)).toEqual({
      a: 1,
      b: 2,
      c: 3,
    });
  });

  test("配列が奇数個", () => {
    expect(() => sequenceToObject("a", 1, "b")).toThrow(Error);
  });

  test("奇数番目が文字列じゃない", () => {
    expect(() => sequenceToObject(1, 2)).toThrow(Error);
    expect(() => sequenceToObject("a", 1, {}, 4)).toThrow(Error);
    expect(() => sequenceToObject("a", 1, "b", 2, null, 6)).toThrow(Error);
  });

  test("奇数番目がnullやundefined", () => {
    expect(() => sequenceToObject(undefined, 1)).toThrow(Error);
    expect(() => sequenceToObject(null, 1)).toThrow(Error);
  });
});
