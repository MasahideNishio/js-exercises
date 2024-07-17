// リトルエンディアンからビッグエンディアンに変換する関数
function littleToBigEndian(littleEndianArray) {
  const littleEndianBytes = new Uint8Array(littleEndianArray.buffer); // バッファに変換
  const bigEndianBytes = new Uint8Array(littleEndianBytes.length); // 結果を入れるハコ

  // 32ビット整数のバイト順を変えるので、4バイトずつ逆向きに入れ直す
  for (let i = 0; i < littleEndianBytes.length; i += 4) {
    bigEndianBytes[i] = littleEndianBytes[i + 3];
    bigEndianBytes[i + 1] = littleEndianBytes[i + 2];
    bigEndianBytes[i + 2] = littleEndianBytes[i + 1];
    bigEndianBytes[i + 3] = littleEndianBytes[i];
  }

  return new Uint32Array(bigEndianBytes.buffer);
}

// ビッグエンディアンからリトルエンディアンに変換する関数
function bigToLittleEndian(bigEndianArray) {
  const bigEndianBytes = new Uint8Array(bigEndianArray.buffer);
  const littleEndianBytes = new Uint8Array(bigEndianBytes.length);

  // 32ビット整数のバイト順を変えるので、4バイトずつ逆向きに入れ直す
  for (let i = 0; i < bigEndianBytes.length; i += 4) {
    littleEndianBytes[i] = bigEndianBytes[i + 3];
    littleEndianBytes[i + 1] = bigEndianBytes[i + 2];
    littleEndianBytes[i + 2] = bigEndianBytes[i + 1];
    littleEndianBytes[i + 3] = bigEndianBytes[i];
  }

  return new Uint32Array(littleEndianBytes.buffer);
}

// テスト
// バイト順が16進数で反転していることを確認するため、Arrayで一旦普通の配列に戻してからmapで16進数表記の文字列にしている
const littleEndianArray = new Uint32Array([0x12345678, 0x9abcdef0]);
const bigEndianArray = littleToBigEndian(littleEndianArray);
console.log(Array.from(bigEndianArray).map((x) => "0x" + x.toString(16))); // [ '0x78563412', '0xf0debc9a' ]

const littleEndianArrayAgain = bigToLittleEndian(bigEndianArray);
console.log(
  Array.from(
    Array.from(littleEndianArrayAgain).map((x) => "0x" + x.toString(16))
  )
); // [ '0x12345678', '0x9abcdef0' ]
