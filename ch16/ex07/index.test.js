import { checkEntry } from "./index.js";
import { promises as fs } from "fs"; // promise版を使う

describe("checkEntry", () => {
  const testFile = "./testFile.txt";
  const testDir = "./testDir";
  const unknownPath = "./unknownPath";

  beforeAll(async () => {
    await fs.writeFile(testFile, "Hello World!");
    await fs.mkdir(testDir);
  });

  afterAll(async () => {
    await fs.unlink(testFile);
    await fs.rmdir(testDir);
  });

  it('should return "file" for a file path', async () => {
    const result = await checkEntry(testFile);
    expect(result).toBe("file");
  });

  it('should return "directory" for a directory path', async () => {
    const result = await checkEntry(testDir);
    expect(result).toBe("directory");
  });

  it('should return "not_found" for a non-existing path', async () => {
    const result = await checkEntry(unknownPath);
    expect(result).toBe("not_found");
  });
});
