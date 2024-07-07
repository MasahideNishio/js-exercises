export class Counter {
  // デフォルトエクスポート方式
  // export default class Counter {
  constructor() {
    this.count = 0;
  }
  increment() {
    return this.count++;
  }
}
