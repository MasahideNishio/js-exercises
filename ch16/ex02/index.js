import { spawn } from "child_process";
import path from "path";

// ESMでこのファイルの絶対パスとして__dirnameを定義するイディオム
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// startChildで起動したプロセスの参照
let child = null;

// node ./child.js を起動し、このプロセスが終了したときに解決するPromiseを返す
// cf. https://nodejs.org/api/child_process.html#event-close
async function startChild() {
  const childPath = path.join(__dirname, "child.js");
  child = spawn("node", [childPath]);

  child.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  child.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  return new Promise((res) => {
    child.on("close", (code, signal) => {
      res([code, signal]);
    });
  });
}

// TODO: ここに処理を書く

// 子プロセスが終了したら再起動する処理
async function monitorChild() {
  while (true) {
    console.log("Starting child process");
    const [code, signal] = await startChild();

    console.log(`Child process exited with code: ${code}, signal: ${signal}`);

    // 子プロセスが正常終了の場合は再起動しない
    if (code === 0) {
      console.log("正常終了");
      break;
    }

    console.log("Restarting child process");
  }
}

monitorChild();
