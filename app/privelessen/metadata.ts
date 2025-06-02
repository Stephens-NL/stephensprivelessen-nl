import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privelessen Amsterdam | Wiskunde & Statistiek Expert',
  description: 'Professionele wiskunde en statistiek privelessen in Amsterdam. Persoonlijke begeleiding op alle niveaus, van middelbare school tot universiteit. Online en op locatie beschikbaar.',
  keywords: [
    'privelessen amsterdam',
    'wiskunde privelessen',
    'statistiek privelessen',
    'priveles amsterdam',
    'wiskunde tutor',
    'statistiek hulp',
    'huiswerkbegeleiding',
    'examentraining',
    'online privelessen',
    'priveles aan huis',
    'wiskunde a priveles',
    'wiskunde b priveles',
    'wiskunde c priveles',
    'statistiek uitleg',
    'spss hulp',
    'r studio priveles',
    'python programmeren',
    'data analyse priveles',
    'vwo wiskunde',
    'havo wiskunde',
    'universitaire statistiek',
    'hbo statistiek',
  ],
  openGraph: {
    title: 'Privelessen Amsterdam | Wiskunde & Statistiek Expert',
    description: 'Professionele wiskunde en statistiek privelessen in Amsterdam. Persoonlijke begeleiding op maat voor elk niveau.',
    url: 'https://stephensprivelessen.nl/privelessen',
    type: 'website',
    locale: 'nl_NL',
    alternateLocale: 'en_US',
    siteName: 'Stephens Privelessen',
    images: [
      {
        url: `/api/og?title=${encodeURIComponent("Privéles A'dam")}&brandText=${encodeURIComponent("Stephensprivelessen.nl")}&buttonText=${encodeURIComponent("Info Privéles")}&footerText=${encodeURIComponent("Wiskunde & Statistiek")}&featureImageUrl=/images/tutoring-banner.jpg`,
        width: 1200,
        height: 630,
        alt: "Privéles Wiskunde & Statistiek Amsterdam | Stephens Privelessen",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privelessen Amsterdam | Wiskunde & Statistiek Expert',
    description: 'Professionele wiskunde en statistiek privelessen in Amsterdam. Persoonlijke aanpak op elk niveau.',
    images: [`/api/og?title=${encodeURIComponent("Privéles A'dam")}&brandText=${encodeURIComponent("Stephensprivelessen.nl")}&buttonText=${encodeURIComponent("Info Privéles")}&footerText=${encodeURIComponent("Wiskunde & Statistiek")}&featureImageUrl=/images/tutoring-banner.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/privelessen',
    languages: {
      'nl-NL': '/privelessen',
      'en-US': '/tutoring',
    },
  },
};

// Add JSON-LD structured data
export const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Wiskunde & Statistiek Bijles',
  provider: {
    '@type': 'EducationalOrganization',
    name: 'Stephens Privelessen',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Amsterdam',
      addressRegion: 'NH',
      addressCountry: 'NL'
    }
  },
  serviceType: 'Bijles',
  areaServed: {
    '@type': 'City',
    name: 'Amsterdam'
  },
  description: 'Professionele wiskunde en statistiek lessen in Amsterdam. Persoonlijke begeleiding op ons kantoor. Ervaren docent voor alle niveaus.'
}; 