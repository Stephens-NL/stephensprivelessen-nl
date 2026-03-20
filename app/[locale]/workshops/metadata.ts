import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isNl = locale === 'nl';
  return {
    title: isNl ? 'Workshops | Wiskunde, Statistiek & Creatieve Vaardigheden' : 'Workshops | Mathematics, Statistics & Creative Skills',
    description: isNl
      ? 'Workshops Amsterdam: Wiskunde, statistiek & creatieve vaardigheden. Kleine groepen, flexibele planning. Expert begeleiding op Science Park of online.'
      : 'Workshops Amsterdam: Mathematics, statistics & creative skills. Small groups, flexible scheduling. Expert guidance at Science Park or online.',
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
      title: isNl ? 'Workshops | Wiskunde, Statistiek & Creatieve Vaardigheden' : 'Workshops | Mathematics, Statistics & Creative Skills',
      description: isNl
        ? 'Workshops Amsterdam: Wiskunde, statistiek & creatieve vaardigheden. Kleine groepen, flexibele planning. Expert begeleiding op Science Park of online.'
        : 'Workshops Amsterdam: Mathematics, statistics & creative skills. Small groups, flexible scheduling. Expert guidance at Science Park or online.',
      url: 'https://stephensprivelessen.nl/workshops',
      type: 'website',
      locale: 'nl_NL',
      alternateLocale: 'en_US',
      siteName: 'Stephens Privelessen',
      images: [
        {
          url: `/api/og?title=${encodeURIComponent("Workshops A'dam")}&brandText=${encodeURIComponent("Stephensprivelessen.nl")}&buttonText=${encodeURIComponent(isNl ? "Bekijk Workshops" : "View Workshops")}&footerText=${encodeURIComponent(isNl ? "Wiskunde, Statistiek & Meer" : "Maths, Statistics & More")}&featureImageUrl=/images/workshops-banner.jpg`,
          width: 1200,
          height: 630,
          alt: isNl ? "Workshops Wiskunde & Statistiek Amsterdam | Stephens Privelessen" : "Workshops Mathematics & Statistics Amsterdam | Stephens Private Tutoring",
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: isNl ? 'Workshops | Wiskunde, Statistiek & Creatieve Vaardigheden' : 'Workshops | Mathematics, Statistics & Creative Skills',
      description: isNl
        ? 'Interactieve workshops voor wiskunde, statistiek en creatieve vaardigheden.'
        : 'Interactive workshops for mathematics, statistics and creative skills.',
      images: [`/api/og?title=${encodeURIComponent("Workshops A'dam")}&brandText=${encodeURIComponent("Stephensprivelessen.nl")}&buttonText=${encodeURIComponent(isNl ? "Bekijk Workshops" : "View Workshops")}&footerText=${encodeURIComponent(isNl ? "Wiskunde, Statistiek & Meer" : "Maths, Statistics & More")}&featureImageUrl=/images/workshops-banner.jpg`],
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
}

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
