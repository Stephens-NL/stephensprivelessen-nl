'use client';

import React from 'react';
import { HeroSection } from './HeroSection';
import { FeaturesSection } from './FeaturesSection';
import { SubjectsSection } from './SubjectsSection';
import { ProcessSection } from './ProcessSection';
import { PricingSection } from './PricingSection';
import { FAQSection } from './FAQSection';
import { LocationsSection } from './LocationsSection';

interface LocationSpecific {
  area: string;
  title: string;
  description: string;
}

interface TutoringPageProps {
  locationSpecific?: LocationSpecific;
}

export function TutoringPage({ locationSpecific }: TutoringPageProps) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[var(--cream)] via-[var(--cream-dark)] to-[var(--cream)]">
      <HeroSection locationSpecific={locationSpecific ? { area: locationSpecific.area } : undefined} />
      <div className="relative">
        {/* Decorative Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,var(--border-warm),transparent)]" />
        <div className="relative">
          <FeaturesSection />
          <SubjectsSection />
          <ProcessSection />
          <PricingSection />
          <FAQSection />
          <LocationsSection />
        </div>
      </div>
    </main>
  );
}
