'use client';

import React from 'react';
import { m } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { MapPin, Monitor } from 'lucide-react';
import { inViewFadeUp, viewportOnce } from '@/lib/animations';

export const LocationsSection = () => {
  const t = useTranslations('tutoring');

  return (
    <section className="py-24 bg-gradient-to-b from-[var(--cream)] to-[var(--cream-dark)]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <m.h2
            {...inViewFadeUp}
            className="text-4xl font-display font-bold mb-4 text-[var(--ink)]"
          >
            {t('locations.title')}
          </m.h2>
          <m.p
            {...inViewFadeUp}
            transition={{ delay: 0.1 }}
            className="text-xl text-[var(--muted-text)] max-w-2xl mx-auto"
          >
            {t('locations.subtitle')}
          </m.p>
        </div>

        {/* Location cards */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-2xl mx-auto mb-8">
          <m.div
            {...inViewFadeUp}
            transition={{ delay: 0.2 }}
            className="flex-1 flex items-center gap-4 bg-[var(--ink)] text-[var(--cream)] rounded-2xl px-6 py-5"
          >
            <MapPin className="w-6 h-6 text-[var(--amber)] flex-shrink-0" />
            <span className="font-medium">
              {t('locations.sciencePark')}
            </span>
          </m.div>

          <m.div
            {...inViewFadeUp}
            transition={{ delay: 0.3 }}
            className="flex-1 flex items-center gap-4 bg-[var(--ink)] text-[var(--cream)] rounded-2xl px-6 py-5"
          >
            <Monitor className="w-6 h-6 text-[var(--amber)] flex-shrink-0" />
            <span className="font-medium">
              {t('locations.online')}
            </span>
          </m.div>
        </div>

        {/* Coverage areas */}
        <m.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ delay: 0.4 }}
          className="text-center text-[var(--muted-text)]"
        >
          {t('locations.areas')}
        </m.p>
      </div>
    </section>
  );
};
