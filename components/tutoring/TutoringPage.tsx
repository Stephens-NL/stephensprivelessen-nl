'use client';

import React from 'react';
import { TutoringPage as TutoringPageType } from '@/types';
import { HeroSection } from './HeroSection';
import { FeaturesSection } from './FeaturesSection';
import { SubjectsSection } from './SubjectsSection';
import { ProcessSection } from './ProcessSection';
import { TestimonialsSection } from './TestimonialsSection';
import { PricingSection } from './PricingSection';
import { FAQSection } from './FAQSection';
import { useTranslation } from '@/hooks/useTranslation';
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
  const { t } = useTranslation();

  // Customize hero content for location-specific pages
  const heroContent = locationSpecific ? {
    ...tutoringPage.hero,
    title: {
      EN: `Professional Math Tutoring in ${locationSpecific.area}`,
      NL: `Professionele Wiskunde Bijles in ${locationSpecific.area}`
    },
    subtitle: {
      EN: `Expert tutoring in mathematics, statistics, and programming. Available at your home or a location of your choice in ${locationSpecific.area}.`,
      NL: `Deskundige bijles in wiskunde, statistiek en programmeren. Beschikbaar bij u thuis of op een locatie naar keuze in ${locationSpecific.area}.`
    }
  } : tutoringPage.hero;

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <HeroSection content={heroContent} t={t} />
      <div className="relative">
        {/* Decorative Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#93c5fd,transparent)]" />
        <div className="relative">
          <FeaturesSection features={tutoringPage.features} t={t} />
          <SubjectsSection subjects={tutoringPage.subjects} t={t} />
          <ProcessSection process={tutoringPage.process} t={t} />
          <TestimonialsSection testimonials={tutoringPage.testimonials} t={t} />
          <PricingSection pricing={tutoringPage.pricing} t={t} />
          <FAQSection faq={tutoringPage.faq} t={t} />
        </div>
      </div>
    </main>
  );
} 