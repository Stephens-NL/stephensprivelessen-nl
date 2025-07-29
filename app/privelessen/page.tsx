import { TutoringPage } from '@/components/privelessen/TutoringPage';
import { generateStructuredData } from '@/lib/structured-data';
import { prices } from '@/data/pricingData';
import { tutoringPage } from '@/data/tutoringPage';

export default function BijlesPage() {
  const structuredData = generateStructuredData({
    title: tutoringPage.hero.title.NL,
    description: tutoringPage.hero.subtitle.NL,
    price: prices.higher[0].price,
    priceCurrency: 'EUR',
    provider: {
      name: 'Stephens Privelessen',
      type: 'EducationalOrganization',
    },
    areaServed: 'Amsterdam',
    educationalProgramMode: 'One-on-one tutoring',
    timeToComplete: 'P1M', // Typical duration
    category: ['Mathematics', 'Statistics', 'Programming'],
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