// src/data/prices.ts

export const prices = {
    higher: [
      { duration: 1, price: 80.00 }, // 1 uur
      { duration: 2, price: 135.00 }, // 2 uur
      { duration: 4, price: 250.00 }, // 4 uur
    ],
    secondary20Plus: [
      { duration: 1, price: 75.00 }, // 1 uur
      { duration: 2, price: 130.00 }, // 2 uur
      { duration: 4, price: 230.00 }, // 4 uur
    ],
    secondary20Minus: [
      { duration: 1, price: 60.00 }, // 1 uur
      { duration: 2, price: 100.00 }, // 2 uur
      { duration: 4, price: 200.00 }, // 4 uur
    ],
    groupLessons: {
      higher: [
        { duration: 1, numberOfPeople: 2, price: 65.00 },  // 2 personen, 1 uur
        { duration: 2, numberOfPeople: 2, price: 110.00 }, // 2 personen, 2 uur
        { duration: 4, numberOfPeople: 2, price: 220.00 }, // 2 personen, 4 uur
      ],
      secondary20Plus: [
        { duration: 1, numberOfPeople: 2, price: 60.00 },  // 2 personen, 1 uur
        { duration: 2, numberOfPeople: 2, price: 115.00 }, // 2 personen, 2 uur
      ],
      secondary20Minus: [
        { duration: 1, numberOfPeople: 2, price: 50.00 },  // 2 personen, 1 uur
        { duration: 2, numberOfPeople: 2, price: 90.00 },  // 2 personen, 2 uur
      ],
    },
    flexibilityPremium: [
      { duration: 2, price: 15.00 },  // Pakket van 2 lessen
      { duration: 4, price: 30.00 },  // Pakket van 4 lessen
      { duration: 6, price: 50.00 },  // Pakket van 6 lessen of meer
    ],
    travelCosts: [
      { location: 'VU/UvA (niet Sciencepark)', price: 15.00 },
      { location: 'Thuis (Amsterdam e.o.)', price: 40.00 },
      { location: 'Sciencepark', price: 0.00 },
    ],
    lastMinuteSurcharges: [
      { timeFrame: "Minder dan 24 uur", percentage: 20 },
      { timeFrame: "Minder dan 12 uur", percentage: 50 },
    ],
  };