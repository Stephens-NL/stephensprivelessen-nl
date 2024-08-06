// App.tsx
import React, { useState } from 'react';
import QuestionNavigator from './QuestionNavigator';

const CompleteForm = () => {
  const [language, setLanguage] = useState('nl'); // Standaardtaal

  return (
    <div>
      <h1>Contactformulier</h1>
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="en">Engels</option>
        <option value="nl">Nederlands</option>
        {/* Andere talen kunnen hier worden toegevoegd */}
      </select>
      <QuestionNavigator language={language} />
    </div>
  );
};

export default CompleteForm;