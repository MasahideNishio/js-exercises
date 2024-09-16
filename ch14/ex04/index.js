export class HiraganaChar {
  constructor(char) {
    if (!char || char.length !== 1 || !/[ぁ-ん]/.test(char)) {
      throw new Error("ひらがな１文字を入力してください");
    }
    this.char = char; // ひらがな１文字
    this.utf16Code = char.charCodeAt(0); // そのUTF-16コード
  }

  [Symbol.toPrimitive](hint) {
    if (hint === "number") {
      return this.utf16Code;
    } else if (hint === "string") {
      return this.char;
    } else {
      return this.char; // デフォルトで文字を返す
    }
  }
}
