import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Diensten | Stephens Privelessen Amsterdam',
  description: 'Ontdek onze professionele diensten: bijles, workshops, scriptiebegeleiding en consultancy in Amsterdam. Gespecialiseerd in wiskunde, statistiek en methodologie.',
  keywords: [
    'bijles amsterdam',
    'wiskunde bijles',
    'statistiek bijles',
    'scriptiebegeleiding',
    'workshops amsterdam',
    'methodologie hulp',
    'data analyse hulp',
    'spss begeleiding',
    'r studio hulp',
    'python programmeren',
    'consultancy diensten',
    'academische begeleiding',
    'onderzoeksmethoden',
    'statistische analyse',
    'educatieve diensten amsterdam',
    'professionele bijles',
  ],
  openGraph: {
    title: 'Diensten | Stephens Privelessen Amsterdam',
    description: 'Professionele bijles, workshops, scriptiebegeleiding en consultancy in Amsterdam. Expert in wiskunde, statistiek en methodologie.',
    url: 'https://stephensprivelessen.nl/services',
    type: 'website',
    locale: 'nl_NL',
    alternateLocale: 'en_US',
    siteName: 'Stephens Privelessen',
    images: [
      {
        url: '/images/services-banner.jpg',
        width: 1200,
        height: 630,
        alt: 'Diensten Stephens Privelessen Amsterdam',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Diensten | Stephens Privelessen Amsterdam',
    description: 'Professionele bijles, workshops en consultancy in Amsterdam.',
    images: ['/images/services-banner.jpg'],
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
    canonical: '/services',
    languages: {
      'nl-NL': '/services',
      'en-US': '/services',
    },
  },
};

export const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Stephens Privelessen',
  description: 'Professionele educatieve diensten in Amsterdam.',
  url: 'https://stephensprivelessen.nl',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Amsterdam',
    addressRegion: 'NH',
    addressCountry: 'NL'
  },
  areaServed: {
    '@type': 'City',
    name: 'Amsterdam'
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Educatieve Diensten',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Privelessen',
          description: 'Persoonlijke bijles in wiskunde en statistiek'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Workshops',
          description: 'Interactieve workshops voor groepen'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Scriptiebegeleiding',
          description: 'Expert begeleiding bij scripties en onderzoek'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Consultancy',
          description: 'Professioneel advies voor data en statistiek'
        }
      }
    ]
  }
}; 