'use client';

import React, { useState } from 'react';
import { m } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { infoSectionTranslations as translations } from '@/data/infoSection';

export function ContactPricingTable() {
  const { t } = useTranslation();
  const [selectedLevel, setSelectedLevel] = useState<'middelbaar' | 'hoger'>('middelbaar');
  return (
    <m.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-blue-600/30 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30"
    >
      <div className="flex justify-center mb-4">
        <div className="inline-flex bg-blue-600/20 rounded-xl p-1">
          <button
            onClick={() => setSelectedLevel('middelbaar')}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              selectedLevel === 'middelbaar' ? 'bg-blue-500/30 text-yellow-300' : 'text-yellow-100 hover:text-yellow-200'
            }`}
          >
            {t(translations.secondaryEducation)}
          </button>
          <button
            onClick={() => setSelectedLevel('hoger')}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              selectedLevel === 'hoger' ? 'bg-blue-500/30 text-yellow-300' : 'text-yellow-100 hover:text-yellow-200'
            }`}
          >
            {t(translations.higherEducation)}
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-full">
          <thead>
            <tr className="border-b border-blue-600/50">
              <th className="text-left py-2 text-yellow-100 font-medium">Type</th>
              {selectedLevel === 'middelbaar' ? (
                <>
                  <th className="text-right py-2 text-yellow-100 font-medium">Tot 20 jaar</th>
                  <th className="text-right py-2 text-yellow-100 font-medium">Vanaf 20 jaar</th>
                </>
              ) : (
                <>
                  <th className="text-right py-2 text-yellow-100 font-medium">Bachelor</th>
                  <th className="text-right py-2 text-yellow-100 font-medium">Master</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {[
              { type: { EN: "Single session", NL: "Losse sessie" }, ms20minus: "€75", ms20plus: "€80", bachelor: "€80", master: "€90" },
              { type: { EN: "2 sessions", NL: "2 sessies" }, ms20minus: "€130", ms20plus: "€135", bachelor: "€135", master: "€140" },
              { type: { EN: "4 sessions", NL: "4 sessies" }, ms20minus: "€200", ms20plus: "€230", bachelor: "€230", master: "€250" },
            ].map((row) => (
              <tr key={row.type.NL} className="border-b border-blue-600/50 last:border-0">
                <td className="py-2 text-yellow-100">{t(row.type)}</td>
                {selectedLevel === 'middelbaar' ? (
                  <>
                    <td className="py-2 text-yellow-300 font-semibold text-right">{row.ms20minus}</td>
                    <td className="py-2 text-yellow-300 font-semibold text-right">{row.ms20plus}</td>
                  </>
                ) : (
                  <>
                    <td className="py-2 text-yellow-300 font-semibold text-right">{row.bachelor}</td>
                    <td className="py-2 text-yellow-300 font-semibold text-right">{row.master}</td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm text-yellow-100 italic">{t(translations.whatsappSupport)}</p>
    </m.div>
  );
}
