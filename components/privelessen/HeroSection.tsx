'use client';

import React from 'react';
import { m } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import BlurImage from '@/components/shared/BlurImage';

interface LocationSpecific {
  area: string;
}

interface HeroSectionProps {
  locationSpecific?: LocationSpecific;
}

const CTA_PRIMARY_HREF = '/contact';

export const HeroSection = ({ locationSpecific }: HeroSectionProps) => {
  const t = useTranslations('tutoring');
  const locale = useLocale();
  const isNl = locale === 'nl';

  const title = locationSpecific
    ? (isNl
        ? `Professionele Bijles in ${locationSpecific.area}`
        : `Professional Tutoring in ${locationSpecific.area}`)
    : t('hero.title');

  const subtitle = locationSpecific
    ? 'Wiskunde, statistiek en programmeren. Online of op Science Park.'
    : t('hero.subtitle');

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-[var(--ink)] via-[var(--ink-light)] to-[var(--ink)]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--ink)]/90 to-[var(--ink)]/80 backdrop-blur-sm z-10" />
        <BlurImage
          src="/images/tutoring-hero.jpg"
          alt="Students learning"
          fill
          sizes="100vw"
          className="object-cover opacity-30"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold text-[var(--cream)] mb-6">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-on-dark-muted mb-8 max-w-2xl">
            {subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <Link href={CTA_PRIMARY_HREF}>
              <Button size="lg" className="bg-[var(--amber)] text-[var(--ink)] hover:bg-[var(--amber-hover)] font-semibold text-lg px-8 py-6">
                {t('hero.ctaPrimary')}
              </Button>
            </Link>
          </div>
        </m.div>
      </div>
    </section>
  );
};
