'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { WeekendLocation } from '@/data/types';

interface PricingSectionProps {
  content: WeekendLocation;
}

export function PricingSection({ content }: PricingSectionProps) {
  const { language } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.section
      ref={ref}
      id="pricing"
      className="relative z-10 py-24 px-4"
      style={{
        transform: isInView ? "none" : "translateY(100px)",
        opacity: isInView ? 1 : 0,
        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          {/* Regular Price */}
          <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm w-full md:w-64">
            <h3 className="text-lg font-medium text-yellow-200 mb-2">
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
          <div className="text-4xl text-yellow-300">→</div>

          {/* Community Rate */}
          <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-6 w-full md:w-72">
            <h3 className="text-lg font-medium text-white mb-2">
              {content.pricing.communityRate.label[language]}
            </h3>
            <div className="text-5xl font-bold mb-1">€{content.pricing.communityRate.amount}</div>
            <div className="text-sm mb-2">{content.pricing.communityRate.perHour[language]}</div>
            <div className="bg-yellow-400 text-yellow-900 text-sm font-bold py-1 px-3 rounded-full inline-block">
              {content.pricing.communityRate.savings[language]}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
} 