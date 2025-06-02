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