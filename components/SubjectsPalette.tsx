'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { m } from 'framer-motion';
import { subjects } from '@/data/subjects';

// Alternating accent per card, matching the site's amber/sage palette.
const ACCENTS = ['var(--amber)', 'var(--sage)'];

const SubjectsPalette = () => {
  const t = useTranslations('about');
  const locale = useLocale();
  const lang = locale === 'nl' ? 'NL' : 'EN';

  return (
    <section className="py-20 bg-[var(--cream-dark)]/50">
      <div className="container mx-auto px-4">
        <m.h2
          className="text-3xl font-semibold text-center font-display text-[var(--ink)] mb-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {t('subjectsPalette.title')}
        </m.h2>
        <p className="text-center text-[var(--warm-text)] max-w-2xl mx-auto mb-3">
          {t('subjectsPalette.subline')}
        </p>
        <p className="text-center text-[var(--sage)] font-medium max-w-2xl mx-auto mb-12">
          {t('subjectsPalette.credibility')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {subjects.map(({ group, subjects: items }, index) => (
            <m.div
              key={group}
              className="bg-[var(--cream)] border border-[var(--border-warm)] rounded-lg shadow-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.1 }}
            >
              <h3 className="text-xl font-semibold text-[var(--ink)] mb-2">
                {t(`subjectsPalette.groups.${group}`)}
              </h3>
              <div
                className="h-1 w-10 rounded-full mb-4"
                style={{ backgroundColor: ACCENTS[index % ACCENTS.length] }}
                aria-hidden="true"
              />
              <ul className="flex flex-wrap gap-2">
                {items.map((subject) => (
                  <li
                    key={subject.EN}
                    className="rounded-full border border-[var(--border-warm)] bg-[var(--cream-dark)]/60 text-[var(--warm-text)] text-sm px-3 py-1"
                  >
                    {subject[lang]}
                  </li>
                ))}
              </ul>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubjectsPalette;
