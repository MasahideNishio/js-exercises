import { C } from "./index.js"; // ts でも可

test("", () => {
  const c = new C();
  expect(c.x).toBe(0);
  expect(c.x).toBe(1);
  expect(c.x).toBe(2);
  expect(c.x).toBe(3);
  expect(c.x).toBe(4);
  expect(c.x).toBe(5);
  expect(c.x).toBe(6);
  expect(c.x).toBe(7);
});
