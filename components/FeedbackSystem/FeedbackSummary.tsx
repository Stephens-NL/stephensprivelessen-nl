import React from 'react';
import { m } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { Send, Edit2 } from 'lucide-react';
import { feedbackFormData, FeedbackSummaryProps, RenderSummaryItemProps } from '../../data';

function SummaryItem({ label, value }: RenderSummaryItemProps) {
  return (
    <div className="mb-4 bg-[var(--cream)] bg-opacity-10 rounded-lg p-4">
      <span className="font-semibold text-[var(--amber)]">{label}:</span>
      <p className="mt-1 text-white">{value}</p>
    </div>
  );
}

const FeedbackSummary = ({ formData, onSubmit, onEdit }: FeedbackSummaryProps) => {
  const locale = useLocale();
    const language = locale === 'nl' ? 'NL' : 'EN';
    const t = useTranslations('feedback');

  return (
    <m.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="w-full max-w-2xl mx-auto bg-[var(--ink)] bg-opacity-70 backdrop-blur-lg rounded-lg p-8 shadow-lg"
    >
      <h2 className="text-3xl font-bold text-[var(--amber)] mb-6">{t('form.feedbackSummary')}</h2>

      <div className="space-y-6 mb-8 max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-[var(--amber)] scrollbar-track-[var(--ink)] pr-4">
        <div>
          <h3 className="font-semibold text-xl text-white mb-4">{t('form.generalInformation')}</h3>
          <SummaryItem label={t('form.name')} value={formData.learnerName} />
          <SummaryItem label={t('form.subjects')} value={formData.subject?.join(', ') ?? ''} />
        </div>

        {formData.overallRating && (
          <div>
            <h3 className="font-semibold text-xl text-white mb-4">{t('form.ratings')}</h3>
            <SummaryItem label={t('form.overallRating')} value={formData.overallRating ?? ''} />
          </div>
        )}

        {(formData.mostValuable || formData.quickImprovement) && (
          <div>
            <h3 className="font-semibold text-xl text-white mb-4">{t('form.openFeedback')}</h3>
            {formData.mostValuable && <SummaryItem label={t('form.mostValuableAspect')} value={formData.mostValuable} />}
            {formData.quickImprovement && <SummaryItem label={t('form.suggestionForImprovement')} value={formData.quickImprovement} />}
          </div>
        )}

        {formData.quoteConsent === 'yes' && (
          <div>
            <h3 className="font-semibold text-xl text-white mb-4">{t('form.quote')}</h3>
            <SummaryItem label={t('form.quoteText')} value={formData.quoteText ?? ''} />
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
        <m.button
          onClick={onEdit}
          className="px-6 py-3 bg-[var(--ink-light)] text-white rounded-full text-lg font-bold hover:bg-[var(--ink)] transition-colors duration-300 flex items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {t('form.editFeedback')}
          <Edit2 className="ml-2" size={20} />
        </m.button>
        <m.button
          onClick={onSubmit}
          className="px-6 py-3 bg-[var(--amber)] text-[var(--ink)] rounded-full text-lg font-bold hover:bg-[var(--amber)] transition-colors duration-300 flex items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {feedbackFormData.submitCTA.buttonText[language]}
          <Send className="ml-2" size={20} />
        </m.button>
      </div>
    </m.div>
  );
};

export default FeedbackSummary;