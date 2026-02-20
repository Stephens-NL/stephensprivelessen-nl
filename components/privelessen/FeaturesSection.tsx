'use client';

import React from 'react';
import { m } from 'framer-motion';
import { TutoringFeature } from '@/types';
import { Icon, IconName } from '@/components/ui/icons';
import { Card } from '@/components/ui/card';

interface FeaturesSectionProps {
  features: TutoringFeature[];
  t: (text: { EN: string; NL: string }) => string;
}

export function FeaturesSection({ features, t }: FeaturesSectionProps) {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/50">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <m.div
              key={String(feature.title?.EN ?? feature.title?.NL ?? feature.icon ?? index)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 h-full flex flex-col">
                <div className="mb-4">
                  <Icon name={feature.icon as IconName} className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t(feature.title)}</h3>
                <p className="text-muted-foreground">{t(feature.description)}</p>
              </Card>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
} 