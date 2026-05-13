const { calculatePrice } = require("../BACKEND/utils/pricing");

describe("Pricing Engine", () => {

  it("should increase price when tickets are low", () => {
    const event = {
      basePrice: 500,
      totalTickets: 100,
      bookedTickets: 90,
      floorPrice: 300,
      ceilingPrice: 1000,
      date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    };

    const price = calculatePrice(event, 1, 0);

    expect(price).toBeGreaterThan(500);
  });

  it("should respect floor price", () => {
    const event = {
      basePrice: 0,
      totalTickets: 0,
      bookedTickets: 0,
      floorPrice: 300,
      ceilingPrice: 1000,
      date: new Date(),
    };

    const price = calculatePrice(event, 1, 0);

    expect(price).toBe(300);
  });

});

afterAll(async () => {
  await new Promise((resolve) => setTimeout(resolve, 300));
});