//Unwritable and unconfigurable object
export function unwritableAndUnconfigurableObj() {
  const obj = {};
  Object.defineProperty(obj, "a", {
    value: 1,
    writable: false, // 書き込み不可
    configurable: false, // 削除や再定義不可
    enumerable: true,
  });
  return obj;
}

// Writable and unconfigurable object
export function writableAndUnconfigurableObj() {
  const obj = {};
  Object.defineProperty(obj, "b", {
    value: 2,
    writable: true, // 書き込み可能
    configurable: false, // 削除や再定義不可
    enumerable: true,
  });
  return obj;
}

// Nested unwritable object
export function nestedUnwritableObj() {
  const obj = {
    c: {
      d: {
        e: 3,
      },
    },
  };
  return nestFreeze(obj); // 再帰的にFreezeする
}

function nestFreeze(obj) {
  // まず全てのプロパティを取得
  Object.keys(obj).forEach((key) => {
    const value = obj[key];

    // ネストされたオブジェクトの場合、再帰的にfreezeを適用
    if (typeof value === "object" && value !== null) {
      nestFreeze(value);
    }
  });

  // 最後にオブジェクト自体をfreeze
  return Object.freeze(obj);
}
