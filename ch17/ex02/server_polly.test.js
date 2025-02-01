import { Polly } from "@pollyjs/core";
import HttpAdapter from "@pollyjs/adapter-node-http";
import FSPersister from "@pollyjs/persister-fs";
import dotenv from "dotenv";
import { createIssue, closeIssue, listIssues } from "./server.js";

dotenv.config();

Polly.register(HttpAdapter);
Polly.register(FSPersister);

describe("GitHub API with Polly.js", () => {
  let polly;

  beforeAll(() => {
    polly = new Polly("GitHub API Tests", {
      adapters: ["node-http"], // fetchは非推奨になったとのことで node-http を使用
      persister: "fs", // レスポンスをfile systemに保存する設定
      logging: true,
      recordFailedRequests: true, // 失敗したリクエストも保存する
    });
  });

  afterAll(async () => {
    await polly.stop();
  });

  const testOwner = "MasahideNishio";
  const testRepo = "js-exercises";

  it("should create a new issue", async () => {
    const issue = await createIssue(
      testOwner,
      testRepo,
      "Test Issue",
      "This is a test issue.",
      true
    );
    expect(issue).toHaveProperty("number");
  });
});
