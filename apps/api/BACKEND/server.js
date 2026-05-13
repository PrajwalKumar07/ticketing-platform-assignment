const express = require("express");
const cors = require("cors");
require("dotenv").config();

// DB
const database = require("../../../packages/database/dist/src");
const db = database.db;
const events = database.events;
const bookings = database.bookings;

const { eq, sql } = require("drizzle-orm");

// Pricing
const { calculatePrice } = require("./utils/pricing");

const app = express();
app.use(cors());
app.use(express.json());

// ================= ROOT =================
app.get("/", (req, res) => {
  res.send("API is running");
});

// ================= EVENTS =================
app.get("/events", async (req, res) => {
  try {
    const result = await db.select().from(events).orderBy(events.id);

    const formatted = result.map((e) => {
      const total = Number(e.totalTickets ?? 0);
      const booked = Number(e.bookedTickets ?? 0);

      const price = calculatePrice(e, 1, 5);

      return {
        id: e.id,
        name: e.name,
        description: e.description,
        venue: e.venue,
        date: e.date,
        totalTickets: total,
        bookedTickets: booked,
        availableTickets: total - booked,
        basePrice: e.basePrice,
        currentPrice: price,
        floorPrice: e.floorPrice,
        ceilingPrice: e.ceilingPrice,
      };
    });

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= EVENT DETAIL =================
app.get("/events/:id", async (req, res) => {
  try {
    const eventId = Number(req.params.id);

    const result = await db
      .select()
      .from(events)
      .where(eq(events.id, eventId));

    const e = result[0];

    if (!e) {
      return res.status(404).json({ error: "Event not found" });
    }

    const total = Number(e.totalTickets ?? 0);
    const booked = Number(e.bookedTickets ?? 0);

    const price = calculatePrice(e, 1, 5);

    // ===== BREAKDOWN LOGIC =====
    const now = new Date();
    const eventDate = new Date(e.date);

    const daysLeft =
      (eventDate.getTime() - now.getTime()) /
      (1000 * 60 * 60 * 24);

    let timeFactor = 0;
    if (daysLeft <= 1) timeFactor = 0.5;
    else if (daysLeft <= 7) timeFactor = 0.2;

    const remainingRatio =
      total > 0 ? (total - booked) / total : 0;

    let inventoryFactor = 0;
    if (remainingRatio < 0.2) inventoryFactor = 0.25;
    else if (remainingRatio < 0.5) inventoryFactor = 0.1;

    // ===========================

    res.json({
      ...e,
      availableTickets: total - booked,
      currentPrice: price,

      breakdown: {
        basePrice: e.basePrice,
        timeIncrease: timeFactor,
        inventoryIncrease: inventoryFactor,
      },
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= BOOKINGS GET =================
app.get("/bookings", async (req, res) => {
  try {
    const result = await db.select().from(bookings);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= SEED =================
app.post("/seed", async (req, res) => {
  try {
    await db.delete(bookings);
    await db.delete(events);

    const inserted = await db.insert(events).values([
      {
        name: "Tech Conference",
        description: "AI & ML event",
        venue: "Bangalore",
date: new Date("2026-05-29T17:30:00"),
        totalTickets: 100,
        bookedTickets: 0,
        basePrice: 500,
        currentPrice: 500,
        floorPrice: 300,
        ceilingPrice: 1000,
      },
      {
        name: "Startup Meetup",
        description: "Networking event",
        venue: "Mangalore",
 date: new Date("2026-05-30T17:30:00"),
        totalTickets: 50,
        bookedTickets: 0,
        basePrice: 300,
        currentPrice: 300,
        floorPrice: 200,
        ceilingPrice: 800,
      },
    ]);

    res.json({
      message: "Seeded successfully",
      events: inserted,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= BOOKINGS =================
app.post("/bookings", async (req, res) => {
  try {
    const { eventId, userEmail, quantity } = req.body;

    const eventIdNum = Number(eventId);
    const qty = Number(quantity);

    if (!eventIdNum || !userEmail || !qty) {
      return res.status(400).json({ error: "Invalid input" });
    }

    let totalPrice = 0;

    await db.transaction(async (tx) => {
      const result = await tx.execute(
        sql`SELECT * FROM events WHERE id = ${eventIdNum} FOR UPDATE`
      );

      const event = result.rows[0];

      if (!event) throw new Error("Event not found");

      const totalTickets = Number(event.total_tickets ?? 0);
      const bookedTickets = Number(event.booked_tickets ?? 0);

      if (totalTickets - bookedTickets < qty) {
        throw new Error("Not enough tickets available");
      }

      const price = calculatePrice(event, qty, 5);

      if (isNaN(price)) {
        throw new Error("Invalid price calculation");
      }

      totalPrice = price * qty;

      await tx.insert(bookings).values({
        eventId: eventIdNum,
        userEmail,
        quantity: qty,
        pricePaid: totalPrice,
      });

      await tx
        .update(events)
        .set({
          bookedTickets: bookedTickets + qty,
          currentPrice: price,
        })
        .where(eq(events.id, eventIdNum));
    });

    res.json({ totalPrice });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ================= ANALYTICS =================
app.get("/analytics/:eventId", async (req, res) => {
  try {
    const eventId = Number(req.params.eventId);

    const eventResult = await db
      .select()
      .from(events)
      .where(eq(events.id, eventId));

    const event = eventResult[0];

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    const bookingData = await db
      .select()
      .from(bookings)
      .where(eq(bookings.eventId, eventId));

    const ticketsSold = bookingData.reduce(
      (sum, b) => sum + Number(b.quantity ?? 0),
      0
    );

    const revenue = bookingData.reduce(
      (sum, b) => sum + Number(b.pricePaid ?? 0),
      0
    );

    const avgPrice =
      bookingData.length > 0
        ? Math.round(revenue / bookingData.length)
        : 0;

    const remaining =
      (event.totalTickets ?? 0) - (event.bookedTickets ?? 0);

    res.json({
      eventId,
      ticketsSold,
      revenue,
      avgPrice,
      currentPrice: event.currentPrice ?? 0,
      remaining,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});