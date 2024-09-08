'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { introductionContent } from '@/data/index'; // Adjust path as necessary
import { useTranslation } from '@/hooks/useTranslation';

const Introductie = () => {
  const { t } = useTranslation();

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
    <motion.section
      className="py-10 bg-blue-100 "
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="container mx-auto px-4" variants={textContainerVariants}>
        <motion.h2
          className="text-3xl font-bold mb-6 text-center"
          variants={textItemVariants}
        >
          {String(t(introductionContent.title))}
        </motion.h2>
        <motion.p
          className="text-lg text-gray-700 leading-relaxed text-center"
          variants={textItemVariants}
        >
          {String(t(introductionContent.description))}
        </motion.p>
      </motion.div>
    </motion.section>
  );
};

export default Introductie;