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
    };
  }
  return base;
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
  };
  if (price !== undefined && priceCurrency) {
    base.offers = {
      "@type": "Offer",
      "price": price,
      "priceCurrency": priceCurrency,
      "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
    };
  }
  return base;
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
  };
  if (price !== undefined && priceCurrency) {
    base.offers = {
      "@type": "Offer",
      "price": price,
      "priceCurrency": priceCurrency,
      "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
    };
  }
  return base;
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Stephen's Privelessen",
  "url": "https://stephensprivelessen.nl",
  "logo": "https://stephensprivelessen.nl/favicon/android-chrome-512x512.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+31 6 47 35 74 26",
    "contactType": "Customer Service"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Science Park 904",
    "addressLocality": "Amsterdam",
    "postalCode": "1098 XH",
    "addressCountry": "NL"
  },
  "sameAs": [
    "https://www.instagram.com/stephensprivelessen"
  ]
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "url": "https://stephensprivelessen.nl",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://stephensprivelessen.nl/zoeken?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

export function generateServiceStructuredData({
  title,
  description,
  price,
  priceCurrency,
  provider,
  areaServed,
  serviceType,
  category,
}: {
  title: string;
  description: string;
  price?: number;
  priceCurrency?: string;
  provider: {
    name: string;
    type: string;
  };
  areaServed: string;
  serviceType: string;
  category: string[];
}) {
  const base: any = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": title,
    "description": description,
    "provider": {
      "@type": provider.type,
      "name": provider.name,
    },
    "serviceType": serviceType,
    "areaServed": {
      "@type": "City",
      "name": areaServed
    },
    "category": category,
  };
  if (price !== undefined && priceCurrency) {
    base.offers = {
      "@type": "Offer",
      "price": price,
      "priceCurrency": priceCurrency,
      "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
    };
  }
  return base;
} 