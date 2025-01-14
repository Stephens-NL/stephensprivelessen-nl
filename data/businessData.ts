// src/data/businessData.ts
import { TFunction } from 'next-i18next';

export const getBusinessData = (t: TFunction) => ({
  title: t('common:siteName'),
  subjects: {
    primary: [
      { NL: 'Rekenen', EN: 'Arithmetic' },
      { NL: 'Taal', EN: 'Language' }
    ],
    secondary: [
      { NL: 'Wiskunde A/B/C/D', EN: 'Mathematics A/B/C/D' },
      { NL: 'Natuurkunde', EN: 'Physics' },
      { NL: 'Scheikunde', EN: 'Chemistry' },
      { NL: 'Engels', EN: 'English' },
      { NL: 'Nederlands', EN: 'Dutch' },
      { NL: 'Biologie', EN: 'Biology' },
      { NL: 'Economie', EN: 'Economics' },
      { NL: 'M&O', EN: 'M&O' },
      { NL: 'Bedrijfseconomie', EN: 'Business Economics' }
    ],
    higher: [
      { NL: 'Bedrijfsstatistiek', EN: 'Business Statistics' },
      { NL: 'Calculus', EN: 'Calculus' },
      { NL: 'Economie', EN: 'Economics' },
      { NL: 'Statistiek', EN: 'Statistics' },
      { NL: 'Kansberekening', EN: 'Probability' },
      { NL: 'Lineaire Algebra', EN: 'Linear Algebra' },
      { NL: 'Verzamelingenleer', EN: 'Set Theory' }
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
      content: "+31 6 47357426",
      href: "tel:+31647357426",
    },
    {
      icon: "FaEnvelope",
      title: 'contact:contactInfo.email',
      content: "s.adei@outlook.com",
      href: "mailto:s.adei@outlook.com",
    },
    {
      icon: "FaMapMarkerAlt",
      title: 'contact:contactInfo.location',
      content: "Science Park 904, 1098 XH Amsterdam",
      href: "https://maps.google.com/?q=Science Park 904, 1098 XH Amsterdam",
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