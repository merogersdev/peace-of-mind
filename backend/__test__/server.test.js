const request = require("supertest");
const app = require("../app");
const db = require("../knex");

describe("Peace of Mind API", () => {
  // Close DB connection when done
  afterAll(async () => {
    await db.destroy();
  });
  // --- Base Route --- //
  describe("Base Route", () => {
    it("GET /api/random --> 404 (Route Not Found)", async () => {
      const response = await request(app)
        .get("/api/random")
        .set("Accept", "application/json");

      expect(response.status).toEqual(404);
      expect(response.body).toEqual(
        expect.objectContaining({
          message: "Endpoint not found",
        })
      );
    });
  });
  // --- User Routes --- //
  describe("User Routes", () => {
    // GET: User Details
    it("GET /users/details --> 401 (Requires Auth)", async () => {
      const response = await request(app)
        .get("/api/users/details")
        .set("Accept", "application/json");

      expect(response.status).toEqual(401);
      expect(response.body).toEqual(
        expect.objectContaining({
          success: false,
          error: "401: Unauthorized",
        })
      );
    });

    // GET: Quote for User
    it("GET /users/quote --> 401 (Requires Auth)", async () => {
      const response = await request(app)
        .get("/api/users/quote")
        .set("Accept", "application/json");

      expect(response.status).toEqual(401);
      expect(response.body).toEqual(
        expect.objectContaining({
          success: false,
          error: "401: Unauthorized",
        })
      );
    });
    // Register
    describe("Register", () => {
      it("POST /api/users/register --> 201 (Success)", async () => {
        const response = await request(app)
          .post("/api/users/register")
          .send({
            firstName: "Test",
            lastName: "User",
            email: "testtest@test.com",
            password: "asdfasdf",
          })
          .set("Accept", "application/json");

        expect(response.status).toEqual(201);
        expect(response.body).toEqual(
          expect.objectContaining({
            success: true,
          })
        );
      });
      it("POST /api/users/register --> 400 (Fail Validation)", async () => {
        const response = await request(app)
          .post("/api/users/register")
          .send({
            email: "notauser@test.com",
          })
          .set("Accept", "application/json");

        expect(response.status).toEqual(400);
        expect(response.body).toEqual(
          expect.objectContaining({
            success: false,
          })
        );
      });

      it("POST /api/users/register --> 400 (User Exists)", async () => {
        const response = await request(app)
          .post("/api/users/register")
          .send({
            firstName: "Test",
            lastName: "User",
            email: "testtest@test.com",
            password: "asdfasdf",
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
    // Login
    describe("Login", () => {
      it("POST /api/users/login --> 200 (Success) ", async () => {
        const response = await request(app)
          .post("/api/users/login")
          .send({
            email: "testtest@test.com",
            password: "asdfasdf",
          })
          .set("Accept", "application/json");

        expect(response.status).toEqual(200);
        expect(response.body).toEqual(
          expect.objectContaining({
            success: true,
          })
        );
      });
      it("POST /api/users/login --> 400 (Fail)", async () => {
        const response = await request(app)
          .post("/api/users/login")
          .send({
            email: "testtest@test.com",
            password: "123456",
          })
          .set("Accept", "application/json");

        expect(response.status).toEqual(400);
        expect(response.body).toEqual(
          expect.objectContaining({
            success: false,
          })
        );
      });
      it("POST /api/users/login --> 404 (User Not Found)", async () => {
        const response = await request(app)
          .post("/api/users/login")
          .send({
            email: "notauser@test.com",
            password: "123456",
          })
          .set("Accept", "application/json");

        expect(response.status).toEqual(404);
        expect(response.body).toEqual(
          expect.objectContaining({
            success: false,
          })
        );
      });
    });
  });
});
