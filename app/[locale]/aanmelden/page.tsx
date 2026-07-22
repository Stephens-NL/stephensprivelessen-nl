// app/[locale]/aanmelden/page.tsx
import { buildAlternates } from '@/lib/seo';
// Shareable self-registration link: opens the intake wizard straight at the
// lesson-request flow (skips the info-vs-lesson InitialChoice split). Reuses the
// contact wizard, so submissions flow through the same /api/contact -> /api/intake
// (source:'website') path with zero backend changes.
import React from 'react';
import Contact from '@/components/contact/Contact';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isNl = locale === 'nl';
  const title = isNl
    ? "Aanmelden | Stephens Privélessen Amsterdam"
    : "Register | Stephens Private Tutoring Amsterdam";
  const description = isNl
    ? "Schrijf je in voor bijles — wiskunde, statistiek, scriptie. Online of Science Park. Snelle reactie."
    : "Register for tutoring — mathematics, statistics, thesis. Online or Science Park. Quick response.";
  const ogImage = `/api/og?title=${encodeURIComponent(isNl ? "Aanmelden" : "Register")}&brandText=${encodeURIComponent("Stephensprivelessen.nl")}&buttonText=${encodeURIComponent(isNl ? "Schrijf je in" : "Sign up")}&footerText=${encodeURIComponent(isNl ? "Wiskunde, Statistiek & Meer" : "Maths, Statistics & More")}&featureImageUrl=/images/contact-banner.jpg`;

  return {
    title,
    description,
    keywords: [
      'aanmelden bijles',
      'inschrijven bijles amsterdam',
      'bijles aanvragen',
      'wiskunde bijles aanmelden',
      'statistiek bijles inschrijven',
      'scriptiebegeleiding aanmelden',
      'register tutoring amsterdam',
      'sign up tutoring',
    ],
    openGraph: {
      title,
      description,
      url: "https://www.stephensprivelessen.nl/aanmelden",
      type: 'website',
      locale: 'nl_NL',
      alternateLocale: 'en_US',
      siteName: 'Stephens Privelessen',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: isNl ? "Aanmelden Stephens Privelessen Amsterdam" : "Register Stephens Private Tutoring Amsterdam",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    alternates: buildAlternates(locale, '/aanmelden'),
  };
}

const AanmeldenPage = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const intro = locale === 'nl'
    ? "Leuk dat je bijles wilt! Vul dit in, dan neem ik snel contact op."
    : "Great that you'd like tutoring! Fill this in and I'll get back to you soon.";

  return <Contact startStep="personal-details" intro={intro} />;
};

export default AanmeldenPage;
