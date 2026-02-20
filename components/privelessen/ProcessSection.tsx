'use client';

import React from 'react';
import { m } from 'framer-motion';
import { TutoringPage } from '@/types';
import { Icon, IconName } from '@/components/ui/icons';
import { Card } from '@/components/ui/card';

interface ProcessSectionProps {
  process: TutoringPage['process'];
  t: (text: { EN: string; NL: string }) => string;
}

export function ProcessSection({ process, t }: ProcessSectionProps) {
  return (
    <section className="py-24 bg-muted/50">
      <div className="container px-4 md:px-6">
        <m.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12"
        >
          {t(process.title)}
        </m.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {process.steps.map((step, index) => (
            <m.div
              key={String(step.title?.EN ?? step.title?.NL ?? step.number ?? index)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 h-full flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Icon name={step.icon as IconName} className="w-6 h-6 text-primary" />
                </div>
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-2">{t(step.title)}</h3>
                <p className="text-muted-foreground">{t(step.description)}</p>
              </Card>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
} 