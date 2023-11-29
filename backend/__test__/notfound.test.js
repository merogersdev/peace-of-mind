const request = require("supertest");
const app = require("../app");

describe("/api/notfound", () => {
  it("GET / --> 404", async () => {
    const response = await request(app)
      .get("/api/notfound")
      .set("Accept", "application/json");

    expect(response.status).toEqual(404);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: "Endpoint not found",
      })
    );
  });
});
