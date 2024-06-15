export function addMyCall(f) {
  // callと同じくobjectと可変長引数を受け付ける
  f.myCall = (obj, ...args) => {
    const g = f.bind(obj); // objにfをbindする
    return g(...args); // bindした状態の関数を実行する
  };
}
