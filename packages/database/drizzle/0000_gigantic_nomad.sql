CREATE TABLE "bookings" (
	"id" serial PRIMARY KEY NOT NULL,
	"event_id" integer NOT NULL,
	"user_email" text NOT NULL,
	"quantity" integer NOT NULL,
	"price_paid" integer NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "events" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"venue" text,
	"date" timestamp NOT NULL,
	"total_tickets" integer NOT NULL,
	"booked_tickets" integer DEFAULT 0,
	"base_price" integer NOT NULL,
	"current_price" integer NOT NULL,
	"floor_price" integer NOT NULL,
	"ceiling_price" integer NOT NULL,
	"pricing_rules" jsonb
);
--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE no action ON UPDATE no action;