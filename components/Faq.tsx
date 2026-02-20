'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { ChevronUp, ChevronDown, Search } from 'lucide-react';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { useLanguage } from '@/contexts/LanguageContext';
import FloatingShapes from './FloatingShapes';
import FadeInText from './FadeInText';
import { FAQInfo, FAQItems } from '@/data/types';

interface FaqProps {
  faqInfo: FAQInfo;
  faqItems: FAQItems;
}

const Faq: React.FC<FaqProps> = ({ faqInfo, faqItems }) => {
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { t } = useTranslation();
  const { language } = useLanguage();
  const showBackToTop = useScrollPosition(300);

  // Ensure hydration consistency
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleQuestion = useCallback((index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const filteredItems = useMemo(() => {
    if (!mounted) return faqItems;
    
    return faqItems.filter((item) => {
      const questionText = String(t(item.question));
      const answerText = String(t(item.answer));

      return (
        questionText.toLowerCase().includes(searchTerm.toLowerCase()) ||
        answerText.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [searchTerm, t, mounted, faqItems]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-yellow-400 text-white p-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          {String(t(faqInfo.title))}
        </h1>
        <div className="max-w-3xl mx-auto">
          {faqItems.map((item) => (
            <div key={item.id} className="mb-4">
              <button className="w-full p-4 text-left flex justify-between items-center bg-white bg-opacity-10 backdrop-blur-lg rounded-lg">
                <span>{String(t(item.question))}</span>
                <ChevronDown />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-yellow-400 text-white p-8">
      <m.h1
        key={language}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center mb-8"
      >
        <FadeInText text={String(t(faqInfo.title))} />
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
            placeholder={String(t(faqInfo.searchPlaceholder))}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-4 pl-12 rounded-full bg-white bg-opacity-20 backdrop-blur-lg text-white placeholder-white placeholder-opacity-75 focus:outline-none focus:ring-2 focus:ring-yellow-300"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white opacity-75" />
        </div>
      </m.div>

      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="max-w-3xl mx-auto"
      >
        {filteredItems.map((item, index) => (
          <m.div
            key={`${item.id}-${language}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="mb-4"
          >
            <m.button
              onClick={() => toggleQuestion(index)}
              className="w-full p-4 text-left flex justify-between items-center bg-white bg-opacity-10 backdrop-blur-lg rounded-lg hover:bg-opacity-20 transition-colors duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>{String(t(item.question))}</span>
              {activeIndex === index ? <ChevronUp /> : <ChevronDown />}
            </m.button>
            <AnimatePresence>
              {activeIndex === index && (
                <m.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-2 p-4 bg-white bg-opacity-5 backdrop-blur-lg rounded-lg"
                >
                  <p>{String(t(item.answer))}</p>
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
            className="bg-white text-blue-900 rounded-full p-4 shadow-lg hover:bg-yellow-300 transition-colors duration-300"
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