import React from 'react';
import { m } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { feedbackFormData } from '../../data';

interface NavigationButtonsProps {
  onPrevious: () => void;
  onNext: () => void;
  isNextDisabled: boolean;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({ onPrevious, onNext, isNextDisabled }) => {
  const language = useLanguage();

  return (
    <m.div
      className="mt-8 flex justify-center space-x-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <button
        onClick={onPrevious}
        className="px-6 py-3 bg-[var(--cream)] text-[var(--ink)] rounded-full text-lg font-semibold hover:bg-[var(--cream-dark)] transition-colors duration-300 flex items-center"
      >
        <ChevronLeft className="mr-2" size={24} />
        {feedbackFormData.navigation.back[language]}
      </button>
      <button
        onClick={onNext}
        className={`px-8 py-4 bg-[var(--cream)] text-[var(--ink)] rounded-full text-xl font-bold hover:bg-[var(--amber)] transition-colors duration-300 flex items-center ${isNextDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={isNextDisabled}
      >
        {feedbackFormData.navigation.next[language]}
        <ChevronRight className="ml-2" size={24} />
      </button>
    </m.div>
  );
};

export default NavigationButtons;