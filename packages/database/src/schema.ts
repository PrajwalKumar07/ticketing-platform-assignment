import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";

export const events = pgTable("events", {
  id: serial("id").primaryKey(),

  name: text("name").notNull(),
  description: text("description"),
  venue: text("venue"),
  date: timestamp("date").notNull(),

  totalTickets: integer("total_tickets").notNull(),
  bookedTickets: integer("booked_tickets").default(0),

  basePrice: integer("base_price").notNull(),
  currentPrice: integer("current_price").notNull(),
  floorPrice: integer("floor_price").notNull(),
  ceilingPrice: integer("ceiling_price").notNull(),

  pricingRules: jsonb("pricing_rules"),
});

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),

  eventId: integer("event_id")
    .notNull()
    .references(() => events.id),

  userEmail: text("user_email").notNull(),
  quantity: integer("quantity").notNull(),
  pricePaid: integer("price_paid").notNull(),

  createdAt: timestamp("created_at").defaultNow(),
});
