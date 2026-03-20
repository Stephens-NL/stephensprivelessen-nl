import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isNl = locale === 'nl';
  return {
    title: isNl ? 'Diensten | Stephens Privelessen Amsterdam' : 'Services | Stephens Private Tutoring Amsterdam',
    description: isNl
      ? 'Diensten Stephens Privelessen: Bijles, workshops, scriptiebegeleiding & consultancy in Amsterdam. Wiskunde, statistiek & methodologie. Van €75/uur.'
      : 'Services Stephens Private Tutoring: Tutoring, workshops, thesis supervision & consultancy in Amsterdam. Mathematics, statistics & methodology. From €75/hr.',
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
      title: isNl ? 'Diensten | Stephens Privelessen Amsterdam' : 'Services | Stephens Private Tutoring Amsterdam',
      description: isNl
        ? 'Diensten Stephens Privelessen: Bijles, workshops, scriptiebegeleiding & consultancy in Amsterdam. Wiskunde, statistiek & methodologie. Van €75/uur.'
        : 'Services Stephens Private Tutoring: Tutoring, workshops, thesis supervision & consultancy in Amsterdam. Mathematics, statistics & methodology. From €75/hr.',
      url: 'https://stephensprivelessen.nl/services',
      type: 'website',
      locale: 'nl_NL',
      alternateLocale: 'en_US',
      siteName: 'Stephens Privelessen',
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(isNl ? "Onze Diensten A'dam" : "Our Services A'dam")}&brandText=${encodeURIComponent("Stephensprivelessen.nl")}&buttonText=${encodeURIComponent(isNl ? "Bekijk Diensten" : "View Services")}&footerText=${encodeURIComponent(isNl ? "Bijles, Workshops & Meer" : "Tutoring, Workshops & More")}&featureImageUrl=/images/services-banner.jpg`,
          width: 1200,
          height: 630,
          alt: isNl ? 'Diensten Stephens Privelessen Amsterdam' : 'Services Stephens Private Tutoring Amsterdam',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: isNl ? 'Diensten | Stephens Privelessen Amsterdam' : 'Services | Stephens Private Tutoring Amsterdam',
      description: isNl
        ? 'Professionele bijles, workshops en consultancy in Amsterdam.'
        : 'Professional tutoring, workshops and consultancy in Amsterdam.',
      images: [`/api/og?title=${encodeURIComponent(isNl ? "Onze Diensten A'dam" : "Our Services A'dam")}&brandText=${encodeURIComponent("Stephensprivelessen.nl")}&buttonText=${encodeURIComponent(isNl ? "Bekijk Diensten" : "View Services")}&footerText=${encodeURIComponent(isNl ? "Bijles, Workshops & Meer" : "Tutoring, Workshops & More")}&featureImageUrl=/images/services-banner.jpg`],
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
}

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
