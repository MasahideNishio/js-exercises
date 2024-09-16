export class IgnoreAccentPattern {
  constructor(pattern) {
    // パターンがRegExpの場合と文字列の場合の処理
    if (pattern instanceof RegExp) {
      this.pattern = new RegExp(
        this.normalizeString(pattern.source),
        pattern.flags
      );
    } else {
      this.pattern = new RegExp(this.normalizeString(pattern), "g");
    }
  }

  // Unicode正規化してダイアクリティカルマークを削除する関数
  normalizeString(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  // [Symbol.search]メソッドのオーバーライド
  [Symbol.search](str) {
    const normalizedStr = this.normalizeString(str); // ダイアクリティカルマークを削除
    return normalizedStr.search(this.pattern);
  }

  // [Symbol.match]メソッドのオーバーライド
  [Symbol.match](str) {
    const normalizedStr = this.normalizeString(str); // ダイアクリティカルマークを削除
    const matchResult = normalizedStr.match(this.pattern);

    // matchの結果がnullの場合はそのままnullを返す
    if (!matchResult) return null;

    // matchの結果を配列として返す
    return Array.isArray(matchResult) ? matchResult : [matchResult];
  }
}
