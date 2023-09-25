const request = require("supertest");
const app = require("../app");

describe("Peace of Mind API - Base", () => {
  it("GET /random --> 404", async () => {
    const response = await request(app)
      .get("/random")
      .set("Accept", "application/json");

    expect(response.status).toEqual(404);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: "Endpoint not found",
      })
    );
  });
});
