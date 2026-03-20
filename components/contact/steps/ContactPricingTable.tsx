'use client';

import React, { useState } from 'react';
import { m } from 'framer-motion';
import { useLocale } from 'next-intl';
import { voOnlinePackages, voPhysicalPackages, hboWoOnlinePackages, hboWoPhysicalPackages, spoedPrices } from '@/data/pricingData';

export function ContactPricingTable() {
  const locale = useLocale();
  const isNl = locale === 'nl';
  const [selectedLevel, setSelectedLevel] = useState<'vo' | 'hbo_wo'>('vo');

  const online = selectedLevel === 'vo' ? voOnlinePackages : hboWoOnlinePackages;
  const physical = selectedLevel === 'vo' ? voPhysicalPackages : hboWoPhysicalPackages;
  const spoed = selectedLevel === 'vo'
    ? { online: spoedPrices.voOnline, physical: spoedPrices.voPhysical }
    : { online: spoedPrices.hboWoOnline, physical: spoedPrices.hboWoPhysical };

  const studentLabel = selectedLevel === 'vo'
    ? (isNl ? 'leerling' : 'student')
    : (isNl ? 'student' : 'student');
  const studentsLabel = selectedLevel === 'vo'
    ? (isNl ? 'leerlingen' : 'students')
    : (isNl ? 'studenten' : 'students');

  return (
    <m.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-ink/30 backdrop-blur-sm rounded-2xl p-6 border border-sage/30"
    >
      {/* Level toggle */}
      <div className="flex justify-center mb-5">
        <div className="inline-flex bg-ink/20 rounded-xl p-1">
          <button
            onClick={() => setSelectedLevel('vo')}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              selectedLevel === 'vo' ? 'bg-sage/30 text-amber' : 'text-cream hover:text-amber-hover'
            }`}
          >
            {isNl ? 'Middelbaar' : 'Secondary'}
          </button>
          <button
            onClick={() => setSelectedLevel('hbo_wo')}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              selectedLevel === 'hbo_wo' ? 'bg-sage/30 text-amber' : 'text-cream hover:text-amber-hover'
            }`}
          >
            HBO / WO
          </button>
        </div>
      </div>

      {/* Pricing table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-sage/30">
              <th className="text-left py-2 text-cream font-medium text-sm">
                {isNl ? 'Pakket (4 uur)' : 'Package (4 hrs)'}
              </th>
              <th className="text-right py-2 text-cream font-medium text-sm">Online</th>
              <th className="text-right py-2 text-cream font-medium text-sm">
                {isNl ? 'Fysiek' : 'In-person'}
              </th>
            </tr>
          </thead>
          <tbody>
            {online.map((pkg, i) => (
              <tr key={pkg.students} className="border-b border-sage/20 last:border-0">
                <td className="py-2.5 text-cream text-sm">
                  {pkg.students} {pkg.students === 1 ? studentLabel : studentsLabel}
                  {pkg.students > 1 && (
                    <span className="text-muted-text ml-1 text-xs">
                      (€{pkg.pricePerPerson} p.p.)
                    </span>
                  )}
                </td>
                <td className="py-2.5 text-amber font-semibold text-right text-sm">
                  €{pkg.packagePrice}
                </td>
                <td className="py-2.5 text-amber font-semibold text-right text-sm">
                  €{physical[i].packagePrice}
                </td>
              </tr>
            ))}
            {/* Spoed row */}
            <tr className="border-t border-sage/30">
              <td className="py-2.5 text-cream text-sm italic">
                {isNl ? 'Spoed (2 uur)' : 'Rush (2 hrs)'}
              </td>
              <td className="py-2.5 text-amber/70 font-semibold text-right text-sm">
                €{spoed.online}
              </td>
              <td className="py-2.5 text-amber/70 font-semibold text-right text-sm">
                €{spoed.physical}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs text-cream/60">
        {isNl
          ? 'Groepsprijzen gelden als studenten zelf een groep vormen. Betaling vooraf per Tikkie.'
          : 'Group prices apply when students form their own group. Payment upfront via Tikkie.'}
      </p>
    </m.div>
  );
}
