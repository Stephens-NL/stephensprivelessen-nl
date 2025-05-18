// src/data/prices.ts

import { config } from './config';

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
        { duration: "Pakket van 2 lessen", price: `€${config.pricing.flexibilityPremium.twoLessons}` },
        { duration: "Pakket van 4 lessen", price: `€${config.pricing.flexibilityPremium.fourLessons}` },
        { duration: "Pakket van 6 lessen of meer", price: `€${config.pricing.flexibilityPremium.sixOrMoreLessons}` },
    ],
    travelCosts: [
        { duration: "VU/UvA (niet Sciencepark)", price: `€${config.pricing.travelCosts.vuUva}` },
        { duration: "Thuis (Amsterdam e.o.)", price: `€${config.pricing.travelCosts.homeAmsterdam}` },
        { duration: "Sciencepark", price: `€${config.pricing.travelCosts.sciencePark}` },
    ],
    lastMinuteSurcharges: [
        { timeFrame: "Minder dan 24 uur van tevoren gepland", percentage: config.pricing.lastMinuteSurcharges.lessThan24Hours },
        { timeFrame: "Minder dan 12 uur van tevoren gepland", percentage: config.pricing.lastMinuteSurcharges.lessThan12Hours },
    ],
  };