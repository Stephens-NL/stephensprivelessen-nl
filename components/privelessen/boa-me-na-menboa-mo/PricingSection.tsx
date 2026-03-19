'use client';

import { useTranslations } from 'next-intl';
import { m, useInView } from 'framer-motion';
import { useRef } from 'react';
import { weekendLocations } from '@/data/weekendTutoring';
import { WeekendLocation } from '@/data/types';

const content = weekendLocations.find(loc => loc.id === 'boa-me-na-menboa-mo') as WeekendLocation;

export function PricingSection() {
  const t = useTranslations('boa');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <m.section
      ref={ref}
      id="pricing"
      className="relative z-10 py-24 px-4"
      style={{
        transform: isInView ? "none" : "translateY(100px)",
        opacity: isInView ? 1 : 0,
        transition: "transform 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s, opacity 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          {/* Regular Price */}
          <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm w-full md:w-64">
            <h3 className="text-lg font-medium text-[var(--cream)] mb-2">
              {t('pricing.regularPrice.label')}
            </h3>
            <div className="text-3xl font-bold mb-1 line-through text-white/70">
              €{content.pricing.regularPrice.amount}
            </div>
            <div className="text-sm text-white/60">
              {t('pricing.regularPrice.perHour')}
            </div>
          </div>

          {/* Arrow */}
          <div className="text-4xl text-[var(--amber)]">→</div>

          {/* Community Rate */}
          <div className="bg-gradient-to-br from-[var(--amber)] to-[var(--amber-hover)] rounded-xl p-6 w-full md:w-72">
            <h3 className="text-lg font-medium text-white mb-2">
              {t('pricing.communityRate.label')}
            </h3>
            <div className="text-5xl font-bold mb-1">€{content.pricing.communityRate.amount}</div>
            <div className="text-sm mb-2">{t('pricing.communityRate.perHour')}</div>
            <div className="bg-[var(--amber)] text-[var(--ink)] text-sm font-bold py-1 px-3 rounded-full inline-block">
              {t('pricing.communityRate.savings')}
            </div>
          </div>
        </div>
      </div>
    </m.section>
  );
}
