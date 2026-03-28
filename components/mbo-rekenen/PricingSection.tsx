'use client';

import { useTranslations } from 'next-intl';
import { useLanguage } from '@/hooks/useLanguage';
import { m } from 'framer-motion';
import { RekentrajectenComparison } from './RekentrajectenComparison';
import { MessageCircle, Phone, Calendar } from 'lucide-react';
import { inViewFadeUp } from '@/lib/animations';
import { scrollToElement } from '@/lib/scroll';

export function PricingSection() {
  const language = useLanguage();
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-light text-[var(--ink)] mb-2">€50</div>
                  <div className="text-[var(--muted-text)]">
                    {t('form.perHour')}
                  </div>
                  <div className="text-sm text-[var(--muted-text)] mt-1">
                    {t('form.individualLessons')}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-light text-[var(--ink)] mb-2">€35</div>
                  <div className="text-[var(--muted-text)]">
                    {t('form.perHour')}
                  </div>
                  <div className="text-sm text-[var(--muted-text)] mt-1">
                    {t('form.groupLessons24People')}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-light text-[var(--ink)] mb-2">Online</div>
                  <div className="text-[var(--muted-text)]">
                    {t('form.available')}
                  </div>
                  <div className="text-sm text-[var(--muted-text)] mt-1">
                    {t('form.allOptions')}
                  </div>
                </div>
              </div>

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

      {/* Group Programs Comparison */}
      <RekentrajectenComparison />
    </div>
  );
} 