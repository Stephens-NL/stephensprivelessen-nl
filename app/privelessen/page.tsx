import { jsonLd } from './metadata';
import Script from 'next/script';
import { TutoringPage } from '@/components/privelessen/TutoringPage';

export default function BijlesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TutoringPage />
    </>
  );
} 