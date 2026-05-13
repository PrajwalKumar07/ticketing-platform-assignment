const request = require("supertest");
const app = require("../BACKEND/server");
const database = require("../../../packages/database/dist/src");
const db = database.db;

describe("Concurrent Bookings", () => {
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

  it("prevents overbooking of last ticket", async () => {
    const eventRes = await request(app).get(`/events/${eventId}`);
    const event = eventRes.body;

    const toConsume = event.totalTickets - event.bookedTickets - 1;

    if (toConsume > 0) {
      await request(app).post("/bookings").send({
        eventId,
        userEmail: "init@gmail.com",
        quantity: toConsume,
      });
    }

    const payload = { eventId, userEmail: "test@gmail.com", quantity: 1 };

    const [res1, res2] = await Promise.all([
      request(app).post("/bookings").send(payload),
      request(app).post("/bookings").send(payload),
    ]);

    const success = [res1, res2].filter((r) => r.statusCode === 200);
    const failed  = [res1, res2].filter((r) => r.statusCode !== 200);

    expect(success.length).toBe(1);
    expect(failed.length).toBe(1);
  });
});