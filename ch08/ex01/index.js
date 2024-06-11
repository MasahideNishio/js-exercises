// 引数は2つあるので()が必要
export const repeatChar = (n, c) => {
  if (typeof n !== "number" || n < 0 || typeof c !== "string") {
    throw new Error("Invalid");
  }
  const retval = new Array(n).fill(c);
  for (let i = 0; i < n; i++) {
    console.log(c);
  }
  return retval;
}; // 関数本体がreturn文だけではないので中括弧が必要

// 簡素化のため例外処理は省略
export const square = (x) => x * x; // 引数が1つだけなので()は不要。戻り値もreturn文だけなので{}なし、returnも省略。

export const getNow = () => ({ now: new Date() }); // 引数なしなので()は必要。戻り値はオブジェクトなので()でくくる
