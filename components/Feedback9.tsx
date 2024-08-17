import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, GraduationCap } from 'lucide-react';
import { FeedbackForm, Question, Language, FormSection, QuestionGroup, PersonalIntermezzo } from '../data';
import { useTranslation } from '../hooks/useTranslation';
import { useLanguage } from '@/contexts/LanguageContext';


const Template1: React.FC<{ intermezzo: PersonalIntermezzo; language: 'EN' | 'NL' }> = ({ intermezzo, language }) => (
    <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-6 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
      <div className="w-full md:w-1/3">
        <img src="/api/placeholder/300/300" alt="Placeholder" className="w-full h-auto rounded-lg shadow-lg" />
      </div>
      <div className="w-full md:w-2/3">
        <h2 className="text-2xl font-bold text-white mb-4">{intermezzo.title[language]}</h2>
        <p className="text-white text-lg">{intermezzo.content[language]}</p>
      </div>
    </div>
  );
  
  const Template2: React.FC<{ intermezzo: PersonalIntermezzo; language: 'EN' | 'NL' }> = ({ intermezzo, language }) => (
    <div className="bg-gradient-to-br from-yellow-400 to-blue-900 rounded-lg p-6 flex flex-col items-center space-y-4">
      <h2 className="text-3xl font-bold text-white mb-2">{intermezzo.title[language]}</h2>
      <div className="w-2/3 mb-4">
        <img src="/api/placeholder/400/200" alt="Placeholder" className="w-full h-auto rounded-lg shadow-lg" />
      </div>
      <p className="text-white text-lg text-center">{intermezzo.content[language]}</p>
    </div>
  );
  
  const Template3: React.FC<{ intermezzo: PersonalIntermezzo; language: 'EN' | 'NL' }> = ({ intermezzo, language }) => (
    <div className="bg-blue-900 bg-opacity-70 backdrop-blur-lg rounded-lg p-6 flex flex-col md:flex-row-reverse items-center space-y-4 md:space-y-0 md:space-x-6 md:space-x-reverse">
      <div className="w-full md:w-1/2">
        <img src="/api/placeholder/400/400" alt="Placeholder" className="w-full h-auto rounded-full shadow-lg" />
      </div>
      <div className="w-full md:w-1/2">
        <h2 className="text-2xl font-bold text-yellow-400 mb-4">{intermezzo.title[language]}</h2>
        <p className="text-white text-lg">{intermezzo.content[language]}</p>
      </div>
    </div>
  );
  
  export const PersonalIntermezzoComponent: React.FC<{ intermezzo: PersonalIntermezzo, language: Language }> = ({ intermezzo, language }) => {
    const [template, setTemplate] = useState<number>(0);
  //   const { language } = useTranslation();
  
    useEffect(() => {
      setTemplate(Math.floor(Math.random() * 3));
    }, [intermezzo]);
  
    const templates = [
      <Template1 key="template1" intermezzo={intermezzo} language={language} />,
      <Template2 key="template2" intermezzo={intermezzo} language={language} />,
      <Template3 key="template3" intermezzo={intermezzo} language={language} />
    ];
  
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
      >
        {templates[template]}
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
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
    >
      {displayedText}
    </motion.span>
  );
};

const LanguageSelector: React.FC<{ onSelect: (lang: Language) => void }> = ({ onSelect }) => (
  <div className="flex justify-center space-x-4">
    <button
      onClick={() => onSelect('NL')}
      className="px-6 py-3 bg-white text-blue-900 rounded-full text-xl font-bold hover:bg-yellow-300 transition-colors duration-300"
    >
      Nederlands
    </button>
    <button
      onClick={() => onSelect('EN')}
      className="px-6 py-3 bg-white text-blue-900 rounded-full text-xl font-bold hover:bg-yellow-300 transition-colors duration-300"
    >
      English
    </button>
  </div>
);

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
          <div className="flex space-x-2">
            {[...Array(question.max || 5)].map((_, index) => (
              <button
                key={index}
                onClick={() => onChange(question.id, index + 1)}
                className={`focus:outline-none transition-colors duration-200 ${index < value ? 'text-yellow-400' : 'text-gray-400'}`}
              >
                <GraduationCap size={32} />
              </button>
            ))}
          </div>
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

function isQuestionGroup(section: FormSection): section is QuestionGroup {
  return 'questions' in section;
}


export const FeedbackSystem: React.FC<{ form: FeedbackForm, onClose: () => void }> = ({ form, onClose }) => {
  const [currentStep, setCurrentStep] = useState(-1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();

  const handleChange = (id: string, value: any) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    onClose();
  };

  const currentSection = form.sections[currentStep];
  const currentQuestion = isQuestionGroup(currentSection) ? currentSection.questions[currentQuestionIndex] : null;

  const nextStep = () => {
    if (isQuestionGroup(currentSection) && currentQuestionIndex < currentSection.questions.length - 1) {
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
      setCurrentQuestionIndex(isQuestionGroup(previousSection) ? previousSection.questions.length - 1 : 0);
    }
  };

  const canGoBack = currentStep > 0 || currentQuestionIndex > 0;

  const isLastStep = currentStep === form.sections.length - 1 &&
    (!isQuestionGroup(currentSection) || currentQuestionIndex === currentSection.questions.length - 1);

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
            {isQuestionGroup(currentSection) ? (
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
            ) : (
              <PersonalIntermezzoComponent intermezzo={currentSection} language={language} />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {currentStep !== -1 && (
        <motion.div
          className="mt-8 flex justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {canGoBack && (
            <button
              onClick={goBack}
              className="px-6 py-3 bg-white bg-opacity-20 text-white rounded-full font-bold hover:bg-opacity-30 transition-colors duration-300 flex items-center"
            >
              <ChevronLeft className="mr-2" size={20} />
              {t('Previous')}
            </button>
          )}
          <button
            onClick={nextStep}
            className="px-6 py-3 bg-white text-blue-900 rounded-full font-bold hover:bg-yellow-300 transition-colors duration-300 flex items-center ml-auto"
          >
            {isLastStep ? t('Submit') : t('Next')}
            <ChevronRight className="ml-2" size={20} />
          </button>
        </motion.div>
      )}
    </div>
  );
};