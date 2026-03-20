import Script from 'next/script';
import { TutoringPage } from '@/components/privelessen/TutoringPage';
import { generateStructuredData } from '@/lib/structured-data';
import { tutoringPage } from '@/data/tutoringPage';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isNl = locale === 'nl';
  return {
    title: isNl ? 'Privelessen Amsterdam | Wiskunde, Statistiek & Programmeren' : 'Private Tutoring Amsterdam | Maths, Statistics & Programming',
    description: isNl
      ? 'Privelessen Amsterdam: Wiskunde, statistiek & programmeren. Online of Science Park. Van €75/uur. 1-op-1 begeleiding. UvA & VU studenten.'
      : 'Private tutoring Amsterdam: Mathematics, statistics & programming. Online or Science Park. From €75/hr. 1-on-1 guidance. UvA & VU students.',
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
      title: isNl ? 'Privelessen Amsterdam | Wiskunde, Statistiek & Programmeren' : 'Private Tutoring Amsterdam | Maths, Statistics & Programming',
      description: isNl
        ? 'Privelessen Amsterdam: Wiskunde, statistiek & programmeren. Online of Science Park. Van €75/uur. 1-op-1 begeleiding.'
        : 'Private tutoring Amsterdam: Mathematics, statistics & programming. Online or Science Park. From €75/hr. 1-on-1 guidance.',
      url: 'https://stephensprivelessen.nl/privelessen',
      type: 'website',
      locale: 'nl_NL',
      alternateLocale: 'en_US',
      siteName: 'Stephens Privelessen',
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(isNl ? "Privelessen A'dam" : "Tutoring A'dam")}&brandText=${encodeURIComponent("Stephensprivelessen.nl")}&buttonText=${encodeURIComponent(isNl ? "Boek Les" : "Book Lesson")}&footerText=${encodeURIComponent(isNl ? "Wiskunde & Statistiek" : "Maths & Statistics")}&featureImageUrl=/images/tutoring-hero.jpg`,
          width: 1200,
          height: 630,
          alt: isNl ? 'Privelessen Amsterdam - Wiskunde & Statistiek | Stephens Privelessen' : 'Private Tutoring Amsterdam - Maths & Statistics | Stephens Privelessen',
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
}

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
      <Script id="privelessen-ld+json" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(structuredData)}
      </Script>
      <TutoringPage />
    </>
  );
} 