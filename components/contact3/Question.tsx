// Question.tsx
import React from 'react';

const Question = ({ question, answer, setAnswer }) => {
  const { question: questionText, type, options } = question;

  const renderInput = () => {
    switch (type) {
      case 'text':
      case 'email':
      case 'number':
        return (
          <input
            type={type}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        );
      case 'select':
        return (
          <select value={answer} onChange={(e) => setAnswer(e.target.value)}>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case 'multiple-choice':
        return (
          <div>
            {options.map((option, index) => (
              <label key={index}>
                <input
                  type="radio"
                  name="multiple-choice"
                  value={option}
                  checked={answer === option}
                  onChange={() => setAnswer(option)}
                />
                {option}
              </label>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <label>{questionText}</label>
      {renderInput()}
    </div>
  );
};

export default Question;