import request from "supertest";

const BASE_URL = "http://localhost:3000";

describe("HTTP Server Tests (Existing Server)", () => {
  test("GET / should return the HTML form", async () => {
    const response = await request(BASE_URL).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toContain("text/html");
    expect(response.text).toContain('<form action="/greeting" method="POST">');
  });

  test("POST /greeting should return a greeting message", async () => {
    const response = await request(BASE_URL)
      .post("/greeting")
      .send("name=Hoge&greeting=Fuga")
      .set("Content-Type", "application/x-www-form-urlencoded");

    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toContain("text/html");
    expect(response.text).toContain("<h1>Fuga, Hoge!</h1>");
  });

  test("GET /nonexistent should return 404", async () => {
    const response = await request(BASE_URL).get("/hoge");
    expect(response.statusCode).toBe(404);
  });

  test("PUT / should return 405", async () => {
    const response = await request(BASE_URL).put("/");
    expect(response.statusCode).toBe(405);
  });
});
