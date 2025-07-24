import { TutoringPage } from '@/components/privelessen/TutoringPage';
import { generateStructuredData } from '@/lib/structured-data';
import { pricingData } from '@/data/pricingData';
import { tutoringPageContent } from '@/data/tutoringPage';

export default function BijlesPage() {
  const structuredData = generateStructuredData({
    title: tutoringPageContent.title.NL,
    description: tutoringPageContent.description.NL,
    price: pricingData.locations.osb.packages.find(p => p.name.includes('Basis'))?.pricePerMonth || 0,
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