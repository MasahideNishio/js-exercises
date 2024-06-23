import { TypedMap } from "./index.js"; // ts でも可

describe("TypedMap", () => {
  describe("成功ケース", () => {
    it("正しい型のエントリで初期化できる", () => {
      const map = new TypedMap("string", "number", [
        ["a", 1],
        ["b", 2],
      ]);
      expect(map.map.get("a")).toBe(1);
      expect(map.map.get("b")).toBe(2);
    });

    it("正しい型のキーと値でセットできる", () => {
      const map = new TypedMap("string", "number");
      map.set("a", 1);
      expect(map.map.get("a")).toBe(1);
    });
  });

  describe("例外ケース", () => {
    it("間違った型のエントリで初期化しようとするとエラーがスローされる", () => {
      expect(() => {
        new TypedMap("string", "number", [["a", "wrong"]]);
      }).toThrow(TypeError);
    });

    it("間違った型のキーをセットしようとするとエラーがスローされる", () => {
      const map = new TypedMap("string", "number");
      expect(() => {
        map.set(1, 1);
      }).toThrow(TypeError);
    });

    it("間違った型の値をセットしようとするとエラーがスローされる", () => {
      const map = new TypedMap("string", "number");
      expect(() => {
        map.set("a", "wrong");
      }).toThrow(TypeError);
    });
  });
});
