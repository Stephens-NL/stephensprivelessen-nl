// app/services/page.tsx
import type { Metadata } from 'next';
import Services from '@/components/Services';
import { metadata as servicesMetadata, jsonLd } from './metadata';

export const metadata: Metadata = servicesMetadata;

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Services />
    </>
  );
}