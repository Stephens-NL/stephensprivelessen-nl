'use client';
import React, { useState } from 'react';
import {  } from '../../components/Feedback5';
import { longVersion, shortVersion } from '../../data';
import { useLanguage } from '../../contexts/LanguageContext';

const FeedbackPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState<'short' | 'long'>('short');
  const { language } = useLanguage();

  const handleSubmit = (formData: Record<string, any>) => {
    console.log('Form submitted:', formData);
    // Here you would handle the form submission, e.g., sending data to an API
    alert('Thank you for your feedback!');
    setShowForm(false);
  };

  const handleClose = () => {
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-yellow-400 flex flex-col items-center justify-center p-4">
      {!showForm ? (
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-8">Feedback Form</h1>
          <button
            onClick={() => {
              setFormType('short');
              setShowForm(true);
            }}
            className="px-6 py-3 bg-white text-blue-900 rounded-full text-xl font-bold hover:bg-yellow-300 transition-colors duration-300 mb-4 w-full"
          >
            Short Form (2-3 min)
          </button>
          <button
            onClick={() => {
              setFormType('long');
              setShowForm(true);
            }}
            className="px-6 py-3 bg-white text-blue-900 rounded-full text-xl font-bold hover:bg-yellow-300 transition-colors duration-300 w-full"
          >
            Long Form (5-10 min)
          </button>
        </div>
      ) : (
        <FeedbackSystem
          form={formType === 'short' ? shortVersion : longVersion}
          onClose={handleClose}
        />
      )}
    </div>
  );
};

export default FeedbackPage;