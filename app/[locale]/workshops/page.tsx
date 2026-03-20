import Script from 'next/script';
import WorkshopsContent from '@/components/workshops/WorkshopsContent';
import { jsonLd } from './metadata';

export { generateMetadata } from './metadata';

export default function WorkshopsPage() {
  return (
    <>
      <Script id="workshops-ld+json" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(jsonLd)}
      </Script>
      <WorkshopsContent />
    </>
  );
} 