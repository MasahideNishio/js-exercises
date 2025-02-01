import fetch from "node-fetch";
import process from "process";

const BASE_URL = "https://api.github.com";

// トークン取得関数を分離(外部スクリプトから呼び出す際に明示的な取得が必要)
export function getToken() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    throw new Error("Error: GitHub Token is missing");
  }
  return token;
}

export async function makeRequest(method, url, data = null, verbose = false) {
  const options = {
    method,
    headers: {
      Authorization: `Bearer ${getToken()}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    body: data ? JSON.stringify(data) : null,
  };
  if (verbose) {
    console.log("HTTP Request:", { method, url, data });
  }

  try {
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
    throw new Error(`Request failed: ${error.message}`);
  }
}

export async function createIssue(owner, repo, title, body, verbose = false) {
  const data = { title, body };
  return makeRequest("POST", `/repos/${owner}/${repo}/issues`, data, verbose);
}

export async function closeIssue(owner, repo, issue_number, verbose = false) {
  const data = { state: "closed" };
  return makeRequest(
    "PATCH",
    `/repos/${owner}/${repo}/issues/${issue_number}`,
    data,
    verbose
  );
}

export async function listIssues(owner, repo, verbose = false) {
  return makeRequest(
    "GET",
    `/repos/${owner}/${repo}/issues?state=open`,
    null,
    verbose
  );
}
