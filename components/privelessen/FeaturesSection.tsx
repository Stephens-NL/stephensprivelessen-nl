'use client';

import React from 'react';
import { m } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Icon, IconName } from '@/components/ui/icons';
import { Card } from '@/components/ui/card';
import { inViewFadeUp } from '@/lib/animations';

// Presentational constants — not translatable copy
const FEATURE_ICONS: IconName[] = ['PersonalizedLearning', 'ExpertSupport', 'FlexibleScheduling'];

interface FeatureMessage {
  title: string;
  description: string;
}

export function FeaturesSection() {
  const t = useTranslations('tutoring');
  const features = t.raw('features') as FeatureMessage[];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/50">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <m.div
              key={feature.title}
              {...inViewFadeUp}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card className="p-6 h-full flex flex-col">
                <div className="mb-4">
                  <Icon name={FEATURE_ICONS[index]} className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
