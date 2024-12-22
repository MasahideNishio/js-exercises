// 参考
// https://docs.github.com/ja/rest/quickstart?apiVersion=2022-11-28
// https://saki-htr.hatenablog.com/entry/2022/11/07/143110

import fetch from "node-fetch";
import process from "process";

// GitHub Personal Access Token を環境変数から取得 (安全性のため)
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
if (!GITHUB_TOKEN) {
  console.error("Error: GitHub Token is missing");
  process.exit(1);
}

const BASE_URL = "https://api.github.com";

// コマンドライン引数を取得
const args = process.argv.slice(2);

// ヘルプメッセージを表示する関数
function showHelp() {
  console.log(`Usage:
  node server.js <command> [options]

Commands:
  create <owner> <repo> <title> <body>    Create new issue
  close <owner> <repo> <issue_number>    Close an issue by number
  list <owner> <repo>                   List open issues

Options:
  -h, --help      Show help message
  -v, --verbose   Show HTTP logs
`);
}

// HTTP リクエストのラッパー
async function makeRequest(method, url, data = null, verbose = false) {
  try {
    // オプションを設定
    const options = {
      method,
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json", //
        "Content-Type": "application/json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
    };
    console.log("options", options);
    if (data) {
      options.body = JSON.stringify(data);
    }

    if (verbose) {
      console.log("HTTP Request:", { method, url, data });
    }

    const response = await fetch(`${BASE_URL}${url}`, options);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    const responseData = await response.json();

    if (verbose) {
      console.log("HTTP Response:", responseData);
    }

    return responseData;
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

async function main() {
  if (args.includes("-h") || args.includes("--help") || args.length === 0) {
    showHelp();
    return;
  }

  const verbose = args.includes("-v") || args.includes("--verbose");

  // コマンドと引数を解析
  const command = args[0];
  const params = args.slice(1).filter((arg) => !arg.startsWith("-"));

  if (command === "create") {
    const [owner, repo, title, body] = params;
    if (!owner || !repo || !title || !body) {
      console.error("Error: Missing required parameters for create.");
      showHelp();
      return;
    }

    const data = { title, body };
    const result = await makeRequest(
      "POST",
      `/repos/${owner}/${repo}/issues`,
      data,
      verbose
    );
    console.log("Issue created:", result);
  } else if (command === "close") {
    const [owner, repo, issue_number] = params;
    if (!owner || !repo || !issue_number) {
      console.error("Error: Missing required parameters for close.");
      showHelp();
      return;
    }

    const data = { state: "closed" };
    const result = await makeRequest(
      "PATCH",
      `/repos/${owner}/${repo}/issues/${issue_number}`,
      data,
      verbose
    );
    console.log("Issue closed:", result);
  } else if (command === "list") {
    const [owner, repo] = params;
    if (!owner || !repo) {
      console.error("Error: Missing required parameters for list.");
      showHelp();
      return;
    }

    const result = await makeRequest(
      "GET",
      `/repos/${owner}/${repo}/issues?state=open`,
      null,
      verbose
    );
    console.log("Open Issues:");
    result.forEach((issue) => {
      console.log(`- [#${issue.number}] ${issue.title}`);
    });
  } else {
    console.error("Error: Unknown command.");
    showHelp();
  }
}

main();
