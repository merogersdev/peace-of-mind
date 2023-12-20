const request = require("supertest");
const app = require("../app");
const pool = require("../config/db");

describe("/api/auth", () => {
  describe("POST --> /", () => {
    it("404 - Invalid User", async () => {
      const response = await request(app)
        .post("/api/auth/")
        .send({
          email: "test2@test.com",
          password: "abcd1234",
        })
        .set("Accept", "application/json");

      expect(response.status).toEqual(404);
      expect(response.body).toEqual(
        expect.objectContaining({
          success: false,
        })
      );
    });

    it("400 - Invalid Request", async () => {
      const response = await request(app)
        .post("/api/auth/")
        .send({
          email: "test@test.com",
        })
        .set("Accept", "application/json");

      expect(response.status).toEqual(400);
      expect(response.body).toEqual(
        expect.objectContaining({
          success: false,
        })
      );
    });

    it("200 - Login Success", async () => {
      const response = await request(app)
        .post("/api/auth/")
        .send({
          email: "test@test.com",
          password: "abcd1234",
        })
        .set("Accept", "application/json");

      expect(response.status).toEqual(200);
      expect(response.body).toEqual(
        expect.objectContaining({
          success: true,
        })
      );
    });
  });

  // Everybody out of the pool
  afterAll(async () => {
    await pool.query("DELETE FROM users WHERE email = $1", ["test@test.com"]);
    await pool.end();
  });
});
