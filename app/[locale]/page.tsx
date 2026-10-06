import { buildAlternates } from '@/lib/seo';
import { fromHourLabel } from '@/data/pricingData';
import Hero from '@/components/Hero';
import ServicesShort from '@/components/ServicesShort';
import InternalLinks from '@/components/InternalLinks';
import RushNote from '@/components/RushNote';
import { JsonLd } from '@/components/JsonLd';
import { localBusinessSchema, websiteSchema } from '@/lib/structured-data';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isNl = locale === 'nl';
  return {
    title: { absolute: isNl ? "Stephen's Privélessen | Bijles & Privelessen Wiskunde, Statistiek Amsterdam" : "Stephen's Private Tutoring | Math & Statistics Tutoring Amsterdam" },
    description: isNl
      ? `Professionele bijles in Amsterdam. Wiskunde, statistiek, programmeren. Online of op locatie. Van ${fromHourLabel(locale)}/uur.`
      : `Professional tutoring in Amsterdam. Mathematics, statistics, programming. Online or on-site. From ${fromHourLabel(locale)}/hr.`,
    alternates: buildAlternates(locale, '/'),
  };
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <div className="bg-[var(--cream)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(websiteSchema)}}
      />
      <JsonLd data={localBusinessSchema(locale)} />
      <Hero />
      <ServicesShort />
      <InternalLinks />
      <RushNote />
    </div>
  );
}
