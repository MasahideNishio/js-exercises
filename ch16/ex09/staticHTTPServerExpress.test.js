import request from "supertest";
import app from "./staticHTTPServerExpress.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// 現在のテストファイルのディレクトリ名を取得
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const testFile = path.join(__dirname, "tmp", "hoge.txt"); // テストで使用するファイルのパス

beforeAll(() => {
  // tmpフォルダが存在しない場合は作成
  const tmpDirectory = path.join(__dirname, "tmp");
  if (!fs.existsSync(tmpDirectory)) {
    fs.mkdirSync(tmpDirectory);
  }
  fs.writeFileSync(testFile, "This is a test file"); // テストファイルを作成
});

describe("staticHHTPServerExpress Test", () => {
  // 静的ファイルが取得できるかテスト
  test("Get Static File", async () => {
    const response = await request(app).get("/hoge.txt");
    expect(response.status).toBe(200);
    expect(response.text).toBe("This is a test file");
  });

  // /test/mirror エンドポイントが正しく動作するかテスト
  test("Response from /test/mirror EndPoints", async () => {
    const response = await request(app).post("/test/mirror").send("Hello!");
    expect(response.status).toBe(200);
    expect(response.text).toContain("POST /test/mirror");
    expect(response.text).toContain("Hello!");
  });
});

afterAll(() => {
  // テスト後にファイルを削除
  fs.unlinkSync(testFile);
});
