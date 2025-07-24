export interface StructuredDataProps {
  title: string;
  description: string;
  price: number;
  priceCurrency: string;
  provider: {
    name: string;
    type: string;
  };
  areaServed: string;
  educationalCredentialAwarded?: string;
  educationalProgramMode?: string;
  timeToComplete?: string;
  category: string[];
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
}: StructuredDataProps) {
  return {
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
    "offers": {
      "@type": "Offer",
      "price": price,
      "priceCurrency": priceCurrency,
    },
  };
}

export function generateCampusStructuredData({
  title,
  description,
  price,
  priceCurrency,
  provider,
  areaServed,
  category,
}: StructuredDataProps) {
  return {
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
    "offers": {
      "@type": "Offer",
      "price": price,
      "priceCurrency": priceCurrency,
      "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
    },
  };
}

export function generateSubjectStructuredData({
  title,
  description,
  price,
  priceCurrency,
  provider,
  areaServed,
  category,
}: StructuredDataProps) {
  return {
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
    "offers": {
      "@type": "Offer",
      "price": price,
      "priceCurrency": priceCurrency,
      "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
    },
  };
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Stephens Privelessen",
  "url": "https://www.stephensprivelessen.nl",
  "logo": "https://www.stephensprivelessen.nl/images/logo.png", // Zorg ervoor dat dit pad klopt
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+31-6-12345678", // Voeg je telefoonnummer toe
    "contactType": "Customer Service"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Voorbeeldstraat 1", // Voeg je adres toe
    "addressLocality": "Amsterdam",
    "postalCode": "1011AA",
    "addressCountry": "NL"
  },
  "sameAs": [
    "https://www.instagram.com/stephensprivelessen" // Voeg andere sociale media links toe
  ]
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "url": "https://www.stephensprivelessen.nl",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://www.stephensprivelessen.nl/zoeken?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}; 