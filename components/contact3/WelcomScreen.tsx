// WelcomeScreen.tsx
import React from 'react';

const WelcomeScreen = ({ onNext }) => {
  return (
    <div>
      <h1>Welkom bij Stephen’s Privélessen</h1>
      <p>Dank voor je interesse in Stephen’s Privélessen! Vul alstublieft de volgende gegevens in.</p>
      <button onClick={onNext}>Start</button>
    </div>
  );
};

export default WelcomeScreen;