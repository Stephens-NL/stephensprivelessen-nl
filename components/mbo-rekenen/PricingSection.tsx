'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useLanguage } from '@/hooks/useLanguage';
import { m } from 'framer-motion';
import { formatEuro, studentTutorVoPrices, voOnlinePackages, voPhysicalPackages } from '@/data/pricingData';
import { MessageCircle, Phone, Calendar } from 'lucide-react';
import { inViewFadeUp } from '@/lib/animations';
import { scrollToElement } from '@/lib/scroll';

export function PricingSection() {
  const language = useLanguage();
  const locale = useLocale();
  const t = useTranslations('mbo');

  const contactMethods = [
    {
      icon: MessageCircle,
      title: { NL: 'WhatsApp', EN: 'WhatsApp' },
      description: { NL: 'Direct contact voor snelle vragen', EN: 'Direct contact for quick questions' },
      action: { NL: 'Stuur bericht', EN: 'Send message' }
    },
    {
      icon: Phone,
      title: { NL: 'Telefonisch', EN: 'Phone call' },
      description: { NL: 'Persoonlijk gesprek over jouw situatie', EN: 'Personal conversation about your situation' },
      action: { NL: 'Bel nu', EN: 'Call now' }
    },
    {
      icon: Calendar,
      title: { NL: 'Kennismaking', EN: 'Meet & Greet' },
      description: { NL: 'Gratis intakegesprek op locatie', EN: 'Free intake meeting on location' },
      action: { NL: 'Plan afspraak', EN: 'Schedule meeting' }
    }
  ];

  return (
    <div data-section="pricing">
      {/* Individual Lessons Info */}
      <section className="py-20 bg-[var(--cream)]">
        <div className="container mx-auto px-4 max-w-6xl">
          <m.div
            {...inViewFadeUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-light text-[var(--ink)] mb-6 tracking-tight">
              {t('form.flexibleGuidance')}
            </h2>
            <p className="text-xl text-[var(--muted-text)] max-w-3xl mx-auto leading-relaxed mb-12">
              {t('form.inAdditionToOurGroupProgramsWeAlsoOfferIndividualL')}
            </p>

            <div className="bg-[var(--cream-dark)] rounded-2xl p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-display text-[var(--ink)] mb-2">
                {language === 'NL' ? 'Pakketten van 4 uur' : '4-hour packages'}
              </h3>
              <p className="text-[var(--muted-text)] mb-6">
                {language === 'NL'
                  ? 'Voor MBO gelden dezelfde pakketten als voor het voortgezet onderwijs. Er zijn geen losse lessen.'
                  : 'MBO uses the same packages as secondary education. There are no single lessons.'}
              </p>
              <div className="overflow-x-auto mb-8">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-[var(--border-warm)] text-[var(--ink)]">
                      <th className="py-2 pr-4 font-medium">{language === 'NL' ? 'Leerlingen' : 'Students'}</th>
                      <th className="py-2 pr-4 font-medium">{language === 'NL' ? 'Online, per pakket' : 'Online, per package'}</th>
                      <th className="py-2 font-medium">{language === 'NL' ? 'Op locatie, per pakket' : 'On location, per package'}</th>
                    </tr>
                  </thead>
                  <tbody className="text-[var(--muted-text)]">
                    {voOnlinePackages.map((online, i) => {
                      const physical = voPhysicalPackages[i];
                      const cell = (p: typeof online) =>
                        p.students === 1
                          ? formatEuro(p.packagePrice, locale)
                          : `${formatEuro(p.packagePrice, locale)} (${formatEuro(p.pricePerPerson, locale)} ${language === 'NL' ? 'p.p.' : 'each'})`;
                      return (
                        <tr key={online.students} className="border-b border-[var(--border-warm)] last:border-0">
                          <td className="py-2 pr-4">{online.students}</td>
                          <td className="py-2 pr-4">{cell(online)}</td>
                          <td className="py-2">{physical ? cell(physical) : '—'}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <p className="text-[var(--muted-text)] mb-8">
                {language === 'NL'
                  ? `Individueel les van een student-docent: vanaf ${formatEuro(studentTutorVoPrices.online, locale)} online / ${formatEuro(studentTutorVoPrices.physical, locale)} op locatie per pakket.`
                  : `One-to-one with a student tutor: from ${formatEuro(studentTutorVoPrices.online, locale)} online / ${formatEuro(studentTutorVoPrices.physical, locale)} on location per package.`}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {contactMethods.map((method, index) => (
                  <m.div
                    key={method.title?.[language] ?? index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="bg-[var(--cream)] rounded-xl border border-[var(--border-warm)] p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer"
                    onClick={() => scrollToElement('contact')}
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-[var(--cream-dark)] rounded-xl mb-4 group-hover:bg-[var(--ink)] group-hover:text-[var(--cream)] transition-all duration-300">
                      <method.icon className="w-6 h-6" />
                    </div>
                    <h4 className="font-medium text-[var(--ink)] mb-2">
                      {method.title[language]}
                    </h4>
                    <p className="text-sm text-[var(--muted-text)] mb-4">
                      {method.description[language]}
                    </p>
                    <div className="text-sm font-medium text-[var(--ink)] group-hover:text-[var(--ink-light)]">
                      {method.action[language]} →
                    </div>
                  </m.div>
                ))}
              </div>
            </div>
          </m.div>
        </div>
      </section>
    </div>
  );
} 