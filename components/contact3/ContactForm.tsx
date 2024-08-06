// ContactForm.tsx
import React, { useState } from 'react';
import WelcomeScreen from './WelcomScreen';
import Question from './Question';
import questionsData from '../../data/questionsData';

const ContactForm = () => {
  const [currentStep, setCurrentStep] = useState(0); // 0 is WelcomeScreen, 1 is eerste vraag, etc.
  const [answers, setAnswers] = useState({});
  const [currentRoute, setCurrentRoute] = useState(null); // 'student', 'guardian', 'company'

  const language = 'nl'; // Kan dynamisch worden ingesteld
  const questions = questionsData[language].filter(q => q.order[currentRoute] !== -1);

  const handleNext = () => {
    if (currentStep === 0) {
      setCurrentStep(1);
    } else if (currentStep < questions.length) {
      setCurrentStep(currentStep + 1);
    } else {
      alert('Formulier voltooid!');
      // Hier kan je het formulier indienen of verdere actie ondernemen
    }
  };

  const handleSetAnswer = (answer) => {
    setAnswers({ ...answers, [currentStep]: answer });
  };

  const currentQuestion = questions[currentStep - 1]; // -1 omdat de eerste stap het welkomstscherm is

  return (
    <div>
      {currentStep === 0 ? (
        <WelcomeScreen onNext={handleNext} />
      ) : (
        <div>
          <Question
            question={currentQuestion}
            answer={answers[currentStep] || ''}
            setAnswer={handleSetAnswer}
          />
          <button onClick={handleNext}>
            {currentStep < questions.length ? 'Next' : 'Submit'}
          </button>
        </div>
      )}
    </div>
  );
};

export default ContactForm;