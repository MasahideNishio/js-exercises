export class C {
  constructor() {
    this.count = 0;
  }
  get x() {
    return this.count++;
  }
}
