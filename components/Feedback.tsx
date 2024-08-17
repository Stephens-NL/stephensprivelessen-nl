'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import { FeedbackForm, QuestionGroup, PersonalIntermezzo, Question } from '../data';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const TypewriterText: React.FC<{ text: string; delay?: number }> = ({ text, delay = 0 }) => {
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

const QuestionComponent: React.FC<{ question: Question; onChange: (id: string, value: any) => void }> = ({ question, onChange }) => {
  const { t } = useTranslation();

  switch (question.type) {
    case 'text':
    case 'textarea':
      return (
        <div className="mb-4">
          <label className="block text-xl font-medium text-white mb-2">{t(question.label)}</label>
          {question.type === 'text' ? (
            <input
              type="text"
              className="w-full px-3 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300 text-white placeholder-white placeholder-opacity-50"
              onChange={(e) => onChange(question.id, e.target.value)}
              required={question.required}
            />
          ) : (
            <textarea
              className="w-full px-3 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300 text-white placeholder-white placeholder-opacity-50"
              onChange={(e) => onChange(question.id, e.target.value)}
              required={question.required}
              rows={4}
            />
          )}
        </div>
      );
    case 'number':
      return (
        <div className="mb-4">
          <label className="block text-xl font-medium text-white mb-2">{t(question.label)}</label>
          <input
            type="number"
            min={question.min}
            max={question.max}
            className="w-full px-3 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300 text-white placeholder-white placeholder-opacity-50"
            onChange={(e) => onChange(question.id, parseInt(e.target.value))}
            required={question.required}
          />
        </div>
      );
    case 'multipleChoice':
      return (
        <div className="mb-4">
          <label className="block text-xl font-medium text-white mb-2">{t(question.label)}</label>
          {question.options?.map((option) => (
            <div key={option.value} className="flex items-center mb-2">
              <input
                type="radio"
                id={`${question.id}-${option.value}`}
                name={question.id}
                value={option.value}
                onChange={(e) => onChange(question.id, e.target.value)}
                required={question.required}
                className="mr-2"
              />
              <label htmlFor={`${question.id}-${option.value}`} className="text-white">{t(option.label)}</label>
            </div>
          ))}
        </div>
      );
    default:
      return null;
  }
};

const PersonalIntermezzoComponent: React.FC<{ intermezzo: PersonalIntermezzo }> = ({ intermezzo }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white bg-opacity-10 p-6 rounded-md mb-6"
    >
      <h3 className="text-2xl font-semibold mb-4 text-white">{t(intermezzo.title)}</h3>
      <p className="text-white">{t(intermezzo.content)}</p>
    </motion.div>
  );
};

export const FeedbackSystem: React.FC<{ form: FeedbackForm }> = ({ form }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();

  const handleChange = (id: string, value: any) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Handle form submission logic here
  };

  const currentSection = form.sections[currentStep];

  const nextStep = () => {
    if (currentStep < form.sections.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-yellow-400 flex flex-col justify-center items-center p-8">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center mb-8 text-white"
      >
        <TypewriterText text={t(form.title)} />
      </motion.h1>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-3xl bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-8"
        >
          {currentSection && 'questions' in currentSection ? (
            <>
              <h2 className="text-2xl font-semibold mb-4 text-white">{t(currentSection.title)}</h2>
              {currentSection.questions.map((question) => (
                <QuestionComponent key={question.id} question={question} onChange={handleChange} />
              ))}
            </>
          ) : currentSection && 'content' in currentSection ? (
            <PersonalIntermezzoComponent intermezzo={currentSection} />
          ) : null}
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between w-full max-w-3xl mt-8">
        <motion.button
          onClick={prevStep}
          disabled={currentStep === 0}
          className={`flex items-center ${currentStep === 0 ? 'text-gray-500' : 'text-white hover:text-yellow-300'} transition-colors duration-300`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft className="mr-2" /> {t('previous')}
        </motion.button>
        <motion.button
          onClick={nextStep}
          className="flex items-center text-white hover:text-yellow-300 transition-colors duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {currentStep === form.sections.length - 1 ? t('submit') : t('next')} <ChevronRight className="ml-2" />
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
    </div>
  );
};