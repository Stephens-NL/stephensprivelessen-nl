'use client';

import React from 'react';
import { m } from 'framer-motion';
import { useTranslations } from 'next-intl';

const Introductie = () => {
  const t = useTranslations('about');

  // Animation variants for the entire section
  const sectionVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: 'easeInOut',
      },
    },
  };

  // Animation variants for text elements with staggered children
  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  // Animation variants for individual text items
  const textItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <m.section
      className="py-10 bg-blue-100 "
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
    >
      <m.div className="container mx-auto px-4" variants={textContainerVariants}>
        <m.h2
          className="text-3xl font-bold mb-6 text-center"
          variants={textItemVariants}
        >
          {t('introductionContent.title')}
        </m.h2>
        <m.p
          className="text-lg text-gray-700 leading-relaxed text-center"
          variants={textItemVariants}
        >
          {t('introductionContent.sections.0.content')}
        </m.p>
      </m.div>
    </m.section>
  );
};

export default Introductie;
