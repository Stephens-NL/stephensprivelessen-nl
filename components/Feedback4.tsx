'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import { FeedbackForm, Question, Language } from '../data/types';
import { shortVersion } from '../data';
import { longVersion } from '../data';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronRight, ChevronLeft } from 'lucide-react';


const FadeInText: React.FC<{ text: string; delay?: number }> = ({ text, delay = 0 }) => {
  const words = text.split(' ');

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay }}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + index * 0.2 }}
          style={{ display: 'inline-block', marginRight: '5px' }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};


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


const SlideInText: React.FC<{ text: string; delay?: number }> = ({ text, delay = 0 }) => {
  return (
    <motion.div
      initial={{ x: '-100vw' }}
      animate={{ x: 0 }}
      transition={{ delay, type: 'spring', stiffness: 120 }}
    >
      {text}
    </motion.div>
  );
};




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
    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay }}>
      {displayedText}
    </motion.span>
  );
};

const CustomRadio: React.FC<{ checked: boolean; onChange: () => void }> = ({ checked, onChange }) => {
  return (
    <div
      className={`w-8 h-8 flex items-center justify-center border-2 rounded-full cursor-pointer transition-colors duration-300 ${
        checked ? 'bg-yellow-400 border-yellow-400' : 'bg-white border-gray-400'
      }`}
      onClick={onChange}
    >
      {checked && <ChevronRight size={24} />}
    </div>
  );
};

const LanguageSelector: React.FC<{ onSelect: (lang: Language) => void }> = ({ onSelect }) => {
  return (
    <div className="flex justify-center space-x-4">
      <button
        onClick={() => onSelect('NL')}
        className="px-6 py-3 bg-white text-blue-900 rounded-md hover:bg-yellow-300 transition-colors duration-300"
      >
        Nederlands
      </button>
      <button
        onClick={() => onSelect('EN')}
        className="px-6 py-3 bg-white text-blue-900 rounded-md hover:bg-yellow-300 transition-colors duration-300"
      >
        English
      </button>
    </div>
  );
};

const DurationSelector: React.FC<{ onSelect: (duration: 'short' | 'long') => void }> = ({ onSelect }) => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-center space-x-4 mt-8">
      <button
        onClick={() => onSelect('short')}
        className="px-6 py-3 bg-white text-blue-900 rounded-md hover:bg-yellow-300 transition-colors duration-300"
      >
        {t('Kort (1-2 min)')}
      </button>
      <button
        onClick={() => onSelect('long')}
        className="px-6 py-3 bg-white text-blue-900 rounded-md hover:bg-yellow-300 transition-colors duration-300"
      >
        {t('Lang (8-10 min)')}
      </button>
    </div>
  );
};

// Hoofd FeedbackSystem Component

export const FeedbackSystem: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0); // Begin met stap 0 voor taalkeuze
  const [currentForm, setCurrentForm] = useState<FeedbackForm | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const { t } = useTranslation();
  const { setLanguage } = useLanguage();

  const handleChange = (id: string, value: any) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const previousStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSelectDuration = (selectedDuration: 'short' | 'long') => {
    setCurrentForm(selectedDuration === 'short' ? shortVersion : longVersion);
    nextStep(); // Ga door naar het feedbackformulier
  };

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
    nextStep(); // Ga door naar de volgende stap (naam en leeftijd)
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Verwerk formulier inzending hier
  };

  // Bepaal welke sectie en vraag we nu laten zien
  const currentSection = currentForm?.sections[currentStep - 3]; // -3 omdat de eerste drie stappen apart zijn
  const currentQuestion = currentSection && 'questions' in currentSection ? currentSection.questions[0] : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-yellow-400 flex flex-col justify-between p-8">
      <AnimatePresence mode="wait">
        {/* Stap 1: Taalkeuze */}
        {currentStep === 0 && (
          <motion.div
            key="language-selector"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="flex flex-col items-center justify-center h-full"
          >
            <h1 className="text-4xl font-bold text-white mb-8">Select Your Language / Kies Je Taal</h1>
            <LanguageSelector onSelect={handleLanguageSelect} />
          </motion.div>
        )}

        {/* Stap 2: Naam en Leeftijd */}
        {currentStep === 1 && (
          <motion.div
            key="personal-info"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="w-full max-w-3xl mx-auto bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-8"
          >
            <h1 className="text-3xl font-bold text-white mb-6">
              <FadeInText text={t('Wat is je naam en leeftijd?')} />
            </h1>
            <div className="mb-4">
              <label className="block text-xl font-medium text-white mb-2">{t('Naam')}</label>
              <input
                type="text"
                value={formData.name || ''}
                className="w-full px-3 py-2 bg-blue-900 bg-opacity-20 border border-white border-opacity-30 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300 text-white placeholder-white placeholder-opacity-50"
                onChange={(e) => handleChange('name', e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-xl font-medium text-white mb-2">{t('Leeftijd')}</label>
              <input
                type="number"
                value={formData.age || ''}
                className="w-full px-3 py-2 bg-blue-900 bg-opacity-20 border border-white border-opacity-30 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300 text-white placeholder-white placeholder-opacity-50"
                onChange={(e) => handleChange('age', e.target.value)}
              />
            </div>
            <div className="mt-8 flex justify-center space-x-4">
              <button
                onClick={previousStep}
                className="px-6 py-3 bg-white text-blue-900 rounded-full text-lg font-semibold hover:bg-gray-300 transition-colors duration-300 flex items-center"
              >
                <ChevronLeft className="mr-2" size={24} />
                {t('back')}
              </button>
              <button
                onClick={nextStep}
                className="px-8 py-4 bg-white text-blue-900 rounded-full text-xl font-bold hover:bg-yellow-300 transition-colors duration-300 flex items-center"
              >
                {t('next')}
                <ChevronRight className="ml-2" size={24} />
              </button>
            </div>
          </motion.div>
        )}

        {/* Stap 3: Duur van het Formulier */}
        {currentStep === 2 && (
          <motion.div
            key="duration-selector"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="flex flex-col items-center justify-center h-full"
          >
            <h1 className="text-4xl font-bold text-white mb-8">
              {t('Hoeveel tijd heb je?')}
            </h1>
            <DurationSelector onSelect={handleSelectDuration} />
          </motion.div>
        )}

        {/* Stap 4+: Vragen uit het feedbackformulier */}
        {currentStep >= 3 && currentForm && (
          <motion.div
            key="form-step"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-3xl mx-auto bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-8"
          >
            <h1 className="text-3xl font-bold text-white mb-6">
              <FadeInText text={t(currentForm.title)} />
            </h1>
            {currentSection && 'questions' in currentSection ? (
              <>
                <h2 className="text-2xl font-semibold mb-4 text-white">{t(currentSection.title)}</h2>
                {currentQuestion && (
                  <div className="mb-4">
                    <label className="block text-xl font-medium text-white mb-2">{t(currentQuestion.label)}</label>
                    <input
                      type="text"
                      value={formData[currentQuestion.id] || ''}
                      className="w-full px-3 py-2 bg-blue-900 bg-opacity-20 border border-white border-opacity-30 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300 text-white placeholder-white placeholder-opacity-50"
                      onChange={(e) => handleChange(currentQuestion.id, e.target.value)}
                    />
                  </div>
                )}
              </>
            ) : currentSection && 'content' in currentSection ? (
              <div>
                <p className="text-white">{t(currentSection.content)}</p>
              </div>
            ) : null}

            <div className="mt-8 flex justify-center space-x-4">
              <button
                onClick={previousStep}
                className="px-6 py-3 bg-white text-blue-900 rounded-full text-lg font-semibold hover:bg-gray-300 transition-colors duration-300 flex items-center"
              >
                <ChevronLeft className="mr-2" size={24} />
                {t('back')}
              </button>
              <button
                onClick={nextStep}
                className="px-8 py-4 bg-white text-blue-900 rounded-full text-xl font-bold hover:bg-yellow-300 transition-colors duration-300 flex items-center"
              >
                {currentStep === currentForm.sections.length + 2 ? t('submit') : t('next')}
                <ChevronRight className="ml-2" size={24} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FeedbackSystem;
