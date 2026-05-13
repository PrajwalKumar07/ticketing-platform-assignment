// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";

// type EventType = {
//   id: number;
//   name: string;
//   totalTickets?: number;
//   total_tickets?: number;
//   bookedTickets?: number;
//   booked_tickets?: number;
//   currentPrice?: number;
//   current_price?: number;
// };

// export default function EventsPage() {
//   const [events, setEvents] = useState<EventType[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [bookingId, setBookingId] = useState<number | null>(null);

//   async function loadEvents() {
//     try {
//       setLoading(true);
//       setError(null);

//       const res = await fetch("http://localhost:5000/events");

//       if (!res.ok) throw new Error("Failed to fetch");

//       const data = await res.json();
//       setEvents(data);
//     } catch (err) {
//       setError("Failed to load events");
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     loadEvents();
//   }, []);

//   async function book(eventId: number) {
//     try {
//       const res = await fetch("http://localhost:5000/bookings", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           eventId,
//           userEmail: "test@gmail.com",
//           quantity: 1,
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok) throw new Error(data.error);

//       setEvents((prev) =>
//         prev.map((e) =>
//           e.id === eventId
//             ? {
//                 ...e,
//                 bookedTickets:
//                   (e.bookedTickets ?? e.booked_tickets ?? 0) + 1,
//               }
//             : e
//         )
//       );
//     } catch (err) {
//       alert("Booking failed");
//     }
//   }

//   if (loading) return <p style={{ padding: 20 }}>Loading...</p>;
//   if (error) return <p style={{ color: "red" }}>{error}</p>;

//   return (
//     <div style={{ padding: 24, fontFamily: "Inter, sans-serif" }}>
//       <h1 style={{ fontSize: 28, marginBottom: 20 }}>
//         🎟 Events Dashboard
//       </h1>

//       {events.length === 0 && <p>No events available</p>}

//       {/* 🔥 GRID LAYOUT */}
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
//           gap: 20,
//         }}
//       >
//         {events.map((event) => {
//           const total = event.totalTickets ?? event.total_tickets ?? 0;
//           const booked = event.bookedTickets ?? event.booked_tickets ?? 0;
//           const price = event.currentPrice ?? event.current_price ?? 0;

//           const available = total - booked;

//           return (
//             <div
//               key={event.id}
//               style={{
//                 background: "#fff",
//                 borderRadius: 12,
//                 padding: 16,
//                 boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: 10,
//               }}
//             >
//               {/* TITLE */}
//               <h3 style={{ fontSize: 18 }}>{event.name}</h3>

//               {/* PRICE (highlighted) */}
//               <p
//                 style={{
//                   fontSize: 22,
//                   fontWeight: "bold",
//                   color: "#10b981",
//                 }}
//               >
//                 ₹{price}
//               </p>

//               {/* AVAILABILITY */}
//               <p style={{ fontSize: 13 }}>
//                 🎟 {available} tickets left
//               </p>

//               {/* BUTTON */}
//               <button
//                 disabled={available <= 0 || bookingId === event.id}
//                 onClick={async () => {
//                   setBookingId(event.id);
//                   await book(event.id);
//                   setBookingId(null);
//                 }}
//                 style={{
//                   padding: "8px 12px",
//                   borderRadius: 6,
//                   background:
//                     available > 0 && bookingId !== event.id
//                       ? "#0070f3"
//                       : "#ccc",
//                   color: "white",
//                   border: "none",
//                   cursor:
//                     available > 0 && bookingId !== event.id
//                       ? "pointer"
//                       : "not-allowed",
//                 }}
//               >
//                 {bookingId === event.id
//                   ? "Booking..."
//                   : available > 0
//                   ? "Book Ticket"
//                   : "Sold Out"}
//               </button>

//               {/* LINKS */}
//               <div style={{ marginTop: 10, fontSize: 14 }}>
//                 <Link href={`/events/${event.id}`}>
//                   <span style={{ color: "#0070f3", cursor: "pointer" }}>
//                     View Details →
//                   </span>
//                 </Link>

//                 <br />

//                 <Link href={`/analytics/${event.id}`}>
//                   <span style={{ color: "#555", cursor: "pointer" }}>
//                     Analytics →
//                   </span>
//                 </Link>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type EventType = {
  id: number;
  name: string;
  totalTickets?: number;
  total_tickets?: number;
  bookedTickets?: number;
  booked_tickets?: number;
  currentPrice?: number;
  current_price?: number;
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Bebas+Neue&display=swap');

  :root {
    --bg:        #f5f3ef;
    --white:     #ffffff;
    --ink:       #1a1714;
    --ink2:      #3d3a35;
    --muted:     #9a9488;
    --line:      #e4e0d8;
    --red:       #e03a2f;
    --red-dark:  #b82c23;
    --red-soft:  #fdf1f0;
    --green:     #1e8c5a;
    --green-soft:#edf7f2;
    --amber:     #d97706;
    --amber-soft:#fef9ec;
    --stub-bg:   #1a1714;
    --stub-text: #f5f3ef;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .tk-root {
    min-height: 100vh;
    background: var(--bg);
    font-family: 'Plus Jakarta Sans', sans-serif;
    color: var(--ink);
    padding-bottom: 80px;
  }

  /* NAV */
  .tk-topbar {
    background: var(--white);
    border-bottom: 1px solid var(--line);
    padding: 0 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 64px;
    position: sticky;
    top: 0;
    z-index: 50;
  }

  .tk-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 26px;
    letter-spacing: 0.06em;
    color: var(--ink);
  }

  .tk-logo-icon {
    width: 32px; height: 32px;
    background: var(--red);
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
  }

  .tk-nav-links {
    display: flex;
    gap: 28px;
    list-style: none;
    align-items: center;
  }

  .tk-nav-links a {
    font-size: 13px;
    font-weight: 500;
    color: var(--muted);
    text-decoration: none;
    letter-spacing: 0.02em;
    transition: color 0.2s;
  }

  .tk-nav-links a:hover { color: var(--ink); }

  .tk-nav-cta {
    background: var(--red) !important;
    color: white !important;
    padding: 8px 18px !important;
    border-radius: 8px !important;
    font-weight: 600 !important;
  }

  /* HERO */
  .tk-hero {
    background: var(--ink);
    padding: 52px 48px 48px;
    position: relative;
    overflow: hidden;
  }

  .tk-hero::before {
    content: 'TICKETS';
    position: absolute;
    right: -20px;
    top: 50%;
    transform: translateY(-50%);
    font-family: 'Bebas Neue', sans-serif;
    font-size: 160px;
    color: rgba(255,255,255,0.04);
    letter-spacing: 0.05em;
    pointer-events: none;
    user-select: none;
  }

  .tk-hero-inner {
    max-width: 1100px;
    margin: 0 auto;
    position: relative;
  }

  .tk-hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 100px;
    padding: 5px 14px 5px 8px;
    margin-bottom: 20px;
  }

  .live-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: #4ade80;
    box-shadow: 0 0 0 3px rgba(74,222,128,0.25);
    animation: livepulse 2s infinite;
  }

  @keyframes livepulse {
    0%,100% { box-shadow: 0 0 0 3px rgba(74,222,128,0.25); }
    50%      { box-shadow: 0 0 0 6px rgba(74,222,128,0.08); }
  }

  .tk-hero-badge span {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.7);
  }

  .tk-hero-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(44px, 6vw, 72px);
    letter-spacing: 0.04em;
    color: white;
    line-height: 1.0;
    margin-bottom: 12px;
  }

  .tk-hero-sub {
    font-size: 15px;
    font-weight: 400;
    color: rgba(255,255,255,0.45);
  }

  /* STATS STRIP */
  .tk-stats-strip {
    background: var(--red);
    padding: 0 48px;
  }

  .tk-stats-inner {
    max-width: 1100px;
    margin: 0 auto;
    display: flex;
  }

  .tk-stat {
    flex: 1;
    padding: 16px 24px 16px 0;
    border-right: 1px solid rgba(255,255,255,0.2);
  }

  .tk-stat:last-child { border-right: none; padding-right: 0; }
  .tk-stat:not(:first-child) { padding-left: 24px; }

  .tk-stat-val {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 28px;
    letter-spacing: 0.04em;
    color: white;
    line-height: 1;
  }

  .tk-stat-lbl {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.6);
    margin-top: 2px;
  }

  /* CONTENT */
  .tk-content {
    max-width: 1100px;
    margin: 0 auto;
    padding: 48px 48px 0;
  }

  .tk-section-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 28px;
  }

  .tk-section-title {
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--muted);
  }

  .tk-count-badge {
    background: var(--ink);
    color: white;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.06em;
    padding: 4px 12px;
    border-radius: 100px;
  }

  /* TICKET CARDS */
  .tk-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 24px;
  }

  .ticket-wrap {
    animation: riseIn 0.45s cubic-bezier(0.16,1,0.3,1) both;
  }

  @keyframes riseIn {
    from { opacity: 0; transform: translateY(24px) scale(0.98); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  .ticket-wrap:nth-child(1) { animation-delay: 0.04s; }
  .ticket-wrap:nth-child(2) { animation-delay: 0.1s; }
  .ticket-wrap:nth-child(3) { animation-delay: 0.16s; }
  .ticket-wrap:nth-child(4) { animation-delay: 0.22s; }
  .ticket-wrap:nth-child(5) { animation-delay: 0.28s; }
  .ticket-wrap:nth-child(6) { animation-delay: 0.34s; }

  .ticket {
    background: var(--white);
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0,0,0,0.07), 0 8px 24px rgba(0,0,0,0.07);
    transition: box-shadow 0.3s ease, transform 0.3s ease;
  }

  .ticket:hover {
    box-shadow: 0 2px 6px rgba(0,0,0,0.08), 0 20px 48px rgba(0,0,0,0.13);
    transform: translateY(-3px);
  }

  .ticket-band {
    height: 6px;
    background: var(--red);
  }

  .ticket-band.sold-out { background: #ccc; }

  .ticket-body {
    padding: 24px 24px 20px;
  }

  .ticket-meta-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 14px;
  }

  .ticket-cat {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--muted);
  }

  .status-chip {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.05em;
    border-radius: 100px;
    padding: 3px 10px;
  }

  .status-chip.avail  { background: var(--green-soft); color: var(--green); }
  .status-chip.low    { background: var(--amber-soft); color: var(--amber); }
  .status-chip.sold   { background: #f3f3f3; color: #aaa; }
  .chip-dot { width: 5px; height: 5px; border-radius: 50%; background: currentColor; }

  .ticket-name {
    font-size: 20px;
    font-weight: 700;
    color: var(--ink);
    letter-spacing: -0.02em;
    line-height: 1.25;
    margin-bottom: 20px;
  }

  /* Tear line */
  .tear-line {
    display: flex;
    align-items: center;
    margin: 0 -24px 20px;
  }

  .tear-circle {
    width: 22px; height: 22px;
    border-radius: 50%;
    background: var(--bg);
    flex-shrink: 0;
    border: 1px solid var(--line);
  }

  .tear-dashes {
    flex: 1;
    border-top: 2px dashed var(--line);
  }

  /* Info grid */
  .ticket-info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px 12px;
    margin-bottom: 22px;
  }

  .tk-info-label {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 4px;
  }

  .tk-info-val {
    font-size: 15px;
    font-weight: 600;
    color: var(--ink);
    letter-spacing: -0.01em;
  }

  .tk-info-val.price {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 28px;
    letter-spacing: 0.03em;
    color: var(--red);
  }

  /* Progress */
  .tk-progress-wrap { margin-bottom: 20px; }

  .tk-progress-labels {
    display: flex;
    justify-content: space-between;
    margin-bottom: 6px;
  }

  .tk-progress-label {
    font-size: 11px;
    font-weight: 500;
    color: var(--muted);
  }

  .tk-progress-pct {
    font-size: 11px;
    font-weight: 700;
    color: var(--ink2);
  }

  .tk-progress-track {
    height: 5px;
    background: var(--line);
    border-radius: 99px;
    overflow: hidden;
  }

  .tk-progress-fill {
    height: 100%;
    border-radius: 99px;
    transition: width 0.6s cubic-bezier(0.4,0,0.2,1);
  }

  .tk-progress-fill.pf-low  { background: var(--red); }
  .tk-progress-fill.pf-med  { background: var(--amber); }
  .tk-progress-fill.pf-high { background: var(--green); }

  /* Book button */
  .tk-book-btn {
    width: 100%;
    padding: 14px;
    border: none;
    border-radius: 10px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.04em;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .tk-book-btn.active {
    background: var(--red);
    color: white;
  }

  .tk-book-btn.active:hover {
    background: var(--red-dark);
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(224,58,47,0.3);
  }

  .tk-book-btn.busy {
    background: #f0ede8;
    color: var(--muted);
    cursor: wait;
  }

  .tk-book-btn.sold {
    background: #f0ede8;
    color: #bbb;
    cursor: not-allowed;
    font-size: 12px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  /* Stub */
  .ticket-stub {
    background: var(--stub-bg);
    padding: 16px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .stub-links {
    display: flex;
    gap: 20px;
  }

  .stub-link {
    font-size: 12px;
    font-weight: 500;
    color: rgba(245,243,239,0.5);
    text-decoration: none;
    letter-spacing: 0.04em;
    transition: color 0.2s;
  }

  .stub-link:hover { color: var(--stub-text); }
  .stub-link.primary { color: rgba(245,243,239,0.85); }

  .stub-barcode {
    display: flex;
    gap: 2px;
    align-items: flex-end;
    height: 22px;
  }

  .barcode-bar {
    width: 2px;
    background: rgba(255,255,255,0.2);
    border-radius: 1px;
  }

  /* Loading / error */
  .tk-state {
    min-height: 50vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 14px;
    color: var(--muted);
  }

  .tk-spinner {
    width: 32px; height: 32px;
    border: 2px solid var(--line);
    border-top-color: var(--red);
    border-radius: 50%;
    animation: spin 0.75s linear infinite;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  @media (max-width: 640px) {
    .tk-topbar { padding: 0 20px; }
    .tk-hero { padding: 36px 20px 36px; }
    .tk-stats-strip { padding: 0 20px; }
    .tk-content { padding: 32px 20px 0; }
    .tk-grid { grid-template-columns: 1fr; }
    .tk-nav-links { display: none; }
    .tk-stats-inner { flex-wrap: wrap; }
    .tk-stat { min-width: 50%; }
  }
`;

function Barcode() {
  const bars = [10, 18, 10, 14, 8, 18, 10, 12, 16, 8, 14, 10, 18, 8, 12, 16, 10];
  return (
    <div className="stub-barcode">
      {bars.map((h, i) => (
        <div key={i} className="barcode-bar" style={{ height: `${h}px` }} />
      ))}
    </div>
  );
}

export default function EventsPage() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookingId, setBookingId] = useState<number | null>(null);

  async function loadEvents() {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("http://localhost:5000/events");
      if (!res.ok) throw new Error("Failed to fetch");
      setEvents(await res.json());
    } catch {
      setError("Failed to load events. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadEvents(); }, []);

  async function book(eventId: number) {
    try {
      const res = await fetch("http://localhost:5000/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId, userEmail: "test@gmail.com", quantity: 1 }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setEvents((prev) =>
        prev.map((e) =>
          e.id === eventId
            ? { ...e, bookedTickets: (e.bookedTickets ?? e.booked_tickets ?? 0) + 1 }
            : e
        )
      );
    } catch {
      alert("Booking failed. Please try again.");
    }
  }

  const totalTickets = events.reduce((s, e) => s + (e.totalTickets ?? e.total_tickets ?? 0), 0);
  const totalBooked  = events.reduce((s, e) => s + (e.bookedTickets ?? e.booked_tickets ?? 0), 0);
  const totalAvail   = totalTickets - totalBooked;

  return (
    <>
      <style>{css}</style>
      <div className="tk-root">

        <header className="tk-topbar">
          <div className="tk-logo">
            <div className="tk-logo-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M20 12a2 2 0 000-4V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 000 4v2a2 2 0 000 4v2a2 2 0 002 2h12a2 2 0 002-2v-2a2 2 0 000-4v-2z"/>
              </svg>
            </div>
            Passify
          </div>
          <ul className="tk-nav-links">
            <li><a href="#">Browse</a></li>
            <li><a href="#">My Tickets</a></li>
            <li><a href="#">Venues</a></li>
            <li><a href="#" className="tk-nav-cta">Sign In</a></li>
          </ul>
        </header>

        <section className="tk-hero">
          <div className="tk-hero-inner">
            <div className="tk-hero-badge">
              <span className="live-dot" />
              <span>Events on Sale Now</span>
            </div>
            <h1 className="tk-hero-title">Find Your Next<br />Experience</h1>
            <p className="tk-hero-sub">Secure your seats. Instant confirmation.</p>
          </div>
        </section>

        {!loading && !error && events.length > 0 && (
          <div className="tk-stats-strip">
            <div className="tk-stats-inner">
              {[
                { val: events.length, lbl: "Events" },
                { val: totalAvail.toLocaleString(), lbl: "Available Seats" },
                { val: totalBooked.toLocaleString(), lbl: "Tickets Sold" },
                { val: `${totalTickets > 0 ? Math.round((totalBooked / totalTickets) * 100) : 0}%`, lbl: "Fill Rate" },
              ].map((s) => (
                <div className="tk-stat" key={s.lbl}>
                  <div className="tk-stat-val">{s.val}</div>
                  <div className="tk-stat-lbl">{s.lbl}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="tk-content">
          {loading && (
            <div className="tk-state">
              <div className="tk-spinner" />
              <span style={{ fontSize: 14 }}>Loading events…</span>
            </div>
          )}

          {error && (
            <div className="tk-state">
              <span style={{ fontSize: 28 }}>⚠️</span>
              <span style={{ fontSize: 14, color: "var(--red)" }}>{error}</span>
            </div>
          )}

          {!loading && !error && (
            <>
              <div className="tk-section-head">
                <span className="tk-section-title">All Events</span>
                <span className="tk-count-badge">{events.length} listed</span>
              </div>

              {events.length === 0 ? (
                <div className="tk-state">
                  <span style={{ fontSize: 36 }}>🎟️</span>
                  <span>No events available right now</span>
                </div>
              ) : (
                <div className="tk-grid">
                  {events.map((event, i) => {
                    const total      = event.totalTickets ?? event.total_tickets ?? 0;
                    const booked     = event.bookedTickets ?? event.booked_tickets ?? 0;
                    const price      = event.currentPrice ?? event.current_price ?? 0;
                    const avail      = total - booked;
                    const bookedPct  = total > 0 ? Math.round((booked / total) * 100) : 0;
                    const isSold     = avail <= 0;
                    const isLow      = !isSold && bookedPct >= 75;
                    const isBusy     = bookingId === event.id;

                    const progressCls = bookedPct >= 75 ? "pf-low" : bookedPct >= 40 ? "pf-med" : "pf-high";
                    const statusCls   = isSold ? "sold" : isLow ? "low" : "avail";
                    const statusLabel = isSold ? "Sold Out" : isLow ? "Almost Full" : "Available";

                    return (
                      <div className="ticket-wrap" key={event.id}>
                        <div className="ticket">
                          <div className={`ticket-band${isSold ? " sold-out" : ""}`} />

                          <div className="ticket-body">
                            <div className="ticket-meta-row">
                              <span className="ticket-cat">Event #{String(i + 1).padStart(2, "0")}</span>
                              <span className={`status-chip ${statusCls}`}>
                                <span className="chip-dot" />
                                {statusLabel}
                              </span>
                            </div>

                            <div className="ticket-name">{event.name}</div>

                            <div className="tear-line">
                              <div className="tear-circle" />
                              <div className="tear-dashes" />
                              <div className="tear-circle" />
                            </div>

                            <div className="ticket-info-grid">
                              <div>
                                <div className="tk-info-label">Price per ticket</div>
                                <div className="tk-info-val price">₹{price.toLocaleString("en-IN")}</div>
                              </div>
                              <div>
                                <div className="tk-info-label">Remaining</div>
                                <div className="tk-info-val">{avail > 0 ? `${avail} seats` : "—"}</div>
                              </div>
                              <div>
                                <div className="tk-info-label">Total Capacity</div>
                                <div className="tk-info-val">{total.toLocaleString()}</div>
                              </div>
                              <div>
                                <div className="tk-info-label">Booked</div>
                                <div className="tk-info-val">{booked.toLocaleString()}</div>
                              </div>
                            </div>

                            <div className="tk-progress-wrap">
                              <div className="tk-progress-labels">
                                <span className="tk-progress-label">Booking progress</span>
                                <span className="tk-progress-pct">{bookedPct}% filled</span>
                              </div>
                              <div className="tk-progress-track">
                                <div
                                  className={`tk-progress-fill ${progressCls}`}
                                  style={{ width: `${bookedPct}%` }}
                                />
                              </div>
                            </div>

                            <button
                              className={`tk-book-btn ${isSold ? "sold" : isBusy ? "busy" : "active"}`}
                              disabled={isSold || isBusy}
                              onClick={async () => {
                                setBookingId(event.id);
                                await book(event.id);
                                setBookingId(null);
                              }}
                            >
                              {isBusy ? "Processing…" : isSold ? "Sold Out" : "Book Now  →"}
                            </button>
                          </div>

                          <div className="ticket-stub">
                            <div className="stub-links">
                              <Link href={`/events/${event.id}`} className="stub-link primary">
                                View Details
                              </Link>
                              <Link href={`/analytics/${event.id}`} className="stub-link">
                                Analytics
                              </Link>
                            </div>
                            <Barcode />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}