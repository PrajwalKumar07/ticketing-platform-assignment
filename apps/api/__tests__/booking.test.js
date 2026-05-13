const request = require("supertest");
const app = require("../BACKEND/server");
const database = require("../../../packages/database/dist/src");
const db = database.db;

describe("Booking API", () => {
  let eventId;

  beforeAll(async () => {
    // ✅ Seed and grab the real event ID from the response
    const seedRes = await request(app).post("/seed");
    eventId = seedRes.body.events[0].id;
  });

  afterAll(async () => {
    // ✅ Close DB connection so Jest exits cleanly
    await db.$client.end();
  });

  it("should fetch events", async () => {
    const res = await request(app).get("/events");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should create a booking", async () => {
    const res = await request(app)
      .post("/bookings")
      .send({
        eventId,                      // ✅ real dynamic ID, not hardcoded 1
        userEmail: "test@gmail.com",
        quantity: 1,
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.totalPrice).toBeDefined();
  });
});