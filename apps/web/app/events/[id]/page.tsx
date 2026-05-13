// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";

// export default function EventDetailPage() {
//   const { id } = useParams();
//   const eventId = Number(id);

//   const [event, setEvent] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [booking, setBooking] = useState(false);
//   const [quantity, setQuantity] = useState(1);

//   // ================= FETCH EVENT =================
//   async function fetchEvent() {
//     try {
//       setLoading(true);
//       const res = await fetch(`http://localhost:5000/events/${eventId}`);

//       if (!res.ok) throw new Error("Failed to fetch");

//       const data = await res.json();
//       setEvent(data);
//     } catch (err) {
//       console.error("Error fetching event:", err);
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     if (eventId) fetchEvent();
//   }, [eventId]);

//   // ================= BOOKING =================
//   async function book() {
//     try {
//       setBooking(true);

//       const res = await fetch("http://localhost:5000/bookings", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           eventId,
//           userEmail: "test@gmail.com",
//           quantity,
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         alert(data.error || "Booking failed");
//         return;
//       }

//       const price = event.currentPrice ?? 0;

//       // ✅ FIXED redirect
//       window.location.href = `/bookings/success?eventId=${event.id}&totalPrice=${data.totalPrice}&currentPrice=${price}&quantity=${quantity}`;

//       fetchEvent(); // refresh
//     } catch (err) {
//       console.error("Booking failed:", err);
//       alert("Booking failed");
//     } finally {
//       setBooking(false);
//     }
//   }

//   // ================= STATES =================
//   if (loading) return <p style={{ padding: 20 }}>Loading...</p>;
//   if (!event) return <p style={{ padding: 20 }}>Event not found</p>;

//   const total = event.totalTickets ?? event.total_tickets ?? 0;
//   const booked = event.bookedTickets ?? event.booked_tickets ?? 0;
//   const price = event.currentPrice ?? event.current_price ?? 0;
//   const basePrice = event.basePrice ?? event.base_price ?? 0;

//   const available = total - booked;

//   // ================= UI =================
// //  return (
// //   <div
// //     style={{
// //       padding: 24,
// //       fontFamily: "Inter, sans-serif",
// //       maxWidth: 700,
// //       margin: "0 auto",
// //     }}
// //   >
// //     {/* HEADER */}
// //     <h1 style={{ fontSize: 28, marginBottom: 10 }}>{event.name}</h1>

// //     <p style={{ color: "#555", marginBottom: 10 }}>
// //       {event.description}
// //     </p>

// //     <p style={{ fontSize: 14 }}>
// //       📍 {event.venue} | 🕒{" "}
// //       {event.date
// //         ? new Date(event.date).toLocaleString()
// //         : "Not available"}
// //     </p>

// //     {/* ================= PRICING CARD ================= */}
// //     <div
// //       style={{
// //         background: "#ffffff",
// //         padding: 18,
// //         borderRadius: 12,
// //         boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
// //         marginTop: 20,
// //       }}
// //     >
// //       <h3 style={{ marginBottom: 10 }}>💰 Pricing</h3>

// //       <p style={{ fontSize: 14 }}>Base: ₹{basePrice}</p>

// //       {/* 🔥 Highlighted price */}
// //       <p
// //         style={{
// //           fontSize: 26,
// //           fontWeight: "bold",
// //           color: "#10b981",
// //           margin: "8px 0",
// //         }}
// //       >
// //         ₹{price}
// //       </p>

// //       <p style={{ fontSize: 14, color: "#666" }}>
// //         Adjustment:{" "}
// //         {price - basePrice >= 0 ? "+" : ""}₹{price - basePrice}
// //       </p>

// //       {/* BREAKDOWN */}
// //       {event.breakdown && (
// //         <div
// //           style={{
// //             marginTop: 12,
// //             background: "#f3f4f6",
// //             padding: 12,
// //             borderRadius: 8,
// //           }}
// //         >
// //           <h4 style={{ marginBottom: 8 }}>📊 Breakdown</h4>

// //           <p>⏱ Time: +{event.breakdown.timeIncrease * 100}%</p>
// //           <p>📦 Inventory: +{event.breakdown.inventoryIncrease * 100}%</p>
// //         </div>
// //       )}

// //       <p style={{ marginTop: 10, fontSize: 14 }}>
// //         🎟 Available: <b>{available}</b>
// //       </p>
// //     </div>

// //     {/* ================= BOOKING CARD ================= */}
// //     <div
// //       style={{
// //         background: "#ffffff",
// //         padding: 18,
// //         borderRadius: 12,
// //         boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
// //         marginTop: 20,
// //       }}
// //     >
// //       <h3 style={{ marginBottom: 10 }}>🎟 Book Tickets</h3>

// //       <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
// //         <input
// //           type="number"
// //           min={1}
// //           max={available}
// //           value={quantity}
// //           onChange={(e) => setQuantity(Number(e.target.value))}
// //           style={{
// //             padding: 8,
// //             borderRadius: 6,
// //             border: "1px solid #ccc",
// //             width: 70,
// //           }}
// //         />

// //         <button
// //           disabled={available <= 0 || booking}
// //           onClick={book}
// //           style={{
// //             padding: "10px 16px",
// //             borderRadius: 8,
// //             background:
// //               available > 0 && !booking ? "#10b981" : "#ccc",
// //             color: "white",
// //             border: "none",
// //             fontWeight: "bold",
// //             cursor:
// //               available > 0 && !booking ? "pointer" : "not-allowed",
// //           }}
// //         >
// //           {booking
// //             ? "Booking..."
// //             : available > 0
// //             ? "Book Now"
// //             : "Sold Out"}
// //         </button>
// //       </div>
// //     </div>
// //   </div>
// // );

// return (
//   <div
//     style={{
//       minHeight: "100vh",
//       background: "#f6f4ef",
//       fontFamily: "Inter, sans-serif",
//       padding: "40px 20px 80px",
//     }}
//   >
//     <div
//       style={{
//         maxWidth: 1100,
//         margin: "0 auto",
//       }}
//     >
//       {/* HERO SECTION */}
//       <div
//         style={{
//           background:
//             "linear-gradient(135deg,#111827 0%,#1f2937 100%)",
//           borderRadius: 36,
//           padding: "50px 40px",
//           position: "relative",
//           overflow: "hidden",
//           marginBottom: 30,
//           color: "white",
//         }}
//       >
//         {/* GLOW */}
//         <div
//           style={{
//             position: "absolute",
//             width: 300,
//             height: 300,
//             borderRadius: "50%",
//             background: "rgba(220,38,38,0.18)",
//             top: -120,
//             right: -100,
//             filter: "blur(60px)",
//           }}
//         />

//         <div
//           style={{
//             position: "relative",
//             zIndex: 2,
//           }}
//         >
//           <div
//             style={{
//               display: "inline-flex",
//               alignItems: "center",
//               gap: 10,
//               background: "rgba(255,255,255,0.08)",
//               border: "1px solid rgba(255,255,255,0.1)",
//               padding: "10px 18px",
//               borderRadius: 999,
//               marginBottom: 24,
//               fontWeight: 600,
//               fontSize: 14,
//             }}
//           >
//             🎟 Live Event
//           </div>

//           {/* TITLE */}
//           <h1
//             style={{
//               fontSize: "clamp(40px,6vw,68px)",
//               fontWeight: 900,
//               lineHeight: 1,
//               margin: 0,
//               letterSpacing: "-3px",
//             }}
//           >
//             {event.name}
//           </h1>

//           {/* DESCRIPTION */}
//           <p
//             style={{
//               marginTop: 24,
//               color: "#d1d5db",
//               fontSize: 18,
//               lineHeight: 1.8,
//               maxWidth: 700,
//             }}
//           >
//             {event.description}
//           </p>

//           {/* META */}
//           <div
//             style={{
//               display: "flex",
//               flexWrap: "wrap",
//               gap: 18,
//               marginTop: 28,
//             }}
//           >
//             <div
//               style={{
//                 background: "rgba(255,255,255,0.08)",
//                 border: "1px solid rgba(255,255,255,0.1)",
//                 padding: "12px 18px",
//                 borderRadius: 16,
//                 fontSize: 14,
//                 fontWeight: 600,
//               }}
//             >
//               📍 {event.venue}
//             </div>

//             <div
//               style={{
//                 background: "rgba(255,255,255,0.08)",
//                 border: "1px solid rgba(255,255,255,0.1)",
//                 padding: "12px 18px",
//                 borderRadius: 16,
//                 fontSize: 14,
//                 fontWeight: 600,
//               }}
//             >
//               🕒{" "}
//               {event.date
//                 ? new Date(event.date).toLocaleString()
//                 : "Not available"}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* CONTENT GRID */}
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "1.1fr 0.9fr",
//           gap: 28,
//         }}
//       >
//         {/* LEFT SIDE */}
//         <div>
//           {/* PRICING CARD */}
//           <div
//             style={{
//               background: "#ffffff",
//               borderRadius: 32,
//               padding: 32,
//               boxShadow: "0 15px 45px rgba(0,0,0,0.06)",
//               marginBottom: 24,
//               position: "relative",
//               overflow: "hidden",
//             }}
//           >
//             {/* TOP BAR */}
//             <div
//               style={{
//                 position: "absolute",
//                 top: 0,
//                 left: 0,
//                 right: 0,
//                 height: 8,
//                 background:
//                   "linear-gradient(90deg,#dc2626,#ef4444)",
//               }}
//             />

//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 flexWrap: "wrap",
//                 gap: 20,
//                 marginBottom: 28,
//               }}
//             >
//               <div>
//                 <p
//                   style={{
//                     margin: 0,
//                     color: "#9ca3af",
//                     fontSize: 12,
//                     fontWeight: 700,
//                     letterSpacing: 1.5,
//                   }}
//                 >
//                   LIVE DYNAMIC PRICING
//                 </p>

//                 <h2
//                   style={{
//                     marginTop: 12,
//                     marginBottom: 0,
//                     fontSize: 36,
//                     fontWeight: 900,
//                     color: "#111827",
//                     letterSpacing: "-1px",
//                   }}
//                 >
//                   Ticket Pricing
//                 </h2>
//               </div>

//               <div
//                 style={{
//                   background: "#ecfdf5",
//                   color: "#10b981",
//                   padding: "10px 18px",
//                   borderRadius: 999,
//                   border: "1px solid #bbf7d0",
//                   fontWeight: 800,
//                 }}
//               >
//                 ● LIVE
//               </div>
//             </div>

//             {/* PRICE SECTION */}
//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns:
//                   "repeat(auto-fit,minmax(220px,1fr))",
//                 gap: 20,
//                 marginBottom: 28,
//               }}
//             >
//               {/* CURRENT PRICE */}
//               <div
//                 style={{
//                   background:
//                     "linear-gradient(135deg,#dc2626 0%,#ef4444 100%)",
//                   borderRadius: 28,
//                   padding: 28,
//                   color: "white",
//                   position: "relative",
//                   overflow: "hidden",
//                 }}
//               >
//                 <div
//                   style={{
//                     position: "absolute",
//                     width: 120,
//                     height: 120,
//                     borderRadius: "50%",
//                     background: "rgba(255,255,255,0.1)",
//                     right: -40,
//                     top: -40,
//                   }}
//                 />

//                 <p
//                   style={{
//                     margin: 0,
//                     fontSize: 12,
//                     fontWeight: 700,
//                     letterSpacing: 1.4,
//                     color: "rgba(255,255,255,0.9)",
//                   }}
//                 >
//                   CURRENT PRICE
//                 </p>

//                 <h2
//                   style={{
//                     marginTop: 16,
//                     marginBottom: 10,
//                     fontSize: 52,
//                     fontWeight: 900,
//                     letterSpacing: "-2px",
//                   }}
//                 >
//                   ₹{price}
//                 </h2>

//                 <p
//                   style={{
//                     margin: 0,
//                     color: "rgba(255,255,255,0.85)",
//                   }}
//                 >
//                   Dynamic event pricing
//                 </p>
//               </div>

//               {/* BASE PRICE */}
//               <div
//                 style={{
//                   background: "#f9fafb",
//                   borderRadius: 28,
//                   padding: 28,
//                   border: "1px solid #e5e7eb",
//                 }}
//               >
//                 <p
//                   style={{
//                     margin: 0,
//                     color: "#9ca3af",
//                     fontSize: 12,
//                     fontWeight: 700,
//                     letterSpacing: 1.4,
//                   }}
//                 >
//                   BASE PRICE
//                 </p>

//                 <h2
//                   style={{
//                     marginTop: 16,
//                     marginBottom: 10,
//                     fontSize: 42,
//                     fontWeight: 900,
//                     color: "#111827",
//                   }}
//                 >
//                   ₹{basePrice}
//                 </h2>

//                 <p
//                   style={{
//                     margin: 0,
//                     color: "#6b7280",
//                     fontWeight: 500,
//                   }}
//                 >
//                   Original ticket value
//                 </p>
//               </div>
//             </div>

//             {/* ADJUSTMENT */}
//             <div
//               style={{
//                 background: "#f9fafb",
//                 border: "1px solid #e5e7eb",
//                 padding: 22,
//                 borderRadius: 22,
//                 marginBottom: 24,
//               }}
//             >
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   flexWrap: "wrap",
//                   gap: 10,
//                 }}
//               >
//                 <span
//                   style={{
//                     fontWeight: 700,
//                     color: "#374151",
//                   }}
//                 >
//                   Price Adjustment
//                 </span>

//                 <span
//                   style={{
//                     fontWeight: 900,
//                     fontSize: 24,
//                     color:
//                       price - basePrice >= 0
//                         ? "#10b981"
//                         : "#ef4444",
//                   }}
//                 >
//                   {price - basePrice >= 0 ? "+" : ""}
//                   ₹{price - basePrice}
//                 </span>
//               </div>
//             </div>

//             {/* BREAKDOWN */}
//             {event.breakdown && (
//               <div
//                 style={{
//                   background: "#111827",
//                   borderRadius: 26,
//                   padding: 28,
//                   color: "white",
//                 }}
//               >
//                 <h3
//                   style={{
//                     marginTop: 0,
//                     marginBottom: 24,
//                     fontSize: 24,
//                     fontWeight: 800,
//                   }}
//                 >
//                   📊 Pricing Breakdown
//                 </h3>

//                 <div
//                   style={{
//                     display: "grid",
//                     gridTemplateColumns:
//                       "repeat(auto-fit,minmax(180px,1fr))",
//                     gap: 18,
//                   }}
//                 >
//                   <div
//                     style={{
//                       background: "rgba(255,255,255,0.06)",
//                       padding: 20,
//                       borderRadius: 18,
//                     }}
//                   >
//                     <p
//                       style={{
//                         margin: 0,
//                         color: "#9ca3af",
//                         fontSize: 12,
//                         fontWeight: 700,
//                         letterSpacing: 1.2,
//                       }}
//                     >
//                       TIME INCREASE
//                     </p>

//                     <h3
//                       style={{
//                         marginTop: 14,
//                         marginBottom: 0,
//                         fontSize: 32,
//                         fontWeight: 900,
//                       }}
//                     >
//                       +{event.breakdown.timeIncrease * 100}%
//                     </h3>
//                   </div>

//                   <div
//                     style={{
//                       background: "rgba(255,255,255,0.06)",
//                       padding: 20,
//                       borderRadius: 18,
//                     }}
//                   >
//                     <p
//                       style={{
//                         margin: 0,
//                         color: "#9ca3af",
//                         fontSize: 12,
//                         fontWeight: 700,
//                         letterSpacing: 1.2,
//                       }}
//                     >
//                       INVENTORY INCREASE
//                     </p>

//                     <h3
//                       style={{
//                         marginTop: 14,
//                         marginBottom: 0,
//                         fontSize: 32,
//                         fontWeight: 900,
//                       }}
//                     >
//                       +{event.breakdown.inventoryIncrease * 100}%
//                     </h3>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* RIGHT SIDE */}
//         <div>
//           {/* BOOKING CARD */}
//           <div
//             style={{
//               background: "#ffffff",
//               borderRadius: 32,
//               padding: 32,
//               boxShadow: "0 15px 45px rgba(0,0,0,0.06)",
//               position: "sticky",
//               top: 30,
//             }}
//           >
//             <p
//               style={{
//                 margin: 0,
//                 color: "#9ca3af",
//                 fontSize: 12,
//                 fontWeight: 700,
//                 letterSpacing: 1.5,
//               }}
//             >
//               BOOK TICKETS
//             </p>

//             <h2
//               style={{
//                 marginTop: 12,
//                 fontSize: 38,
//                 fontWeight: 900,
//                 color: "#111827",
//                 letterSpacing: "-1px",
//               }}
//             >
//               Reserve Seats
//             </h2>

//             {/* AVAILABILITY */}
//             <div
//               style={{
//                 background: "#f9fafb",
//                 borderRadius: 22,
//                 padding: 24,
//                 marginTop: 26,
//                 marginBottom: 24,
//               }}
//             >
//               <p
//                 style={{
//                   margin: 0,
//                   color: "#9ca3af",
//                   fontSize: 12,
//                   fontWeight: 700,
//                   letterSpacing: 1.2,
//                 }}
//               >
//                 AVAILABLE TICKETS
//               </p>

//               <h2
//                 style={{
//                   marginTop: 14,
//                   marginBottom: 0,
//                   fontSize: 52,
//                   fontWeight: 900,
//                   color:
//                     available > 20
//                       ? "#10b981"
//                       : available > 5
//                         ? "#f59e0b"
//                         : "#ef4444",
//                 }}
//               >
//                 {available}
//               </h2>
//             </div>

//             {/* QUANTITY */}
//             <div style={{ marginBottom: 24 }}>
//               <label
//                 style={{
//                   display: "block",
//                   marginBottom: 12,
//                   fontWeight: 700,
//                   color: "#374151",
//                 }}
//               >
//                 Ticket Quantity
//               </label>

//               <input
//                 type="number"
//                 min={1}
//                 max={available}
//                 value={quantity}
//                 onChange={(e) =>
//                   setQuantity(Number(e.target.value))
//                 }
//                 style={{
//                   width: "100%",
//                   padding: "18px 20px",
//                   borderRadius: 18,
//                   border: "1px solid #d1d5db",
//                   fontSize: 18,
//                   fontWeight: 700,
//                   outline: "none",
//                   boxSizing: "border-box",
//                 }}
//               />
//             </div>

//             {/* TOTAL */}
//             <div
//               style={{
//                 background: "#111827",
//                 borderRadius: 22,
//                 padding: 24,
//                 color: "white",
//                 marginBottom: 24,
//               }}
//             >
//               <p
//                 style={{
//                   margin: 0,
//                   color: "#9ca3af",
//                   fontSize: 12,
//                   fontWeight: 700,
//                   letterSpacing: 1.2,
//                 }}
//               >
//                 TOTAL PRICE
//               </p>

//               <h2
//                 style={{
//                   marginTop: 14,
//                   marginBottom: 0,
//                   fontSize: 46,
//                   fontWeight: 900,
//                 }}
//               >
//                 ₹{price * quantity}
//               </h2>
//             </div>

//             {/* BUTTON */}
//             <button
//               disabled={available <= 0 || booking}
//               onClick={book}
//               style={{
//                 width: "100%",
//                 padding: "18px 20px",
//                 borderRadius: 20,
//                 background:
//                   available > 0 && !booking
//                     ? "linear-gradient(135deg,#dc2626,#ef4444)"
//                     : "#d1d5db",
//                 color: "white",
//                 border: "none",
//                 fontWeight: 900,
//                 fontSize: 17,
//                 cursor:
//                   available > 0 && !booking
//                     ? "pointer"
//                     : "not-allowed",
//                 transition: "all 0.3s ease",
//                 boxShadow:
//                   available > 0
//                     ? "0 10px 25px rgba(220,38,38,0.25)"
//                     : "none",
//               }}
//             >
//               {booking
//                 ? "Processing Booking..."
//                 : available > 0
//                   ? "🎟 Book Now"
//                   : "Sold Out"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// );
// }

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function EventDetailPage() {
  const { id } = useParams();
  const eventId = Number(id);

  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // ================= FETCH EVENT =================
  async function fetchEvent() {
    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:5000/events/${eventId}`
      );

      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();

      setEvent(data);
    } catch (err) {
      console.error("Error fetching event:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (eventId) fetchEvent();
  }, [eventId]);

  // ================= BOOKING =================
  async function book() {
    try {
      setBooking(true);

      const res = await fetch(
        "http://localhost:5000/bookings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            eventId,
            userEmail: "test@gmail.com",
            quantity,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Booking failed");
        return;
      }

      const price = event.currentPrice ?? 0;

      window.location.href = `/bookings/success?eventId=${event.id}&totalPrice=${data.totalPrice}&currentPrice=${price}&quantity=${quantity}`;

      fetchEvent();
    } catch (err) {
      console.error("Booking failed:", err);
      alert("Booking failed");
    } finally {
      setBooking(false);
    }
  }

  // ================= STATES =================
  if (loading)
    return <p style={{ padding: 20 }}>Loading...</p>;

  if (!event)
    return <p style={{ padding: 20 }}>Event not found</p>;

  const total =
    event.totalTickets ?? event.total_tickets ?? 0;

  const booked =
    event.bookedTickets ?? event.booked_tickets ?? 0;

  const price =
    event.currentPrice ?? event.current_price ?? 0;

  const basePrice =
    event.basePrice ?? event.base_price ?? 0;

  const available = total - booked;

  // ================= UI =================
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f6f4ef",
        fontFamily: "Inter, sans-serif",
        padding: "30px 16px 60px",
      }}
    >
      <div
        style={{
          maxWidth: 1050,
          margin: "0 auto",
        }}
      >
        {/* HERO SECTION */}
        <div
          style={{
            background:
              "linear-gradient(135deg,#111827 0%,#1f2937 100%)",
            borderRadius: 28,
            padding: "38px 30px",
            position: "relative",
            overflow: "hidden",
            marginBottom: 24,
            color: "white",
          }}
        >
          {/* GLOW */}
          <div
            style={{
              position: "absolute",
              width: 260,
              height: 260,
              borderRadius: "50%",
              background: "rgba(220,38,38,0.16)",
              top: -100,
              right: -80,
              filter: "blur(60px)",
            }}
          />

          <div
            style={{
              position: "relative",
              zIndex: 2,
            }}
          >
            {/* BADGE */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(255,255,255,0.08)",
                border:
                  "1px solid rgba(255,255,255,0.1)",
                padding: "8px 14px",
                borderRadius: 999,
                marginBottom: 20,
                fontWeight: 600,
                fontSize: 12,
              }}
            >
              🎟 Live Event
            </div>

            {/* TITLE */}
            <h1
              style={{
                fontSize: "clamp(28px,4vw,46px)",
                fontWeight: 800,
                lineHeight: 1.1,
                margin: 0,
                letterSpacing: "-2px",
              }}
            >
              {event.name}
            </h1>

            {/* DESCRIPTION */}
            <p
              style={{
                marginTop: 18,
                color: "#d1d5db",
                fontSize: 15,
                lineHeight: 1.7,
                maxWidth: 680,
              }}
            >
              {event.description}
            </p>

            {/* META */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 14,
                marginTop: 22,
              }}
            >
              {/* VENUE */}
              <div
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border:
                    "1px solid rgba(255,255,255,0.1)",
                  padding: "10px 14px",
                  borderRadius: 14,
                  fontSize: 13,
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  color: "#ffffff",
                }}
              >
                <span style={{ fontSize: 14 }}>
                  📍
                </span>

                <span>{event.venue}</span>
              </div>

              {/* EVENT DATE */}
              <div
                style={{
                  background:
                    "rgba(59,130,246,0.12)",
                  border:
                    "1px solid rgba(59,130,246,0.25)",
                  padding: "10px 14px",
                  borderRadius: 14,
                  fontSize: 13,
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  color: "#93c5fd",
                }}
              >
                <span style={{ fontSize: 14 }}>
                  📅
                </span>

                <span>
                  Event:{" "}
                  {event.date
                    ? new Date(
                        event.date
                      ).toLocaleString(
                        "en-IN",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                        }
                      )
                    : "Not available"}
                </span>
              </div>

              {/* CURRENT BOOKING TIME */}
              <div
                style={{
                  background:
                    "rgba(16,185,129,0.12)",
                  border:
                    "1px solid rgba(16,185,129,0.25)",
                  padding: "10px 14px",
                  borderRadius: 14,
                  fontSize: 13,
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  color: "#6ee7b7",
                }}
              >
                <span style={{ fontSize: 14 }}>
                  🕒
                </span>

                <span>
                  Booking:{" "}
                  {new Date().toLocaleString(
                    "en-IN",
                    {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    }
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "1.1fr 0.9fr",
            gap: 22,
          }}
        >
          {/* LEFT SIDE */}
          <div>
            {/* PRICING CARD */}
            <div
              style={{
                background: "#ffffff",
                borderRadius: 24,
                padding: 24,
                boxShadow:
                  "0 12px 35px rgba(0,0,0,0.06)",
                marginBottom: 22,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* TOP BAR */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 6,
                  background:
                    "linear-gradient(90deg,#dc2626,#ef4444)",
                }}
              />

              {/* HEADER */}
              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 14,
                  marginBottom: 22,
                }}
              >
                <div>
                  <p
                    style={{
                      margin: 0,
                      color: "#9ca3af",
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: 1.2,
                    }}
                  >
                    LIVE DYNAMIC PRICING
                  </p>

                  <h2
                    style={{
                      marginTop: 8,
                      marginBottom: 0,
                      fontSize: 28,
                      fontWeight: 800,
                      color: "#111827",
                    }}
                  >
                    Ticket Pricing
                  </h2>
                </div>

                <div
                  style={{
                    background: "#ecfdf5",
                    color: "#10b981",
                    padding: "8px 14px",
                    borderRadius: 999,
                    border: "1px solid #bbf7d0",
                    fontWeight: 700,
                    fontSize: 12,
                  }}
                >
                  ● LIVE
                </div>
              </div>

              {/* PRICE SECTION */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit,minmax(180px,1fr))",
                  gap: 18,
                  marginBottom: 22,
                }}
              >
                {/* CURRENT PRICE */}
                <div
                  style={{
                    background:
                      "linear-gradient(135deg,#dc2626 0%,#ef4444 100%)",
                    borderRadius: 22,
                    padding: 22,
                    color: "white",
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      fontSize: 11,
                      fontWeight: 700,
                    }}
                  >
                    CURRENT PRICE
                  </p>

                  <h2
                    style={{
                      marginTop: 12,
                      marginBottom: 8,
                      fontSize: 38,
                      fontWeight: 800,
                    }}
                  >
                    ₹{price}
                  </h2>
                </div>

                {/* BASE PRICE */}
                <div
                  style={{
                    background: "#f9fafb",
                    borderRadius: 22,
                    padding: 22,
                    border:
                      "1px solid #e5e7eb",
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      color: "#9ca3af",
                      fontSize: 11,
                      fontWeight: 700,
                    }}
                  >
                    BASE PRICE
                  </p>

                  <h2
                    style={{
                      marginTop: 12,
                      marginBottom: 8,
                      fontSize: 34,
                      fontWeight: 800,
                      color: "#111827",
                    }}
                  >
                    ₹{basePrice}
                  </h2>
                </div>
              </div>

              {/* BREAKDOWN */}
              {event.breakdown && (
                <div
                  style={{
                    background: "#111827",
                    borderRadius: 22,
                    padding: 22,
                    color: "white",
                  }}
                >
                  <h3
                    style={{
                      marginTop: 0,
                      marginBottom: 18,
                      fontSize: 20,
                      fontWeight: 800,
                    }}
                  >
                    📊 Pricing Breakdown
                  </h3>

                  <p>
                    Time Increase: +
                    {event.breakdown.timeIncrease *
                      100}
                    %
                  </p>

                  <p>
                    Inventory Increase: +
                    {event.breakdown
                      .inventoryIncrease * 100}
                    %
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div>
            {/* BOOKING CARD */}
            <div
              style={{
                background: "#ffffff",
                borderRadius: 24,
                padding: 24,
                boxShadow:
                  "0 12px 35px rgba(0,0,0,0.06)",
                position: "sticky",
                top: 24,
              }}
            >
              <h2
                style={{
                  marginTop: 0,
                  fontSize: 28,
                  fontWeight: 800,
                  color: "#111827",
                }}
              >
                Reserve Seats
              </h2>

              {/* AVAILABILITY */}
              <div
                style={{
                  background: "#f9fafb",
                  borderRadius: 18,
                  padding: 20,
                  marginTop: 20,
                  marginBottom: 20,
                }}
              >
                <p
                  style={{
                    margin: 0,
                    color: "#9ca3af",
                    fontSize: 11,
                    fontWeight: 700,
                  }}
                >
                  AVAILABLE TICKETS
                </p>

                <h2
                  style={{
                    marginTop: 12,
                    marginBottom: 0,
                    fontSize: 38,
                    fontWeight: 800,
                  }}
                >
                  {available}
                </h2>
              </div>

              {/* QUANTITY */}
              <div style={{ marginBottom: 20 }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: 10,
                    fontWeight: 700,
                    color: "#374151",
                    fontSize: 14,
                  }}
                >
                  Ticket Quantity
                </label>

                <input
                  type="number"
                  min={1}
                  max={available}
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(
                      Number(e.target.value)
                    )
                  }
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    borderRadius: 14,
                    border:
                      "1px solid #d1d5db",
                    fontSize: 15,
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              {/* TOTAL */}
              <div
                style={{
                  background: "#111827",
                  borderRadius: 18,
                  padding: 20,
                  color: "white",
                  marginBottom: 20,
                }}
              >
                <p
                  style={{
                    margin: 0,
                    color: "#9ca3af",
                    fontSize: 11,
                    fontWeight: 700,
                  }}
                >
                  TOTAL PRICE
                </p>

                <h2
                  style={{
                    marginTop: 12,
                    marginBottom: 0,
                    fontSize: 34,
                    fontWeight: 800,
                  }}
                >
                  ₹{price * quantity}
                </h2>
              </div>

              {/* BUTTON */}
              <button
                disabled={
                  available <= 0 || booking
                }
                onClick={book}
                style={{
                  width: "100%",
                  padding: "15px 18px",
                  borderRadius: 16,
                  background:
                    available > 0 &&
                    !booking
                      ? "linear-gradient(135deg,#dc2626,#ef4444)"
                      : "#d1d5db",
                  color: "white",
                  border: "none",
                  fontWeight: 800,
                  fontSize: 15,
                  cursor:
                    available > 0 &&
                    !booking
                      ? "pointer"
                      : "not-allowed",
                }}
              >
                {booking
                  ? "Processing..."
                  : available > 0
                  ? "🎟 Book Now"
                  : "Sold Out"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}