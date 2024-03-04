import { Point } from "./index.js";
describe("point", () => {
  it("引数で渡したPointクラスの座標が加算される", () => {
    const p = new Point(2, 3);
    p.add(new Point(5, 6));
    expect(p.x).toBe(7);
    expect(p.y).toBe(9);
  });
  it("nullを渡したときは加算されない", () => {
    const p = new Point(2, 3);
    p.add(null);
    expect(p.x).toBe(2);
    expect(p.y).toBe(3);
  });
});
