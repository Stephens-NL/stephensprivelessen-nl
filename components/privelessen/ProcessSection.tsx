'use client';

import React from 'react';
import { m } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Icon, IconName } from '@/components/ui/icons';
import { Card } from '@/components/ui/card';
import { inViewFadeUp } from '@/lib/animations';

// Presentational constants — not translatable copy
const STEP_ICONS: IconName[] = ['Chat', 'Plan', 'Calendar', 'Chart'];

interface StepMessage {
  title: string;
  description: string;
}

export function ProcessSection() {
  const t = useTranslations('tutoring');
  const steps = t.raw('process.steps') as StepMessage[];

  return (
    <section className="py-24 bg-muted/50">
      <div className="container px-4 md:px-6">
        <m.h2
          {...inViewFadeUp}
          className="text-3xl font-bold text-center mb-12"
        >
          {t('process.title')}
        </m.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <m.div
              key={step.title}
              {...inViewFadeUp}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card className="p-6 h-full flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Icon name={STEP_ICONS[index]} className="w-6 h-6 text-primary" />
                </div>
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-4">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </Card>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
