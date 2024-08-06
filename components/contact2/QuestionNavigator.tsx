// components/QuestionNavigator.tsx
import React, { useState } from 'react';
import Question from './Question';
import questionsData from '../../data/questionsData';

const QuestionNavigator = ({ language }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questionsData[language].length).fill(''));

  const setAnswer = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answer;
    setAnswers(newAnswers);
  };

  const currentQuestion = questionsData[language][currentQuestionIndex];

  return (
    <div>
      <Question
        question={currentQuestion.question}
        answer={answers[currentQuestionIndex]}
        setAnswer={setAnswer}
      />
      <div>
        {currentQuestionIndex > 0 && (
          <button onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}>
            Vorige
          </button>
        )}
        {currentQuestionIndex < questionsData[language].length - 1 && (
          <button onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}>
            Volgende
          </button>
        )}
        {currentQuestionIndex === questionsData[language].length - 1 && (
          <button onClick={() => alert("Formulier voltooid!")}>
            Voltooien
          </button>
        )}
      </div>
    </div>
  );
};

export default QuestionNavigator;