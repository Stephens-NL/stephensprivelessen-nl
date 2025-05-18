// src/data/businessData.ts
import { TFunction } from 'next-i18next';
import { config } from './config';

export const getBusinessData = (t: TFunction) => ({
  title: t('common:siteName'),
  subjects: {
    primary: [
      { NL: 'Rekenen', EN: 'Arithmetic' },
      { NL: 'Taal', EN: 'Language' }
    ],
    secondary: [
      { NL: 'Wiskunde A/B/C/D', EN: 'Mathematics A/B/C/D', id: 'voortgezet-Wiskunde' },
      { NL: 'Natuurkunde', EN: 'Physics', id: 'voortgezet-Natuurkunde' },
      { NL: 'Scheikunde', EN: 'Chemistry', id: 'voortgezet-Scheikunde' },
      { NL: 'Engels', EN: 'English', id: 'voortgezet-Engels' },
      { NL: 'Nederlands', EN: 'Dutch', id: 'voortgezet-Nederlands' },
      { NL: 'Biologie', EN: 'Biology', id: 'voortgezet-Biologie' },
      { NL: 'Economie', EN: 'Economics', id: 'voortgezet-Economie' },
      { NL: 'M&O', EN: 'M&O', id: 'voortgezet-MO' },
      { NL: 'Bedrijfseconomie', EN: 'Business Economics', id: 'voortgezet-Bedrijfseconomie' }
    ],
    higher: [
      { NL: 'Bedrijfsstatistiek', EN: 'Business Statistics', id: 'hoger-Bedrijfsstatistiek' },
      { NL: 'Calculus', EN: 'Calculus', id: 'hoger-Calculus' },
      { NL: 'Economie', EN: 'Economics', id: 'hoger-Economie' },
      { NL: 'Statistiek', EN: 'Statistics', id: 'hoger-Statistiek' },
      { NL: 'Kansberekening', EN: 'Probability', id: 'hoger-Kansberekening' },
      { NL: 'Lineaire Algebra', EN: 'Linear Algebra', id: 'hoger-LineaireAlgebra' },
      { NL: 'Verzamelingenleer', EN: 'Set Theory', id: 'hoger-Verzamelingenleer' }
    ],
    programming: [
      { NL: 'C', EN: 'C' },
      { NL: 'C#', EN: 'C#' },
      { NL: 'C++', EN: 'C++' },
      { NL: 'CSS', EN: 'CSS' },
      { NL: 'HTML', EN: 'HTML' },
      { NL: 'Java', EN: 'Java' },
      { NL: 'JavaScript', EN: 'JavaScript' },
      { NL: 'MATLAB', EN: 'MATLAB' },
      { NL: 'Python', EN: 'Python' },
      { NL: 'R', EN: 'R' },
      { NL: 'React', EN: 'React' },
      { NL: 'SPSS', EN: 'SPSS' },
      { NL: 'SQL', EN: 'SQL' }
    ]
  },
  pricing: {
    higher: [
      { duration: t('pricing:singleHour'), price: "€80,00" },
      { duration: t('pricing:twoHours'), price: "€135,00" },
      { duration: t('pricing:fourHours'), price: "€250,00" },
    ],
    secondary20Plus: [
      { duration: t('pricing:singleHour'), price: "€75,00" },
      { duration: t('pricing:twoHours'), price: "€130,00" },
      { duration: t('pricing:fourHours'), price: "€230,00" },
    ],
    secondary20Minus: [
      { duration: t('pricing:singleHour'), price: "€60,00" },
      { duration: t('pricing:twoHours'), price: "€100,00" },
      { duration: t('pricing:fourHours'), price: "€200,00" },
    ],
  },
  contactItems: [
    {
      icon: "FaPhone",
      title: 'contact:contactInfo.phone',
      content: config.contact.display.phone,
      href: config.contact.display.href,
    },
    {
      icon: "FaEnvelope",
      title: 'contact:contactInfo.email',
      content: config.contact.email,
      href: `mailto:${config.contact.email}`,
    },
    {
      icon: "FaMapMarkerAlt",
      title: 'contact:contactInfo.location',
      content: `${config.business.mainOffice.address}, ${config.business.mainOffice.postalCode} ${config.business.mainOffice.city}`,
      href: config.business.mainOffice.googleMapsUrl,
    },
  ],
});

export type BusinessData = ReturnType<typeof getBusinessData>;

export const businessTranslations = {
    researchMethodology: { EN: "Research Methodology", NL: "Onderzoeksmethodologie" },
    dataAnalysis: { EN: "Data Analysis", NL: "Data-analyse" },
    proofreading: { EN: "Proofreading", NL: "Proeflezen" },
    softwareSupport: { EN: "Software Support", NL: "Software Ondersteuning" }
} as const;