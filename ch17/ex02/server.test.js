// 色々調べたのですが、fetchをうまくフックすることができておりません。
// TypeError: fetch.mockResolvedValueOnce is not a function を解消できておりません

import { jest } from "@jest/globals";
import { createIssue, closeIssue, listIssues } from "./server.js";

jest.mock("node-fetch", () => jest.fn()); // node-fetch をモック化

import fetch, { Response } from "node-fetch";

describe("GitHub API Wrapper Tests", () => {
  const testOwner = "testOwner";
  const testRepo = "testRepo";
  const testIssueNumber = 123;
  const testTitle = "Test Issue Title";
  const testBody = "This is a test issue body.";

  beforeEach(() => {
    jest.clearAllMocks(); // 各テスト前にモックの状態をクリア
  });

  it("should create a new issue", async () => {
    // モックされた fetch のレスポンス
    const mockResponse = { id: 1, title: testTitle, body: testBody };

    fetch.mockResolvedValueOnce(
      new Response(JSON.stringify(mockResponse), { status: 201 })
    );

    const result = await createIssue(testOwner, testRepo, testTitle, testBody);
    expect(fetch).toHaveBeenCalledTimes(1); // fetch が 1 回呼ばれたか
    expect(fetch).toHaveBeenCalledWith(
      `https://api.github.com/repos/${testOwner}/${testRepo}/issues`,
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          Authorization: expect.stringContaining("Bearer "),
        }),
        body: JSON.stringify({ title: testTitle, body: testBody }),
      })
    );
    expect(result).toEqual(mockResponse); // レスポンスが期待通りか
  });

  it("should close an issue successfully", async () => {
    const mockResponse = { id: testIssueNumber, state: "closed" };

    fetch.mockResolvedValueOnce(
      new Response(JSON.stringify(mockResponse), { status: 200 })
    );

    const result = await closeIssue(testOwner, testRepo, testIssueNumber);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `https://api.github.com/repos/${testOwner}/${testRepo}/issues/${testIssueNumber}`,
      expect.objectContaining({
        method: "PATCH",
        headers: expect.objectContaining({
          Authorization: expect.stringContaining("Bearer "),
        }),
        body: JSON.stringify({ state: "closed" }),
      })
    );
    expect(result).toEqual(mockResponse);
  });

  it("should list open issues successfully", async () => {
    const mockResponse = [
      { id: 1, title: "Issue 1", state: "open" },
      { id: 2, title: "Issue 2", state: "open" },
    ];

    fetch.mockResolvedValueOnce(
      new Response(JSON.stringify(mockResponse), { status: 200 })
    );

    const result = await listIssues(testOwner, testRepo);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `https://api.github.com/repos/${testOwner}/${testRepo}/issues?state=open`,
      expect.objectContaining({
        method: "GET",
        headers: expect.objectContaining({
          Authorization: expect.stringContaining("Bearer "),
        }),
      })
    );
    expect(result).toEqual(mockResponse);
  });

  it("should throw an error when response is not ok", async () => {
    fetch.mockResolvedValueOnce(
      new Response(JSON.stringify({ message: "Not Found" }), { status: 404 })
    );

    await expect(listIssues(testOwner, testRepo)).rejects.toThrow(
      "HTTP Error: 404 Not Found"
    );
  });
});

// unstableMockを使ったパターンも試したがうまく動かず

// import {
//   createIssue,
//   closeIssue,
//   listIssues,
//   getToken,
//   makeRequest,
// } from "./server.js";

// // `node-fetch` をモック化
// jest.unstable_mockModule("node-fetch", () => ({
//   default: jest.fn(),
// }));

// const { default: mockFetch } = await import("node-fetch"); // モックを取得

// describe("GitHub API functions", () => {
//   const testOwner = "testOwner";
//   const testRepo = "testRepo";
//   const testIssueNumber = 1;
//   const testTitle = "Test Issue";
//   const testBody = "This is a test issue.";

//   beforeEach(() => {
//     jest.clearAllMocks();
//     process.env.GITHUB_TOKEN = "test-token"; // テスト用のダミートークン
//   });

//   it("should retrieve GitHub token from environment variables", () => {
//     expect(getToken()).toBe("test-token");
//   });

//   it("should throw an error if GitHub token is missing", () => {
//     delete process.env.GITHUB_TOKEN;
//     expect(() => getToken()).toThrow("Error: GitHub Token is missing");
//   });

//   it("should make a successful request and return data", async () => {
//     const mockResponse = { success: true };
//     mockFetch.mockResolvedValueOnce({
//       ok: true,
//       json: jest.fn().mockResolvedValueOnce(mockResponse),
//     });

//     const result = await makeRequest("GET", "/repos/testOwner/testRepo/issues");
//     expect(result).toEqual(mockResponse);
//     expect(mockFetch).toHaveBeenCalledTimes(1);
//   });

//   it("should throw an error on failed request", async () => {
//     mockFetch.mockResolvedValueOnce({
//       ok: false,
//       status: 404,
//       statusText: "Not Found",
//     });

//     await expect(makeRequest("GET", "/invalid-url")).rejects.toThrow(
//       "HTTP Error: 404 Not Found"
//     );
//     expect(mockFetch).toHaveBeenCalledTimes(1);
//   });

//   it("should create an issue successfully", async () => {
//     const mockIssue = { id: 123, title: testTitle };
//     mockFetch.mockResolvedValueOnce({
//       ok: true,
//       json: jest.fn().mockResolvedValueOnce(mockIssue),
//     });

//     const result = await createIssue(testOwner, testRepo, testTitle, testBody);
//     expect(result).toEqual(mockIssue);
//     expect(mockFetch).toHaveBeenCalledTimes(1);
//   });

//   it("should close an issue successfully", async () => {
//     mockFetch.mockResolvedValueOnce({
//       ok: true,
//       json: jest.fn().mockResolvedValueOnce({ success: true }),
//     });

//     const result = await closeIssue(testOwner, testRepo, testIssueNumber);
//     expect(result).toEqual({ success: true });
//     expect(mockFetch).toHaveBeenCalledTimes(1);
//   });

//   it("should list open issues successfully", async () => {
//     const mockIssues = [
//       { id: 1, title: "Issue 1" },
//       { id: 2, title: "Issue 2" },
//     ];
//     mockFetch.mockResolvedValueOnce({
//       ok: true,
//       json: jest.fn().mockResolvedValueOnce(mockIssues),
//     });

//     const result = await listIssues(testOwner, testRepo);
//     expect(result).toEqual(mockIssues);
//     expect(mockFetch).toHaveBeenCalledTimes(1);
//   });
// });
