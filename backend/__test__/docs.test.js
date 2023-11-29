const request = require("supertest");
const app = require("../app");

describe("/api/docs", () => {
  it("GET / --> 301", async () => {
    const response = await request(app).get("/api/docs");
    expect(response.status).toEqual(301);
    expect(response.headers["content-type"]).toMatch("text/html");
  });
});
