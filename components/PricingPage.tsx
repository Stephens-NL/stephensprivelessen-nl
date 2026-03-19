// components/PricingPage.tsx
'use client';

import React from 'react';
import PricingTable from '@/components/PricingTable';
import LocationPricingTable from '@/components/LocationPricingTable';
import { prices } from '@/data';
import { useTranslations } from 'next-intl';

const PricingPage = () => {
  const t = useTranslations('tutoring');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 py-12 px-6 sm:px-8 lg:px-12">
      <div className="max-w-6xl mx-auto bg-blue-800 p-8 rounded-lg shadow-lg">
        {/* Header */}
        <h1 className="text-4xl font-bold text-center text-yellow-300 mb-12">
          {t('pricing.title')}
        </h1>

        {/* Individual Pricing */}
        <PricingTable
          pricing={prices.higher}
          title={t('infoSection.individualSessions')}
        />
        <PricingTable
          pricing={prices.secondary20Plus}
          title={t('infoSection.groupSessions')}
        />
        <PricingTable
          pricing={prices.secondary20Minus}
          title={t('infoSection.thesisSupervision')}
        />

        {/* Flexibility Premium */}
        <LocationPricingTable
          pricing={prices.flexibilityPremium}
          title={t('infoSection.rates')}
        />

        {/* Travel Costs */}
        <LocationPricingTable
          pricing={prices.travelCosts}
          title={t('infoSection.ratesNote')}
        />
      </div>
    </div>
  );
};

export default PricingPage;
