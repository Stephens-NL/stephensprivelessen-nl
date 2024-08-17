//component/Feedback2.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import { FeedbackForm, QuestionGroup, PersonalIntermezzo, Question, Language } from '../data';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronRight, GraduationCap } from 'lucide-react';

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

const DurationSelector: React.FC<{ onSelect: (duration: 'short' | 'long') => void }> = ({ onSelect }) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col space-y-4">
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

const RatingComponent: React.FC<{ value: number; onChange: (value: number) => void; max: number }> = ({ value, onChange, max }) => {
  return (
    <div className="flex space-x-2">
      {[...Array(max)].map((_, index) => (
        <button
          key={index}
          onClick={() => onChange(index + 1)}
          className={`focus:outline-none transition-colors duration-200 ${index < value ? 'text-yellow-400' : 'text-gray-400'
            }`}
        >
          <GraduationCap size={32} />
        </button>
      ))}
    </div>
  );
};

const QuestionComponent: React.FC<{ question: Question; onChange: (id: string, value: any) => void; value: any }> = ({ question, onChange, value }) => {
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
              value={value || ''}
              className="w-full px-3 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300 text-white placeholder-white placeholder-opacity-50"
              onChange={(e) => onChange(question.id, e.target.value)}
              required={question.required}
            />
          ) : (
            <textarea
              value={value || ''}
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
          <RatingComponent
            value={value || 0}
            onChange={(newValue) => onChange(question.id, newValue)}
            max={question.max || 5}
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
                checked={value === option.value}
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

export const FeedbackSystem: React.FC<{ form: FeedbackForm, onClose: () => void }> = ({ form }) => {
  const [currentStep, setCurrentStep] = useState(-1); // Start at -1 for language selection
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const { t } = useTranslation();
  const { setLanguage } = useLanguage();

  const handleChange = (id: string, value: any) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Handle form submission logic here
  };

  const currentSection = form.sections[currentStep];
  const currentQuestion = currentSection && 'questions' in currentSection ? currentSection.questions[currentQuestionIndex] : null;

  const nextStep = () => {
    if (currentSection && 'questions' in currentSection && currentQuestionIndex < currentSection.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (currentStep < form.sections.length - 1) {
      setCurrentStep(currentStep + 1);
      setCurrentQuestionIndex(0);
    } else {
      handleSubmit();
    }
  };

  const goBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      const previousSection = form.sections[currentStep - 1];
      if ('questions' in previousSection) {
        setCurrentQuestionIndex(previousSection.questions.length - 1);
      } else {
        setCurrentQuestionIndex(0);
      }
    }
  };

  const canGoBack = currentStep > 0 || currentQuestionIndex > 0;


  const isLastStep = currentStep === form.sections.length - 1 &&
    (!currentSection || !('questions' in currentSection) || currentQuestionIndex === currentSection.questions.length - 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-yellow-400 flex flex-col justify-between p-8">
      <AnimatePresence mode="wait">
        {currentStep === -1 ? (
          <motion.div
            key="language-selector"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="flex flex-col items-center justify-center h-full"
          >
            <h1 className="text-4xl font-bold text-white mb-8">Select Your Language / Kies Je Taal</h1>
            <LanguageSelector onSelect={(lang: Language) => {
              setLanguage(lang);
              setCurrentStep(0);
            }} />
          </motion.div>
        ) : (
          <motion.div
            key={`${currentStep}-${currentQuestionIndex}`}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-3xl mx-auto bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-8"
          >
            <h1 className="text-3xl font-bold text-white mb-6">
              <TypewriterText text={t(form.title)} />
            </h1>
            {currentSection && 'questions' in currentSection ? (
              <>
                <h2 className="text-2xl font-semibold mb-4 text-white">{t(currentSection.title)}</h2>
                {currentQuestion && (
                  <QuestionComponent
                    key={currentQuestion.id}
                    question={currentQuestion}
                    onChange={handleChange}
                    value={formData[currentQuestion.id]}
                  />
                )}
              </>
            ) : currentSection && 'content' in currentSection ? (
              <PersonalIntermezzoComponent intermezzo={currentSection} />
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>

      {currentStep !== -1 && (
        <motion.div
          className="mt-8 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <button
            onClick={nextStep}
            className="px-8 py-4 bg-white text-blue-900 rounded-full text-xl font-bold hover:bg-yellow-300 transition-colors duration-300 flex items-center"
          >
            {isLastStep ? t('submit') : t('next')}
            <ChevronRight className="ml-2" size={24} />
          </button>
        </motion.div>
      )}
    </div>
  );
};