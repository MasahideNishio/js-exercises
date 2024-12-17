import crypto from "crypto";
import fs from "fs/promises";

// 鍵を生成する
function generateKey() {
  // 32バイトの暗号論的疑似乱数を生成する
  return crypto.randomBytes(32).toString("base64"); // AES-256用の32バイト鍵
}

// 平文を鍵とAES-256-CBCで暗号化する。次に、暗号文と初期化ベクトル(IV)を、Base64エンコードして返す。
function encrypt64(text, key) {
  // 16バイトの暗号論的疑似乱数を初期化ベクトル (IV) とする
  const iv = crypto.randomBytes(16);

  // 鍵をBufferに変換する
  const keyBuffer = Buffer.from(key, "base64");

  // AES-256-CBC暗号化のためのCipherオブジェクトを作成
  const cipher = crypto.createCipheriv("aes-256-cbc", keyBuffer, iv);

  // 暗号化とBase64エンコード
  let encrypted = cipher.update(text, "utf8", "base64");
  encrypted += cipher.final("base64");

  // 暗号文とIVをbase64で返す
  return {
    value: encrypted, // 暗号文
    iv: iv.toString("base64"), // IVをBase64に変換
  };
}

// generateKeyの返り値を、JSON形式でファイルに保存する(非同期)
async function writeKey(key) {
  // fs.promisesで鍵を保存
  const data = { key };
  await fs.writeFile("key.json", JSON.stringify(data));
}

// encrypt64の返り値を、JSON形式でファイルに保存する(非同期)
async function writeEncrypt64(data) {
  // fs.promisesで暗号データを保存
  await fs.writeFile("encryptedData.json", JSON.stringify(data));
}

async function readKey() {
  // 鍵をファイルから読み込み、JSON形式としてパースする
  const data = await fs.readFile("key.json", "utf8");
  return JSON.parse(data).key; // 鍵を返す
}

// ファイルから暗号データを読み込む (非同期)
async function readEncrypt64() {
  // 暗号データをJSON形式で読み込み、パースする
  const data = await fs.readFile("encryptedData.json", "utf8");
  return JSON.parse(data);
}

// 復号して平文を返す
function decrypt64(data, key) {
  // 鍵をBufferに変換
  const keyBuffer = Buffer.from(key, "base64");

  // IVをBufferに変換
  const iv = Buffer.from(data.iv, "base64");

  // AES-256-CBC復号のためのDecipherオブジェクトを作成
  const decipher = crypto.createDecipheriv("aes-256-cbc", keyBuffer, iv);

  // 暗号文を復号
  let decrypted = decipher.update(data.value, "base64", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted; // 平文を返す
}

// 指定の平文を暗号化とBase64エンコードし、後に復号する一連の処理
(async () => {
  // 平文
  const text = "Hello, World!";

  // 暗号化とBase64エンコード
  const key = generateKey();
  const encryptedData = encrypt64(text, key);

  // 鍵と暗号データをJSONで保存
  await writeKey(key);
  await writeEncrypt64(encryptedData);

  console.log("Encrypted Text (Base64):", encryptedData.value);

  // Base64デコードと復号
  const storedKey = await readKey();
  const storedEncryptedData = await readEncrypt64();
  const decryptedText = decrypt64(storedEncryptedData, storedKey);

  console.log("Decrypted Text:", decryptedText);
})();
