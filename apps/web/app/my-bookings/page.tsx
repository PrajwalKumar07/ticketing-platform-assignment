// "use client";

// import { useEffect, useState } from "react";

// export default function MyBookingsPage() {
//   const [bookings, setBookings] = useState<any[]>([]);

//   async function loadBookings() {
//     try {
//       const res = await fetch("http://localhost:5000/bookings?eventId=2");
//       const data = await res.json();
//       setBookings(data);
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   useEffect(() => {
//     loadBookings();
//   }, []);

//   return (
//     <div style={{ padding: 20, fontFamily: "sans-serif" }}>
//       <h1>📄 My Bookings</h1>

//       {bookings.length === 0 && <p>No bookings yet</p>}

//       {bookings.map((b) => (
//         <div
//           key={b.id}
//           style={{
//             border: "1px solid #ccc",
//             padding: 10,
//             marginBottom: 10,
//             borderRadius: 6,
//           }}
//         >
//           <p>
//             <b>Email:</b> {b.userEmail}
//           </p>
//           <p>
//             <b>Tickets:</b> {b.quantity}
//           </p>
//           <p>
//             <b>Paid:</b> ₹{b.pricePaid}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";

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
    --stub-bg:   #1a1714;
    --green:     #1e8c5a;
    --green-soft:#edf7f2;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .bk-root {
    min-height: 100vh;
    background: var(--bg);
    font-family: 'Plus Jakarta Sans', sans-serif;
    color: var(--ink);
    padding-bottom: 80px;
  }

  /* NAV */
  .bk-topbar {
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

  .bk-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 26px;
    letter-spacing: 0.06em;
    color: var(--ink);
    text-decoration: none;
  }

  .bk-logo-icon {
    width: 32px; height: 32px;
    background: var(--red);
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
  }

  .bk-breadcrumb {
    font-size: 13px;
    font-weight: 500;
    color: var(--muted);
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .bk-breadcrumb a {
    color: var(--muted);
    text-decoration: none;
    transition: color 0.2s;
  }
  .bk-breadcrumb a:hover { color: var(--ink); }
  .bk-breadcrumb span { color: var(--ink); }

  /* HERO */
  .bk-hero {
    background: var(--ink);
    padding: 48px 48px 44px;
    position: relative;
    overflow: hidden;
  }

  .bk-hero::before {
    content: 'BOOKINGS';
    position: absolute;
    right: -10px;
    top: 50%;
    transform: translateY(-50%);
    font-family: 'Bebas Neue', sans-serif;
    font-size: 130px;
    color: rgba(255,255,255,0.04);
    letter-spacing: 0.05em;
    pointer-events: none;
    user-select: none;
  }

  .bk-hero-inner {
    max-width: 1000px;
    margin: 0 auto;
    position: relative;
  }

  .bk-hero-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.5);
    margin-bottom: 14px;
  }

  .bk-hero-eyebrow::before {
    content: '';
    display: block;
    width: 20px; height: 1px;
    background: rgba(255,255,255,0.3);
  }

  .bk-hero-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(40px, 5vw, 64px);
    letter-spacing: 0.04em;
    color: white;
    line-height: 1.0;
    margin-bottom: 10px;
  }

  .bk-hero-sub {
    font-size: 14px;
    color: rgba(255,255,255,0.4);
    font-weight: 400;
  }

  /* STATS STRIP */
  .bk-stats-strip {
    background: var(--red);
    padding: 0 48px;
  }

  .bk-stats-inner {
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
  }

  .bk-stat {
    flex: 1;
    padding: 16px 24px 16px 0;
    border-right: 1px solid rgba(255,255,255,0.2);
  }

  .bk-stat:last-child { border-right: none; padding-right: 0; }
  .bk-stat:not(:first-child) { padding-left: 24px; }

  .bk-stat-val {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 26px;
    letter-spacing: 0.04em;
    color: white;
    line-height: 1;
  }

  .bk-stat-lbl {
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.55);
    margin-top: 3px;
  }

  /* CONTENT */
  .bk-content {
    max-width: 1000px;
    margin: 0 auto;
    padding: 44px 48px 0;
  }

  .bk-section-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
  }

  .bk-section-title {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--muted);
  }

  .bk-count-pill {
    background: var(--ink);
    color: white;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.06em;
    padding: 4px 12px;
    border-radius: 100px;
  }

  /* BOOKING LIST */
  .bk-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  /* TICKET */
  .bk-ticket {
    background: var(--white);
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 6px 20px rgba(0,0,0,0.06);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    animation: slideUp 0.4s cubic-bezier(0.16,1,0.3,1) both;
  }

  .bk-ticket:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 6px rgba(0,0,0,0.07), 0 16px 40px rgba(0,0,0,0.11);
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .bk-ticket:nth-child(1) { animation-delay: 0.05s; }
  .bk-ticket:nth-child(2) { animation-delay: 0.11s; }
  .bk-ticket:nth-child(3) { animation-delay: 0.17s; }
  .bk-ticket:nth-child(4) { animation-delay: 0.23s; }
  .bk-ticket:nth-child(5) { animation-delay: 0.29s; }

  .ticket-top-band {
    height: 5px;
    background: var(--green);
  }

  .ticket-main {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: stretch;
  }

  .ticket-info {
    padding: 22px 24px;
  }

  .ticket-row-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
  }

  .ticket-ref {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--muted);
  }

  .ticket-status {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 11px;
    font-weight: 600;
    background: var(--green-soft);
    color: var(--green);
    border-radius: 100px;
    padding: 3px 10px;
  }

  .status-dot {
    width: 5px; height: 5px;
    border-radius: 50%;
    background: currentColor;
  }

  .ticket-email {
    font-size: 18px;
    font-weight: 700;
    color: var(--ink);
    letter-spacing: -0.02em;
    margin-bottom: 18px;
    word-break: break-all;
  }

  .ticket-tear {
    display: flex;
    align-items: center;
    margin: 0 -24px 18px;
  }

  .tear-nub {
    width: 20px; height: 20px;
    border-radius: 50%;
    background: var(--bg);
    flex-shrink: 0;
    border: 1px solid var(--line);
  }

  .tear-dash {
    flex: 1;
    border-top: 2px dashed var(--line);
  }

  .ticket-fields {
    display: flex;
    gap: 32px;
  }

  .t-field-label {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 4px;
  }

  .t-field-val {
    font-size: 15px;
    font-weight: 600;
    color: var(--ink);
  }

  /* Right price panel */
  .ticket-price-panel {
    background: var(--bg);
    border-left: 2px dashed var(--line);
    padding: 22px 28px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    min-width: 130px;
  }

  .price-panel-label {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--muted);
  }

  .price-panel-row {
    display: flex;
    align-items: baseline;
    gap: 2px;
  }

  .price-panel-currency {
    font-size: 14px;
    font-weight: 500;
    color: var(--muted);
  }

  .price-panel-val {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 34px;
    letter-spacing: 0.02em;
    color: var(--red);
    line-height: 1;
  }

  /* Stub */
  .ticket-stub {
    background: var(--stub-bg);
    padding: 12px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .stub-id {
    font-size: 11px;
    font-weight: 500;
    color: rgba(245,243,239,0.3);
    letter-spacing: 0.1em;
    font-family: monospace;
  }

  .stub-barcode {
    display: flex;
    gap: 2px;
    align-items: flex-end;
    height: 20px;
  }

  .bc-bar {
    width: 2px;
    background: rgba(255,255,255,0.18);
    border-radius: 1px;
  }

  /* EMPTY */
  .bk-empty {
    text-align: center;
    padding: 80px 20px;
    animation: slideUp 0.4s ease both;
  }

  .bk-empty-icon {
    width: 72px; height: 72px;
    background: var(--white);
    border: 1px solid var(--line);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 28px;
    margin: 0 auto 20px;
    box-shadow: 0 4px 14px rgba(0,0,0,0.06);
  }

  .bk-empty-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 28px;
    letter-spacing: 0.04em;
    color: var(--ink);
    margin-bottom: 8px;
  }

  .bk-empty-sub {
    font-size: 14px;
    color: var(--muted);
  }

  /* LOADING */
  .bk-loading {
    min-height: 40vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 14px;
    color: var(--muted);
    font-size: 14px;
  }

  .bk-spinner {
    width: 30px; height: 30px;
    border: 2px solid var(--line);
    border-top-color: var(--red);
    border-radius: 50%;
    animation: spin 0.75s linear infinite;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  @media (max-width: 640px) {
    .bk-topbar { padding: 0 20px; }
    .bk-hero { padding: 36px 20px; }
    .bk-stats-strip { padding: 0 20px; }
    .bk-content { padding: 32px 20px 0; }
    .ticket-main { grid-template-columns: 1fr; }
    .ticket-price-panel {
      border-left: none;
      border-top: 2px dashed var(--line);
      flex-direction: row;
      justify-content: space-between;
      min-width: auto;
      padding: 14px 24px;
    }
    .bk-stats-inner { flex-wrap: wrap; }
    .bk-stat { min-width: 50%; }
  }
`;

type Booking = {
  id: number | string;
  userEmail: string;
  quantity: number;
  pricePaid: number;
};

const BAR_HEIGHTS = [10, 16, 8, 20, 10, 14, 18, 8, 12, 20, 10, 16, 8, 14, 18, 10, 12];

function Barcode({ seed }: { seed: number }) {
  return (
    <div className="stub-barcode">
      {BAR_HEIGHTS.map((h, i) => (
        <div key={i} className="bc-bar" style={{ height: `${((h + seed * 3) % 16) + 5}px` }} />
      ))}
    </div>
  );
}

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadBookings() {
    try {
      const res = await fetch("http://localhost:5000/bookings?eventId=2");
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadBookings(); }, []);

  const totalTickets = bookings.reduce((s, b) => s + b.quantity, 0);
  const totalPaid    = bookings.reduce((s, b) => s + b.pricePaid, 0);
  const avgPerTicket = totalTickets > 0 ? Math.round(totalPaid / totalTickets) : 0;

  return (
    <>
      <style>{css}</style>
      <div className="bk-root">

        <header className="bk-topbar">
          <a href="/" className="bk-logo">
            <div className="bk-logo-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M20 12a2 2 0 000-4V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 000 4v2a2 2 0 000 4v2a2 2 0 002 2h12a2 2 0 002-2v-2a2 2 0 000-4v-2z"/>
              </svg>
            </div>
            Passify
          </a>
          <div className="bk-breadcrumb">
            <a href="/">Events</a>
            <span style={{ color: "var(--line)" }}>›</span>
            <span>My Bookings</span>
          </div>
        </header>

        <section className="bk-hero">
          <div className="bk-hero-inner">
            <div className="bk-hero-eyebrow">Event #2</div>
            <h1 className="bk-hero-title">My Bookings</h1>
            <p className="bk-hero-sub">All reservations for this event</p>
          </div>
        </section>

        {!loading && bookings.length > 0 && (
          <div className="bk-stats-strip">
            <div className="bk-stats-inner">
              {[
                { val: bookings.length,                               lbl: "Reservations" },
                { val: totalTickets,                                  lbl: "Total Tickets" },
                { val: `₹${totalPaid.toLocaleString("en-IN")}`,       lbl: "Revenue Collected" },
                { val: `₹${avgPerTicket.toLocaleString("en-IN")}`,    lbl: "Avg per Ticket" },
              ].map((s) => (
                <div className="bk-stat" key={s.lbl}>
                  <div className="bk-stat-val">{s.val}</div>
                  <div className="bk-stat-lbl">{s.lbl}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bk-content">
          {loading && (
            <div className="bk-loading">
              <div className="bk-spinner" />
              <span>Loading bookings…</span>
            </div>
          )}

          {!loading && bookings.length === 0 && (
            <div className="bk-empty">
              <div className="bk-empty-icon">🎟️</div>
              <div className="bk-empty-title">No Bookings Yet</div>
              <p className="bk-empty-sub">Reservations for this event will appear here.</p>
            </div>
          )}

          {!loading && bookings.length > 0 && (
            <>
              <div className="bk-section-head">
                <span className="bk-section-title">All Reservations</span>
                <span className="bk-count-pill">{bookings.length} bookings</span>
              </div>

              <div className="bk-list">
                {bookings.map((b, i) => (
                  <div className="bk-ticket" key={b.id}>
                    <div className="ticket-top-band" />

                    <div className="ticket-main">
                      <div className="ticket-info">
                        <div className="ticket-row-top">
                          <span className="ticket-ref">Booking #{b.id}</span>
                          <span className="ticket-status">
                            <span className="status-dot" />
                            Confirmed
                          </span>
                        </div>

                        <div className="ticket-email">{b.userEmail}</div>

                        <div className="ticket-tear">
                          <div className="tear-nub" />
                          <div className="tear-dash" />
                          <div className="tear-nub" />
                        </div>

                        <div className="ticket-fields">
                          <div>
                            <div className="t-field-label">Quantity</div>
                            <div className="t-field-val">{b.quantity} {b.quantity === 1 ? "ticket" : "tickets"}</div>
                          </div>
                          <div>
                            <div className="t-field-label">Amount Paid</div>
                            <div className="t-field-val" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: "var(--red)", letterSpacing: "0.03em" }}>
                              ₹{b.pricePaid.toLocaleString("en-IN")}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="ticket-price-panel">
                        <div className="price-panel-label">Total Paid</div>
                        <div className="price-panel-row">
                          <span className="price-panel-currency">₹</span>
                          <span className="price-panel-val">{b.pricePaid.toLocaleString("en-IN")}</span>
                        </div>
                      </div>
                    </div>

                    <div className="ticket-stub">
                      <span className="stub-id">REF-{String(b.id).padStart(6, "0")}</span>
                      <Barcode seed={i + 1} />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}