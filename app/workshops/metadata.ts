import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Workshops | Wiskunde, Statistiek & Creatieve Vaardigheden',
  description: 'Ontdek onze interactieve workshops voor wiskunde, statistiek en creatieve vaardigheden. Kleine groepen, flexibele planning en expert begeleiding in Amsterdam.',
  keywords: [
    'workshops amsterdam',
    'wiskunde workshops',
    'statistiek workshops',
    'creatieve workshops',
    'data analyse workshop',
    'spss workshop',
    'r studio workshop',
    'python workshop',
    'methodologie workshop',
    'onderzoeksopzet workshop',
    'kleine groepen',
    'interactieve workshops',
    'statistiek cursus',
    'wiskunde training',
    'data science workshop',
    'machine learning workshop',
    'workshop statistiek amsterdam',
    'workshop wiskunde amsterdam',
  ],
  openGraph: {
    title: 'Workshops | Wiskunde, Statistiek & Creatieve Vaardigheden',
    description: 'Ontdek onze interactieve workshops voor wiskunde, statistiek en creatieve vaardigheden. Kleine groepen, flexibele planning en expert begeleiding in Amsterdam.',
    url: 'https://stephensprivelessen.nl/workshops',
    type: 'website',
    locale: 'nl_NL',
    alternateLocale: 'en_US',
    siteName: 'Stephens Privelessen',
    images: [
      {
        url: `/api/og?title=${encodeURIComponent("Workshops A'dam")}&brandText=${encodeURIComponent("Stephensprivelessen.nl")}&buttonText=${encodeURIComponent("Bekijk Workshops")}&footerText=${encodeURIComponent("Wiskunde, Statistiek & Meer")}&featureImageUrl=/images/workshops-banner.jpg`,
        width: 1200,
        height: 630,
        alt: "Workshops Wiskunde & Statistiek Amsterdam | Stephens Privelessen",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Workshops | Wiskunde, Statistiek & Creatieve Vaardigheden',
    description: 'Interactieve workshops voor wiskunde, statistiek en creatieve vaardigheden.',
    images: [`/api/og?title=${encodeURIComponent("Workshops A'dam")}&brandText=${encodeURIComponent("Stephensprivelessen.nl")}&buttonText=${encodeURIComponent("Bekijk Workshops")}&footerText=${encodeURIComponent("Wiskunde, Statistiek & Meer")}&featureImageUrl=/images/workshops-banner.jpg`],
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
    canonical: '/workshops',
    languages: {
      'nl-NL': '/workshops',
      'en-US': '/workshops',
    },
  },
};

export const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['EducationalOrganization', 'Organization'],
  name: 'Stephens Privelessen Workshops',
  description: 'Interactieve workshops voor wiskunde, statistiek en creatieve vaardigheden in Amsterdam.',
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
  offers: {
    '@type': 'Offer',
    itemOffered: [
      {
        '@type': 'Course',
        name: 'Wiskunde Workshops',
        description: 'Interactieve workshops voor verschillende wiskundige onderwerpen'
      },
      {
        '@type': 'Course',
        name: 'Statistiek Workshops',
        description: 'Praktische workshops voor statistiek en data-analyse'
      },
      {
        '@type': 'Course',
        name: 'Creatieve Workshops',
        description: 'Workshops gericht op creatieve vaardigheden en probleemoplossing'
      }
    ]
  },
  areaServed: {
    '@type': 'City',
    name: 'Amsterdam'
  }
}; 