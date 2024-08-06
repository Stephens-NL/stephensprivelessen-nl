// components/Question.tsx
import React from 'react';

const Question = ({ question, answer, setAnswer }) => {
  return (
    <div>
      <label>{question}</label>
      <input 
        type="text" 
        value={answer} 
        onChange={(e) => setAnswer(e.target.value)} 
      />
    </div>
  );
};

export default Question;