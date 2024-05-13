import { sumMatrix, subMatrix } from "./index.js";

describe("Matrix Test", () => {
  describe("sumMatrix", () => {
    const testCases = [
      // 正常系
      {
        m1: [
          [1, 2],
          [3, 4],
        ],
        m2: [
          [1, 1],
          [1, 1],
        ],
        expected: [
          [2, 3],
          [4, 5],
        ],
      },
      // サイズが違う
      {
        m1: [
          [1, 2],
          [3, 4],
        ],
        m2: [[1, 1]],
        expected: undefined,
      },
      // 配列じゃない
      {
        m1: [
          [1, 2],
          [3, 4],
        ],
        m2: "invalid",
        expected: undefined,
      },
      {
        m1: [
          [1, 2, 3, 4],
          [5, 6, 7, 8],
          [9, 10, 11, 12],
          [13, 14, 15, 16],
        ],
        m2: [
          [1, 1, 1, 1],
          [1, 1, 1, 1],
          [1, 1, 1, 1],
          [1, 1, 1, 1],
        ],
        expected: [
          [2, 3, 4, 5],
          [6, 7, 8, 9],
          [10, 11, 12, 13],
          [14, 15, 16, 17],
        ],
      },
    ];

    it.each(testCases)("行列の足し算が行われる", ({ m1, m2, expected }) => {
      expect(sumMatrix(m1, m2)).toEqual(expected);
    });
  });

  describe("subMatrix", () => {
    const testCases = [
      // 正常系
      {
        m1: [
          [1, 2],
          [3, 4],
        ],
        m2: [
          [1, 1],
          [1, 1],
        ],
        expected: [
          [0, 1],
          [2, 3],
        ],
      },
      // サイズが違う
      {
        m1: [
          [1, 2],
          [3, 4],
        ],
        m2: [[1, 1]],
        expected: undefined, // 例外が発生するため、undefinedが返される
      },
      // 配列じゃない
      {
        m1: [
          [1, 2],
          [3, 4],
        ],
        m2: "invalid", // 不正な入力
        expected: undefined, // 例外が発生するため、undefinedが返される
      },
      // 大きな行列
      {
        m1: [
          [10, 20, 30, 40],
          [50, 60, 70, 80],
          [90, 100, 110, 120],
          [130, 140, 150, 160],
        ],
        m2: [
          [1, 1, 1, 1],
          [1, 1, 1, 1],
          [1, 1, 1, 1],
          [1, 1, 1, 1],
        ],
        expected: [
          [9, 19, 29, 39],
          [49, 59, 69, 79],
          [89, 99, 109, 119],
          [129, 139, 149, 159],
        ],
      },
    ];

    it.each(testCases)("行列の引き算が行われる", ({ m1, m2, expected }) => {
      expect(subMatrix(m1, m2)).toEqual(expected);
    });
  });
});
