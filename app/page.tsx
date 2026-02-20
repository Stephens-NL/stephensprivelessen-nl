import { Metadata } from 'next';
import Script from 'next/script';
import Hero from '../components/Hero';
import ServicesShort from '@/components/ServicesShort';
import Testimonials from '@/components/Testimonials';
import InternalLinks from '@/components/InternalLinks';
import { websiteSchema } from '@/lib/structured-data';

export const metadata: Metadata = {
  title: "Stephen's Privelessen | Bijles Amsterdam",
  description: "Professionele bijles in Amsterdam. Wiskunde, statistiek, programmeren. Online of op locatie. Van €75/uur.",
};

export default function Home() {
  return (
    <>
      <Script id="website-ld+json" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(websiteSchema)}
      </Script>
      <Hero />
      <ServicesShort />
      <InternalLinks />
      <Testimonials /> 
    </>
  );
}
