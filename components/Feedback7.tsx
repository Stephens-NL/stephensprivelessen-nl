'use client';

import React, { use, useEffect, useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { ChevronRight, ChevronLeft, X, Clock, ClipboardList, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FeedbackForm,
  QuestionGroup,
  PersonalIntermezzo,
  Question,
  Language,
  Bilingual,
  QuestionResponse
} from '../data'; // Assuming types are in a separate file
import { useLanguage } from '@/contexts/LanguageContext';

interface DynamicFeedbackFormProps {
  form: FeedbackForm;
  onSubmit: (formData: Record<string, QuestionResponse>) => void;
  language: Language;
}

const GraduationCapRating: React.FC<{
  value: number;
  onChange: (value: number) => void;
  max: number;
}> = ({ value, onChange, max }) => {
  return (
    <div className="flex space-x-2">
      {[...Array(max)].map((_, index) => (
        <button
          key={index}
          onClick={() => onChange(index + 1)}
          className={`transition-colors duration-200 ${index < value ? 'text-yellow-400' : 'text-gray-400'
            }`}
        >
          <GraduationCap size={32} />
        </button>
      ))}
    </div>
  );
};

const formDescriptions = {
  NL: {
    short: {
      title: "Korte versie",
      description: "2-3 minuten, snelle feedback",
      icon: Clock
    },
    long: {
      title: "Lange versie",
      description: "5-10 minuten, gedetailleerde feedback",
      icon: ClipboardList
    }
  },
  EN: {
    short: {
      title: "Short version",
      description: "2-3 minutes, quick feedback",
      icon: Clock
    },
    long: {
      title: "Long version",
      description: "5-10 minutes, detailed feedback",
      icon: ClipboardList
    }
  }
};

const formDescriptions2 = {
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


const callToActions = {
  NL: [
    "Begin je feedback avontuur!",
    "Deel je gedachten met ons!",
    "Jouw mening telt - start nu!",
    "Help ons verbeteren - geef feedback!",
    "Klaar om je stem te laten horen?"
  ],
  EN: [
    "Start your feedback journey!",
    "Share your thoughts with us!",
    "Your opinion matters - begin now!",
    "Help us improve - give feedback!",
    "Ready to make your voice heard?"
  ]
};

const getRandomCallToAction = (language: Language) => {
  const actions = callToActions[language];
  return actions[Math.floor(Math.random() * actions.length)];
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
              className={`w-10 h-10 rounded-full focus:outline-none transition-colors duration-200 ${index < (value as number || 0) ? 'bg-yellow-400 text-blue-900' : 'bg-white bg-opacity-20 text-white'
                }`}
            >
              {index + 1}
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
              className={`w-full px-4 py-2 rounded-md focus:outline-none transition-colors duration-200 ${value === option.value ? 'bg-yellow-400 text-blue-900' : 'bg-white bg-opacity-20 text-white'
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

export const DynamicFeedbackForm: React.FC<{
  form: FeedbackForm;
  onSubmit: (formData: Record<string, QuestionResponse>) => void;
  initialLanguage: Language;
}> = ({ form, onSubmit, initialLanguage }) => {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const [step, setStep] = useState<'language' | 'formType' | 'questions'>('language');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<Record<string, QuestionResponse>>({});
  const [extraComments, setExtraComments] = useState<Record<string, string>>({});
  const { t } = useTranslation();

  useEffect(() => {
    if (step === 'questions' && form.sections.length > 0 && 'questions' in form.sections[0] && form.sections[0].questions.length > 0) {
      setCurrentQuestionIndex(0);
    }
  }, [form, step]);

  const handleLanguageSelect = (selectedLanguage: Language) => {
    setLanguage(selectedLanguage);
    setStep('formType');
  };

  const handleFormTypeSelect = (formType: 'short' | 'long') => {
    // Here you would typically select the appropriate form based on the type
    // For now, we'll just move to the questions step
    setStep('questions');
  };
  

  const renderContent = () => {
    switch (step) {
      case 'language':
        return (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-blue-900 mb-6">Select Your Language / Kies Je Taal</h2>
            <LanguageSelector onSelectLanguage={handleLanguageSelect} />
          </div>
        );
      case 'formType':
        return (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-blue-900 mb-6">{t(form.title[language])}</h2>
            <p className="mb-6 text-xl">{getRandomCallToAction(language)}</p>
            <p className="mb-6">{t(form.description[language])}</p>
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
        console.log("Rendering questions. Current index:", currentQuestionIndex);
        if (currentQuestionIndex === null) {
          console.log("currentQuestionIndex is null");
          return <div>Loading...</div>;
          setCurrentQuestionIndex(0);
        }
        const currentSection = form.sections[0] as QuestionGroup;
        console.log("Current section:", currentSection);
        const currentQuestion = currentSection.questions[currentQuestionIndex];
        console.log("Current question:", currentQuestion);
        if (!currentQuestion) {
          console.log("No current question found");
          return <div>No questions available.</div>;
        }
        return (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold mb-4">{currentQuestion.label[language]}</h3>
              <GraduationCapRating
                value={formData[currentQuestion.id] as number || 0}
                onChange={(value) => setFormData(prev => ({ ...prev, [currentQuestion.id]: value }))}
                max={5}
              />
              <textarea
                className="w-full mt-4 p-2 border rounded"
                placeholder="Extra opmerkingen (optioneel)"
                value={extraComments[currentQuestion.id] || ''}
                onChange={(e) => setExtraComments(prev => ({ ...prev, [currentQuestion.id]: e.target.value }))}
              />
              <div className="mt-8 flex justify-between">
                {currentQuestionIndex > 0 && (
                  <button
                    onClick={() => setCurrentQuestionIndex(prev => prev !== null ? prev - 1 : null)}
                    className="px-6 py-2 bg-gray-200 text-blue-900 rounded-full font-bold hover:bg-gray-300 transition-colors duration-300 flex items-center"
                  >
                    <ChevronLeft className="mr-2" size={20} />
                    {language === 'NL' ? 'Vorige' : 'Previous'}
                  </button>
                )}
                <button
                  onClick={() => {
                    if (currentQuestionIndex < currentSection.questions.length - 1) {
                      setCurrentQuestionIndex(prev => prev !== null ? prev + 1 : null);
                    } else {
                      onSubmit({ ...formData, comments: extraComments });
                    }
                  }}
                  className="px-6 py-2 bg-blue-900 text-white rounded-full font-bold hover:bg-blue-800 transition-colors duration-300 flex items-center ml-auto"
                >
                  {currentQuestionIndex === currentSection.questions.length - 1
                    ? (language === 'NL' ? 'Indienen' : 'Submit')
                    : (language === 'NL' ? 'Volgende' : 'Next')}
                  <ChevronRight className="ml-2" size={20} />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        );
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-900 to-yellow-400 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-8">
        {renderContent()}
      </div>
    </div>
  );
};