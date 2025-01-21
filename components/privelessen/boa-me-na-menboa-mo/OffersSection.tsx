'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { FaStar } from 'react-icons/fa';
import { WeekendLocation, Bilingual } from '@/data/types';
import { OfferVariant } from './OfferVariant';

interface OffersSectionProps {
  content: WeekendLocation;
  educationLevels: Array<{
    id: string;
    title: string;
    subjects: Bilingual[];
    icon: string;
    color: string;
  }>;
  activeLevel: string;
  subject: Bilingual;
}

export function OffersSection({ content, educationLevels, activeLevel, subject }: OffersSectionProps) {
  const { language } = useLanguage();

  return (
    <section id="offers" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 mb-4">
            {content.specialOffer[language]}
          </h2>
          <div className="flex items-center justify-center gap-2 text-lg text-yellow-200">
            <FaStar className="text-yellow-500" />
            <span>{content.discount.text[language]}</span>
            <FaStar className="text-yellow-500" />
          </div>
          <p className="text-white/60">
            {content.discount.subtext[language]}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <OfferVariant 
            offer={content.programOffers.weekendTutoring} 
            ctaText={content.cta.trial[language]} 
            educationLevels={educationLevels}
            activeLevel={activeLevel}
            subject={subject}
          />
          <OfferVariant 
            offer={content.programOffers.personalCoaching} 
            ctaText={content.cta.trial[language]} 
            educationLevels={educationLevels}
            activeLevel={activeLevel}
            subject={subject}
          />
          <OfferVariant 
            offer={content.programOffers.flexibleSupport} 
            ctaText={content.cta.trial[language]} 
            educationLevels={educationLevels}
            activeLevel={activeLevel}
            subject={subject}
          />
        </div>
      </div>
    </section>
  );
} 