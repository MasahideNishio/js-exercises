export class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  distance() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  add(p) {
    if (p instanceof Point) {
      this.x += p.x;
      this.y += p.y;
    }
  }
}
