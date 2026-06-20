'use client';

import React from 'react';
import { m } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { inViewFadeUp } from '@/lib/animations';

interface PlanMessage {
  name: string;
  price: string;
  interval: string;
  features: string[];
  cta: string;
}

// Presentational constants — popular flag and full-width driven by plan index, not translated name
const POPULAR_INDEX = 1;
const FULL_WIDTH_INDEX = 2;

export const PricingSection = () => {
  const t = useTranslations('tutoring');
  const plans = t.raw('pricing.plans') as PlanMessage[];

  return (
    <section className="py-24 bg-gradient-to-b from-[var(--cream-dark)] to-[var(--cream)]">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <m.h2
            {...inViewFadeUp}
            className="text-4xl font-display font-bold mb-4 text-[var(--ink)]"
          >
            {t('pricing.title')}
          </m.h2>
          <m.p
            {...inViewFadeUp}
            transition={{ delay: 0.2 }}
            className="text-xl text-[var(--muted-text)]"
          >
            {t('pricing.subtitle')}
          </m.p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => {
            const isPopular = index === POPULAR_INDEX;
            const isFullWidth = index === FULL_WIDTH_INDEX;

            return (
              <m.div
                key={plan.name}
                {...inViewFadeUp}
                transition={{ delay: index * 0.1 }}
                className={`flex ${isFullWidth ? 'md:col-span-2 lg:col-span-3' : ''}`}
              >
                <Card
                  className={`p-8 flex flex-col flex-grow ${
                    isPopular
                      ? 'border-[var(--amber)] shadow-sm scale-105'
                      : ''
                  }`}
                >
                  {/* Popular Badge */}
                  {isPopular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-[var(--amber)] text-[var(--ink)] px-4 py-1 rounded-full text-sm font-medium">
                        {t('pricing.mostPopular')}
                      </span>
                    </div>
                  )}

                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <div className="text-4xl font-bold text-[var(--amber)] mb-2">
                      {plan.price}
                    </div>
                    <div className="text-[var(--muted-text)]">{plan.interval}</div>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-4 mb-8 flex-grow">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-[var(--sage)] mt-1 flex-shrink-0" />
                        <span className="text-[var(--muted-text)]">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Link href="/contact" className="mt-auto">
                    <Button
                      className={`w-full ${
                        isPopular ? 'bg-[var(--ink)] text-[var(--cream)] hover:bg-[var(--ink-light)]' : ''
                      }`}
                      variant={isPopular ? 'default' : 'outline'}
                    >
                      {t('pricing.scheduleTrialLesson')}
                    </Button>
                  </Link>
                </Card>
              </m.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
