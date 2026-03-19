'use client';

import { useTranslations } from 'next-intl';
import { m, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaMapMarkerAlt, FaClock, FaCheck } from 'react-icons/fa';

export function AboutSection() {
  const t = useTranslations('boa');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <m.section
      ref={ref}
      id="about"
      className="relative z-10 py-24 px-4"
      style={{
        transform: isInView ? "none" : "translateY(100px)",
        opacity: isInView ? 1 : 0,
        transition: "transform 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s, opacity 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
      }}
    >
      <div className="max-w-4xl mx-auto">
        <m.h2
          className="text-4xl font-bold text-[var(--amber)] mb-8"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          {t('subtitle')}
        </m.h2>
        <m.div
          className="prose prose-lg prose-invert"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-[var(--amber)]">{t('proverb.text')}</p>
              <p className="text-lg text-[var(--cream)]/80">{t('proverb.meaning')}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-[var(--amber)] mb-3">
                  <FaMapMarkerAlt className="text-xl" />
                  <h3 className="font-medium">{t('features.location.title')}</h3>
                </div>
                <p className="text-white/90">{t('features.location.text')}</p>
              </div>
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-[var(--amber)] mb-3">
                  <FaClock className="text-xl" />
                  <h3 className="font-medium">{t('features.availability.title')}</h3>
                </div>
                <p className="text-white/90">{t('features.availability.text')}</p>
              </div>
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-[var(--amber)] mb-3">
                  <FaCheck className="text-xl" />
                  <h3 className="font-medium">{t('features.extras.title')}</h3>
                </div>
                <p className="text-white/90">{t('features.extras.text')}</p>
              </div>
            </div>
          </div>
        </m.div>
      </div>
    </m.section>
  );
}
