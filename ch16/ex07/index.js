import { promises as fs } from "fs";

export async function checkEntry(path) {
  try {
    const stats = await fs.stat(path);
    if (stats.isFile()) {
      return "file";
    } else if (stats.isDirectory()) {
      return "directory";
    } else {
      return "unknown";
    }
  } catch (error) {
    // ファイルやディレクトリが存在しない場合
    return "not_found";
  }
}
