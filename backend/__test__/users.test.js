const request = require("supertest");
const app = require("../app");
const pool = require("../config/db");

describe("/api/users", () => {
  describe("POST --> /api/users/", () => {
    it("201 - Register User Success", async () => {
      const response = await request(app)
        .post("/api/users")
        .send({
          firstName: "Test",
          lastName: "User",
          email: "test@test.com",
          password: "abcd1234",
        })
        .set("Accept", "application/json");

      expect(response.status).toEqual(201);
      expect(response.body).toEqual(
        expect.objectContaining({
          success: true,
        })
      );
    });
  });

  describe("POST --> /api/users/", () => {
    it("400 - Already Registered", async () => {
      const response = await request(app)
        .post("/api/users")
        .send({
          firstName: "Test",
          lastName: "User",
          email: "test@test.com",
          password: "abcd1234",
        })
        .set("Accept", "application/json");

      expect(response.status).toEqual(400);
      expect(response.body).toEqual(
        expect.objectContaining({
          success: false,
        })
      );
    });
  });

  describe("POST --> /api/users/", () => {
    it("400 - Invalid Request", async () => {
      const response = await request(app)
        .post("/api/users")
        .send({
          firstName: "Test",
          lastName: "User",
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
  });

  describe("POST --> /login", () => {
    it("404 - Invalid User", async () => {
      const response = await request(app)
        .post("/api/users/login")
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
        .post("/api/users/login")
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
        .post("/api/users/login")
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
  describe("GET/PATCH/DELETE --> /1", () => {
    it("GET - 401", async () => {
      const response = await request(app)
        .get("/api/users/1")
        .set("Accept", "application/json");

      expect(response.status).toEqual(401);
    });
    it("PATCH - 401", async () => {
      const response = await request(app)
        .patch("/api/users/1")
        .send({
          email: "testupdate@test.com",
        })
        .set("Accept", "application/json");

      expect(response.status).toEqual(401);
    });
    it("DELETE - 401", async () => {
      const response = await request(app)
        .delete("/api/users/1")
        .set("Accept", "application/json");

      expect(response.status).toEqual(401);
    });
  });

  // Everybody out of the pool
  afterAll(async () => {
    await pool.query("DELETE FROM users WHERE email = $1", ["test@test.com"]);
    await pool.end();
  });
});
