import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import { Send, Edit2 } from 'lucide-react';
import { welcomeScreenData } from '../data';

const FeedbackSummary = ({ formData, onSubmit, onEdit }) => {
  const { t } = useTranslation();

  const renderSummaryItem = (label, value) => (
    <div className="mb-2 last:mb-0">
      <span className="font-semibold">{label}:</span> {value}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="w-full max-w-2xl mx-auto bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-6 overflow-hidden"
    >
      <h2 className="text-2xl font-bold text-white mb-4">{t('Feedback Summary')}</h2>
      
      <div className="space-y-4 mb-6 max-h-[50vh] overflow-y-auto scrollbar-thin scrollbar-thumb-yellow-400 scrollbar-track-blue-900">
        <div className="bg-white bg-opacity-10 rounded p-3">
          <h3 className="font-semibold text-lg text-white mb-2">{t('General Information')}</h3>
          {renderSummaryItem(t('Name'), formData.learnerName)}
          {renderSummaryItem(t('Subjects'), formData.subject?.join(', '))}
        </div>

        {formData.overallRating && (
          <div className="bg-white bg-opacity-10 rounded p-3">
            <h3 className="font-semibold text-lg text-white mb-2">{t('Ratings')}</h3>
            {renderSummaryItem(t('Overall Rating'), formData.overallRating)}
            {/* Add other ratings here if available */}
          </div>
        )}

        {(formData.mostValuable || formData.quickImprovement) && (
          <div className="bg-white bg-opacity-10 rounded p-3">
            <h3 className="font-semibold text-lg text-white mb-2">{t('Open Feedback')}</h3>
            {formData.mostValuable && renderSummaryItem(t('Most Valuable Aspect'), formData.mostValuable)}
            {formData.quickImprovement && renderSummaryItem(t('Suggestion for Improvement'), formData.quickImprovement)}
          </div>
        )}

        {formData.quoteConsent === 'yes' && (
          <div className="bg-white bg-opacity-10 rounded p-3">
            <h3 className="font-semibold text-lg text-white mb-2">{t('Quote')}</h3>
            {renderSummaryItem(t('Quote Text'), formData.quoteText)}
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <motion.button
          onClick={onEdit}
          className="px-6 py-3 bg-blue-500 text-white rounded-full text-lg font-bold hover:bg-blue-400 transition-colors duration-300 flex items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {t('Edit Feedback')}
          <Edit2 className="ml-2" size={20} />
        </motion.button>
        <motion.button
          onClick={onSubmit}
          className="px-6 py-3 bg-yellow-400 text-blue-900 rounded-full text-lg font-bold hover:bg-yellow-300 transition-colors duration-300 flex items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {t(welcomeScreenData.submitCTA.buttonText)}
          <Send className="ml-2" size={20} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default FeedbackSummary;