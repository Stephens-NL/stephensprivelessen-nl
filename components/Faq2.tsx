'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqItems, faqInfo } from '../data';
import { useTranslation } from '@/hooks/useTranslation';
import { ChevronUp, ChevronDown, ArrowLeft, ArrowRight } from 'lucide-react';

type TypewriterTextProps = {
  text: string;
  delay?: number; // Optional prop with a default value
};

const TypewriterText = ({ text, delay = 0 }: TypewriterTextProps) => {
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [language, setLanguage] = useState('NL');

  const { t } = useTranslation();

  const nextQuestion = () => {
    if (currentIndex < faqItems.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    }
  };

  const prevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowAnswer(false);
    }
  };

  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  const currentItem = faqItems[currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-yellow-400 text-white flex flex-col justify-center items-center p-8">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center mb-8"
      >
        <TypewriterText text={t(faqInfo.title)} />
      </motion.h1>

      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl"
      >
        <motion.div
          className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-8 mb-4"
          whileHover={{ scale: 1.02 }}
        >
          <h2 className="text-2xl font-semibold mb-4">
            <TypewriterText text={t(currentItem.question)} />
          </h2>
          <button
            onClick={toggleAnswer}
            className="text-yellow-300 hover:text-yellow-100 transition-colors duration-300"
          >
            {showAnswer ? "Hide Answer" : "Show Answer"}
          </button>
          <AnimatePresence>
            {showAnswer && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4"
              >
                <TypewriterText text={t(currentItem.answer)} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      <div className="flex justify-between w-full max-w-3xl mt-8">
        <motion.button
          onClick={prevQuestion}
          disabled={currentIndex === 0}
          className={`flex items-center ${currentIndex === 0 ? 'text-gray-500' : 'text-white hover:text-yellow-300'} transition-colors duration-300`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowLeft className="mr-2" /> Previous
        </motion.button>
        <motion.button
          onClick={nextQuestion}
          disabled={currentIndex === faqItems.length - 1}
          className={`flex items-center ${currentIndex === faqItems.length - 1 ? 'text-gray-500' : 'text-white hover:text-yellow-300'} transition-colors duration-300`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Next <ArrowRight className="ml-2" />
        </motion.button>
      </div>

      <motion.div
        className="fixed bottom-8 right-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
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