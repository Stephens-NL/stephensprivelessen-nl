// app/services/page.tsx
import type { Metadata } from 'next';
import Script from 'next/script';
import Services from '@/components/Services';
import { metadata as servicesMetadata, jsonLd } from './metadata';

export const metadata: Metadata = servicesMetadata;

export default function ServicesPage() {
  return (
    <>
      <Script id="services-ld+json" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(jsonLd)}
      </Script>
      <Services />
    </>
  );
}