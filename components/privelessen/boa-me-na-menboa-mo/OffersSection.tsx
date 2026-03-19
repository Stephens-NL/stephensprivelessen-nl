'use client';

import { useTranslations } from 'next-intl';
import { FaStar } from 'react-icons/fa';
import { Bilingual } from '@/data/types';
import { OfferVariant } from './OfferVariant';

interface OffersSectionProps {
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

export function OffersSection({ educationLevels, activeLevel, subject }: OffersSectionProps) {
  const t = useTranslations('boa');

  return (
    <section id="offers" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--amber)] to-[var(--amber-hover)] mb-4">
            {t('specialOffer')}
          </h2>
          <div className="flex items-center justify-center gap-2 text-lg text-[var(--cream)]">
            <FaStar className="text-[var(--amber)]" />
            <span>{t('discount.text')}</span>
            <FaStar className="text-[var(--amber)]" />
          </div>
          <p className="text-white/60">
            {t('discount.subtext')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <OfferVariant
            offerKey="weekendTutoring"
            ctaText={t('cta.trial')}
            educationLevels={educationLevels}
            activeLevel={activeLevel}
            subject={subject}
          />
          <OfferVariant
            offerKey="personalCoaching"
            ctaText={t('cta.trial')}
            educationLevels={educationLevels}
            activeLevel={activeLevel}
            subject={subject}
          />
          <OfferVariant
            offerKey="flexibleSupport"
            ctaText={t('cta.trial')}
            educationLevels={educationLevels}
            activeLevel={activeLevel}
            subject={subject}
          />
        </div>
      </div>
    </section>
  );
}
