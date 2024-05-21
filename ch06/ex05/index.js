const parent = {
  moji1: "同名",
  moji2: "同名じゃない",
  kazu1: 123,
  kazu2: 345,
  rekkyo: "OK",
};
const child = Object.create(parent);
child.moji1 = "かぶった"; // プロトタイプと同名
child.moji3 = "かぶってない"; // プロトタイプと同名じゃない
child.kazu1 = 777; // プロトタイプと同名
child.kazu3 = 888; // プロトタイプと同名じゃない
Object.defineProperty(child, "rekkyo", {
  value: "NG",
  enumerable: false, // 列挙不可のプロパティ
});
for (const prop in child) {
  console.log("property : ", prop, "value : ", child[prop]);
}

// 実行結果
// 独自プロパティの定義順→継承プロパティの定義順の順番(独自プロパティに同名があれば継承プロパティは表示されない。
// また、同名で独自プロパティで列挙不可に設定したプロパティは継承プロパティが列挙可でもあっても表示されない
// property :  moji1 value :  かぶった
// property :  moji3 value :  かぶってない
// property :  kazu1 value :  777
// property :  kazu3 value :  888
// property :  moji2 value :  同名じゃない
// property :  kazu2 value :  345
