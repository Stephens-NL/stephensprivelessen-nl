// app/faq/page.tsx
import { Metadata } from 'next';
import Script from 'next/script';
import FAQPage from '@/components/Faq';
import faqData from '@/data/faq.json';

export const metadata: Metadata = {
  title: "Veelgestelde Vragen | Stephens Privelessen Amsterdam",
  description: "Vind antwoorden op veelgestelde vragen over onze bijles, scriptiebegeleiding en workshops in Amsterdam. Duidelijke informatie over onze aanpak en werkwijze.",
  keywords: [
    'faq stephens privelessen',
    'veelgestelde vragen bijles',
    'bijles amsterdam faq',
    'scriptiebegeleiding vragen',
    'wiskunde bijles informatie',
    'statistiek hulp vragen',
    'workshops amsterdam faq',
    'tutoring amsterdam vragen',
    'bijles kosten',
    'bijles werkwijze',
    'scriptiebegeleiding aanpak',
    'online bijles vragen',
  ],
  openGraph: {
    title: "FAQ | Stephens Privelessen Amsterdam",
    description: "Antwoorden op veelgestelde vragen over onze bijles en begeleiding in Amsterdam.",
    url: "https://www.stephensprivelessen.nl/faq",
    type: 'website',
    locale: 'nl_NL',
    alternateLocale: 'en_US',
    siteName: 'Stephens Privelessen',
    images: [
      {
        url: `/api/og?title=${encodeURIComponent("FAQ A'dam")}&brandText=${encodeURIComponent("Stephensprivelessen.nl")}&buttonText=${encodeURIComponent("Krijg Antwoorden")}&footerText=${encodeURIComponent("Veelgestelde Vragen")}&featureImageUrl=/images/faq-banner.jpg`,
        width: 1200,
        height: 630,
        alt: "FAQ Stephens Privelessen Amsterdam",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ | Stephens Privelessen Amsterdam",
    description: "Veelgestelde vragen over onze bijles en begeleiding in Amsterdam.",
    images: [`/api/og?title=${encodeURIComponent("FAQ A'dam")}&brandText=${encodeURIComponent("Stephensprivelessen.nl")}&buttonText=${encodeURIComponent("Krijg Antwoorden")}&footerText=${encodeURIComponent("Veelgestelde Vragen")}&featureImageUrl=/images/faq-banner.jpg`],
  },
  alternates: {
    canonical: '/faq',
    languages: {
      'nl-NL': '/faq',
      'en-US': '/faq',
    },
  },
};

// Add revalidation settings
export const revalidate = 3600; // Revalidate every hour

export default function FaqPage() {
  // Build FAQPage JSON-LD from data
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.faqItems.map((item: any) => ({
      '@type': 'Question',
      name: item.question?.NL || item.question?.EN,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer?.NL || item.answer?.EN
      }
    }))
  };

  return (
    <>
      <Script id="faq-ld+json" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(faqJsonLd)}
      </Script>
      <FAQPage faqInfo={faqData.faqInfo} faqItems={faqData.faqItems} />
    </>
  );
}