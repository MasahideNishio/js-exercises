import { areEqual } from "./index.js";
describe("areEqual", () => {
  it("0.3-0.2と0.1", () => {
    expect(areEqual(0.3 - 0.2, 0.1)).toBe(true);
  });
  it("0.2-0.1と0.1", () => {
    expect(areEqual(0.2 - 0.1, 0.1)).toBe(true);
  });
  it("0.2-0.1と0.3-0.2", () => {
    expect(areEqual(0.2 - 0.1, 0.3 - 0.2)).toBe(true);
  });
  it("0.1と0.1 + 2e-10", () => {
    expect(areEqual(0.1, 0.1 + 2e-10)).toBe(false);
  });
  it("0.1と0.1 + 1e-10", () => {
    expect(areEqual(0.1, 0.1 + 1e-10)).toBe(true);
  });
});
