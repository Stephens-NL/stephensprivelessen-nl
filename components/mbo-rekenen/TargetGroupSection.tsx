'use client';

import React from 'react';
import { useLocale, useTranslations } from 'next-intl';
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
  const locale = useLocale();
    const language = locale === 'nl' ? 'NL' : 'EN';
    const t = useTranslations('mbo');

  return (
    <section className="py-20 bg-[var(--cream-dark)]">
      <div className="container mx-auto px-4 max-w-6xl">
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-light text-[var(--ink)] mb-6 tracking-tight">
            {t('form.whoIsThisSuitableFor')}
          </h2>
          <p className="text-xl text-[var(--muted-text)] max-w-3xl mx-auto leading-relaxed">
            {t('form.ourLessonsAreAccessibleToAnyoneWhoStrugglesWithMat')}
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
              className="bg-[var(--cream)] rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group border border-[var(--border-warm)]"
            >
              <div className="flex items-start gap-6">
                                 <div className="inline-flex items-center justify-center w-14 h-14 bg-[var(--cream-dark)] rounded-xl group-hover:bg-[var(--ink)] group-hover:text-[var(--cream)] transition-all duration-300 flex-shrink-0">
                   {React.createElement(group.icon, { className: "w-7 h-7" })}
                 </div>
                <div className="flex-1">
                  <h3 className="text-xl font-medium text-[var(--ink)] mb-3">
                    {language === 'NL' ? group.title.nl : group.title.en}
                  </h3>
                  <p className="text-[var(--muted-text)] leading-relaxed">
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
          <div className="bg-[var(--cream)] rounded-2xl border border-[var(--border-warm)] p-8 text-center">
            <h3 className="text-2xl font-display font-light text-[var(--ink)] mb-4">
              {t('form.stillUnsure')}
            </h3>
            <p className="text-[var(--muted-text)] mb-6 max-w-2xl mx-auto leading-relaxed">
              {t('form.noProblemWeOfferAFreeIntroductoryMeetingToSeeIfOur')}
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-[var(--muted-text)]">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[var(--sage)] rounded-full"></div>
                {t('form.noObligations')}
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[var(--sage)] rounded-full"></div>
                {t('form.personalAdvice')}
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[var(--sage)] rounded-full"></div>
                {t('form.freeIntake')}
              </div>
            </div>
          </div>
        </m.div>
      </div>
    </section>
  );
} 