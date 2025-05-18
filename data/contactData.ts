// src/data/contactData.ts

import { ContactPageContent } from "./types";
import { config } from './config';

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
    higher: [
      { duration: "Enkel uur", price: "€80,00" },
      { duration: "Twee uren", price: "€135,00" },
      { duration: "Vier uren", price: "€250,00" },
    ],
    secondary20Plus: [
      { duration: "Enkel uur", price: "€75,00" },
      { duration: "Twee uren", price: "€130,00" },
      { duration: "Vier uren", price: "€230,00" },
    ],
    secondary20Minus: [
      { duration: "Enkel uur", price: "€60,00" },
      { duration: "Twee uren", price: "€100,00" },
      { duration: "Vier uren", price: "€200,00" },
    ],
  },
  groupLessons: {
    higher: [
      { duration: "2 Personen (1 uur)", price: "€65,00" },
      { duration: "2 Personen (2 uren)", price: "€110,00" },
      { duration: "2 Personen (4 uren)", price: "€220,00" },
      { duration: "3-4 Personen (1 uur)", price: "€65,00" },
      { duration: "3-4 Personen (2 uren)", price: "€110,00" },
      { duration: "3-4 Personen (4 uren)", price: "€200,00" },
    ],
    secondary20Plus: [
      { duration: "2 Personen (1 uur)", price: "€60,00" },
      { duration: "2 Personen (2 uren)", price: "€115,00" },
      { duration: "2 Personen (4 uren)", price: "€210,00" },
      { duration: "3-4 Personen (1 uur)", price: "€60,00" },
      { duration: "3-4 Personen (2 uren)", price: "€105,00" },
      { duration: "3-4 Personen (4 uren)", price: "€190,00" },
    ],
    secondary20Minus: [
      { duration: "2 Personen (1 uur)", price: "€50,00" },
      { duration: "2 Personen (2 uren)", price: "€90,00" },
      { duration: "2 Personen (4 uren)", price: "€180,00" },
      { duration: "3-4 Personen (1 uur)", price: "€45,00" },
      { duration: "3-4 Personen (2 uren)", price: "€85,00" },
      { duration: "3-4 Personen (4 uren)", price: "€160,00" },
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
  // terms: [
  //   {
  //     title: "Vooraf Betalen",
  //     items: [
  //       "Alle lessen en lespakketten dienen volledig vooraf te worden betaald.",
  //       "Betaling moet zijn voldaan binnen 48 uur na boeking en uiterlijk 72 uur vóór aanvang van de (eerste) les.",
  //       "Bij niet-tijdige betaling vervalt de reservering automatisch en kan de lestijd aan een andere leerling worden toegewezen.",
  //     ],
  //   },
  //   {
  //     title: "Annulering en Verplaatsing",
  //     items: [
  //       "Verplaatsing van een les is kosteloos mogelijk tot 72 uur voor de geplande lestijd, maximaal één keer per geboekte les.",
  //       "Annulering tot 72 uur voor de geplande les: 25% van het lestarief wordt in rekening gebracht.",
  //       "Annulering binnen 72 uur voor de geplande les: 75% van het lestarief wordt in rekening gebracht.",
  //       "No-show of annulering binnen 24 uur voor de geplande les: 100% van het lestarief wordt in rekening gebracht.",
  //     ],
  //   },
  //   {
  //     title: "Lespakketten",
  //     items: [
  //       "Lespakketten zijn geldig tot het einde van het schooljaar waarin ze zijn aangeschaft.",
  //       "Ongebruikte lessen uit een pakket vervallen aan het einde van de geldigheidsperiode zonder restitutie.",
  //       "De annuleringsvoorwaarden voor individuele lessen binnen een pakket blijven hetzelfde als hierboven beschreven.",
  //     ],
  //   },
  //   {
  //     title: "Terugbetaling",
  //     items: [
  //       "Er geldt een no-refund beleid voor alle betaalde lessen en pakketten.",
  //       "In uitzonderlijke gevallen kan een tegoed worden verstrekt voor toekomstige lessen, ter beoordeling van de docent.",
  //     ],
  //   },
  //   {
  //     title: "Inplannen van Lessen",
  //     items: [
  //       "Bij directe inplanning van alle lesdata bij aankoop van het pakket, vervalt de flexibiliteitspremium.",
  //       "Niet ingeplande lessen uit een pakket dienen minimaal 2 weken voor het einde van de geldigheidsperiode te worden ingepland.",
  //     ],
  //   },
  //   {
  //     title: "Aanvullende Voorwaarden",
  //     items: [
  //       "Kosten voor lesmateriaal zijn niet inbegrepen in het lestarief en worden apart in rekening gebracht.",
  //       "Leerlingen dienen volledig voorbereid op les te komen. Bij onvoldoende voorbereiding kan de docent besluiten de les te beëindigen zonder restitutie.",
  //       "De docent spant zich in voor optimale begeleiding maar garandeert geen specifieke resultaten.",
  //       "De leerling blijft volledig verantwoordelijk voor zijn/haar studievoortgang en resultaten.",
  //       "Persoonlijke informatie wordt vertrouwelijk behandeld conform de geldende privacywetgeving.",
  //       "De docent behoudt zich het recht voor om geanonimiseerde studiegegevens te gebruiken voor kwaliteitsverbetering.",
  //       "Tarieven en voorwaarden kunnen op elk moment worden aangepast.",
  //       "Wijzigingen gelden direct voor nieuwe boekingen en vanaf de eerstvolgende verlenging voor bestaande pakketten.",
  //       "Bij overmachtssituaties wordt de les verplaatst naar een ander tijdstip in overleg met de leerling.",
  //       "Als verplaatsing niet mogelijk is, wordt de les als tegoed bewaard met een geldigheid van 3 maanden.",
  //     ],
  //   },
  // ],
  contactItems: [
    {
      icon: "FaPhone",
      title: { EN: "Phone", NL: "Telefoon" },
      content: config.contact.display.phone,
      href: config.contact.display.href,
    },
    {
      icon: "FaEnvelope",
      title: { EN: "Email", NL: "E-mail" },
      content: config.contact.email,
      href: `mailto:${config.contact.email}`,
    },
    {
      icon: "FaMapMarkerAlt",
      title: { EN: "Location", NL: "Locatie" },
      content: `${config.business.mainOffice.address}, ${config.business.mainOffice.postalCode} ${config.business.mainOffice.city}`,
      href: config.business.mainOffice.googleMapsUrl,
    },
  ],
};