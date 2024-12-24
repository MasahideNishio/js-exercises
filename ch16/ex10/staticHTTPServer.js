import http from "http";
import url from "url";
import path from "path";
import fs from "fs";

function serve(rootDirectory, port) {
  const server = http.createServer((request, response) => {
    const endpoint = url.parse(request.url).pathname;
    let filename = path.join(rootDirectory, endpoint);

    filename = path.resolve(rootDirectory, filename.replace(/\.\.\//g, ""));

    // ★追加部分
    if (request.method === "PUT") {
      // 保存するディレクトリを作成（存在しない場合）
      const dir = path.dirname(filename);
      fs.mkdirSync(dir, { recursive: true });

      // 書き込み用ストリームの作成
      const fileStream = fs.createWriteStream(filename);

      // リクエストボディをファイルに書き込む
      request.pipe(fileStream);

      fileStream.on("finish", () => {
        response.writeHead(201, { "Content-Type": "text/plain" });
        response.end("File uploaded successfully."); // アップロード成功
      });

      fileStream.on("error", (err) => {
        response.writeHead(500, { "Content-Type": "text/plain" });
        response.end("Error uploading file: " + err.message); // エラーメッセージ
      });
    } else if (request.method === "GET") {
      const contentType =
        {
          ".html": "text/html",
          ".js": "text/javascript",
          ".css": "text/css",
          ".png": "image/png",
          ".txt": "text/plain",
        }[path.extname(filename)] || "application/octet-stream";

      const stream = fs.createReadStream(filename);
      stream.on("open", () => {
        response.writeHead(200, { "Content-Type": contentType });
        stream.pipe(response); // ファイルをレスポンスとして送信
      });

      stream.on("error", () => {
        response.writeHead(404, { "Content-Type": "text/plain" });
        response.end("File not found.");
      });
    } else {
      response.writeHead(405, { "Content-Type": "text/plain" });
      response.end("Method not allowed.");
    }
  });

  server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

serve(process.argv[2] || "/tmp", parseInt(process.argv[3]) || 8000);
