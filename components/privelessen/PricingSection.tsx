'use client';

import React from 'react';
import { m } from 'framer-motion';
import { TutoringPage } from '@/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check } from 'lucide-react';
import Link from 'next/link';

interface PricingSectionProps {
  pricing: TutoringPage['pricing'];
  t: (text: any) => string;
}

export const PricingSection = ({ pricing, t }: PricingSectionProps) => {
  return (
    <section className="py-24 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <m.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-4"
          >
            {t(pricing.title)}
          </m.h2>
          <m.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600"
          >
            {t(pricing.subtitle)}
          </m.p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricing.plans.map((plan, index) => (
            <m.div
              key={String(plan.name?.EN ?? plan.name?.NL ?? index)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`flex ${plan.name.EN === 'Thesis & Research' ? 'md:col-span-2 lg:col-span-3' : ''}`}
            >
              <Card
                className={`p-8 flex flex-col flex-grow ${
                  plan.popular
                    ? 'border-blue-500 shadow-blue-100 shadow-lg scale-105'
                    : ''
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">{t(plan.name)}</h3>
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {t(plan.price)}
                  </div>
                  <div className="text-gray-600">{t(plan.interval)}</div>
                </div>

                {/* Features List */}
                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-600">{t(feature)}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Link href="/contact" className="mt-auto">
                  <Button
                    className={`w-full ${
                      plan.popular ? 'bg-blue-600 hover:bg-blue-700' : ''
                    }`}
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    {t({ EN: 'Schedule Trial Lesson', NL: 'Plan Gratis Proefles' })}
                  </Button>
                </Link>
              </Card>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}; 