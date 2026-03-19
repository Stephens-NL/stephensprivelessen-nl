'use client';

import React, { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

// Service icon imports
import mathIcon from '@/public/images/svg/math-icon.svg';
import programmingIcon from '@/public/images/svg/programming-icon.svg';
import creativeIcon from '@/public/images/svg/creative-workshop-icon.svg';

const serviceIcons = [mathIcon, programmingIcon, creativeIcon];

const ServicesShort: React.FC = () => {
  const t = useTranslations('services');
  const [modalIndex, setModalIndex] = useState<number | null>(null);

  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-[var(--cream-dark)] relative">
      <div className="container mx-auto px-6 max-w-7xl lg:px-12">
        {/* Section header */}
        <div className="max-w-2xl mx-auto text-center mb-12 lg:mb-16">
          <m.p
            className="text-sm font-semibold tracking-[0.2em] uppercase text-[var(--amber)] mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {t('ourServices')}
          </m.p>
          <m.h2
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[var(--ink)] leading-tight"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {t('whatWeOffer')}
          </m.h2>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {[0, 1, 2].map((index) => (
            <m.div
              key={index}
              className="group bg-[var(--cream)] p-8 rounded-xl border border-[var(--border-warm)] hover:border-[var(--amber)]/30 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-black/5"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setModalIndex(index)}
            >
              <div className="mb-6 p-3 bg-[var(--ink)]/5 rounded-lg w-fit">
                <Image
                  src={serviceIcons[index]}
                  alt={t(`items.${index}.title`)}
                  width={32}
                  height={32}
                  className="h-8 w-8"
                />
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-semibold text-[var(--ink)] mb-3">
                {t(`items.${index}.title`)}
              </h3>
              <p className="text-[var(--muted-text)] text-sm leading-relaxed mb-6">
                {t(`items.${index}.shortDescription`)}
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--amber)] group-hover:gap-3 transition-all duration-300">
                {t('learnMore')}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </m.div>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {modalIndex !== null && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[var(--ink)]/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setModalIndex(null)}
          >
            <m.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="bg-[var(--cream)] p-8 sm:p-10 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-[var(--border-warm)]"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <div className="flex items-start gap-4 mb-6">
                <Image
                  src={serviceIcons[modalIndex]}
                  alt={t(`items.${modalIndex}.title`)}
                  width={48}
                  height={48}
                  className="h-12 w-12 mt-1"
                />
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[var(--ink)]">
                    {t(`items.${modalIndex}.title`)}
                  </h2>
                  <p className="text-[var(--muted-text)] mt-1">{t(`items.${modalIndex}.shortDescription`)}</p>
                </div>
              </div>
              <p className="text-[var(--warm-text)] leading-relaxed mb-8">
                {t(`items.${modalIndex}.longDescription`)}
              </p>
              <button
                className="px-6 py-2.5 text-sm font-semibold text-[var(--cream)] bg-[var(--ink)] rounded-lg hover:bg-[var(--ink-light)] transition-colors"
                onClick={() => setModalIndex(null)}
              >
                {t('close')}
              </button>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ServicesShort;
