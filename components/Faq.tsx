'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { ChevronUp, ChevronDown, Search } from 'lucide-react';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import FloatingShapes from './FloatingShapes';
import FadeInText from './FeedbackSystem/FadeInText';

// FAQ items count from JSON (20 items)
const FAQ_COUNT = 20;

const Faq: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const t = useTranslations('faq');
  const locale = useLocale();
  const showBackToTop = useScrollPosition(300);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleQuestion = useCallback((index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const allIndices = useMemo(() => Array.from({ length: FAQ_COUNT }, (_, i) => i), []);

  const filteredIndices = useMemo(() => {
    if (!mounted) return allIndices;

    return allIndices.filter((index) => {
      const questionText = t(`items.${index}.question`);
      const answerText = t(`items.${index}.answer`);

      return (
        questionText.toLowerCase().includes(searchTerm.toLowerCase()) ||
        answerText.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [searchTerm, t, mounted, allIndices]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[var(--ink)] to-[var(--amber)] text-on-dark p-8">
        <h1 className="text-4xl font-bold text-center mb-8 font-display">
          {t('title')}
        </h1>
        <div className="max-w-3xl mx-auto">
          {allIndices.map((index) => (
            <div key={index} className="mb-4">
              <button className="w-full p-4 text-left flex justify-between items-center bg-white/10 backdrop-blur-lg rounded-lg">
                <span className="text-on-dark font-medium">{t(`items.${index}.question`)}</span>
                <ChevronDown />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--ink)] to-[var(--amber)] text-on-dark p-8 overflow-hidden">
      <m.h1
        key={locale}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center mb-8 font-display"
      >
        <FadeInText text={t('title')} />
      </m.h1>

      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="max-w-3xl mx-auto mb-8"
      >
        <div className="relative">
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-4 pl-12 rounded-full bg-white/15 backdrop-blur-lg text-on-dark placeholder:text-on-dark-subtle focus:outline-none focus:ring-2 focus:ring-[var(--amber)]"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-on-dark-muted" />
        </div>
      </m.div>

      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="max-w-3xl mx-auto"
      >
        {filteredIndices.map((index, displayIndex) => (
          <m.div
            key={`${index}-${locale}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: displayIndex * 0.1 }}
            className="mb-4"
          >
            <m.button
              onClick={() => toggleQuestion(index)}
              className="w-full p-4 text-left flex justify-between items-center bg-white/10 backdrop-blur-lg rounded-lg hover:bg-white/20 transition-colors duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-on-dark font-medium">{t(`items.${index}.question`)}</span>
              {activeIndex === index ? <ChevronUp /> : <ChevronDown />}
            </m.button>
            <AnimatePresence>
              {activeIndex === index && (
                <m.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-2 p-4 bg-white/5 backdrop-blur-lg rounded-lg"
                >
                  <p className="text-on-dark-muted">{t(`items.${index}.answer`)}</p>
                </m.div>
              )}
            </AnimatePresence>
          </m.div>
        ))}
      </m.div>

      {mounted && showBackToTop && (
        <m.div
          className="fixed bottom-8 right-8 flex space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <m.button
            onClick={scrollToTop}
            className="bg-[var(--cream)] text-[var(--ink)] rounded-full p-4 shadow-sm hover:bg-[var(--amber)] transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronUp />
          </m.button>
        </m.div>
      )}

      <FloatingShapes />
    </div>
  );
};

export default Faq;
