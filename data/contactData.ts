// src/data/contactData.ts

import { ContactPageContent } from "./types";


export const contactData: ContactPageContent = {
  title: {
    EN: "Stephen's Private Lessons",
    NL: "Stephen's Privelessen",
  },
  aboutMe: {
    EN: "I'm Stephen, a master's student from Amsterdam who turned negative advice into top grades. With a decade of programming experience, I know how to help you. Book a free trial lesson and rediscover the joy in mathematics and programming. See you soon!",
    NL: "Ik ben Stephen, een masterstudent uit Amsterdam die zich omdraaide van een negatief advies naar topcijfers. Met een decennium ervaring in programmeren, weet ik hoe ik je moet helpen. Boek een gratis proefles en vind de lol in wiskunde en programmeren terug. Tot snel!",
  },
  aboutLessons: {
    EN: "With an average score of 8.5 for exam trainings, I know how to help others learn, including programming thanks to my minor during my Master's in Mathematics. Struggling with programming or theory? We focus on what you know and don't know, and make a plan for your assignment. With only one hour available, we make it count, and I offer a week of support via WhatsApp or Messages after our lesson. Let's start soon!",
    NL: "Met een gemiddelde score van 8.5 voor examentrainingen, weet ik hoe ik anderen kan helpen leren, ook in programmeren dankzij mijn minor tijdens mijn Master Wiskunde. Struggle je met programmeren of theorie? We focussen op wat je kent en wat niet, en maken een plan voor je opdracht. Met slechts een uur beschikbaar, zorgen we dat het telt, en ik bied een week lang ondersteuning via WhatsApp of Messages na onze les. Laten we snel beginnen!",
  },
  subjects: {
    primary: [
      { EN: "Arithmetic", NL: "Rekenen" },
      { EN: "Language", NL: "Taal" },
    ],
    secondary: [
      { EN: "Mathematics A/B/C/D", NL: "Wiskunde A/B/C/D" },
      { EN: "Physics", NL: "Natuurkunde" },
      { EN: "Chemistry", NL: "Scheikunde" },
      { EN: "English", NL: "Engels" },
    ],
    higher: [
      { EN: "Business Statistics", NL: "Bedrijfsstatistiek" },
      { EN: "Calculus", NL: "Calculus" },
      { EN: "Economics", NL: "Economie" },
      { EN: "Statistics", NL: "Statistiek" },
      { EN: "Probability Theory", NL: "Kansberekening" },
      { EN: "Linear Algebra", NL: "Lineaire Algebra" },
      { EN: "Set Theory", NL: "Verzamelingenleer" },
      { EN: "Programming (C, C#, C++, CSS, HTML, Java, Javascript, MATLAB, Python, R, React, SPSS, SQL, etc.)", NL: "Programmeren (C, C#, C++, CSS, HTML, Java, Javascript, MATLAB, Python, R, React, SPSS, SQL, etc.)" },
    ],
  },
  pricing: {
    primary: [
      { duration: "Eenmalig (60 min)", price: "€40" },
      { duration: "Pakket (4 * 60 min)", price: "€130" },
      { duration: "Online (4 * 60 min)", price: "€110" },
    ],
    secondary: [
      { duration: "Eenmalig (60 min)", price: "€50" },
      { duration: "Pakket (4 * 60 min)", price: "€180" },
      { duration: "Online (4 * 60 min)", price: "€160" },
    ],
    higher: [
      { duration: "Eenmalig (60 min)", price: "€60" },
      { duration: "Pakket (4 * 60 min)", price: "€200" },
      { duration: "Online (4 * 60 min)", price: "€180" },
    ],
  },
  groupLessons: {
    secondary: [
      { duration: "1 leerling", price: "€50/u" },
      { duration: "2 leerlingen", price: "€40/u p.p." },
      { duration: "3 leerlingen", price: "€30/u p.p." },
      { duration: "4 leerlingen", price: "€25/u p.p." },
    ],
    higher: [
      { duration: "1 leerling", price: "€60/u" },
      { duration: "2 leerlingen", price: "€45/u p.p." },
      { duration: "3 leerlingen", price: "€40/u p.p." },
      { duration: "4 leerlingen", price: "€35/u p.p." },
    ],
  },
  examTraining: {
    description: {
      EN: "I offer guidance for mathematics exams, including a preparatory exam to analyze where help is needed, after which I create a specific study plan.",
      NL: "Ik bied begeleiding bij wiskunde-examens, inclusief een voorbereidend examen om te analyseren waar hulp nodig is, waarna ik een specifiek studieplan opstel.",
    },
    mathA_C: [
      { duration: "Bayes (2 dagen, 5 uur/dag)", price: "€400,-" },
      { duration: "Laplace (4 dagen, 3 uur/dag)", price: "€550,-" },
      { duration: "Gauss (4 dagen, 5 uur/dag)", price: "€700,-" },
    ],
    mathB: [
      { duration: "Hilbert (2 dagen, 5 uur/dag)", price: "€400,-" },
      { duration: "Newton (4 dagen, 3 uur/dag)", price: "€550,-" },
      { duration: "Euler (4 dagen, 5 uur/dag)", price: "€700,-" },
    ],
  },
  contactItems: [
    {
      icon: "FaPhone",
      title: { EN: "Phone", NL: "Telefoon" },
      content: "+31 6 47357426",
      link: "tel:+31647357426",
    },
    {
      icon: "FaEnvelope",
      title: { EN: "Email", NL: "E-mail" },
      content: "s.adei@outlook.com",
      link: "mailto:s.adei@outlook.com",
    },
    {
      icon: "FaMapMarkerAlt",
      title: { EN: "Location", NL: "Locatie" },
      content: "Science Park 904, 1098 XH Amsterdam",
      link: "https://maps.google.com/?q=Science Park 904, 1098 XH Amsterdam",
    },
  ],
};