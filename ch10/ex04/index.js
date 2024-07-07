// import { Counter } from "./count.js";
// const counter = new Counter();
// console.log(counter.increment());
// console.log(counter.increment());
// console.log(counter.increment());

// デフォルトエクスポート
// import Counter from "./count.js";
// const counter = new Counter();
// console.log(counter.increment());
// console.log(counter.increment());
// console.log(counter.increment());

// 名前変更を伴うインポート
// import { Counter as CjsCounter } from "./count.cjs";
// const counter = new CjsCounter();
// console.log(counter.increment()); // 0 (初回のカウント)
// console.log(counter.increment()); // 1
// console.log(counter.increment()); // 2

// 再エクスポート
import { Counter } from "./count.cjs";
export { Counter };
