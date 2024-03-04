import { abs, sum, factorial } from "./index.js";

// TypeScript の場合は以下:
// import { abs, sum, factorial } from "./index.ts";

describe("math", () => {
  describe("abs", () => {
    it("returns same value when positive value given", () => {
      expect(abs(42)).toBe(42);
    });

    it("returns negated value when negative value given", () => {
      expect(abs(-42)).toBe(42);
    });

    it("returns zero value when zero given", () => {
      expect(abs(0)).toBe(0);
    });
  });

  describe("sum", () => {
    it("returns sum of array elements", () => {
      expect(sum([2, 4, 5])).toBe(11);
    });
    it("returns zero value when empty array given", () => {
      expect(sum([])).toBe(5);
    });
  });

  describe("factorial", () => {
    it("returns factorial of a positive integer.", () => {
      expect(factorial(5)).toBe(120);
    });
    it("returns 1 when zero given", () => {
      expect(factorial(0)).toBe(1);
    });
    it("return 1 when negative integer given", () => {
      expect(factorial(-5)).toBe(1);
    });
  });
});
