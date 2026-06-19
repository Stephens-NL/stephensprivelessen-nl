import Hero from '@/components/Hero';
import ServicesShort from '@/components/ServicesShort';
import InternalLinks from '@/components/InternalLinks';
import { websiteSchema } from '@/lib/structured-data';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isNl = locale === 'nl';
  return {
    title: { absolute: isNl ? "Stephen's Privélessen | Bijles & Privelessen Wiskunde, Statistiek Amsterdam" : "Stephen's Private Tutoring | Math & Statistics Tutoring Amsterdam" },
    description: isNl
      ? "Professionele bijles in Amsterdam. Wiskunde, statistiek, programmeren. Online of op locatie. Van €75/uur."
      : "Professional tutoring in Amsterdam. Mathematics, statistics, programming. Online or on-site. From €75/hr.",
  };
}

export default function Home() {
  return (
    <div className="bg-[var(--cream)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(websiteSchema)}}
      />
      <Hero />
      <ServicesShort />
      <InternalLinks />
    </div>
  );
}
