export function restrict(target, template) {
  // targetのキーを列挙
  for (const key of Object.keys(target)) {
    // templateの独自プロパティに存在してなかったら消す
    if (!Object.prototype.hasOwnProperty.call(template, key)) {
      delete target[key];
    }
  }
  return target;
}
export function substract(target, ...sources) {
  // targetのキーを列挙
  for (const key of Object.keys(target)) {
    // sourceの独自プロパティに存在してたら消す
    for (const source of sources) {
      if (Object.prototype.hasOwnProperty.hasOwnProperty.call(source, key)) {
        delete target[key];
      }
    }
  }
  return target;
}
