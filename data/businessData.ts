// src/data/businessData.ts
import { TFunction } from 'next-i18next';

export const getBusinessData = (t: TFunction) => ({
  title: t('common:siteName'),
  subjects: {
    primary: ['arithmetic', 'language'].map(subject => t(`subjects:primary.${subject}`)),
    secondary: ['mathABCD', 'physics', 'chemistry', 'english'].map(subject => t(`subjects:secondary.${subject}`)),
    higher: ['businessStatistics', 'calculus', 'economics', 'statistics', 'probabilityTheory', 'linearAlgebra', 'setTheory', 'programming'].map(subject => t(`subjects:higher.${subject}`)),
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