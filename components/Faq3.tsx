'use client';

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqItems, faqInfo, TranslationFunction, Bilingual } from '../data';
import { useTranslation } from '@/hooks/useTranslation';
import { ChevronUp, ChevronDown, Search } from 'lucide-react';
import { useScrollPosition } from '../hooks/useScrollPosition';
import { useLanguage } from '@/contexts/LanguageContext';
import FloatingShapes from './FloatingShapes';
import FadeInText from './FadeInText';



const ZoomInText: React.FC<{ text: string; delay?: number }> = ({ text, delay = 0 }) => {
  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay, duration: 0.5 }}
    >
      {text}
    </motion.div>
  );
};

const TypewriterText = ({ text}: { text: string}) => {

  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    console.log('Translated:', text.length);
    let i = 0;
    const timer = setInterval(() => {
      // if (typeof text === 'string') {
        if (i < text.length) {
          setDisplayedText((prev) => prev.concat(text.charAt(i)));
          i++;
        } else {
          clearInterval(timer);
        }

      // }
    }, 60);
    return () => clearInterval(timer);
    
  }, []);
  // console.log('Translated:', displayedText.charAt(1));
  
  return <span className="inline-block">{displayedText}</span>;
};

const FAQPage = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { t } = useTranslation();
  const { language } = useLanguage();
  const showBackToTop = useScrollPosition(300);

  const toggleQuestion = useCallback((index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const filteredItems = useMemo(() => {
    return faqItems.filter((item) => {
      const questionText = t(item.question);
      const answerText = t(item.answer);

      return (
        (typeof questionText === 'string' && questionText.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (typeof answerText === 'string' && answerText.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    });
  }, [searchTerm, t]);

  // const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-yellow-400 text-white p-8">
      <motion.h1
        key={language}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center mb-8"
      >
        <FadeInText text={t(faqInfo.title)}/>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="max-w-3xl mx-auto mb-8"
      >
        <div className="relative">
          <input
            type="text"
            placeholder={'Search...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-4 pl-12 rounded-full bg-white bg-opacity-20 backdrop-blur-lg text-white placeholder-white placeholder-opacity-75 focus:outline-none focus:ring-2 focus:ring-yellow-300"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white opacity-75" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="max-w-3xl mx-auto"
      >
        {filteredItems.map((item, index) => (
          <motion.div
            key={`${item.id}-${language}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="mb-4"
          >
            <motion.button
              onClick={() => toggleQuestion(index)}
              className="w-full p-4 text-left flex justify-between items-center bg-white bg-opacity-10 backdrop-blur-lg rounded-lg hover:bg-opacity-20 transition-colors duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ZoomInText text={t(item.question)} />
              {activeIndex === index ? <ChevronUp /> : <ChevronDown />}
            </motion.button>
            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-2 p-4 bg-white bg-opacity-5 backdrop-blur-lg rounded-lg"
                >
                  <FadeInText text={t(item.answer)} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="fixed bottom-8 right-8 flex space-x-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: showBackToTop ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.button
          onClick={scrollToTop}
          className="bg-white text-blue-900 rounded-full p-4 shadow-lg hover:bg-yellow-300 transition-colors duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronUp />
        </motion.button>
      </motion.div>

      <FloatingShapes />
    </div>
  );
};

export default FAQPage;