'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from '@/i18n/navigation';
import { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { FaGraduationCap, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { getBusinessData } from '@/data/businessData';
import { useLocale, useTranslations } from 'next-intl';
import { WeekendZuidoostHero } from './WeekendZuidoostHero';

const OfferVariant = ({ title, description, cta }: { title: string; description: string; cta: string }) => (
  <Card className="relative overflow-hidden bg-gradient-to-br from-[var(--ink)] to-[var(--ink-light)] text-white p-8 rounded-2xl border border-[var(--amber)]/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
    <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--amber)]/10 rounded-full transform translate-x-16 -translate-y-16" />
    <div className="absolute bottom-0 left-0 w-32 h-32 bg-[var(--amber)]/10 rounded-full transform -translate-x-16 translate-y-16" />
    <h3 className="text-2xl font-bold mb-4 relative z-10">{title}</h3>
    <p className="mb-6 text-[var(--cream)] relative z-10">{description}</p>
    <Link href="/contact" className="block">
      <Button className="w-full bg-[var(--amber)] hover:bg-[var(--amber-hover)] text-[var(--ink)] font-semibold py-6 text-lg relative z-10">
        {cta}
      </Button>
    </Link>
  </Card>
);

export function WeekendZuidoostContent() {
  const locale = useLocale();
  const language = locale === 'nl' ? 'NL' : 'EN';
  const t = useTranslations('weekend');
  const legacyT = (obj: Record<string, string> | string) => typeof obj === 'string' ? obj : obj[language] || obj['EN'] || '';
  const businessData = getBusinessData(legacyT);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [showCourses, setShowCourses] = useState(true);

  const educationLevels = [
    {
      id: 'basis',
      title: t('educationLevels.primary'),
      subjects: businessData.subjects.primary,
    },
    {
      id: 'voortgezet',
      title: t('educationLevels.secondary'),
      subjects: businessData.subjects.secondary,
    },
    {
      id: 'hoger',
      title: t('educationLevels.higher'),
      subjects: [...businessData.subjects.higher, ...businessData.subjects.programming]
    }
  ];

  const renderSubjects = (subjects: Array<{ NL: string, EN: string }>) => {
    return (
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-8"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {subjects.map((subject, index) => (
            <m.div
              key={`${selectedLevel}-${subject.NL}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.05,
                ease: "easeOut"
              }}
              className="group relative flex items-center bg-gradient-to-br from-[var(--ink)] to-[var(--ink-light)]
                       rounded-xl transition-all duration-300
                       border border-[var(--amber)]/30 hover:border-[var(--amber)]
                       transform hover:-translate-y-1 overflow-hidden h-[60px] w-full
                       hover:shadow-lg hover:shadow-[var(--ink)]/20"
            >
              <div className="flex-1 p-4 overflow-hidden">
                <div className="overflow-hidden">
                  <m.span
                    className="text-[var(--cream)] group-hover:text-[var(--amber)] font-medium transition-colors inline-block whitespace-nowrap"
                  >
                    {language === 'NL' ? subject.NL : subject.EN}
                  </m.span>
                </div>
              </div>
            </m.div>
          ))}
        </div>
      </m.div>
    );
  };

  const offerKeys = ['weekendTutoring', 'personalCoaching', 'flexibleSupport'] as const;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--ink)] to-[var(--ink-light)] text-white">
      <div className="container mx-auto px-4 py-16">
        <WeekendZuidoostHero />
        <div className="bg-gradient-to-br from-[var(--ink)] to-[var(--ink-light)] p-8 rounded-2xl mb-12 shadow-xl border border-[var(--amber)]/30">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <FaGraduationCap className="text-3xl text-[var(--amber)]" />
              <h2 className="text-2xl font-bold text-white">{t('subjects.title')}</h2>
            </div>
            <button
              onClick={() => setShowCourses(!showCourses)}
              className="p-3 hover:bg-[var(--ink-light)]/50 rounded-xl transition-colors"
            >
              {showCourses ? <FaChevronUp className="text-[var(--amber)]" /> : <FaChevronDown className="text-[var(--amber)]" />}
            </button>
          </div>

          <AnimatePresence>
            {showCourses && (
              <m.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="space-y-8">
                  <div className="flex justify-center">
                    <div className="inline-flex bg-[var(--ink-light)]/50 rounded-2xl p-1.5">
                      {educationLevels.map((level, index) => (
                        <m.button
                          key={level.id}
                          onClick={() => setSelectedLevel(level.id)}
                          className={`
                            relative px-8 py-3 rounded-xl text-center transition-all duration-200
                            ${selectedLevel === level.id
                              ? 'text-[var(--amber)]'
                              : 'text-[var(--cream-dark)] hover:text-[var(--cream)]'
                            }
                            ${index !== educationLevels.length - 1 ? 'mr-1' : ''}
                          `}
                        >
                          {selectedLevel === level.id && (
                            <m.div
                              layoutId="activeTab"
                              className="absolute inset-0 bg-[var(--ink)]/50 rounded-xl"
                              initial={false}
                              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                          )}
                          <span className="relative z-10">{level.title}</span>
                        </m.button>
                      ))}
                    </div>
                  </div>

                  <div className="w-full">
                    <AnimatePresence mode="wait">
                      {selectedLevel && (
                        renderSubjects(
                          educationLevels.find(level => level.id === selectedLevel)?.subjects || []
                        )
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </m.div>
            )}
          </AnimatePresence>
        </div>

        <div className="grid gap-8 md:grid-cols-3 mb-12">
          {offerKeys.map((key) => (
            <OfferVariant
              key={key}
              title={t(`programOffers.${key}.title`)}
              description={t(`programOffers.${key}.description`)}
              cta={t(`programOffers.${key}.cta`)}
            />
          ))}
        </div>

        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-xl text-[var(--cream)] mb-6">
            {t('form.questionsText')}
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-[var(--amber)] hover:bg-[var(--amber-hover)] text-[var(--ink)] font-semibold px-8 py-6 text-lg">
              {t('form.contactUs')}
            </Button>
          </Link>
        </m.div>
      </div>
    </div>
  );
}
