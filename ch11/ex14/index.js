// 日本語文字列の配列を受け取り、文字列中の大文字・小文字("つ"と"っ"等)、濁点・半濁点("は"と"ば"と"ば"等)の違いを無視してソートする sortJapanese 関数
export function sortJapanese(arr) {
  // Collator.compareを使う。sensitivity : baseを指定することで大文字・小文字を無視する
  return arr.sort(new Intl.Collator("ja-JP", { sensitivity: "base" }).compare);
}
// Date オブジェクトを受け取り、令和6年4月2日 のように (和暦)y年m月d日 のフォーマットで日付の文字列を返す toJapaneseDateString 関数
export function toJapaneseDateString(date) {
  // localeにja-JP-u-ca-japaneseを指定し、dateStyleをlongにすることで期待するフォーマットになる
  return new Intl.DateTimeFormat("ja-JP-u-ca-japanese", {
    dateStyle: "long",
  }).format(date);
}
