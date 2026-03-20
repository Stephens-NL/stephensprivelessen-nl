import { contact, businessRules } from '@stephen/business-config';

// Re-export in the shape that existing components expect
export const config = {
  contact: {
    email: contact.email.primary,
    phone: contact.phone.primary.number,
    whatsapp: contact.whatsapp(contact.phone.primary.number),
    display: {
      phone: contact.phone.primary.display,
      href: `tel:${contact.phone.primary.number}`,
    },
  },
  social: {
    instagram: contact.social.instagram.tutoring,
  },
  business: {
    name: businessRules.business.name,
    nameNl: businessRules.business.nameNl,
    nameEn: businessRules.business.nameEn,
    owner: businessRules.business.owner,
    siteUrl: businessRules.business.siteUrl,
    dashboardUrl: businessRules.business.dashboardUrl,
    mainOffice: {
      address: contact.addresses.main.street,
      postalCode: contact.addresses.main.postal,
      city: contact.addresses.main.city,
      googleMapsUrl: contact.addresses.main.googleMapsUrl,
    },
    weekendOffice: {
      address: contact.addresses.weekend.street,
      postalCode: contact.addresses.weekend.postal,
      city: contact.addresses.weekend.city,
      googleMapsUrl: contact.addresses.weekend.googleMapsUrl,
    },
  },
  pricing: {
    travelCosts: {
      sciencePark: businessRules.travel.sciencePark / 100,
      vuUva: businessRules.travel.vuUva / 100,
      homeAmsterdam: businessRules.travel.homeAmsterdam / 100,
    },
    lastMinuteSurcharges: {
      lessThan24Hours: businessRules.scheduling.lastMinuteSurcharges.lessThan24hPct,
      lessThan12Hours: businessRules.scheduling.lastMinuteSurcharges.lessThan12hPct,
    },
    flexibilityPremium: {
      twoLessons: businessRules.scheduling.flexibilityPremium.twoLessons,
      fourLessons: businessRules.scheduling.flexibilityPremium.fourLessons,
      sixOrMoreLessons: businessRules.scheduling.flexibilityPremium.sixOrMoreLessons,
    },
  },
} as const;
