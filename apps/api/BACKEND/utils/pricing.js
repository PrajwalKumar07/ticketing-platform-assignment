function calculatePrice(event, quantity, recentBookings = 0) {
  const totalTickets = Number(event.total_tickets ?? event.totalTickets ?? 0);
  const bookedTickets = Number(event.booked_tickets ?? event.bookedTickets ?? 0);

  const basePrice = Number(event.base_price ?? event.basePrice ?? 0);
  const floorPrice = Number(event.floor_price ?? event.floorPrice ?? 0);
  const ceilingPrice = Number(event.ceiling_price ?? event.ceilingPrice ?? 10000);

  const safeBase = basePrice > 0 ? basePrice : floorPrice;

  if (!totalTickets || totalTickets <= 0) {
    return floorPrice;
  }

  const now = new Date();
  const eventDate = new Date(event.date);

  const daysLeft = Math.max(
    0,
    (eventDate - now) / (1000 * 60 * 60 * 24)
  );

  let timeFactor = 0;
  if (daysLeft <= 1) timeFactor = 0.5;
  else if (daysLeft <= 7) timeFactor = 0.2;

  const remaining = totalTickets - bookedTickets;
  const ratio = totalTickets > 0 ? remaining / totalTickets : 0;

  let inventoryFactor = 0;
  if (ratio < 0.2) inventoryFactor = 0.25;
  else if (ratio < 0.5) inventoryFactor = 0.1;

  let demandFactor = Math.min(0.2, recentBookings * 0.01);

  const rawPrice =
    safeBase * (1 + timeFactor + inventoryFactor + demandFactor);

  const safePrice = isNaN(rawPrice) ? floorPrice : rawPrice;

  return Math.max(
    floorPrice,
    Math.min(ceilingPrice, Math.round(safePrice))
  );
}

// ✅ THIS LINE IS THE KEY FIX
module.exports = { calculatePrice };