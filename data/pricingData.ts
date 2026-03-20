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
      color: "from-[var(--terracotta)] to-[var(--amber)]",
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
      color: "from-[var(--ink)] to-[var(--ink-light)]",
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
      color: "from-[var(--amber)] to-[var(--amber-hover)]",
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
      color: "from-[var(--sage)] to-[var(--sage-light)]",
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

// Package-based pricing (4-uurs pakketten — enige aangeboden vorm)
// VO = Voortgezet Onderwijs (middelbare school)
// HBO/WO = Hoger onderwijs
// Weekend HvA = Weekend programma (50% van VO-tarief)

export const voOnlinePackages = [
  { students: 1, packagePrice: 240, pricePerPerson: 240 },
  { students: 2, packagePrice: 320, pricePerPerson: 160 },
  { students: 3, packagePrice: 420, pricePerPerson: 140 },
  { students: 4, packagePrice: 520, pricePerPerson: 130 },
];

export const voPhysicalPackages = [
  { students: 1, packagePrice: 300, pricePerPerson: 300 },
  { students: 2, packagePrice: 400, pricePerPerson: 200 },
  { students: 3, packagePrice: 525, pricePerPerson: 175 },
  { students: 4, packagePrice: 640, pricePerPerson: 160 },
];

export const hboWoOnlinePackages = [
  { students: 1, packagePrice: 360, pricePerPerson: 360 },
  { students: 2, packagePrice: 520, pricePerPerson: 260 },
  { students: 3, packagePrice: 660, pricePerPerson: 220 },
];

export const hboWoPhysicalPackages = [
  { students: 1, packagePrice: 450, pricePerPerson: 450 },
  { students: 2, packagePrice: 600, pricePerPerson: 300 },
  { students: 3, packagePrice: 780, pricePerPerson: 260 },
];

export const weekendHvaOnlinePackages = [
  { students: 1, packagePrice: 120, pricePerPerson: 120 },
  { students: 2, packagePrice: 160, pricePerPerson: 80 },
  { students: 3, packagePrice: 210, pricePerPerson: 70 },
  { students: 4, packagePrice: 260, pricePerPerson: 65 },
];

export const weekendHvaPhysicalPackages = [
  { students: 1, packagePrice: 150, pricePerPerson: 150 },
  { students: 2, packagePrice: 200, pricePerPerson: 100 },
  { students: 3, packagePrice: 260, pricePerPerson: 87 },
  { students: 4, packagePrice: 320, pricePerPerson: 80 },
];

// Spoedpakketten (2 uur)
export const spoedPrices = {
  voOnline: 120,
  voPhysical: 180,
  hboWoOnline: 180,
  hboWoPhysical: 260,
};

// Legacy shape kept for PricingPage.tsx (duration in hours, price = pakketprijs 1 student)
// Business only sells 4hr packages — 1-student package price shown per tier.
export const prices = {
  // VO online — 4hr packages (1 student)
  higher: [
    { duration: 4, price: 360.00 }, // HBO/WO online, 1 student — 4 uur pakket
  ],
  // VO online — 4hr packages
  secondary20Plus: [
    { duration: 4, price: 240.00 }, // VO online, 1 student — 4 uur pakket
  ],
  // VO fysiek — 4hr packages
  secondary20Minus: [
    { duration: 4, price: 300.00 }, // VO fysiek, 1 student — 4 uur pakket
  ],
  flexibilityPremium: [
    { duration: "Pakket van 2 lessen", price: `€${config.pricing.flexibilityPremium.twoLessons}` },
    { duration: "Pakket van 4 lessen", price: `€${config.pricing.flexibilityPremium.fourLessons}` },
    { duration: "Pakket van 6 lessen of meer", price: `€${config.pricing.flexibilityPremium.sixOrMoreLessons}` },
  ],
  travelCosts: [
    { duration: "Science Park", price: `€${config.pricing.travelCosts.sciencePark}` },
    { duration: "Uni (buiten Science Park)", price: `€${config.pricing.travelCosts.vuUva}` },
    { duration: "Aan huis (Amsterdam e.o.)", price: `€${config.pricing.travelCosts.homeAmsterdam}` },
  ],
  lastMinuteSurcharges: [
    { timeFrame: "Minder dan 24 uur van tevoren gepland", percentage: config.pricing.lastMinuteSurcharges.lessThan24Hours },
    { timeFrame: "Minder dan 12 uur van tevoren gepland", percentage: config.pricing.lastMinuteSurcharges.lessThan12Hours },
  ],
};

// Scriptiebegeleiding tarieven (uurtarief — apart product, niet pakketgebaseerd)
export const scriptieRates = [
  { duration: "Statistiek & Onderzoek", price: "€90/uur" },
  { duration: "Data Science & AI", price: "€100/uur" },
];