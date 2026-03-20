import Script from 'next/script';
import Hero from '@/components/Hero';
import ServicesShort from '@/components/ServicesShort';
import Testimonials from '@/components/Testimonials';
import InternalLinks from '@/components/InternalLinks';
import { websiteSchema } from '@/lib/structured-data';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isNl = locale === 'nl';
  return {
    title: isNl ? "Stephen's Privelessen | Bijles Amsterdam" : "Stephen's Private Tutoring | Tutoring Amsterdam",
    description: isNl
      ? "Professionele bijles in Amsterdam. Wiskunde, statistiek, programmeren. Online of op locatie. Van €75/uur."
      : "Professional tutoring in Amsterdam. Mathematics, statistics, programming. Online or on-site. From €75/hr.",
  };
}

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
