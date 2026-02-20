'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { m } from 'framer-motion';
import { GraduationCap, Briefcase, Book, Calculator } from 'lucide-react';

const targetGroups = [
  {
    title: {
      nl: 'MBO-studenten niveau 2, 3 en 4',
      en: 'MBO students level 2, 3 and 4'
    },
    description: {
      nl: 'Die moeite hebben met rekenen en extra ondersteuning nodig hebben.',
      en: 'Who struggle with mathematics and need additional support.'
    },
    icon: GraduationCap
  },
  {
    title: {
      nl: 'BBL-studenten',
      en: 'BBL students'
    },
    description: {
      nl: 'Die naast hun werk moeite hebben met het rekenonderdeel van hun opleiding.',
      en: 'Who struggle with the mathematics component of their education alongside their work.'
    },
    icon: Briefcase
  },
  {
    title: {
      nl: 'Volwassenen',
      en: 'Adults'
    },
    description: {
      nl: 'Die terug naar school zijn gegaan en rekenen als obstakel ervaren.',
      en: 'Who have returned to school and find mathematics as an obstacle.'
    },
    icon: Book
  },
  {
    title: {
      nl: 'Studenten met dyscalculie',
      en: 'Students with dyscalculia'
    },
    description: {
      nl: 'Of andere rekenproblemen die speciale aandacht vereisen.',
      en: 'Or other mathematics difficulties that require special attention.'
    },
    icon: Calculator
  }
];

export function TargetGroupSection() {
  const { language } = useLanguage();

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 tracking-tight">
            {language === 'NL' ? 'Voor wie is dit geschikt?' : 'Who is this suitable for?'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {language === 'NL'
              ? 'Onze lessen zijn toegankelijk voor iedereen die moeite heeft met rekenen, ongeacht achtergrond of niveau.'
              : 'Our lessons are accessible to anyone who struggles with mathematics, regardless of background or level.'}
          </p>
        </m.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {targetGroups.map((group, index) => (
            <m.div
              key={group.title?.en ?? group.title?.nl ?? index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group border border-gray-200"
            >
              <div className="flex items-start gap-6">
                                 <div className="inline-flex items-center justify-center w-14 h-14 bg-gray-100 rounded-xl group-hover:bg-gray-900 group-hover:text-white transition-all duration-300 flex-shrink-0">
                   {React.createElement(group.icon, { className: "w-7 h-7" })}
                 </div>
                <div className="flex-1">
                  <h3 className="text-xl font-medium text-gray-900 mb-3">
                    {language === 'NL' ? group.title.nl : group.title.en}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {language === 'NL' ? group.description.nl : group.description.en}
                  </p>
                </div>
              </div>
            </m.div>
          ))}
        </div>

        {/* Additional Info */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
            <h3 className="text-2xl font-light text-gray-900 mb-4">
              {language === 'NL' ? 'Twijfel je nog?' : 'Still unsure?'}
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed">
              {language === 'NL'
                ? 'Geen probleem! We bieden een gratis kennismakingsgesprek aan om te kijken of onze aanpak bij jou past.'
                : 'No problem! We offer a free introductory meeting to see if our approach suits you.'}
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                {language === 'NL' ? 'Geen verplichtingen' : 'No obligations'}
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                {language === 'NL' ? 'Persoonlijk advies' : 'Personal advice'}
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                {language === 'NL' ? 'Gratis intake' : 'Free intake'}
              </div>
            </div>
          </div>
        </m.div>
      </div>
    </section>
  );
} 