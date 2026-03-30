// components/PricingPage.tsx
'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

const PricingPage = () => {
  const t = useTranslations('tutoring');

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--ink)] to-[var(--ink-light)] py-12 px-6 sm:px-8 lg:px-12">
      <div className="max-w-6xl mx-auto bg-[var(--ink)] p-8 rounded-lg shadow-sm border border-[var(--sage)]/20">
        <h1 className="text-4xl font-display font-bold text-center text-[var(--amber)] mb-12">
          {t('pricing.title')}
        </h1>
      </div>
    </div>
  );
};

export default PricingPage;
