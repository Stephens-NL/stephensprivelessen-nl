'use client';

import React, { useState } from 'react';
import { m } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { infoSectionTranslations as translations } from '@/data/infoSection';

export function ContactPricingTable() {
  const locale = useLocale();
    const language = locale === 'nl' ? 'NL' : 'EN';
    const t = useTranslations('contact');
  const [selectedLevel, setSelectedLevel] = useState<'middelbaar' | 'hoger'>('middelbaar');
  return (
    <m.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[var(--ink)]/30 backdrop-blur-sm rounded-2xl p-6 border border-[var(--sage)]/30"
    >
      <div className="flex justify-center mb-4">
        <div className="inline-flex bg-[var(--ink)]/20 rounded-xl p-1">
          <button
            onClick={() => setSelectedLevel('middelbaar')}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              selectedLevel === 'middelbaar' ? 'bg-[var(--sage)]/30 text-[var(--amber)]' : 'text-[var(--cream)] hover:text-[var(--amber-hover)]'
            }`}
          >
            {t(translations.secondaryEducation)}
          </button>
          <button
            onClick={() => setSelectedLevel('hoger')}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              selectedLevel === 'hoger' ? 'bg-[var(--sage)]/30 text-[var(--amber)]' : 'text-[var(--cream)] hover:text-[var(--amber-hover)]'
            }`}
          >
            {t(translations.higherEducation)}
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-full">
          <thead>
            <tr className="border-b border-[var(--sage)]/30">
              <th className="text-left py-2 text-[var(--cream)] font-medium">Type</th>
              {selectedLevel === 'middelbaar' ? (
                <>
                  <th className="text-right py-2 text-[var(--cream)] font-medium">1 leerling</th>
                  <th className="text-right py-2 text-[var(--cream)] font-medium">p.p. (2 lln)</th>
                </>
              ) : (
                <>
                  <th className="text-right py-2 text-[var(--cream)] font-medium">1 student</th>
                  <th className="text-right py-2 text-[var(--cream)] font-medium">p.p. (2 stud)</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {[
              // 4-uurs pakketprijzen — kolom 1: 1 leerling/student, kolom 2: p.p. bij 2 personen
              // VO: online €240/€160pp | fysiek €300/€200pp
              // HBO/WO: online €360/€260pp | fysiek €450/€300pp
              { type: { EN: "4hr package — online", NL: "4 uur pakket — online" }, ms20minus: "€240", ms20plus: "€160", bachelor: "€360", master: "€260" },
              { type: { EN: "4hr package — physical", NL: "4 uur pakket — fysiek" }, ms20minus: "€300", ms20plus: "€200", bachelor: "€450", master: "€300" },
              { type: { EN: "Rush 2hr — online", NL: "Spoed 2 uur — online" }, ms20minus: "€120", ms20plus: "—", bachelor: "€180", master: "—" },
              { type: { EN: "Rush 2hr — physical", NL: "Spoed 2 uur — fysiek" }, ms20minus: "€180", ms20plus: "—", bachelor: "€260", master: "—" },
            ].map((row) => (
              <tr key={row.type.NL} className="border-b border-[var(--sage)]/30 last:border-0">
                <td className="py-2 text-[var(--cream)]">{t(row.type)}</td>
                {selectedLevel === 'middelbaar' ? (
                  <>
                    <td className="py-2 text-[var(--amber)] font-semibold text-right">{row.ms20minus}</td>
                    <td className="py-2 text-[var(--amber)] font-semibold text-right">{row.ms20plus}</td>
                  </>
                ) : (
                  <>
                    <td className="py-2 text-[var(--amber)] font-semibold text-right">{row.bachelor}</td>
                    <td className="py-2 text-[var(--amber)] font-semibold text-right">{row.master}</td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm text-[var(--cream)] italic">{t(translations.whatsappSupport)}</p>
    </m.div>
  );
}
