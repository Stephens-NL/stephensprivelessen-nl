'use client';

import React from 'react';
import { m } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { voOnlinePackages, hboWoOnlinePackages } from '@/data/pricingData';

export function ContactGroupPricingTable() {
  const language = useLanguage();
  const isNl = language === 'NL';

  // Show the per-person savings for the largest group
  const voMax = voOnlinePackages[voOnlinePackages.length - 1];
  const voSolo = voOnlinePackages[0];
  const voSaving = Math.round((1 - voMax.pricePerPerson / voSolo.pricePerPerson) * 100);

  const hboMax = hboWoOnlinePackages[hboWoOnlinePackages.length - 1];
  const hboSolo = hboWoOnlinePackages[0];
  const hboSaving = Math.round((1 - hboMax.pricePerPerson / hboSolo.pricePerPerson) * 100);

  return (
    <m.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-ink/30 backdrop-blur-sm rounded-2xl p-6 border border-sage/30"
    >
      <h3 className="text-lg font-display font-semibold text-cream mb-3">
        {isNl ? 'Groepsvoordeel' : 'Group discount'}
      </h3>
      <p className="text-sm text-cream/80 mb-4">
        {isNl
          ? 'Vorm zelf een groep met klasgenoten of vrienden en bespaar flink op de kosten per persoon.'
          : 'Form a group with classmates or friends and save significantly on per-person costs.'}
      </p>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-ink/40 rounded-xl p-4 text-center">
          <p className="text-xs text-cream/60 mb-1">{isNl ? 'Middelbaar' : 'Secondary'}</p>
          <p className="text-2xl font-display font-bold text-amber">-{voSaving}%</p>
          <p className="text-xs text-cream/60 mt-1">
            {isNl
              ? `€${voMax.pricePerPerson} p.p. bij ${voMax.students} leerlingen`
              : `€${voMax.pricePerPerson} p.p. with ${voMax.students} students`}
          </p>
        </div>
        <div className="bg-ink/40 rounded-xl p-4 text-center">
          <p className="text-xs text-cream/60 mb-1">HBO / WO</p>
          <p className="text-2xl font-display font-bold text-amber">-{hboSaving}%</p>
          <p className="text-xs text-cream/60 mt-1">
            {isNl
              ? `€${hboMax.pricePerPerson} p.p. bij ${hboMax.students} studenten`
              : `€${hboMax.pricePerPerson} p.p. with ${hboMax.students} students`}
          </p>
        </div>
      </div>

      <p className="mt-4 text-xs text-cream/50">
        {isNl
          ? 'Groepstarieven gelden alleen als je zelf een groep vormt.'
          : 'Group rates only apply when you form your own group.'}
      </p>
    </m.div>
  );
}
