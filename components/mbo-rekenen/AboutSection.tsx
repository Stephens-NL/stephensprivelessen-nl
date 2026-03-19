'use client';

import { useLocale, useTranslations } from 'next-intl';
import { m } from 'framer-motion';
import { BookOpen, Target, Trophy, Users } from 'lucide-react';

export function AboutSection() {
  const locale = useLocale();
    const language = locale === 'nl' ? 'NL' : 'EN';
    const t = useTranslations('mbo');

  const features = [
    {
      icon: Target,
      title: { NL: 'Gerichte aanpak', EN: 'Targeted approach' },
      description: { NL: 'Persoonlijke begeleiding afgestemd op jouw niveau en doelen', EN: 'Personal guidance tailored to your level and goals' }
    },
    {
      icon: BookOpen,
      title: { NL: 'Bewezen methoden', EN: 'Proven methods' },
      description: { NL: 'Effectieve lesmaterialen en technieken voor optimaal leerresultaat', EN: 'Effective teaching materials and techniques for optimal learning results' }
    },
    {
      icon: Trophy,
      title: { NL: 'Hoog slagingspercentage', EN: 'High success rate' },
      description: { NL: '95% van onze studenten slaagt voor hun rekentoets', EN: '95% of our students pass their math test' }
    },
    {
      icon: Users,
      title: { NL: 'Ervaren docenten', EN: 'Experienced teachers' },
      description: { NL: 'Gespecialiseerd in MBO-rekenen met jarenlange ervaring', EN: 'Specialized in MBO math with years of experience' }
    }
  ];

  return (
    <section className="py-20 bg-[var(--cream)]">
      <div className="container mx-auto px-4 max-w-6xl">
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-light text-[var(--ink)] mb-6 tracking-tight">
            {t('form.whyChooseUs')}
          </h2>
          <p className="text-xl text-[var(--muted-text)] max-w-3xl mx-auto leading-relaxed">
            {t('form.weUnderstandTheChallengesOfMboMathAndProvideTheSup')}
          </p>
        </m.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <m.div
              key={feature.title?.[language] ?? index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-[var(--cream-dark)] rounded-2xl p-8 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 bg-[var(--cream)] rounded-xl mb-6 group-hover:bg-[var(--ink)] group-hover:text-[var(--cream)] transition-all duration-300 shadow-sm">
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-medium text-[var(--ink)] mb-4">
                {feature.title[language]}
              </h3>
              <p className="text-[var(--muted-text)] leading-relaxed">
                {feature.description[language]}
              </p>
            </m.div>
          ))}
        </div>

        {/* Additional Info */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-[var(--ink)] rounded-2xl p-8 text-[var(--cream)]">
            <h3 className="text-2xl font-display font-light mb-4">
              {t('form.readyForYourMathTest')}
            </h3>
            <p className="text-[var(--cream-dark)] mb-6 max-w-2xl mx-auto">
              {t('form.joinHundredsOfStudentsWhoHaveSuccessfullyPassedThe')}
            </p>
            <div className="inline-flex items-center gap-4 text-sm text-[var(--cream-dark)]">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[var(--sage)] rounded-full"></div>
                {t('form.smallGroups')}
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[var(--sage)] rounded-full"></div>
                {t('form.flexibleTimes')}
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[var(--sage)] rounded-full"></div>
                {t('form.onlineOffline')}
              </div>
            </div>
          </div>
        </m.div>
      </div>
    </section>
  );
} 