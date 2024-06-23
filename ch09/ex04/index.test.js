import { Warrior1, MagicWarrior1, Warrior2, MagicWarrior2 } from "./index.js"; // ts でも可

test("Warrior Test1", () => {
  const wr = new Warrior1(10);
  expect(wr.atk).toBe(10);
  expect(wr.attack()).toBe(20);
  const mw = new MagicWarrior1(100, 200);
  expect(mw.atk).toBe(100);
  expect(mw.mgc).toBe(200);
  expect(mw.attack()).toBe(400);
});

test("Warrior Test2", () => {
  const wr = new Warrior2(10);
  expect(wr.atk).toBe(10);
  expect(wr.attack()).toBe(20);
  const mw = new MagicWarrior2(100, 200);
  expect(mw.atk).toBe(100);
  expect(mw.mgc).toBe(200);
  expect(mw.attack()).toBe(400);
});
