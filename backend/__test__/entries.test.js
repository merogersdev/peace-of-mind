const request = require("supertest");
const app = require("../app");
const pool = require("../config/db");

describe("/api/entries", () => {
  describe("POST --> /", () => {
    it("POST --> /", async () => {
      const response = await request(app)
        .post("/api/entries/")
        .send({
          user_id: 1,
          title: "Test Entry",
          gratitude: "Test Gratitude",
          entry: "Test Entry Text",
        })
        .set("Accept", "application/json");

      expect(response.status).toEqual(401);
    });
  });
  describe("GET/PATCH/DELETE --> /1", () => {
    it("GET - /1", async () => {
      const response = await request(app)
        .get("/api/entries/1")
        .set("Accept", "application/json");

      expect(response.status).toEqual(401);
    });
    it("PATCH - /1", async () => {
      const response = await request(app)
        .patch("/api/entries/1")
        .send({
          entry: "Entry Edit text goes here...",
        })
        .set("Accept", "application/json");

      expect(response.status).toEqual(401);
    });
    it("DELETE - /1", async () => {
      const response = await request(app)
        .delete("/api/entries/1")
        .set("Accept", "application/json");

      expect(response.status).toEqual(401);
    });
  });

  // Everybody out of the pool
  afterAll(async () => {
    await pool.end();
  });
});
