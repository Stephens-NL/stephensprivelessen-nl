'use client';

import React, { useState, useEffect } from 'react';
import { generalQuestions, studentQuestions, guardianQuestions, companyQuestions, Question, MultipleChoiceQuestion, TextQuestion } from '../../data';
import LanguageSelector from '../../components/contact/questions/LanguageSelector';
import TextInput from '../../components/contact/questions/TextInput';
import MultipleChoice from '../../components/contact/questions/MultipleChoice';
import { motion } from 'framer-motion';

const ContactPage: React.FC = () => {
  const [language, setLanguage] = useState<'en' | 'nl'>('en');
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userType, setUserType] = useState<string>('');

  useEffect(() => {
    // Check system preference for dark mode
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(darkModeMediaQuery.matches);

    // Listen for changes in system preference
    const listener = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    darkModeMediaQuery.addListener(listener);
    return () => darkModeMediaQuery.removeListener(listener);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'userType') setUserType(value);
  };

  const renderQuestion = (question: Question) => {
    switch (question.type) {
      case 'text':
      case 'email':
      case 'number':
        return (
          <TextInput
            key={question.id}
            question={question as TextQuestion}
            value={formData[question.id] || ''}
            onChange={handleInputChange}
            language={language}
            isDarkMode={isDarkMode}
          />
        );
      case 'multipleChoice':
        return (
          <MultipleChoice
            key={question.id}
            question={question as MultipleChoiceQuestion}
            value={formData[question.id] || ''}
            onChange={handleInputChange}
            language={language}
            isDarkMode={isDarkMode}
          />
        );
      default:
        console.warn(`Unsupported question type: ${(question as Question).type}`);
        return null;
    }
  };

  // Vragenreeks afhankelijk van de selectie
  let additionalQuestions: Question[] = [];
  if (userType === 'student') additionalQuestions = studentQuestions.questions;
  else if (userType === 'guardian') additionalQuestions = guardianQuestions.questions;
  else if (userType === 'company') additionalQuestions = companyQuestions.questions;

  const allQuestions = [
    { type: 'language', id: 'language', label: { en: 'Select Language', nl: 'Selecteer Taal' } },
    ...generalQuestions.questions,
    ...additionalQuestions
  ];
  const currentQuestion = allQuestions[currentQuestionIndex];

  const goToNextQuestion = () => {
    if (currentQuestionIndex < allQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-yellow-400 text-black'}`}>
      <div className="flex-grow flex flex-col justify-center items-center p-4">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5 }}
          className={`rounded-lg shadow-lg p-6 max-w-md w-full ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
        >
          {currentQuestion.type === 'language' ? (
            <LanguageSelector
              language={language}
              setLanguage={(lang) => {
                setLanguage(lang);
                setFormData((prev) => ({ ...prev, language: lang }));
              }}
              isDarkMode={isDarkMode}
            />
          ) : (
            <form className="mt-4">
              {/* {renderQuestion(currentQuestion)} */}
            </form>
          )}
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={goToPreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className={`${isDarkMode ? 'bg-blue-700 hover:bg-blue-600' : 'bg-blue-900 hover:bg-blue-800'} ${isDarkMode ? 'text-yellow-300' : 'text-yellow-400'} px-4 py-2 rounded transition duration-300`}
            >
              {language === 'en' ? 'Previous' : 'Vorige'}
            </button>
            <button
              type="button"
              onClick={goToNextQuestion}
              disabled={currentQuestionIndex === allQuestions.length - 1}
              className={`${isDarkMode ? 'bg-blue-700 hover:bg-blue-600' : 'bg-blue-900 hover:bg-blue-800'} ${isDarkMode ? 'text-yellow-300' : 'text-yellow-400'} px-4 py-2 rounded transition duration-300`}
            >
              {language === 'en' ? 'Next' : 'Volgende'}
            </button>
          </div>
        </motion.div>
      </div>
      <div className={`${isDarkMode ? 'bg-blue-800' : 'bg-blue-900'} ${isDarkMode ? 'text-yellow-300' : 'text-yellow-400'} p-4`}>
        <div className="flex justify-center space-x-4">
          <a href="tel:+31647357426" className="flex items-center hover:underline">
            <span className="mr-2">📞</span> +31 6 47357426
          </a>
          <a href="mailto:s.adei@outlook.com" className="flex items-center hover:underline">
            <span className="mr-2">✉️</span> s.adei@outlook.com
          </a>
        </div>
        <div className="text-center mt-2">
          <span className="mr-2">📍</span> Locatie: Science Park 904, 1098 XH Amsterdam
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
