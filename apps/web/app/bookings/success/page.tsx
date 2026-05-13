// // "use client";

// // import { useSearchParams } from "next/navigation";

// // export default function BookingSuccessPage() {
// //   const params = useSearchParams();

// //   const eventId = params.get("eventId");
// //   const totalPrice = params.get("totalPrice");
// //   const currentPrice = params.get("currentPrice");
// //   const quantity = params.get("quantity");

// //   return (
// //     <div
// //       style={{
// //         minHeight: "100vh",
// //         display: "flex",
// //         alignItems: "center",
// //         justifyContent: "center",
// //         background: "#f3f4f6",
// //         fontFamily: "Inter, sans-serif",
// //       }}
// //     >
// //       <div
// //         style={{
// //           background: "#ffffff",
// //           padding: 30,
// //           borderRadius: 12,
// //           boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
// //           width: 350,
// //           textAlign: "center",
// //         }}
// //       >
// //         {/* SUCCESS ICON */}
// //         <div style={{ fontSize: 40, marginBottom: 10 }}>✅</div>

// //         <h1 style={{ fontSize: 22, marginBottom: 10 }}>
// //           Booking Successful
// //         </h1>

// //         <p style={{ color: "#666", fontSize: 14 }}>
// //           Your tickets have been confirmed 🎉
// //         </p>

// //         <hr style={{ margin: "16px 0" }} />

// //         {/* DETAILS */}
// //         <div style={{ textAlign: "left", fontSize: 14 }}>
// //           <p>
// //             <b>Event ID:</b> {eventId}
// //           </p>

// //           <p>
// //             <b>Tickets:</b> {quantity}
// //           </p>

// //           <p
// //             style={{
// //               fontSize: 18,
// //               fontWeight: "bold",
// //               color: "#10b981",
// //               marginTop: 8,
// //             }}
// //           >
// //             ₹{totalPrice}
// //           </p>

// //           <p style={{ color: "#666", fontSize: 13 }}>
// //             Current Price: ₹{currentPrice}
// //           </p>
// //         </div>

// //         <hr style={{ margin: "16px 0" }} />

// //         {/* CTA BUTTON */}
// //         <a href="/events">
// //           <button
// //             style={{
// //               padding: "10px 16px",
// //               borderRadius: 8,
// //               background: "#0070f3",
// //               color: "white",
// //               border: "none",
// //               cursor: "pointer",
// //               width: "100%",
// //               fontWeight: "bold",
// //             }}
// //           >
// //             ← Back to Events
// //           </button>
// //         </a>
// //       </div>
// //     </div>
// //   );
// // }


// "use client";

// import Link from "next/link";
// import { useSearchParams } from "next/navigation";

// export default function BookingSuccessPage() {
//   const params = useSearchParams();

//   const eventId = params.get("eventId");
//   const totalPrice = params.get("totalPrice");
//   const currentPrice = params.get("currentPrice");
//   const quantity = params.get("quantity");

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         background: "#f6f4ef",
//         fontFamily: "Inter, sans-serif",
//         padding: "40px 20px",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <div
//         style={{
//           width: "100%",
//           maxWidth: 850,
//         }}
//       >
//         {/* SUCCESS HERO */}
//         <div
//           style={{
//             background:
//               "linear-gradient(135deg,#111827 0%,#1f2937 100%)",
//             borderRadius: 36,
//             padding: "60px 40px",
//             position: "relative",
//             overflow: "hidden",
//             textAlign: "center",
//             marginBottom: 30,
//           }}
//         >
//           {/* GLOW */}
//           <div
//             style={{
//               position: "absolute",
//               width: 320,
//               height: 320,
//               borderRadius: "50%",
//               background: "rgba(220,38,38,0.18)",
//               top: -120,
//               right: -100,
//               filter: "blur(60px)",
//             }}
//           />

//           {/* SUCCESS ICON */}
//           <div
//             style={{
//               width: 120,
//               height: 120,
//               borderRadius: "50%",
//               background: "rgba(16,185,129,0.12)",
//               border: "2px solid rgba(16,185,129,0.25)",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               margin: "0 auto 28px",
//               position: "relative",
//               zIndex: 2,
//             }}
//           >
//             <span style={{ fontSize: 58 }}>✅</span>
//           </div>

//           {/* BADGE */}
//           <div
//             style={{
//               display: "inline-flex",
//               alignItems: "center",
//               gap: 8,
//               background: "rgba(255,255,255,0.08)",
//               border: "1px solid rgba(255,255,255,0.1)",
//               padding: "10px 18px",
//               borderRadius: 999,
//               marginBottom: 28,
//               fontWeight: 600,
//               fontSize: 14,
//               color: "#ffffff",
//               position: "relative",
//               zIndex: 2,
//             }}
//           >
//             🎟 Booking Confirmed
//           </div>

//           {/* TITLE */}
//           <h1
//             style={{
//               fontSize: "clamp(40px,6vw,72px)",
//               fontWeight: 900,
//               lineHeight: 1,
//               margin: 0,
//               color: "white",
//               letterSpacing: "-3px",
//               position: "relative",
//               zIndex: 2,
//             }}
//           >
//             Tickets Reserved
//           </h1>

//           {/* SUBTEXT */}
//           <p
//             style={{
//               marginTop: 24,
//               color: "#d1d5db",
//               fontSize: 18,
//               lineHeight: 1.8,
//               maxWidth: 650,
//               marginInline: "auto",
//               position: "relative",
//               zIndex: 2,
//             }}
//           >
//             Your booking has been completed successfully and your
//             tickets are now secured 🎉
//           </p>
//         </div>

//         {/* DETAILS CARD */}
//         <div
//           style={{
//             background: "#ffffff",
//             borderRadius: 36,
//             padding: 34,
//             boxShadow: "0 15px 45px rgba(0,0,0,0.06)",
//             position: "relative",
//             overflow: "hidden",
//           }}
//         >
//           {/* TOP BAR */}
//           <div
//             style={{
//               position: "absolute",
//               top: 0,
//               left: 0,
//               right: 0,
//               height: 8,
//               background:
//                 "linear-gradient(90deg,#dc2626,#ef4444)",
//             }}
//           />

//           {/* HEADER */}
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               flexWrap: "wrap",
//               gap: 18,
//               marginBottom: 32,
//             }}
//           >
//             <div>
//               <p
//                 style={{
//                   margin: 0,
//                   color: "#9ca3af",
//                   fontSize: 12,
//                   fontWeight: 700,
//                   letterSpacing: 1.5,
//                 }}
//               >
//                 BOOKING STATUS
//               </p>

//               <h2
//                 style={{
//                   marginTop: 12,
//                   marginBottom: 0,
//                   fontSize: 38,
//                   fontWeight: 900,
//                   color: "#111827",
//                   letterSpacing: "-1px",
//                 }}
//               >
//                 Successfully Reserved
//               </h2>
//             </div>

//             <div
//               style={{
//                 background: "#ecfdf5",
//                 color: "#10b981",
//                 padding: "10px 18px",
//                 borderRadius: 999,
//                 border: "1px solid #bbf7d0",
//                 fontWeight: 800,
//               }}
//             >
//               ● CONFIRMED
//             </div>
//           </div>

//           {/* INFO GRID */}
//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns:
//                 "repeat(auto-fit,minmax(220px,1fr))",
//               gap: 22,
//               marginBottom: 30,
//             }}
//           >
//             {/* EVENT ID */}
//             <div
//               style={{
//                 background: "#f9fafb",
//                 borderRadius: 28,
//                 padding: 28,
//                 border: "1px solid #e5e7eb",
//               }}
//             >
//               <div
//                 style={{
//                   width: 52,
//                   height: 52,
//                   borderRadius: 16,
//                   background: "rgba(220,38,38,0.1)",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   marginBottom: 18,
//                   fontSize: 24,
//                 }}
//               >
//                 🎟
//               </div>

//               <p
//                 style={{
//                   margin: 0,
//                   color: "#9ca3af",
//                   fontSize: 12,
//                   fontWeight: 700,
//                   letterSpacing: 1.4,
//                 }}
//               >
//                 EVENT ID
//               </p>

//               <h3
//                 style={{
//                   marginTop: 14,
//                   marginBottom: 0,
//                   fontSize: 34,
//                   fontWeight: 900,
//                   color: "#111827",
//                 }}
//               >
//                 #{eventId}
//               </h3>
//             </div>

//             {/* TICKETS */}
//             <div
//               style={{
//                 background: "#f9fafb",
//                 borderRadius: 28,
//                 padding: 28,
//                 border: "1px solid #e5e7eb",
//               }}
//             >
//               <div
//                 style={{
//                   width: 52,
//                   height: 52,
//                   borderRadius: 16,
//                   background: "rgba(37,99,235,0.1)",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   marginBottom: 18,
//                   fontSize: 24,
//                 }}
//               >
//                 🎫
//               </div>

//               <p
//                 style={{
//                   margin: 0,
//                   color: "#9ca3af",
//                   fontSize: 12,
//                   fontWeight: 700,
//                   letterSpacing: 1.4,
//                 }}
//               >
//                 TICKETS BOOKED
//               </p>

//               <h3
//                 style={{
//                   marginTop: 14,
//                   marginBottom: 0,
//                   fontSize: 34,
//                   fontWeight: 900,
//                   color: "#111827",
//                 }}
//               >
//                 {quantity}
//               </h3>
//             </div>

//             {/* TOTAL PRICE */}
//             <div
//               style={{
//                 background:
//                   "linear-gradient(135deg,#dc2626 0%,#ef4444 100%)",
//                 borderRadius: 28,
//                 padding: 28,
//                 color: "white",
//                 position: "relative",
//                 overflow: "hidden",
//               }}
//             >
//               {/* BG CIRCLE */}
//               <div
//                 style={{
//                   position: "absolute",
//                   width: 120,
//                   height: 120,
//                   borderRadius: "50%",
//                   background: "rgba(255,255,255,0.1)",
//                   right: -40,
//                   top: -40,
//                 }}
//               />

//               <div
//                 style={{
//                   position: "relative",
//                   zIndex: 2,
//                 }}
//               >
//                 <div
//                   style={{
//                     width: 52,
//                     height: 52,
//                     borderRadius: 16,
//                     background: "rgba(255,255,255,0.12)",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     marginBottom: 18,
//                     fontSize: 24,
//                   }}
//                 >
//                   💰
//                 </div>

//                 <p
//                   style={{
//                     margin: 0,
//                     fontSize: 12,
//                     fontWeight: 700,
//                     letterSpacing: 1.4,
//                     color: "rgba(255,255,255,0.9)",
//                   }}
//                 >
//                   TOTAL PAID
//                 </p>

//                 <h2
//                   style={{
//                     marginTop: 16,
//                     marginBottom: 10,
//                     fontSize: 48,
//                     fontWeight: 900,
//                     letterSpacing: "-2px",
//                   }}
//                 >
//                   ₹{totalPrice}
//                 </h2>

//                 <p
//                   style={{
//                     margin: 0,
//                     color: "rgba(255,255,255,0.85)",
//                     fontWeight: 500,
//                   }}
//                 >
//                   Current Price: ₹{currentPrice}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* INFO BOX */}
//           <div
//             style={{
//               background: "#f9fafb",
//               border: "1px solid #e5e7eb",
//               padding: 24,
//               borderRadius: 24,
//               marginBottom: 28,
//             }}
//           >
//             <p
//               style={{
//                 margin: 0,
//                 color: "#4b5563",
//                 lineHeight: 1.9,
//                 fontSize: 15,
//               }}
//             >
//               Thank you for booking with PASSIFY. Your reservation
//               has been confirmed successfully and your tickets are now
//               secured for the event.
//             </p>
//           </div>

//           {/* BUTTON */}
//           <Link
//             href="/events"
//             style={{
//               display: "block",
//               width: "100%",
//               textDecoration: "none",
//             }}
//           >
//             <button
//               style={{
//                 width: "100%",
//                 padding: "18px 22px",
//                 borderRadius: 20,
//                 background:
//                   "linear-gradient(135deg,#dc2626,#ef4444)",
//                 color: "white",
//                 border: "none",
//                 fontWeight: 900,
//                 fontSize: 17,
//                 cursor: "pointer",
//                 boxShadow:
//                   "0 10px 25px rgba(220,38,38,0.25)",
//               }}
//             >
//               ← Back to Events
//             </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function BookingSuccessPage() {
  const params = useSearchParams();

  const eventId = params.get("eventId");
  const totalPrice = params.get("totalPrice");
  const currentPrice = params.get("currentPrice");
  const quantity = params.get("quantity");

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f6f4ef",
        fontFamily: "Inter, sans-serif",
        padding: "30px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 760,
        }}
      >
        {/* HERO */}
        <div
          style={{
            background:
              "linear-gradient(135deg,#111827 0%,#1f2937 100%)",
            borderRadius: 28,
            padding: "42px 28px",
            position: "relative",
            overflow: "hidden",
            textAlign: "center",
            marginBottom: 24,
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

          {/* ICON */}
          <div
            style={{
              width: 90,
              height: 90,
              borderRadius: "50%",
              background: "rgba(16,185,129,0.12)",
              border: "2px solid rgba(16,185,129,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
              position: "relative",
              zIndex: 2,
            }}
          >
            <span style={{ fontSize: 42 }}>✅</span>
          </div>

          {/* BADGE */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.1)",
              padding: "8px 14px",
              borderRadius: 999,
              marginBottom: 22,
              fontWeight: 600,
              fontSize: 12,
              color: "#ffffff",
              position: "relative",
              zIndex: 2,
            }}
          >
            🎟 Booking Confirmed
          </div>

          {/* TITLE */}
          <h1
            style={{
              fontSize: "clamp(30px,5vw,48px)",
              fontWeight: 800,
              lineHeight: 1.1,
              margin: 0,
              color: "white",
              letterSpacing: "-2px",
              position: "relative",
              zIndex: 2,
            }}
          >
            Tickets Reserved
          </h1>

          {/* TEXT */}
          <p
            style={{
              marginTop: 16,
              color: "#d1d5db",
              fontSize: 15,
              lineHeight: 1.7,
              maxWidth: 520,
              marginInline: "auto",
              position: "relative",
              zIndex: 2,
            }}
          >
            Your booking has been completed successfully and your
            tickets are now secured 🎉
          </p>
        </div>

        {/* MAIN CARD */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: 28,
            padding: 26,
            boxShadow: "0 12px 35px rgba(0,0,0,0.06)",
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
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 14,
              marginBottom: 24,
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
                BOOKING STATUS
              </p>

              <h2
                style={{
                  marginTop: 8,
                  marginBottom: 0,
                  fontSize: 28,
                  fontWeight: 800,
                  color: "#111827",
                  letterSpacing: "-1px",
                }}
              >
                Successfully Reserved
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
              ● CONFIRMED
            </div>
          </div>

          {/* INFO GRID */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(180px,1fr))",
              gap: 18,
              marginBottom: 24,
            }}
          >
            {/* EVENT ID */}
            <div
              style={{
                background: "#f9fafb",
                borderRadius: 22,
                padding: 22,
                border: "1px solid #e5e7eb",
              }}
            >
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 14,
                  background: "rgba(220,38,38,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 14,
                  fontSize: 18,
                }}
              >
                🎟
              </div>

              <p
                style={{
                  margin: 0,
                  color: "#9ca3af",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: 1.2,
                }}
              >
                EVENT ID
              </p>

              <h3
                style={{
                  marginTop: 10,
                  marginBottom: 0,
                  fontSize: 26,
                  fontWeight: 800,
                  color: "#111827",
                }}
              >
                #{eventId}
              </h3>
            </div>

            {/* TICKETS */}
            <div
              style={{
                background: "#f9fafb",
                borderRadius: 22,
                padding: 22,
                border: "1px solid #e5e7eb",
              }}
            >
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 14,
                  background: "rgba(37,99,235,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 14,
                  fontSize: 18,
                }}
              >
                🎫
              </div>

              <p
                style={{
                  margin: 0,
                  color: "#9ca3af",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: 1.2,
                }}
              >
                TICKETS
              </p>

              <h3
                style={{
                  marginTop: 10,
                  marginBottom: 0,
                  fontSize: 26,
                  fontWeight: 800,
                  color: "#111827",
                }}
              >
                {quantity}
              </h3>
            </div>

            {/* TOTAL */}
            <div
              style={{
                background:
                  "linear-gradient(135deg,#dc2626 0%,#ef4444 100%)",
                borderRadius: 22,
                padding: 22,
                color: "white",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  width: 100,
                  height: 100,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.08)",
                  right: -30,
                  top: -30,
                }}
              />

              <div
                style={{
                  position: "relative",
                  zIndex: 2,
                }}
              >
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 14,
                    background: "rgba(255,255,255,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 14,
                    fontSize: 18,
                  }}
                >
                  💰
                </div>

                <p
                  style={{
                    margin: 0,
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: 1.2,
                    color: "rgba(255,255,255,0.9)",
                  }}
                >
                  TOTAL PAID
                </p>

                <h2
                  style={{
                    marginTop: 12,
                    marginBottom: 8,
                    fontSize: 36,
                    fontWeight: 800,
                    letterSpacing: "-1px",
                  }}
                >
                  ₹{totalPrice}
                </h2>

                <p
                  style={{
                    margin: 0,
                    color: "rgba(255,255,255,0.85)",
                    fontSize: 13,
                  }}
                >
                  Current Price: ₹{currentPrice}
                </p>
              </div>
            </div>
          </div>

          {/* INFO BOX */}
          <div
            style={{
              background: "#f9fafb",
              border: "1px solid #e5e7eb",
              padding: 18,
              borderRadius: 20,
              marginBottom: 22,
            }}
          >
            <p
              style={{
                margin: 0,
                color: "#4b5563",
                lineHeight: 1.7,
                fontSize: 14,
              }}
            >
              Thank you for booking with PASSIFY. Your reservation
              has been confirmed successfully.
            </p>
          </div>

          {/* BUTTON */}
          <Link
            href="/events"
            style={{
              display: "block",
              width: "100%",
              textDecoration: "none",
            }}
          >
            <button
              style={{
                width: "100%",
                padding: "15px 18px",
                borderRadius: 16,
                background:
                  "linear-gradient(135deg,#dc2626,#ef4444)",
                color: "white",
                border: "none",
                fontWeight: 800,
                fontSize: 15,
                cursor: "pointer",
                boxShadow:
                  "0 8px 20px rgba(220,38,38,0.22)",
              }}
            >
              ← Back to Events
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}