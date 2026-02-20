// app/terms-and-pricing/page.tsx
'use client';

import React from 'react';
import PricingTable from '@/components/PricingTable';
import LocationPricingTable from '@/components/LocationPricingTable';
import { prices } from '@/data';
import { terms } from '@/data';
import { CollapsibleSection } from '@/components/CollapsibleSection';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/hooks/useTranslation';

const PricingPage = () => {
  const { language } = useLanguage();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 py-12 px-6 sm:px-8 lg:px-12">
      <div className="max-w-6xl mx-auto bg-blue-800 p-8 rounded-lg shadow-lg">
        {/* Header */}
        <h1 className="text-4xl font-bold text-center text-yellow-300 mb-12">
          {String(t({ EN: 'Rates and Terms', NL: 'Tarieven en Voorwaarden' }))}
        </h1>

        {/* Individual Pricing */}
        <PricingTable
          pricing={prices.higher}
          title={String(t({ EN: 'Higher Education Rates', NL: 'Tarieven Hoger Onderwijs' }))}
        />
        <PricingTable
          pricing={prices.secondary20Plus}
          title={String(t({ EN: 'Secondary Education Rates (20+)', NL: 'Tarieven Voortgezet Onderwijs (20+)' }))}
        />
        <PricingTable
          pricing={prices.secondary20Minus}
          title={String(t({ EN: 'Secondary Education Rates (20-)', NL: 'Tarieven Voortgezet Onderwijs (20-)' }))}
        />
        <PricingTable
          pricing={prices.groupLessons.higher}
          title={String(t({ EN: 'Group Lessons Higher Education', NL: 'Groepslessen Hoger Onderwijs' }))}
        />

        {/* Flexibility Premium */}
        <LocationPricingTable
          pricing={prices.flexibilityPremium}
          title={String(t({ EN: 'Flexibility Premium', NL: 'Premie voor Flexibele Uren' }))}
        />

        {/* Travel Costs using LocationPricingTable */}
        <LocationPricingTable
          pricing={prices.travelCosts}
          title={String(t({ EN: 'Travel Costs', NL: 'Reiskosten' }))}
        />

        {/* Last-minute surcharges */}
        <CollapsibleSection title={String(t({ EN: 'Last-Minute Surcharges', NL: 'Last-Minute Toeslagen' }))}>
          <ul className="list-disc pl-5 text-yellow-100">
            {prices.lastMinuteSurcharges.map((surcharge) => (
              <li key={`${surcharge.timeFrame}-${surcharge.percentage}`} className="mb-2">
                {surcharge.timeFrame}: {surcharge.percentage}% {String(t({ EN: 'surcharge', NL: 'toeslag' }))}
              </li>
            ))}
          </ul>
        </CollapsibleSection>

        {/* Terms and Conditions */}
        <h2 className="text-3xl font-bold text-yellow-300 mt-12 mb-6 text-center">
          {String(t({ EN: 'Terms and Conditions', NL: 'Lesvoorwaarden' }))}
        </h2>

        {terms.map((term) => (
          <CollapsibleSection key={term.title[language]} title={term.title[language]}>
            <ul className="list-disc pl-5 text-yellow-100">
              {term.content.map((item) => (
                <li key={item[language]} className="mb-2">{item[language]}</li>
              ))}
            </ul>
          </CollapsibleSection>
        ))}
      </div>
    </div>
  );
};

export default PricingPage;