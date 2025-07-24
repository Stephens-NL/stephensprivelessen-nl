// src/data/prices.ts

import { config } from './config';

// Nieuwe uitgebreide rekentrajecten data
export const rekentrajectenComparison = {
  title: {
    NL: "Totaaloverzicht – Rekentrajecten",
    EN: "Complete Overview – Math Programs"
  },
  subtitle: {
    NL: "Groepslessen, max. 4 leerlingen",
    EN: "Group lessons, max. 4 students"
  },
  courses: [
    {
      id: "spoedpakket",
      name: { NL: "Spoedpakket", EN: "Rush Package" },
      duration: { NL: "1 week", EN: "1 week" },
      lessons: { NL: "4 u (2–3 sessies)", EN: "4 hrs (2–3 sessions)" },
      personalSupport: { NL: "—", EN: "—" },
      contactHours: { NL: "4 u", EN: "4 hrs" },
      pricePerPerson: "€275",
      pricePerLessonHour: "€68,75",
      totalRevenue: "€1.100",
      workTime: { NL: "5 u", EN: "5 hrs" },
      hourlyRate: "€220",
      refundPolicy: { NL: "n.v.t.", EN: "n/a" },
      highlight: { NL: "Hoogste leerling-uurprijs", EN: "Highest student hourly rate" },
      description: { NL: "Intensief weekprogramma voor acute hulp", EN: "Intensive week program for urgent help" },
      color: "from-red-500 to-orange-500",
      featured: false
    },
    {
      id: "korte-cursus",
      name: { NL: "Korte cursus", EN: "Short Course" },
      duration: { NL: "4 weken", EN: "4 weeks" },
      lessons: { NL: "4 u (1 u/wk)", EN: "4 hrs (1 hr/week)" },
      personalSupport: { NL: "—", EN: "—" },
      contactHours: { NL: "4 u", EN: "4 hrs" },
      pricePerPerson: "€225",
      pricePerLessonHour: "€56,25",
      totalRevenue: "€900",
      workTime: { NL: "5 u", EN: "5 hrs" },
      hourlyRate: "€180",
      refundPolicy: { NL: "n.v.t.", EN: "n/a" },
      highlight: { NL: "Laagste instapprijs", EN: "Lowest entry price" },
      description: { NL: "Rustige opbouw binnen één periode", EN: "Gradual build-up within one period" },
      color: "from-blue-500 to-cyan-500",
      featured: false
    },
    {
      id: "volledig-commit",
      name: { NL: "Volledig – Commit", EN: "Complete – Commit" },
      duration: { NL: "12 weken", EN: "12 weeks" },
      lessons: { NL: "10–11 u les", EN: "10–11 hrs lessons" },
      personalSupport: { NL: "15 min p.p./wk (3 u)", EN: "15 min per person/week (3 hrs)" },
      contactHours: { NL: "13–14 u", EN: "13–14 hrs" },
      pricePerPerson: "€550",
      pricePerLessonHour: "€39–€42",
      totalRevenue: "€2.200",
      workTime: { NL: "24 u", EN: "24 hrs" },
      hourlyRate: "≈€92",
      refundPolicy: { NL: "Géén restitutie; overdraagbaar", EN: "No refund; transferable" },
      highlight: { NL: "25% goedkoper dan Flex", EN: "25% cheaper than Flex" },
      description: { NL: "Volledige commitment, vooraf betaald", EN: "Full commitment, paid upfront" },
      color: "from-purple-500 to-pink-500",
      featured: true
    },
    {
      id: "volledig-flex",
      name: { NL: "Volledig – Flex", EN: "Complete – Flex" },
      duration: { NL: "12 weken", EN: "12 weeks" },
      lessons: { NL: "10–11 u les", EN: "10–11 hrs lessons" },
      personalSupport: { NL: "15 min p.p./wk (3 u)", EN: "15 min per person/week (3 hrs)" },
      contactHours: { NL: "13–14 u", EN: "13–14 hrs" },
      pricePerPerson: "€690 (3×€230)",
      pricePerLessonHour: "€49–€53",
      totalRevenue: "€2.760",
      workTime: { NL: "25 u", EN: "25 hrs" },
      hourlyRate: "≈€110",
      refundPolicy: { NL: "Na elke 4 wk opzegbaar", EN: "Cancellable every 4 weeks" },
      highlight: { NL: "Flexibiliteit tegen meerprijs", EN: "Flexibility for premium price" },
      description: { NL: "Maximum flexibiliteit voor studenten", EN: "Maximum flexibility for students" },
      color: "from-emerald-500 to-teal-500",
      featured: false
    }
  ],
  features: [
    { 
      id: "duration", 
      label: { NL: "Duur", EN: "Duration" },
      short: { NL: "Duur", EN: "Duration" }
    },
    { 
      id: "lessons", 
      label: { NL: "Lesmomenten", EN: "Lesson sessions" },
      short: { NL: "Lessen", EN: "Lessons" }
    },
    { 
      id: "personalSupport", 
      label: { NL: "Persoonlijk spreekuur", EN: "Personal office hours" },
      short: { NL: "Spreekuur", EN: "Office hrs" }
    },
    { 
      id: "contactHours", 
      label: { NL: "Contact-uren leerling", EN: "Student contact hours" },
      short: { NL: "Contact", EN: "Contact" }
    },
    { 
      id: "pricePerPerson", 
      label: { NL: "Prijs p.p.", EN: "Price per person" },
      short: { NL: "Prijs", EN: "Price" }
    },
    { 
      id: "pricePerLessonHour", 
      label: { NL: "€ / leeruur leerling", EN: "€ / lesson hour student" },
      short: { NL: "€/uur", EN: "€/hr" }
    },
    { 
      id: "refundPolicy", 
      label: { NL: "Refund-beleid", EN: "Refund policy" },
      short: { NL: "Refund", EN: "Refund" }
    }
  ]
};

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