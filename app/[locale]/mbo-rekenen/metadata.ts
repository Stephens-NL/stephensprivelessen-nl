import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isNl = locale === 'nl';
  return {
    title: isNl ? 'MBO Rekenen Bijles Amsterdam | Expert Begeleiding' : 'MBO Numeracy Tutoring Amsterdam | Expert Guidance',
    description: isNl
      ? 'MBO Rekenen Amsterdam: Expert begeleiding voor MBO-rekentoets. Voor studenten & volwassenen. Online of Science Park. Persoonlijke aanpak.'
      : 'MBO Numeracy Amsterdam: Expert guidance for the MBO numeracy test. For students & adults. Online or Science Park. Personal approach.',
    keywords: [
      'mbo rekenen',
      'rekenbijles amsterdam',
      'mbo rekentoets',
      'rekenen bijles',
      'volwassenen rekenen',
      'dyscalculie begeleiding',
      'bbl rekenen',
      'mbo niveau 2 rekenen',
      'mbo niveau 3 rekenen',
      'mbo niveau 4 rekenen',
      'online rekenbijles',
      'rekenen priveles',
      'rekenen examentraining',
    ],
    openGraph: {
      title: isNl ? 'MBO Rekenen Bijles Amsterdam | Expert Begeleiding' : 'MBO Numeracy Tutoring Amsterdam | Expert Guidance',
      description: isNl
        ? 'MBO Rekenen Amsterdam: Expert begeleiding voor MBO-rekentoets. Voor studenten & volwassenen. Online of Science Park.'
        : 'MBO Numeracy Amsterdam: Expert guidance for the MBO numeracy test. For students & adults. Online or Science Park.',
      url: 'https://stephensprivelessen.nl/mbo-rekenen',
      type: 'website',
      locale: 'nl_NL',
      alternateLocale: 'en_US',
      siteName: 'Stephens Privelessen',
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(isNl ? "MBO Rekenen A'dam" : "MBO Numeracy A'dam")}&brandText=${encodeURIComponent("Stephensprivelessen.nl")}&buttonText=${encodeURIComponent(isNl ? "Start Rekenen" : "Start Numeracy")}&footerText=${encodeURIComponent(isNl ? "MBO Rekentoets Hulp" : "MBO Numeracy Test Help")}&featureImageUrl=/images/mbo-rekenen-banner.jpg`,
          width: 1200,
          height: 630,
          alt: isNl ? "MBO Rekenen Bijles Amsterdam | Stephens Privelessen" : "MBO Numeracy Tutoring Amsterdam | Stephens Private Tutoring",
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: isNl ? 'MBO Rekenen Bijles Amsterdam | Expert Begeleiding' : 'MBO Numeracy Tutoring Amsterdam | Expert Guidance',
      description: isNl
        ? 'Professionele rekenbijles voor MBO-studenten en volwassenen in Amsterdam.'
        : 'Professional numeracy tutoring for MBO students and adults in Amsterdam.',
      images: [`/api/og?title=${encodeURIComponent(isNl ? "MBO Rekenen A'dam" : "MBO Numeracy A'dam")}&brandText=${encodeURIComponent("Stephensprivelessen.nl")}&buttonText=${encodeURIComponent(isNl ? "Start Rekenen" : "Start Numeracy")}&footerText=${encodeURIComponent(isNl ? "MBO Rekentoets Hulp" : "MBO Numeracy Test Help")}&featureImageUrl=/images/mbo-rekenen-banner.jpg`],
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
      canonical: '/mbo-rekenen',
      languages: {
        'nl-NL': '/mbo-rekenen',
        'en-US': '/mbo-math',
      },
    },
  };
}

export const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MBO Rekenen Bijles',
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
  description: 'Professionele rekenbijles voor MBO-studenten en volwassenen in Amsterdam. Persoonlijke begeleiding voor de MBO-rekentoets.'
};
