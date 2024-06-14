export function sequenceToObject(...values) {
  if (
    values.length % 2 !== 0 || // 引数が偶数個じゃない場合
    values.filter((x, i) => i % 2 === 0).some((x) => typeof x !== "string") // 奇数番目が文字列じゃないの１つ以上ある場合
  ) {
    throw new Error();
  }
  return values.reduce((result, value, index) => {
    if (index % 2 === 0) {
      // 配列を1つずつ見て、奇数番目 : 偶数番目のプロパティを足す
      result[value] = values[index + 1];
    }
    return result;
  }, {}); // 初期値として空のオブジェクトをいれる
}
