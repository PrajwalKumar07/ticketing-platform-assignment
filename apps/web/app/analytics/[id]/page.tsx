"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface AnalyticsData {
  eventId: string;
  ticketsSold: number;
  revenue: number;
  avgPrice: number;
  currentPrice: number;
  remaining: number;
}

function StatCard({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string;
  sub?: string;
  accent?: string;
}) {
  return (
    <div style={styles.card}>
      <span style={{ ...styles.cardLabel, color: accent ?? "#6b7280" }}>
        {label}
      </span>
      <span style={styles.cardValue}>{value}</span>
      {sub && <span style={styles.cardSub}>{sub}</span>}
    </div>
  );
}

function SkeletonCard() {
  return (
    <div style={{ ...styles.card, gap: 10 }}>
      <div style={styles.skeletonLine} />
      <div style={{ ...styles.skeletonLine, width: "60%", height: 28 }} />
    </div>
  );
}

export default function AnalyticsPage() {
  const { id } = useParams();
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const res = await fetch(`http://localhost:5000/analytics/${id}`);
        if (!res.ok) throw new Error("Failed");
        const result = await res.json();
        setData(result);
      } catch {
        setError(true);
      }
    }
    if (id) fetchAnalytics();
  }, [id]);

  const sold = data?.ticketsSold ?? 0;
  const total = sold + (data?.remaining ?? 0);
  const fillPct = total > 0 ? Math.round((sold / total) * 100) : 0;

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <div style={styles.iconBadge}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="20" x2="18" y2="10" />
              <line x1="12" y1="20" x2="12" y2="4" />
              <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
          </div>
          <div>
            <h1 style={styles.heading}>Event Analytics</h1>
            {data?.eventId && <p style={styles.eventId}>ID: {data.eventId}</p>}
          </div>
        </div>
        <div style={styles.liveBadge}>
          <span style={styles.liveDot} />
          Live
        </div>
      </div>

      {/* Stat Grid */}
      <div style={styles.grid}>
        {error ? (
          <div style={styles.errorBanner}>
            Failed to load analytics. Please try again.
          </div>
        ) : !data ? (
          Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)
        ) : (
          <>
            <StatCard
              label="Total Revenue"
              value={`₹${data.revenue.toLocaleString("en-IN")}`}
              accent="#0d9488"
            />
            <StatCard
              label="Tickets Sold"
              value={sold.toLocaleString("en-IN")}
              sub={`${data.remaining} remaining`}
              accent="#6366f1"
            />
            <StatCard
              label="Average Price"
              value={`₹${data.avgPrice.toLocaleString("en-IN")}`}
              accent="#f59e0b"
            />
            <StatCard
              label="Current Price"
              value={`₹${data.currentPrice.toLocaleString("en-IN")}`}
              accent="#3b82f6"
            />
          </>
        )}
      </div>

      {/* Capacity bar */}
      {data && (
        <div style={styles.capacitySection}>
          <div style={styles.capacityHeader}>
            <span style={styles.capacityLabel}>Capacity filled</span>
            <span style={styles.capacityPct}>{fillPct}%</span>
          </div>
          <div style={styles.barTrack}>
            <div
              style={{
                ...styles.barFill,
                width: `${fillPct}%`,
                background:
                  fillPct > 85
                    ? "#ef4444"
                    : fillPct > 60
                      ? "#f59e0b"
                      : "#0d9488",
              }}
            />
          </div>
          <div style={styles.capacityFooter}>
            <span style={styles.capacityNote}>{sold} sold</span>
            <span style={styles.capacityNote}>{data.remaining} available</span>
          </div>
        </div>
      )}
    </div>
  );
}

// const styles: Record<string, React.CSSProperties> = {
//   page: {
//     maxWidth: 720,
//     margin: "0 auto",
//     padding: "2rem 1.5rem",
//     fontFamily:
//       "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
//   },
//   header: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: "1.75rem",
//   },
//   headerLeft: {
//     display: "flex",
//     alignItems: "center",
//     gap: 12,
//   },
//   iconBadge: {
//     width: 40,
//     height: 40,
//     borderRadius: 10,
//     background: "#f0fdfa",
//     border: "1px solid #99f6e4",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     color: "#0d9488",
//     flexShrink: 0,
//   },
//   heading: {
//     margin: 0,
//     fontSize: 20,
//     fontWeight: 600,
//     color: "#111827",
//     letterSpacing: "-0.3px",
//   },
//   eventId: {
//     margin: "2px 0 0",
//     fontSize: 12,
//     color: "#9ca3af",
//     fontFamily: "monospace",
//   },
//   liveBadge: {
//     display: "flex",
//     alignItems: "center",
//     gap: 6,
//     fontSize: 12,
//     fontWeight: 500,
//     color: "#059669",
//     background: "#ecfdf5",
//     border: "1px solid #a7f3d0",
//     borderRadius: 20,
//     padding: "4px 10px",
//   },
//   liveDot: {
//     display: "inline-block",
//     width: 6,
//     height: 6,
//     borderRadius: "50%",
//     background: "#10b981",
//     animation: "pulse 2s infinite",
//   },
//   grid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
//     gap: 12,
//     marginBottom: "1.5rem",
//   },
//   card: {
//     display: "flex",
//     flexDirection: "column",
//     gap: 6,
//     padding: "1rem 1.25rem",
//     background: "#ffffff",
//     border: "1px solid #e5e7eb",
//     borderRadius: 12,
//     boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
//   },
//   cardLabel: {
//     fontSize: 11,
//     fontWeight: 600,
//     textTransform: "uppercase",
//     letterSpacing: "0.06em",
//   },
//   cardValue: {
//     fontSize: 22,
//     fontWeight: 700,
//     color: "#111827",
//     letterSpacing: "-0.5px",
//   },
//   cardSub: {
//     fontSize: 12,
//     color: "#9ca3af",
//     marginTop: -2,
//   },
//   skeletonLine: {
//     height: 14,
//     width: "80%",
//     background: "#f3f4f6",
//     borderRadius: 6,
//     animation: "shimmer 1.5s infinite",
//   },
//   errorBanner: {
//     gridColumn: "1 / -1",
//     padding: "1rem 1.25rem",
//     background: "#fef2f2",
//     border: "1px solid #fecaca",
//     borderRadius: 12,
//     color: "#b91c1c",
//     fontSize: 14,
//     fontWeight: 500,
//   },
//   capacitySection: {
//     background: "#ffffff",
//     border: "1px solid #e5e7eb",
//     borderRadius: 12,
//     padding: "1rem 1.25rem",
//     boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
//   },
//   capacityHeader: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   capacityLabel: {
//     fontSize: 13,
//     fontWeight: 500,
//     color: "#374151",
//   },
//   capacityPct: {
//     fontSize: 13,
//     fontWeight: 700,
//     color: "#111827",
//   },
//   barTrack: {
//     height: 8,
//     borderRadius: 99,
//     background: "#f3f4f6",
//     overflow: "hidden",
//   },
//   barFill: {
//     height: "100%",
//     borderRadius: 99,
//     transition: "width 0.6s cubic-bezier(0.4,0,0.2,1)",
//   },
//   capacityFooter: {
//     display: "flex",
//     justifyContent: "space-between",
//     marginTop: 8,
//   },
//   capacityNote: {
//     fontSize: 12,
//     color: "#9ca3af",
//   },
// };

const styles: Record<string, React.CSSProperties> = {
  page: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "3rem 1.5rem",
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    minHeight: "100vh",
    background: "#f6f4ef",
  },

  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "2.5rem",
    flexWrap: "wrap",
    gap: 20,
  },

  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: 18,
  },

  iconBadge: {
    width: 58,
    height: 58,
    borderRadius: 18,
    background: "linear-gradient(135deg,#dc2626,#ef4444)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
    flexShrink: 0,
    boxShadow: "0 10px 25px rgba(220,38,38,0.25)",
  },

  heading: {
    margin: 0,
    fontSize: "clamp(30px,5vw,48px)",
    fontWeight: 900,
    color: "#111827",
    letterSpacing: "-2px",
    lineHeight: 1,
  },

  eventId: {
    margin: "10px 0 0",
    fontSize: 14,
    color: "#6b7280",
    fontWeight: 600,
    fontFamily: "monospace",
  },

  liveBadge: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    fontSize: 14,
    fontWeight: 700,
    color: "#059669",
    background: "#ecfdf5",
    border: "1px solid #a7f3d0",
    borderRadius: 999,
    padding: "10px 18px",
    boxShadow: "0 4px 12px rgba(16,185,129,0.12)",
  },

  liveDot: {
    display: "inline-block",
    width: 10,
    height: 10,
    borderRadius: "50%",
    background: "#10b981",
    boxShadow: "0 0 10px rgba(16,185,129,0.8)",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 22,
    marginBottom: "2rem",
  },

  card: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    padding: "1.8rem",
    background: "#ffffff",
    border: "1px solid rgba(255,255,255,0.5)",
    borderRadius: 28,
    boxShadow: "0 12px 35px rgba(0,0,0,0.06)",
    position: "relative",
    overflow: "hidden",
    transition: "all 0.3s ease",
  },

  cardLabel: {
    fontSize: 12,
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: "0.12em",
  },

  cardValue: {
    fontSize: 38,
    fontWeight: 900,
    color: "#111827",
    letterSpacing: "-1.5px",
    lineHeight: 1,
  },

  cardSub: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 6,
    fontWeight: 500,
  },

  skeletonLine: {
    height: 16,
    width: "80%",
    background: "#f3f4f6",
    borderRadius: 999,
  },

  errorBanner: {
    gridColumn: "1 / -1",
    padding: "1.2rem 1.5rem",
    background: "#fef2f2",
    border: "1px solid #fecaca",
    borderRadius: 20,
    color: "#b91c1c",
    fontSize: 15,
    fontWeight: 600,
    boxShadow: "0 6px 18px rgba(239,68,68,0.08)",
  },

  capacitySection: {
    background: "#ffffff",
    border: "1px solid rgba(255,255,255,0.5)",
    borderRadius: 32,
    padding: "2rem",
    boxShadow: "0 14px 40px rgba(0,0,0,0.06)",
    position: "relative",
    overflow: "hidden",
  },

  capacityHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
    flexWrap: "wrap",
    gap: 12,
  },

  capacityLabel: {
    fontSize: 15,
    fontWeight: 700,
    color: "#111827",
    letterSpacing: "-0.3px",
  },

  capacityPct: {
    fontSize: 18,
    fontWeight: 900,
    color: "#111827",
  },

  barTrack: {
    height: 18,
    borderRadius: 999,
    background: "#f3f4f6",
    overflow: "hidden",
    marginBottom: 16,
  },

  barFill: {
    height: "100%",
    borderRadius: 999,
    transition: "width 0.8s cubic-bezier(0.4,0,0.2,1)",
    boxShadow: "0 0 18px rgba(0,0,0,0.12)",
  },

  capacityFooter: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 10,
    flexWrap: "wrap",
    gap: 10,
  },

  capacityNote: {
    fontSize: 14,
    color: "#6b7280",
    fontWeight: 600,
  },
};