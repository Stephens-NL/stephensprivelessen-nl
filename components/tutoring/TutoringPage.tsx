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

interface TutoringPageProps {
  content: TutoringPageType;
}

export function TutoringPage({ content }: TutoringPageProps) {
  const { t } = useTranslation();

  if (!content) {
    console.error('TutoringPage: content is missing');
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Oeps! Er ging iets mis.</h1>
          <p className="text-gray-600">De pagina kon niet worden geladen. Probeer het later opnieuw.</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <HeroSection content={content.hero} t={t} />
      <div className="relative">
        {/* Decorative Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#93c5fd,transparent)]" />
        <div className="relative">
          <FeaturesSection features={content.features} t={t} />
          <SubjectsSection subjects={content.subjects} t={t} />
          <ProcessSection process={content.process} t={t} />
          <TestimonialsSection testimonials={content.testimonials} t={t} />
          <PricingSection pricing={content.pricing} t={t} />
          <FAQSection faq={content.faq} t={t} />
        </div>
      </div>
    </main>
  );
} 