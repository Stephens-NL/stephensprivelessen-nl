'use client';

import React, { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { infoSectionTranslations as translations, groupPricingTiers } from '@/data/infoSection';

export function ContactGroupPricingTable() {
  const { t, language } = useTranslation();
  const [showExample, setShowExample] = useState(false);
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
              <th className="text-left py-2 text-yellow-100 font-medium">
                {language === 'NL' ? <span>Aantal<br />leerlingen</span> : <span>Number of<br />students</span>}
              </th>
              <th className="text-right py-2 text-yellow-100 font-medium">
                {language === 'NL' ? <span>Losse<br />sessie<br />(€/uur p.p.)</span> : <span>Single<br />session<br />(€/hour p.p.)</span>}
              </th>
              <th className="text-right py-2 text-yellow-100 font-medium">
                {language === 'NL' ? <span>4 sessies<br />(€/uur p.p.)</span> : <span>4 sessions<br />(€/hour p.p.)</span>}
              </th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4].map((students) => {
              const regular = groupPricingTiers.find(tier =>
                tier.level === (selectedLevel === 'middelbaar' ? "Voortgezet Onderwijs (20-)" : "Hoger Onderwijs")
              )?.prices.find(p => p.students === students)?.price || '';
              const package4h = groupPricingTiers.find(tier =>
                tier.level === (selectedLevel === 'middelbaar' ? "Voortgezet Onderwijs (20-) 4-uurs pakket" : "Hoger Onderwijs 4-uurs pakket")
              )?.prices.find(p => p.students === students)?.price || '';
              return (
                <tr key={students} className="border-b border-blue-600/50 last:border-0">
                  <td className="py-2 text-yellow-100">{students}</td>
                  <td className="py-2 text-yellow-300 font-semibold text-right">{regular}</td>
                  <td className="py-2 text-yellow-300 font-semibold text-right">{package4h}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-4 space-y-2">
        <p className="text-sm text-yellow-100 italic">{t(translations.standardSession)}</p>
        <div className="mt-2">
          <button
            onClick={() => setShowExample(!showExample)}
            className="flex items-center text-sm text-yellow-300 hover:text-yellow-200 transition-colors"
          >
            {showExample ? <FaChevronUp className="mr-2" /> : <FaChevronDown className="mr-2" />}
            {t(translations.showExample)}
          </button>
          <AnimatePresence>
            {showExample && (
              <m.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-2 p-4 bg-blue-600/20 rounded-xl border border-blue-500/30">
                  <p className="text-sm text-yellow-100 font-medium mb-3">
                    {t(translations.costComparison).replace('{level}', selectedLevel === 'middelbaar' ? 'high school' : 'university')}
                  </p>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-yellow-300 font-medium mb-1">{t(translations.individualSessions)}</p>
                      <ul className="mt-1 space-y-1 text-sm text-yellow-100">
                        <li>• {`Price per 4 hours: ${selectedLevel === 'middelbaar' ? '€200' : '€250'}`}</li>
                        <li>• {`For 4 separate students: 4 × ${selectedLevel === 'middelbaar' ? '€200' : '€250'} = ${selectedLevel === 'middelbaar' ? '€800' : '€1000'}`}</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm text-yellow-300 font-medium mb-1">{t(translations.groupSessions)}</p>
                      <ul className="mt-1 space-y-1 text-sm text-yellow-100">
                        <li>• {`Price per person: ${selectedLevel === 'middelbaar' ? '€125' : '€125'} (${selectedLevel === 'middelbaar' ? '€31.25' : '€31.25'}/hour)`}</li>
                        <li>• {`Total for the group: 4 × ${selectedLevel === 'middelbaar' ? '€125' : '€125'} = ${selectedLevel === 'middelbaar' ? '€500' : '€500'}`}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </m.div>
  );
}
