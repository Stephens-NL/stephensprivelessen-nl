'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import { FeedbackForm, QuestionGroup, PersonalIntermezzo, Question, Language } from '../data';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronRight, ChevronLeft, GraduationCap } from 'lucide-react';

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

const CustomCheckbox: React.FC<{ checked: boolean; onChange: () => void }> = ({ checked, onChange }) => {
  return (
    <div
      className={`w-8 h-8 flex items-center justify-center border-2 rounded-md cursor-pointer transition-colors duration-300 ${
        checked ? 'bg-yellow-400 border-yellow-400' : 'bg-white border-gray-400'
      }`}
      onClick={onChange}
    >
      {checked && <GraduationCap size={24} />}
    </div>
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
      {checked && <GraduationCap size={24} />}
    </div>
  );
};

const QuestionComponent: React.FC<{ question: Question; onChange: (id: string, value: any) => void; value: any; onNext: () => void }> = ({ question, onChange, value, onNext }) => {
  const { t } = useTranslation();

  const handleOptionChange = (id: string, optionValue: any) => {
    onChange(id, optionValue);
    if (question.type === 'multipleChoice') {
      setTimeout(onNext, 300); // Automatically move to the next step after a short delay
    }
  };

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
              className="w-full px-3 py-2 bg-blue-900 bg-opacity-20 border border-white border-opacity-30 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300 text-white placeholder-white placeholder-opacity-50"
              onChange={(e) => onChange(question.id, e.target.value)}
              required={question.required}
            />
          ) : (
            <textarea
              value={value || ''}
              className="w-full px-3 py-2 bg-blue-900 bg-opacity-20 border border-white border-opacity-30 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300 text-white placeholder-white placeholder-opacity-50"
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
            value={value || ''}
            min={question.min}
            max={question.max}
            className="w-full px-3 py-2 bg-blue-900 bg-opacity-20 border border-white border-opacity-30 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300 text-white placeholder-white placeholder-opacity-50"
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
              <CustomRadio
                checked={value === option.value}
                onChange={() => handleOptionChange(question.id, option.value)}
              />
              <label htmlFor={`${question.id}-${option.value}`} className="text-white ml-2">{t(option.label)}</label>
            </div>
          ))}
        </div>
      );
    default:
      return null;
  }
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

export const FeedbackSystem: React.FC<{ shortForm: FeedbackForm; longForm: FeedbackForm }> = ({ shortForm, longForm }) => {
  const [step, setStep] = useState(0);
  const [formLength, setFormLength] = useState<'short' | 'long' | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();

  const form = formLength === 'short' ? shortForm : longForm;

  const handleChange = (id: string, value: any) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Handle form submission logic here
  };

  const nextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    } else if (formLength && step - 4 < form.sections.length - 1) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <LanguageSelector onSelect={(lang) => {
            setLanguage(lang);
            setStep(1);
          }} />
        );
      case 1:
        return (
          <QuestionComponent
            question={{ id: 'name', type: 'text', label: { EN: 'What is your name?', NL: 'Wat is je naam?' }, required: true }}
            onChange={handleChange}
            value={formData['name']}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <QuestionComponent
            question={{ id: 'age', type: 'number', label: { EN: 'What is your age?', NL: 'Wat is je leeftijd?' }, required: true, min: 1, max: 120 }}
            onChange={handleChange}
            value={formData['age']}
            onNext={nextStep}
          />
        );
      case 3:
        return (
          <QuestionComponent
            question={{ id: 'duration', type: 'number', label: { EN: 'How long have you been a student (in months)?', NL: 'Hoe lang ben je al student (in maanden)?' }, required: true, min: 0 }}
            onChange={handleChange}
            value={formData['duration']}
            onNext={nextStep}
          />
        );
      case 4:
        return (
          <DurationSelector onSelect={(length) => {
            setFormLength(length);
            setStep(5);
          }} />
        );
      default:
        if (formLength) {
          const currentSection = form.sections[step - 5];
          if (currentSection && 'questions' in currentSection) {
            return (
              <>
                <h2 className="text-2xl font-semibold mb-4 text-white">{t(currentSection.title)}</h2>
                {currentSection.questions.map((question) => (
                  <QuestionComponent
                    key={question.id}
                    question={question}
                    onChange={handleChange}
                    value={formData[question.id]}
                    onNext={nextStep}
                  />
                ))}
              </>
            );
          } else if (currentSection && 'content' in currentSection) {
            return <PersonalIntermezzoComponent intermezzo={currentSection} />;
          }
        }
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-yellow-400 flex flex-col justify-between p-8">
      <div className="absolute top-4 left-4">
        {step > 0 && (
          <button
            onClick={prevStep}
            className="p-2 bg-white bg-opacity-20 rounded-full text-white hover:bg-opacity-30 transition-colors duration-300"
          >
            <ChevronLeft size={24} />
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-3xl mx-auto bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-8"
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>
      
      {step > 0 && step !== 4 && (
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
            {step === form.sections.length + 4 ? t('submit') : t('next')}
            <ChevronRight className="ml-2" size={24} />
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default FeedbackSystem;