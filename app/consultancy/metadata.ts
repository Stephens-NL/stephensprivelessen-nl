import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Consultancy | Data & Statistiek Expert Amsterdam',
  description: 'Consultancy Amsterdam: Data-analyse, statistiek & onderzoeksmethodologie. Expert advies voor bedrijven. Van €100/uur. Science Park of online.',
  keywords: [
    'statistiek consultant',
    'data analyse consultant',
    'onderzoek consultant',
    'methodologie expert',
    'statistisch advies',
    'data science consultant',
    'spss consultant',
    'r programming consultant',
    'python data analyse',
    'machine learning advies',
    'data visualisatie',
    'predictive analytics',
    'statistical modeling',
    'business analytics',
    'data strategie',
    'kwantitatief onderzoek',
    'marktonderzoek analyse',
    'data consultancy amsterdam',
    'statistiek expert',
    'onderzoeksopzet advies',
  ],
  openGraph: {
    title: 'Consultancy | Data & Statistiek Expert Amsterdam',
    description: 'Consultancy Amsterdam: Data-analyse, statistiek & onderzoeksmethodologie. Expert advies voor bedrijven. Van €100/uur.',
    url: 'https://stephensprivelessen.nl/consultancy',
    type: 'website',
    locale: 'nl_NL',
    alternateLocale: 'en_US',
    siteName: 'Stephens Privelessen',
    images: [
      {
        url: `/api/og?title=${encodeURIComponent("Consultancy A'dam")}&brandText=${encodeURIComponent("Stephensprivelessen.nl")}&buttonText=${encodeURIComponent("Meer Advies Info")}&footerText=${encodeURIComponent("Data & Statistiek Expert")}&featureImageUrl=/images/consultancy-banner.jpg`,
        width: 1200,
        height: 630,
        alt: 'Data & Statistiek Consultancy Amsterdam',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Consultancy | Data & Statistiek Expert Amsterdam',
    description: 'Expert consultancy in data-analyse en statistiek voor bedrijven en organisaties.',
    images: [`/api/og?title=${encodeURIComponent("Consultancy A'dam")}&brandText=${encodeURIComponent("Stephensprivelessen.nl")}&buttonText=${encodeURIComponent("Meer Advies Info")}&footerText=${encodeURIComponent("Data & Statistiek Expert")}&featureImageUrl=/images/consultancy-banner.jpg`],
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
    canonical: '/consultancy',
    languages: {
      'nl-NL': '/consultancy',
      'en-US': '/consulting',
    },
  },
};

export const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Data & Statistiek Consultancy Amsterdam',
  provider: {
    '@type': 'Organization',
    name: 'Stephens Privelessen',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Amsterdam',
      addressRegion: 'NH',
      addressCountry: 'NL'
    }
  },
  serviceType: 'Consultancy',
  areaServed: {
    '@type': 'City',
    name: 'Amsterdam'
  },
  description: 'Professionele consultancy in data-analyse, statistiek en onderzoeksmethodologie.',
  offers: {
    '@type': 'Offer',
    itemOffered: [
      {
        '@type': 'Service',
        name: 'Data Analyse',
        description: 'Geavanceerde statistische analyse en data interpretatie'
      },
      {
        '@type': 'Service',
        name: 'Onderzoeksmethodologie',
        description: 'Expert begeleiding in onderzoeksopzet en methodologie'
      },
      {
        '@type': 'Service',
        name: 'Machine Learning',
        description: 'Moderne machine learning oplossingen voor bedrijfsproblemen'
      }
    ]
  }
}; 