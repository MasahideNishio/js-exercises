import { readdir, stat } from "./index.js";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe("fs Promise化テスト", () => {
  it("ファイル一覧が取得される", async () => {
    const dirPath = path.join(__dirname, "test_dir");

    const files = await readdir(dirPath);
    expect(files).toContain("file1.txt");
    expect(files).toContain("file2.txt");
  });

  it("statsが正しく取得できる", async () => {
    const filePath = path.join(__dirname, "test_dir", "file1.txt");

    const stats = await stat(filePath);
    expect(stats.isFile()).toBe(true);
    expect(stats.size).toBeGreaterThanOrEqual(0);
  });

  it("存在しないディレクトリを指定したエラー", async () => {
    const dirPath = path.join(__dirname, "non_existent_dir");

    await expect(readdir(dirPath)).rejects.toThrow();
  });

  it("存在しないファイルを指定したエラー", async () => {
    const filePath = path.join(__dirname, "non_existent_file.txt");

    await expect(stat(filePath)).rejects.toThrow();
  });
});
