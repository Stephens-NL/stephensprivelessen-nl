'use client';

import React from 'react';
import { TutoringPage as TutoringPageType } from '@/data/types';
import { HeroSection } from './HeroSection';
import { FeaturesSection } from './FeaturesSection';
import { SubjectsSection } from './SubjectsSection';
import { ProcessSection } from './ProcessSection';
import { TestimonialsSection } from './TestimonialsSection';
import { PricingSection } from './PricingSection';
import { FAQSection } from './FAQSection';
import { LocationsSection } from './LocationsSection';
import { SpecialProgramsSection } from './SpecialProgramsSection';
import { useLocale } from 'next-intl';
import { tutoringPage } from '@/data/tutoringPage';

interface LocationSpecific {
  area: string;
  title: string;
  description: string;
}

interface TutoringPageProps {
  locationSpecific?: LocationSpecific;
}

export function TutoringPage({ locationSpecific }: TutoringPageProps) {
  const locale = useLocale();
  const language = locale === 'nl' ? 'NL' : 'EN';
  const t = (text: { EN: string; NL: string }) => text[language];

  // Customize hero content for location-specific pages
  const heroContent = locationSpecific ? {
    ...tutoringPage.hero,
    title: {
      EN: `Professional Tutoring in ${locationSpecific.area}`,
      NL: `Professionele Bijles in ${locationSpecific.area}`
    },
    subtitle: {
      EN: `Wiskunde, statistiek en programmeren. Online of op Science Park.`,
      NL: `Wiskunde, statistiek en programmeren. Online of op Science Park.`
    }
  } : tutoringPage.hero;

  return (
    <main className="min-h-screen bg-gradient-to-br from-[var(--cream)] via-[var(--cream-dark)] to-[var(--cream)]">
      <HeroSection content={heroContent} t={t} />
      <div className="relative">
        {/* Decorative Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,var(--border-warm),transparent)]" />
        <div className="relative">
          <FeaturesSection features={tutoringPage.features} t={t} />
          <SubjectsSection subjects={tutoringPage.subjects} t={t} />
          <ProcessSection process={tutoringPage.process} t={t} />
          <TestimonialsSection testimonials={tutoringPage.testimonials} t={t} />
          <PricingSection pricing={tutoringPage.pricing} t={t} />
          <FAQSection faq={tutoringPage.faq} t={t} />
          <LocationsSection t={t} />
          <SpecialProgramsSection t={t} />
        </div>
      </div>
    </main>
  );
} 