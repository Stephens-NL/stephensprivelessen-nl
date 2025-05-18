'use client';

import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/contexts/LanguageContext';
import { CustomCursor } from '@/components/shared/CustomCursor';
import Header from '@/components/Header';
import { HeroSection } from '@/components/mbo-rekenen/HeroSection';
import { AboutSection } from '@/components/mbo-rekenen/AboutSection';
import { ServicesSection } from '@/components/mbo-rekenen/ServicesSection';
import { PricingSection } from '@/components/mbo-rekenen/PricingSection';
import { TargetGroupSection } from '@/components/mbo-rekenen/TargetGroupSection';
import { WhyChooseSection } from '@/components/mbo-rekenen/WhyChooseSection';
import { ContactSection } from '@/components/mbo-rekenen/ContactSection';

export default function Page() {
  const { language } = useLanguage();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-amber-950 text-white">
      <CustomCursor />
      <Header />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <PricingSection />
      <TargetGroupSection />
      <WhyChooseSection />
      <ContactSection />
    </div>
  );
} 