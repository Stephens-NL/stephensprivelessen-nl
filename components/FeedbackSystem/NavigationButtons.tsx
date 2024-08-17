import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import { welcomeScreenData } from '../../data';

interface NavigationButtonsProps {
  onPrevious: () => void;
  onNext: () => void;
  isNextDisabled: boolean;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({ onPrevious, onNext, isNextDisabled }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      className="mt-8 flex justify-center space-x-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <button
        onClick={onPrevious}
        className="px-6 py-3 bg-white text-blue-900 rounded-full text-lg font-semibold hover:bg-gray-300 transition-colors duration-300 flex items-center"
      >
        <ChevronLeft className="mr-2" size={24} />
        {t(welcomeScreenData.navigation.back)}
      </button>
      <button
        onClick={onNext}
        className={`px-8 py-4 bg-white text-blue-900 rounded-full text-xl font-bold hover:bg-yellow-300 transition-colors duration-300 flex items-center ${isNextDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={isNextDisabled}
      >
        {t(welcomeScreenData.navigation.next)}
        <ChevronRight className="ml-2" size={24} />
      </button>
    </motion.div>
  );
};

export default NavigationButtons;