'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqItems, faqInfo } from '../data';
import { useTranslation } from '@/hooks/useTranslation';
import { ChevronUp, ChevronDown, Search } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const TypewriterText = ({ text, delay = 0 }: { text: string, delay: number}) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(prev => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 30);

    return () => clearInterval(timer);
  }, [text]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
    >
      {displayedText}
    </motion.span>
  );
};

const FAQPage = () => {
  const [activeIndex, setActiveIndex] = useState<number|null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState(faqItems);
  // const [language, setLanguage] = useState('NL');
  const {language, setLanguage} = useLanguage();
  const [showBackToTop, setShowBackToTop] = useState(false);

  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setFilteredItems(
      faqItems.filter((item) =>
        t(item.question).toLowerCase().includes(searchTerm.toLowerCase()) ||
        t(item.answer).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, language]);

  const toggleQuestion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-yellow-400 text-white p-8">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center mb-8"
      >
        <TypewriterText text={t(faqInfo.title)}  delay={10}/>
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
            placeholder={language === 'NL' ? 'Zoeken...' : 'Search...'}
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
            key={item.id}
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
              <TypewriterText text={t(item.question)} delay={index * 0.1} />
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
                  <TypewriterText text={t(item.answer)} delay={10} />
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
          onClick={() => setLanguage(language === 'NL' ? 'EN' : 'NL')}
          className="bg-white text-blue-900 rounded-full p-4 shadow-lg hover:bg-yellow-300 transition-colors duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {language === 'NL' ? 'EN' : 'NL'}
        </motion.button>
        <motion.button
          onClick={scrollToTop}
          className="bg-white text-blue-900 rounded-full p-4 shadow-lg hover:bg-yellow-300 transition-colors duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronUp />
        </motion.button>
      </motion.div>

      {/* Floating shapes */}
      <motion.div
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white bg-opacity-10 rounded-full"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50,
              rotate: 360,
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'linear',
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default FAQPage;