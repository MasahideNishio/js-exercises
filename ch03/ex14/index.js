function isObject(input) {
  return typeof input === "object";
}

function convertObjToPrimitiveNumericalPriority(obj) {
  if (null === obj) {
    return Number(null);
  }
  if (isNaN(obj.valueOf())) {
    // obj.valueOf()の結果がundefinedの場合はundefinedを返す
    if (obj.valueOf() === undefined) {
      return undefined;
    }
    return obj.toString();
  } else {
    return obj.valueOf();
  }
}

function convertObjToPrimitiveNonPriority(obj) {
  // 日付型の場合は文字列優先
  if (Object.prototype.toString.call(obj) === "[object Date]") {
    return obj.toString() || obj.valueOf();
  } else {
    // 日付型以外は数値優先
    return convertObjToPrimitiveNumericalPriority(obj);
  }
}

export function eq(a, b) {
  // 厳密等価
  if (a === b) {
    return true;
  }

  // 片方がnullまたはundefinedで、もう片方もnullまたはundefinedならtrueを返す
  if ((a === null || a === undefined) && (b === null || b === undefined)) {
    return true;
  }

  // 片方がnullまたはundefinedならfalseを返す
  if (a === null || a === undefined || b === null || b === undefined) {
    return false;
  }

  // Object同士なら厳密等価の結果
  const isObjectA = isObject(a);
  const isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    return a === b;
  }

  // 片方がObjectなら変換して比較
  if (isObjectA || isObjectB) {
    const convA = isObjectA ? convertObjToPrimitiveNonPriority(a) : a;
    const convB = isObjectB ? convertObjToPrimitiveNonPriority(b) : b;
    return convA === convB || Number(convA) === Number(convB);
  }

  // 基本型同士なら数値にして比較
  return Number(a) === Number(b);
}

export function lte(a, b) {
  // 厳密等価であれば true
  if (a === b) {
    return true;
  }

  // 片方がオブジェクトなら変換して比較
  const isObjectA = isObject(a);
  const isObjectB = isObject(b);
  if (isObjectA || isObjectB) {
    const convA = isObjectA ? convertObjToPrimitiveNumericalPriority(a) : a;
    const convB = isObjectB ? convertObjToPrimitiveNumericalPriority(b) : b;
    return convA < convB || eq(convA, convB);
  }

  // どちらも基本型の場合は < 演算子を使って比較
  return a < b || eq(a, b);
}
