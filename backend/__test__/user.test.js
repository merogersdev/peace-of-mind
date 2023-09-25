const request = require("supertest");
const app = require("../app");

describe("Peace of Mind API - User Routes", () => {
  // POST: Login with correct user
  it("POST /api/users/login --> 200", () =>
    request(app)
      .post("/api/users/login")
      .send({
        email: "test@test.com",
        password: "asdfasdf",
      })
      .set("Accept", "application/json")
      .expect(200));

  // POST: Register
  it("POST /users/login --> 201", async () => {});

  // GET: User Details
  it("GET /users/details --> 200", async () => {});

  // GET: Quote for User
  it("GET /users/quote --> 200", async () => {});
});
