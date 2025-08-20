import { Metadata } from 'next';
import { TutoringPage } from '@/components/privelessen/TutoringPage';
import { generateStructuredData } from '@/lib/structured-data';
import { tutoringPage } from '@/data/tutoringPage';

export const metadata: Metadata = {
  title: 'Privelessen Amsterdam | Wiskunde, Statistiek & Programmeren',
  description: 'Privelessen Amsterdam: Wiskunde, statistiek & programmeren. Online of Science Park. Van €75/uur. 1-op-1 begeleiding. UvA & VU studenten.',
  keywords: [
    'privelessen amsterdam',
    'wiskunde privelessen',
    'statistiek privelessen',
    'programmeren privelessen',
    'bijles amsterdam',
    'online bijles',
    'science park bijles',
    'uva bijles',
    'vu bijles',
    'spss bijles',
    'r studio bijles',
    'python bijles'
  ],
  openGraph: {
    title: 'Privelessen Amsterdam | Wiskunde, Statistiek & Programmeren',
    description: 'Privelessen Amsterdam: Wiskunde, statistiek & programmeren. Online of Science Park. Van €75/uur. 1-op-1 begeleiding.',
    url: 'https://stephensprivelessen.nl/privelessen',
    type: 'website',
    locale: 'nl_NL',
    alternateLocale: 'en_US',
    siteName: 'Stephens Privelessen',
    images: [
      {
        url: `/api/og?title=${encodeURIComponent("Privelessen A'dam")}&brandText=${encodeURIComponent("Stephensprivelessen.nl")}&buttonText=${encodeURIComponent("Boek Les")}&footerText=${encodeURIComponent("Wiskunde & Statistiek")}&featureImageUrl=/images/tutoring-hero.jpg`,
        width: 1200,
        height: 630,
        alt: 'Privelessen Amsterdam - Wiskunde & Statistiek | Stephens Privelessen',
      },
    ],
  },
  alternates: {
    canonical: '/privelessen',
    languages: {
      'nl-NL': '/privelessen',
      'en-US': '/privelessen',
    },
  },
};

export default function BijlesPage() {
  const structuredData = generateStructuredData({
    title: tutoringPage.hero.title.NL,
    description: tutoringPage.hero.subtitle.NL,
    provider: {
      name: 'Stephens Privelessen',
      type: 'EducationalOrganization',
    },
    areaServed: 'Amsterdam',
    educationalProgramMode: 'One-on-one tutoring',
    timeToComplete: 'P1M',
    category: ['Wiskunde', 'Statistiek', 'Programmeren'],
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <TutoringPage />
    </>
  );
} 