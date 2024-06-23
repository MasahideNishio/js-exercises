export function instanceOf(object, constructor) {
  if (!object || !constructor) {
    return false;
  }
  let proto = Object.getPrototypeOf(object); // プロトタイプを取得(継承元)
  // 継承元をたどる
  while (proto !== null && proto !== undefined) {
    if (proto === constructor.prototype) {
      // objectのプロトタイプがターゲットのprorotypeプロパティと同じならtrue
      return true;
    }
    proto = Object.getPrototypeOf(proto);
  }
  return false;
}
