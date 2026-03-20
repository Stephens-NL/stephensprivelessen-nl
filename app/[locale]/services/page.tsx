// app/services/page.tsx
import Script from 'next/script';
import Services from '@/components/Services';
import { jsonLd } from './metadata';

export { generateMetadata } from './metadata';

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