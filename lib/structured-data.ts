import { config } from '@/data/config';
import { fromHourLabel } from '@/data/pricingData';

export interface StructuredDataProps {
  title: string;
  description: string;
  price?: number;
  priceCurrency?: string;
  provider: {
    name: string;
    type: string;
  };
  areaServed: string;
  educationalCredentialAwarded?: string;
  educationalProgramMode?: string;
  timeToComplete?: string;
  category: string[];
  priceValidUntil?: boolean;
}

export function generateStructuredData({
  title,
  description,
  price,
  priceCurrency,
  provider,
  areaServed,
  educationalCredentialAwarded,
  educationalProgramMode,
  timeToComplete,
  category,
  priceValidUntil = false,
}: StructuredDataProps) {
  const base: any = {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalProgram",
    "name": title,
    "description": description,
    "provider": {
      "@type": provider.type,
      "name": provider.name,
    },
    "occupationalCategory": category,
    "areaServed": areaServed,
    "educationalCredentialAwarded": educationalCredentialAwarded,
    "educationalProgramMode": educationalProgramMode,
    "timeToComplete": timeToComplete,
  };
  if (price !== undefined && priceCurrency) {
    base.offers = {
      "@type": "Offer",
      "price": price,
      "priceCurrency": priceCurrency,
      ...(priceValidUntil && {
        "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
      }),
    };
  }
  return base;
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Stephen's Privélessen",
  "legalName": config.business.legal.name,
  "vatID": config.business.legal.vatId,
  "email": config.contact.email,
  "url": "https://stephensprivelessen.nl",
  "logo": "https://stephensprivelessen.nl/favicon/android-chrome-512x512.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+31 6 23 74 39 56",
    "contactType": "Customer Service"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": config.business.legal.address,
    "addressLocality": config.business.legal.city,
    "postalCode": config.business.legal.postalCode,
    "addressCountry": "NL"
  },
  "sameAs": [
    config.social.instagram
  ]
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "url": "https://stephensprivelessen.nl"
};

/** Home-page local business entity. No street address: tutoring is online or at the client's chosen spot, so only the city is published. */
export const localBusinessSchema = (locale: string) => ({
  "@context": "https://schema.org",
  "@type": ["EducationalOrganization", "LocalBusiness"],
  "@id": "https://stephensprivelessen.nl/#localbusiness",
  "name": "Stephen's Privélessen",
  "url": "https://stephensprivelessen.nl",
  "email": config.contact.email,
  "telephone": config.contact.phone,
  "image": "https://stephensprivelessen.nl/favicon/android-chrome-512x512.png",
  "priceRange": `${locale === 'nl' ? 'Vanaf' : 'From'} ${fromHourLabel(locale)}${locale === 'nl' ? '/uur' : '/hr'}`,
  "address": {
    "@type": "PostalAddress",
    "addressLocality": config.business.legal.city,
    "addressCountry": "NL"
  },
  "areaServed": [{ "@type": "City", "name": "Amsterdam" }],
  "sameAs": [config.social.instagram]
});
