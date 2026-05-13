export function calculatePrice({
  basePrice,
  eventDate,
  ticketsSold,
  totalTickets,
  recentBookings,
}: {
  basePrice: number;
  eventDate: Date;
  ticketsSold: number;
  totalTickets: number;
  recentBookings: number;
}) {
  let adjustment = 0;

  const daysLeft =
    (new Date(eventDate).getTime() - Date.now()) /
    (1000 * 60 * 60 * 24);

  // Time rule
  if (daysLeft <= 1) adjustment += 0.5;
  else if (daysLeft <= 7) adjustment += 0.2;

  // Demand rule
  if (recentBookings > 10) adjustment += 0.15;

  // Inventory rule
  const remainingRatio =
    (totalTickets - ticketsSold) / totalTickets;

  if (remainingRatio < 0.2) adjustment += 0.25;

  let price = basePrice * (1 + adjustment);

  const floor = basePrice * 0.5;
  const ceiling = basePrice * 2;

  if (price < floor) price = floor;
  if (price > ceiling) price = ceiling;

  return Math.round(price);
}