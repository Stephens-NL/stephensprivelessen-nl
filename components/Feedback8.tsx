// 'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, GraduationCap, Clock, ClipboardList } from 'lucide-react';
import {
  FeedbackForm,
  QuestionGroup,
  PersonalIntermezzo,
  Question,
  Language,
  QuestionResponse
} from '../data';
import { useTranslation } from '../hooks/useTranslation';
import { useLanguage } from '@/contexts/LanguageContext';

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

const LanguageSelector: React.FC<{ onSelectLanguage: (lang: Language) => void }> = ({ onSelectLanguage }) => (
  <div className="flex justify-center space-x-4">
    <button
      onClick={() => onSelectLanguage('NL')}
      className="px-6 py-3 bg-white text-blue-900 rounded-full text-xl font-bold hover:bg-yellow-300 transition-colors duration-300"
    >
      Nederlands
    </button>
    <button
      onClick={() => onSelectLanguage('EN')}
      className="px-6 py-3 bg-white text-blue-900 rounded-full text-xl font-bold hover:bg-yellow-300 transition-colors duration-300"
    >
      English
    </button>
  </div>
);

const formDescriptions = {
  NL: {
    short: {
      title: "Korte versie",
      description: "2-3 minuten, snelle feedback over de belangrijkste punten.",
      icon: Clock
    },
    long: {
      title: "Lange versie",
      description: "5-10 minuten, gedetailleerde feedback met ruimte voor uitgebreide opmerkingen.",
      icon: ClipboardList
    }
  },
  EN: {
    short: {
      title: "Short version",
      description: "2-3 minutes, quick feedback on key points.",
      icon: Clock
    },
    long: {
      title: "Long version",
      description: "5-10 minutes, detailed feedback with room for extensive comments.",
      icon: ClipboardList
    }
  }
};

const QuestionComponent: React.FC<{
  question: Question;
  value: QuestionResponse;
  onChange: (id: string, value: QuestionResponse) => void;
  language: Language;
}> = ({ question, value, onChange, language }) => {
  const { t } = useTranslation();

  switch (question.type) {
    case 'text':
    case 'email':
    case 'textarea':
      const InputComponent = question.type === 'textarea' ? 'textarea' : 'input';
      return (
        <InputComponent
          type={question.type === 'email' ? 'email' : 'text'}
          value={value as string || ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(question.id, e.target.value)}
          className="w-full px-3 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300 text-white"
          placeholder={question.placeholder ? t(question.placeholder[language]) : ''}
          required={question.required}
          rows={question.type === 'textarea' ? 4 : undefined}
        />
      );
    case 'number':
      return (
        <div className="flex items-center space-x-2">
          {[...Array(question.max || 5)].map((_, index) => (
            <button
              key={index}
              onClick={() => onChange(question.id, index + 1)}
              className={`transition-colors duration-200 ${
                index < (value as number || 0) ? 'text-yellow-400' : 'text-gray-400'
              }`}
            >
              <GraduationCap size={32} />
            </button>
          ))}
        </div>
      );
    case 'multipleChoice':
      return (
        <div className="space-y-2">
          {question.options.map((option) => (
            <button
              key={option.value}
              onClick={() => onChange(question.id, option.value)}
              className={`w-full px-4 py-2 rounded-md focus:outline-none transition-colors duration-200 ${
                value === option.value ? 'bg-yellow-400 text-blue-900' : 'bg-white bg-opacity-20 text-white'
              }`}
            >
              {t(option.label[language])}
            </button>
          ))}
        </div>
      );
  }
};

const IntermezzoComponent: React.FC<{ intermezzo: PersonalIntermezzo; language: Language }> = ({ intermezzo, language }) => {
  const { t } = useTranslation();
  return (
    <div className="bg-white bg-opacity-10 p-6 rounded-md mb-6">
      <h3 className="text-2xl font-semibold mb-4 text-white">{t(intermezzo.title[language])}</h3>
      <p className="text-white">{t(intermezzo.content[language])}</p>
    </div>
  );
};

export const DynamicFeedbackForm: React.FC<{
  form: FeedbackForm;
  onSubmit: (formData: Record<string, QuestionResponse>) => void;
  initialLanguage: Language;
}> = ({ form, onSubmit, initialLanguage }) => {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const [step, setStep] = useState<'language' | 'formType' | 'questions'>('language');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState<Record<string, QuestionResponse>>({});
  const { t } = useTranslation();
  const { setLanguage: setContextLanxguage } = useLanguage();

  const handleLanguageSelect = (selectedLanguage: Language) => {
    setLanguage(selectedLanguage);
    setContextLanguage(selectedLanguage);
    setStep('formType');
  };

  const handleFormTypeSelect = (formType: 'short' | 'long') => {
    // Here you would typically select the appropriate form based on the type
    setStep('questions');
    setCurrentStepIndex(0);
  };

  const handleChange = (id: string, value: QuestionResponse) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleNext = () => {
    if (currentStepIndex < form.sections.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      onSubmit(formData);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    } else if (step === 'questions') {
      setStep('formType');
    } else if (step === 'formType') {
      setStep('language');
    }
  };

  const renderContent = () => {
    switch (step) {
      case 'language':
        return (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              <TypewriterText text="Select Your Language / Kies Je Taal" />
            </h2>
            <LanguageSelector onSelectLanguage={handleLanguageSelect} />
          </div>
        );
      case 'formType':
        return (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              <TypewriterText text={t(form.title[language])} />
            </h2>
            <p className="mb-6 text-xl text-white">{t(form.description[language])}</p>
            <div className="flex flex-col md:flex-row justify-around items-center space-y-4 md:space-y-0 md:space-x-4">
              {['short', 'long'].map((type) => {
                const desc = formDescriptions[language][type as keyof typeof formDescriptions[typeof language]];
                const Icon = desc.icon;
                return (
                  <button
                    key={type}
                    onClick={() => handleFormTypeSelect(type as 'short' | 'long')}
                    className="w-full md:w-64 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-left"
                  >
                    <div className="flex items-center mb-2">
                      <Icon className="mr-2 text-blue-900" size={24} />
                      <h3 className="text-xl font-bold text-blue-900">{desc.title}</h3>
                    </div>
                    <p className="text-gray-600">{desc.description}</p>
                  </button>
                );
              })}
            </div>
          </div>
        );
      case 'questions':
        const currentSection = form.sections[currentStepIndex];
        if ('questions' in currentSection) {
          const currentQuestion = currentSection.questions[0]; // We're now showing one question at a time
          return (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStepIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-semibold mb-4 text-white">
                  <TypewriterText text={t(currentQuestion.label[language])} />
                </h3>
                <QuestionComponent
                  question={currentQuestion}
                  value={formData[currentQuestion.id]}
                  onChange={handleChange}
                  language={language}
                />
              </motion.div>
            </AnimatePresence>
          );
        } else if ('content' in currentSection) {
          return <IntermezzoComponent intermezzo={currentSection} language={language} />;
        }
        return null;
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-900 to-yellow-400 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-xl max-w-2xl w-full p-8">
        {renderContent()}
        <div className="mt-8 flex justify-between">
          {(step !== 'language' || currentStepIndex > 0) && (
            <button
              onClick={handleBack}
              className="px-6 py-2 bg-white bg-opacity-20 text-white rounded-full font-bold hover:bg-opacity-30 transition-colors duration-300 flex items-center"
            >
              <ChevronLeft className="mr-2" size={20} />
              {language === 'NL' ? 'Vorige' : 'Previous'}
            </button>
          )}
          {step !== 'language' && (
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-white text-blue-900 rounded-full font-bold hover:bg-yellow-300 transition-colors duration-300 flex items-center ml-auto"
            >
              {currentStepIndex === form.sections.length - 1 
                ? (language === 'NL' ? 'Indienen' : 'Submit')
                : (language === 'NL' ? 'Volgende' : 'Next')}
              <ChevronRight className="ml-2" size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};