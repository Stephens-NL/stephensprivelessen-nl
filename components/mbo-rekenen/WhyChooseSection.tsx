'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useLanguage } from '@/hooks/useLanguage';
import { m } from 'framer-motion';
import { Target, Heart, BookOpenCheck, Lightbulb } from 'lucide-react';
import { inViewFadeUp } from '@/lib/animations';
import { scrollToElement } from '@/lib/scroll';

const reasons = [
  {
    title: {
      nl: 'Rustige en duidelijke uitleg',
      en: 'Calm and clear explanation'
    },
    description: {
      nl: 'Zonder haast, met alle tijd voor jouw vragen en begrip.',
      en: 'Without rushing, with all the time for your questions and understanding.'
    },
    icon: Target
  },
  {
    title: {
      nl: 'Geduldig en ondersteunend',
      en: 'Patient and supportive'
    },
    description: {
      nl: 'We werken samen aan jouw zelfvertrouwen in rekenen.',
      en: 'We work together on your confidence in mathematics.'
    },
    icon: Heart
  },
  {
    title: {
      nl: 'Ruime ervaring',
      en: 'Extensive experience'
    },
    description: {
      nl: 'Met verschillende onderwijsniveaus en diverse doelgroepen.',
      en: 'With different education levels and diverse target groups.'
    },
    icon: BookOpenCheck
  },
  {
    title: {
      nl: 'Praktisch en begrijpelijk',
      en: 'Practical and understandable'
    },
    description: {
      nl: 'Ik maak rekenen praktisch en begrijpelijk, zodat je het direct kunt toepassen.',
      en: 'I make mathematics practical and understandable, so you can apply it immediately.'
    },
    icon: Lightbulb
  }
];

export function WhyChooseSection() {
  const language = useLanguage();
  const t = useTranslations('mbo');

  return (
    <section className="py-20 bg-[var(--cream)]">
      <div className="container mx-auto px-4 max-w-6xl">
        <m.div
          {...inViewFadeUp}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-light text-[var(--ink)] mb-6 tracking-tight">
            {t('form.whyDoStudentsChooseUs')}
          </h2>
          <p className="text-xl text-[var(--muted-text)] max-w-3xl mx-auto leading-relaxed">
            {t('form.ourApproachEnsuresThatStudentsNotOnlyImproveInMath')}
          </p>
        </m.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reasons.map((reason, index) => (
            <m.div
              key={reason.title?.en ?? reason.title?.nl ?? index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="bg-[var(--cream-dark)] rounded-2xl p-8 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex items-start gap-6">
                                 <div className="inline-flex items-center justify-center w-14 h-14 bg-[var(--cream)] rounded-xl group-hover:bg-[var(--ink)] group-hover:text-[var(--cream)] transition-all duration-300 shadow-sm flex-shrink-0">
                   {React.createElement(reason.icon, { className: "w-7 h-7" })}
                 </div>
                <div className="flex-1">
                  <h3 className="text-xl font-medium text-[var(--ink)] mb-3">
                    {language === 'NL' ? reason.title.nl : reason.title.en}
                  </h3>
                  <p className="text-[var(--muted-text)] leading-relaxed">
                    {language === 'NL' ? reason.description.nl : reason.description.en}
                  </p>
                </div>
              </div>
            </m.div>
          ))}
        </div>

        {/* Call to Action */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-[var(--ink)] rounded-2xl p-8 text-[var(--cream)] max-w-4xl mx-auto">
            <h3 className="text-2xl font-display font-light mb-4">
              {t('form.readyToGetStarted')}
            </h3>
            <p className="text-[var(--cream-dark)] mb-6 leading-relaxed">
              {t('form.dontLetMathHoldYouBack')}
            </p>
            <button
              onClick={() => scrollToElement('contact')}
              className="bg-[var(--cream)] text-[var(--ink)] px-8 py-4 rounded-xl font-medium hover:bg-[var(--cream-dark)] transition-colors duration-300"
            >
              {t('form.getInTouch')}
            </button>
          </div>
        </m.div>
      </div>
    </section>
  );
} 