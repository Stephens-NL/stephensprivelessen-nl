'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, m } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import ButtonTrial from './ButtonTrial';
import { X } from 'lucide-react';

// Service icon imports - these are non-translatable config
import mathIcon from '@/public/images/svg/math-icon.svg';
import programmingIcon from '@/public/images/svg/programming-icon.svg';
import creativeIcon from '@/public/images/svg/creative-workshop-icon.svg';
import nonCreativeIcon from '@/public/images/svg/workshop-icon.svg';
import consultancyIcon from '@/public/images/svg/consultancy-icon.svg';
import customIcon from '@/public/images/svg/custom-icon.svg';

const serviceIcons = [mathIcon, programmingIcon, creativeIcon, nonCreativeIcon, consultancyIcon, customIcon];

const serviceIds = [
  'mathematics-tutoring',
  'programming-lessons',
  'creative-workshops',
  'non-creative-workshops',
  'consultancy',
  'custom-solutions',
];

const serviceLinkMap: Record<string, string> = {
  'mathematics-tutoring': '/privelessen',
  'programming-lessons': '/privelessen',
  'creative-workshops': '/workshops?type=creative',
  'non-creative-workshops': '/workshops?type=academic',
  'consultancy': '/consultancy',
};

const Services = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const t = useTranslations('services');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-[var(--cream-dark)] to-[var(--ink)] overflow-hidden relative">
      {/* Background graphics */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute -top-20 -left-20 sm:-top-40 sm:-left-40 w-40 h-40 sm:w-80 sm:h-80 bg-[var(--sage)] rounded-full opacity-20 mix-blend-multiply"></div>
        <div className="absolute top-10 right-10 sm:top-20 sm:right-20 w-30 h-30 sm:w-60 sm:h-60 bg-[var(--amber)] rounded-full opacity-20 mix-blend-multiply"></div>
        <div className="absolute bottom-20 -left-10 sm:bottom-40 sm:-left-20 w-50 h-50 sm:w-100 sm:h-100 bg-[var(--terracotta)] rounded-full opacity-20 mix-blend-multiply"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Introduction Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <m.h2
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-8 text-[var(--cream)]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {t('ourServices')}
          </m.h2>
          <m.p
            className="text-lg sm:text-xl text-[var(--cream)] mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t('serviceDetails')}
          </m.p>
        </div>

        {/* Services Grid */}
        <m.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {serviceIds.map((id, index) => (
            <m.div
              key={id}
              className="bg-[var(--cream)] bg-opacity-90 p-6 sm:p-8 rounded-xl border border-[var(--border-warm)] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col transform hover:-translate-y-2"
              variants={itemVariants}
            >
              <div className="flex justify-center mb-4 sm:mb-6">
                <Image
                  src={serviceIcons[index]}
                  alt={t(`items.${index}.title`)}
                  width={60}
                  height={60}
                  className="text-[var(--amber)] w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20"
                />
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-semibold mb-3 sm:mb-4 text-center text-[var(--ink)]">
                {t(`items.${index}.title`)}
              </h3>
              <p className="text-sm sm:text-base text-[var(--muted-text)] mb-4 sm:mb-6 text-center flex-grow">
                {t(`items.${index}.shortDescription`)}
              </p>
              <m.div
                className="text-center mt-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {serviceLinkMap[id] ? (
                  <Link href={serviceLinkMap[id] as any}>
                    <button className="inline-block bg-[var(--ink)] text-[var(--cream)] font-bold py-2 px-4 rounded-full hover:bg-[var(--ink-light)] transition-colors duration-300">
                      {t('learnMore')} &rarr;
                    </button>
                  </Link>
                ) : (
                  <button
                    onClick={() => setSelectedIndex(index)}
                    className="inline-block bg-[var(--ink)] text-[var(--cream)] font-bold py-2 px-4 rounded-full hover:bg-[var(--ink-light)] transition-colors duration-300"
                  >
                    {t('learnMore')} &rarr;
                  </button>
                )}
              </m.div>
            </m.div>
          ))}
        </m.div>
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <m.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <m.div
              className="bg-[var(--cream)] rounded-lg p-6 sm:p-8 w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto shadow-sm border border-[var(--border-warm)] relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            >
              <button
                onClick={() => setSelectedIndex(null)}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 text-[var(--muted-text)] hover:text-[var(--warm-text)]"
              >
                <X size={24} />
              </button>
              <div className="text-center">
                <Image
                  src={serviceIcons[selectedIndex]}
                  alt={t(`items.${selectedIndex}.title`)}
                  width={80}
                  height={80}
                  className="mx-auto mb-4 sm:mb-6 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
                />
                <h2 className="text-2xl sm:text-3xl font-display font-bold mb-3 sm:mb-4 text-[var(--ink)]">
                  {t(`items.${selectedIndex}.title`)}
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-[var(--muted-text)] mb-4 sm:mb-6">
                  {t(`items.${selectedIndex}.longDescription`)}
                </p>
                <ButtonTrial />
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Services;
