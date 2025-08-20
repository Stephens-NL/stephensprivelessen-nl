import { TutoringPage } from '@/components/privelessen/TutoringPage';
import { generateStructuredData } from '@/lib/structured-data';
import { tutoringPage } from '@/data/tutoringPage';

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