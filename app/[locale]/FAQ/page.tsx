// app/faq/page.tsx
import Script from 'next/script';
import FAQPage from '@/components/Faq';
import faqData from '@/data/faq.json';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isNl = locale === 'nl';
  return {
    title: isNl ? "Veelgestelde Vragen | Stephens Privelessen Amsterdam" : "Frequently Asked Questions | Stephens Private Tutoring Amsterdam",
    description: isNl
      ? "Vind antwoorden op veelgestelde vragen over onze bijles, scriptiebegeleiding en workshops in Amsterdam. Duidelijke informatie over onze aanpak en werkwijze."
      : "Find answers to frequently asked questions about our tutoring, thesis supervision and workshops in Amsterdam. Clear information about our approach and methods.",
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
      title: isNl ? "FAQ | Stephens Privelessen Amsterdam" : "FAQ | Stephens Private Tutoring Amsterdam",
      description: isNl
        ? "Antwoorden op veelgestelde vragen over onze bijles en begeleiding in Amsterdam."
        : "Answers to frequently asked questions about our tutoring and guidance in Amsterdam.",
      url: "https://www.stephensprivelessen.nl/faq",
      type: 'website',
      locale: 'nl_NL',
      alternateLocale: 'en_US',
      siteName: 'Stephens Privelessen',
      images: [
        {
          url: `/api/og?title=${encodeURIComponent("FAQ A'dam")}&brandText=${encodeURIComponent("Stephensprivelessen.nl")}&buttonText=${encodeURIComponent(isNl ? "Krijg Antwoorden" : "Get Answers")}&footerText=${encodeURIComponent(isNl ? "Veelgestelde Vragen" : "Frequently Asked Questions")}&featureImageUrl=/images/faq-banner.jpg`,
          width: 1200,
          height: 630,
          alt: isNl ? "FAQ Stephens Privelessen Amsterdam" : "FAQ Stephens Private Tutoring Amsterdam",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: isNl ? "FAQ | Stephens Privelessen Amsterdam" : "FAQ | Stephens Private Tutoring Amsterdam",
      description: isNl
        ? "Veelgestelde vragen over onze bijles en begeleiding in Amsterdam."
        : "Frequently asked questions about our tutoring and guidance in Amsterdam.",
      images: [`/api/og?title=${encodeURIComponent("FAQ A'dam")}&brandText=${encodeURIComponent("Stephensprivelessen.nl")}&buttonText=${encodeURIComponent(isNl ? "Krijg Antwoorden" : "Get Answers")}&footerText=${encodeURIComponent(isNl ? "Veelgestelde Vragen" : "Frequently Asked Questions")}&featureImageUrl=/images/faq-banner.jpg`],
    },
    alternates: {
      canonical: '/faq',
      languages: {
        'nl-NL': '/faq',
        'en-US': '/faq',
      },
    },
  };
}

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
      <FAQPage />
    </>
  );
}