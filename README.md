---
# Ticketing Platform Assignment

A full-stack event ticketing platform built with Next.js, Express.js, PostgreSQL, Drizzle ORM, and TurboRepo.
---

## 🚀 My Implementation

> ⚠️ This project uses pnpm workspaces and TurboRepo. Please use pnpm instead of npm.

## 🛠️ Tech Stack

- Next.js 15
- Express.js
- PostgreSQL
- Drizzle ORM
- TurboRepo
- pnpm workspaces
- TypeScript

## ⚙️ Setup Instructions

### 1. Install dependencies

pnpm install

### 2. Run the application

pnpm dev

Frontend: http://localhost:3000/events  
Backend: http://localhost:5000

---

## 🌱 Seed Database

POST http://localhost:5000/seed

---

## 🧪 Run Tests

pnpm test

---

## 🔑 Environment Variables

Create `.env` file:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/db
PORT=5000
```

---

## 📊 Features Implemented

- Dynamic pricing engine (time, demand, inventory)
- Concurrency-safe booking using transactions
- REST API (events, bookings, analytics)
- Price breakdown UI
- Analytics dashboard

---

## 🔒 Concurrency Handling

Implemented transaction-based concurrency control with row-level locking to prevent overselling during simultaneous bookings.

---

## 🎯 How to Test

1. Open `/events`
2. Click event
3. Book ticket
4. Check analytics

## Screenshots

Application UI previews:

### Events Dashboard

![Events Dashboard](./screenshots/events-dashboard.png)

### Event Details Page

![Event Details Page](./screenshots/event-details-page.png)

### Booking Success Page

![Booking Success Page](./screenshots/booking-success-page.png)

### Analytics Dashboard

![Analytics Dashboard](./screenshots/analytics-dashboard.png)
