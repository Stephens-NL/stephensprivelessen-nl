'use client';

import React from 'react';
import Image from 'next/image';
import { m } from 'framer-motion';
import { useTranslations } from 'next-intl';
import TextBlock from './TextBlock';
import ButtonTrial from '../ButtonTrial';
import SignInHere from './SignInHere';
import portrait2 from '@/public/images/jpeg/portrait2.jpeg';

const Hero = () => {
  const t = useTranslations('home');

  return (
    <section className="relative overflow-hidden">
      {/* Background with subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--cream)] via-[var(--cream)] to-[var(--cream-dark)]" />
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, var(--ink) 1px, transparent 0)`,
        backgroundSize: '40px 40px',
      }} />

      <div className="relative px-6 mx-auto max-w-7xl lg:px-12 py-16 sm:py-20 lg:py-28">
        <div className="grid items-center grid-cols-1 gap-12 lg:gap-20 lg:grid-cols-2">
          {/* Text side */}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8 max-w-xl"
          >
            <TextBlock />
            <m.div
              className="space-y-4 pt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <ButtonTrial />
              <SignInHere />
            </m.div>
          </m.div>

          {/* Image side */}
          <m.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-lg mx-auto lg:max-w-none"
          >
            {/* Decorative frame */}
            <div className="absolute -inset-4 bg-gradient-to-br from-[var(--ink)]/5 to-[var(--amber)]/10 rounded-2xl -rotate-2" />
            <div className="absolute -inset-4 border border-[var(--border-warm)] rounded-2xl rotate-1" />

            <div className="relative rounded-xl overflow-hidden shadow-2xl shadow-black/10">
              <Image
                src={portrait2}
                alt={t('hero.imgAlt')}
                width={600}
                height={500}
                className="w-full h-auto object-cover"
                priority
                placeholder="blur"
              />
              {/* Subtle overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/20 via-transparent to-transparent" />
            </div>
          </m.div>
        </div>

        {/* Trust indicators */}
        <m.div
          className="mt-16 lg:mt-24 pt-10 border-t border-[var(--border-warm)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="grid grid-cols-3 gap-8 text-center">
            {[
              { value: '500+', labelKey: 'hero.stats.studentsHelped' },
              { value: 'UvA & VU', labelKey: 'hero.stats.campusNetwork' },
              { value: '5\u2605', labelKey: 'hero.stats.averageRating' },
            ].map((stat, i) => (
              <m.div
                key={stat.value}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.7 + i * 0.1 }}
              >
                <div className="font-display text-2xl sm:text-3xl font-semibold text-[var(--ink)]">
                  {stat.value}
                </div>
                <div className="text-sm text-[var(--muted-text)] mt-1">
                  {t(stat.labelKey)}
                </div>
              </m.div>
            ))}
          </div>
        </m.div>
      </div>
    </section>
  );
};

export default Hero;
