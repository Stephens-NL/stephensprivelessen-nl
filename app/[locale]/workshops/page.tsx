import type { Metadata } from 'next';
import Script from 'next/script';
import WorkshopsContent from '@/components/workshops/WorkshopsContent';
import { metadata as workshopsMetadata, jsonLd } from './metadata';

export const metadata: Metadata = workshopsMetadata;

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