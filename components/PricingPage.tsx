// app/terms-and-pricing/page.tsx
'use client';

import React from 'react';
import PricingTable from '@/components/PricingTable';
import LocationPricingTable from '@/components/LocationPricingTable';
import { prices } from '@/data';
import { terms } from '@/data';
import { CollapsibleSection } from '@/components/CollapsibleSection';

const PricingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 py-12 px-6 sm:px-8 lg:px-12">
      <div className="max-w-6xl mx-auto bg-blue-800 p-8 rounded-lg shadow-lg">
        {/* Header */}
        <h1 className="text-4xl font-bold text-center text-yellow-300 mb-12">Tarieven en Voorwaarden</h1>

        {/* Individual Pricing */}
        <PricingTable
          pricing={prices.higher}
          title="Tarieven Hoger Onderwijs"
        />
        <PricingTable
          pricing={prices.secondary20Plus}
          title="Tarieven Voortgezet Onderwijs (20+)"
        />
        <PricingTable
          pricing={prices.secondary20Minus}
          title="Tarieven Voortgezet Onderwijs (20-)"
        />
        <PricingTable
          pricing={prices.groupLessons.higher}
          title="Groepslessen Hoger Onderwijs"
        />

        {/* Flexibility Premium */}
        <PricingTable
          pricing={prices.flexibilityPremium}
          title="Premie voor Flexibele Uren"
        />

        {/* Travel Costs using LocationPricingTable */}
        <LocationPricingTable
          pricing={prices.travelCosts}
          title="Reiskosten"
        />

        {/* Last-minute surcharges */}
        <CollapsibleSection title="Last-Minute Toeslagen">
          <ul className="list-disc pl-5 text-yellow-100">
            {prices.lastMinuteSurcharges.map((surcharge, index) => (
              <li key={index} className="mb-2">
                {surcharge.timeFrame}: {surcharge.percentage}% toeslag
              </li>
            ))}
          </ul>
        </CollapsibleSection>

        {/* Terms and Conditions */}
        <h2 className="text-3xl font-bold text-yellow-300 mt-12 mb-6 text-center">Lesvoorwaarden</h2>

        <CollapsibleSection title={terms.payment.title.NL}>
          <ul className="list-disc pl-5 text-yellow-100">
            {terms.payment.items.NL.map((item, index) => (
              <li key={index} className="mb-2">{item}</li>
            ))}
          </ul>
        </CollapsibleSection>

        <CollapsibleSection title={terms.cancellation.title.NL}>
          <ul className="list-disc pl-5 text-yellow-100">
            {terms.cancellation.items.NL.map((item, index) => (
              <li key={index} className="mb-2">{item}</li>
            ))}
          </ul>
        </CollapsibleSection>

        {/* Voeg meer voorwaarden toe indien nodig */}
      </div>
    </div>
  );
};

export default PricingPage;