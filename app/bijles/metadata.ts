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
    url: 'https://stephensprivelessen.nl/bijles',
    type: 'website',
    locale: 'nl_NL',
    alternateLocale: 'en_US',
    siteName: 'Stephens Privelessen',
    images: [
      {
        url: '/images/tutoring-banner.jpg',
        width: 1200,
        height: 630,
        alt: 'Wiskunde & Statistiek Privelessen Amsterdam',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privelessen Amsterdam | Wiskunde & Statistiek Expert',
    description: 'Professionele wiskunde en statistiek privelessen in Amsterdam. Persoonlijke aanpak op elk niveau.',
    images: ['/images/tutoring-banner.jpg'],
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
    canonical: '/bijles',
    languages: {
      'nl-NL': '/bijles',
      'en-US': '/tutoring',
    },
  },
};

// Add JSON-LD structured data
export const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Wiskunde & Statistiek Privelessen Amsterdam',
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
  description: 'Professionele wiskunde en statistiek privelessen in Amsterdam. Persoonlijke begeleiding op alle niveaus.',
  offers: {
    '@type': 'Offer',
    itemOffered: [
      {
        '@type': 'Service',
        name: 'Wiskunde Bijles',
        description: 'Persoonlijke wiskunde bijles voor alle niveaus'
      },
      {
        '@type': 'Service',
        name: 'Statistiek Bijles',
        description: 'Expert begeleiding bij statistiek en data-analyse'
      },
      {
        '@type': 'Service',
        name: 'Examentraining',
        description: 'Gerichte voorbereiding op examens en tentamens'
      }
    ]
  }
}; 