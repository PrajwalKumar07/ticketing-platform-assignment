# 📊 Dynamic Ticket Pricing Platform – Design Document

## 1. Overview

This project is a full-stack ticket booking platform that supports dynamic pricing, real-time ticket availability, and analytics.

The system is designed to simulate real-world ticketing platforms where pricing changes based on demand, time, and inventory.

---

## 2. Architecture

### Frontend
- Built using Next.js (React)
- Displays events, booking UI, and analytics
- Communicates with backend via REST APIs

### Backend
- Built using Express.js
- Handles event management, bookings, and analytics
- Uses transaction-based booking to ensure data consistency

### Database
- PostgreSQL
- Managed using Drizzle ORM

---

## 3. Booking Flow

1. User selects an event and clicks "Book Ticket"
2. Frontend sends POST request to `/bookings`
3. Backend:
   - Starts a database transaction
   - Locks the selected event row using `FOR UPDATE`
   - Checks ticket availability
   - Calculates price dynamically
   - Inserts booking
   - Updates booked ticket count
4. Transaction is committed

### Why transaction + locking?

This prevents:
- Race conditions
- Overselling tickets

---

## 4. Dynamic Pricing Engine

The pricing engine calculates ticket price based on three factors:

### 1. Time-based factor
- Price increases as event date approaches
- Example:
  - ≤1 day → +50%
  - ≤7 days → +20%

### 2. Inventory-based factor
- Price increases when tickets are low
- Example:
  - <20% remaining → +25%
  - <50% remaining → +10%

### 3. Demand-based factor
- Based on recent bookings
- Scales linearly (up to 20%)

### Final Formula



The result is clamped between:
- Floor price (minimum)
- Ceiling price (maximum)

---

## 5. Concurrency Handling

To avoid multiple users booking the same ticket:

- Database row is locked using:

- Only one transaction can update a specific event at a time

This ensures:
- No duplicate bookings
- No overselling

---

## 6. Analytics System

Analytics endpoint provides:

- Tickets sold
- Total revenue
- Average price
- Remaining tickets

Data is computed using:
- Bookings table (for revenue and tickets sold)
- Events table (for availability and pricing)

---

## 7. API Design

### Events
- `GET /events`
- `GET /events/:id`

### Bookings
- `POST /bookings`
- `GET /bookings?eventId=`

### Analytics
- `GET /analytics/:eventId`

---

## 8. Error Handling

The system handles:

- Invalid inputs
- Invalid event IDs
- Insufficient tickets
- Pricing errors (NaN prevention)

---

## 9. Trade-offs

- Simplified demand calculation (no real-time streaming data)
- No authentication implemented (for simplicity)
- Pricing factors are static (not configurable via UI)

---

## 10. Future Improvements

- User authentication system
- Payment gateway integration
- Real-time demand tracking
- Admin dashboard
- Configurable pricing rules

---

## 11. Conclusion

This system demonstrates:

- Full-stack development
- Dynamic pricing implementation
- Concurrency-safe transactions
- Real-time analytics

It closely resembles a production-level ticket booking system.


### Constraints

The computed price is bounded by:
- Floor price (minimum)
- Ceiling price (maximum)

---

## 5. Concurrency Handling

To avoid multiple users booking the same ticket:

- Database row is locked using:



- Only one transaction can update a specific event at a time

This ensures:
- No duplicate bookings
- No overselling
- Strong consistency under concurrent requests

---

## 6. Analytics System

Analytics endpoints provide:

- Tickets sold
- Total revenue
- Average price
- Remaining tickets

### Data Sources:
- Bookings table → revenue, tickets sold
- Events table → availability, pricing

---

## 7. API Design

### Events
- `GET /events`
- `GET /events/:id`

### Bookings
- `POST /bookings`
- `GET /bookings?eventId=`

### Analytics
- `GET /analytics/:eventId`

### Example Booking Request



---

## 8. Error Handling

The system handles:

- Invalid input data
- Invalid event IDs
- Insufficient ticket availability
- Pricing calculation errors (NaN prevention)
- Database failures

---

## 9. Trade-offs

- Simplified demand calculation (no real-time streaming data)
- No authentication system (for simplicity)
- Pricing factors are static (not configurable via UI)
- No caching layer implemented

---

## 10. Future Improvements

- User authentication system
- Payment gateway integration
- Real-time demand tracking
- Admin dashboard
- Configurable pricing rules
- Notification system (email/SMS)

---

## 11. Scalability Considerations

Potential bottlenecks:
- Database write contention under high traffic
- Analytics queries on large datasets

Possible improvements:
- Read replicas for analytics queries
- Redis caching for event data
- Queue-based booking system (Kafka / RabbitMQ)
- Horizontal scaling of backend services

---

## 12. Conclusion

This system demonstrates:

- Full-stack development  
- Dynamic pricing implementation  
- Concurrency-safe transactions  
- Real-time analytics  

It provides a strong foundation for a production-grade ticket booking platform, balancing performance, correctness, and scalability.