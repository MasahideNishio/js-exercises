import net from "net";

const server = net.createServer((socket) => {
  socket.on("data", (data) => {
    const request = data.toString();

    // リクエスト行をパース
    const [requestLine, ...headerLines] = request.split("\r\n");
    const [method, path] = requestLine.split(" ");

    if (method === "GET" && path === "/") {
      // ルート ("/") に GET リクエストが来たときに HTML を返す
      const responseBody = `<!doctype html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Greeting Form</title>
  </head>
  <body>
    <form action="/greeting" method="POST">
      <label for="greeting">Name:</label>
      <input type="text" id="name" name="name" />
      <input type="text" id="greeting" name="greeting" />
      <button type="submit">Submit</button>
    </form>
  </body>
</html>`;

      const response = `HTTP/1.1 200 OK\r\nContent-Type: text/html; charset=UTF-8\r\nContent-Length: ${Buffer.byteLength(
        responseBody
      )}\r\n\r\n${responseBody}`;
      socket.write(response);
    } else if (method === "POST" && path === "/greeting") {
      // /greeting に POST リクエストが来たときの処理
      const bodyStartIndex = request.indexOf("\r\n\r\n") + 4;
      const body = request.slice(bodyStartIndex);

      // POST データを解析 (key=value&key=value の形式)
      const params = Object.fromEntries(
        body.split("&").map((pair) => pair.split("=").map(decodeURIComponent))
      );

      const name = params.name || "";
      const greeting = params.greeting || "";

      const responseBody = `<!doctype html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Greeting</title>
  </head>
  <body>
    <h1>${greeting}, ${name}!</h1>
  </body>
</html>`;

      const response = `HTTP/1.1 200 OK\r\nContent-Type: text/html; charset=UTF-8\r\nContent-Length: ${Buffer.byteLength(
        responseBody
      )}\r\n\r\n${responseBody}`;
      socket.write(response);
    } else {
      // 未対応のパスやメソッドに対しては 404 または 405 を返す
      if (["GET", "POST"].includes(method)) {
        const response = `HTTP/1.1 404 Not Found\r\nContent-Length: 0\r\n\r\n`;
        socket.write(response);
      } else {
        const response = `HTTP/1.1 405 Method Not Allowed\r\nAllow: GET, POST\r\nContent-Length: 0\r\n\r\n`;
        socket.write(response);
      }
    }

    // レスポンス送信後にソケットを閉じる
    socket.end();
  });

  socket.on("error", (err) => {
    console.error("Socket error:", err);
  });
});
server.maxConnections = 10;
// サーバーを起動
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
