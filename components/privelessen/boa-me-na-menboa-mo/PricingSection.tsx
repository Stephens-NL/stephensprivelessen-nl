'use client';

import { useLocale } from 'next-intl';
import { m, useInView } from 'framer-motion';
import { useRef } from 'react';
import { WeekendLocation } from '@/data/types';

interface PricingSectionProps {
  content: WeekendLocation;
}

export function PricingSection({ content }: PricingSectionProps) {
  const locale = useLocale();
  const language = locale.toUpperCase() as 'EN' | 'NL';
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
              {content.pricing.regularPrice.label[language]}
            </h3>
            <div className="text-3xl font-bold mb-1 line-through text-white/70">
              €{content.pricing.regularPrice.amount}
            </div>
            <div className="text-sm text-white/60">
              {content.pricing.regularPrice.perHour[language]}
            </div>
          </div>

          {/* Arrow */}
          <div className="text-4xl text-[var(--amber)]">→</div>

          {/* Community Rate */}
          <div className="bg-gradient-to-br from-[var(--amber)] to-[var(--amber-hover)] rounded-xl p-6 w-full md:w-72">
            <h3 className="text-lg font-medium text-white mb-2">
              {content.pricing.communityRate.label[language]}
            </h3>
            <div className="text-5xl font-bold mb-1">€{content.pricing.communityRate.amount}</div>
            <div className="text-sm mb-2">{content.pricing.communityRate.perHour[language]}</div>
            <div className="bg-[var(--amber)] text-[var(--ink)] text-sm font-bold py-1 px-3 rounded-full inline-block">
              {content.pricing.communityRate.savings[language]}
            </div>
          </div>
        </div>
      </div>
    </m.section>
  );
} 