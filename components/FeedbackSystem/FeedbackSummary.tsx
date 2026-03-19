import React from 'react';
import { m } from 'framer-motion';
import { useLocale } from 'next-intl';
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
  const language = locale.toUpperCase() as 'EN' | 'NL';
  const t = (obj: Record<string, string> | string) => typeof obj === 'string' ? obj : obj[language] || obj['EN'] || '';

  return (
    <m.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="w-full max-w-2xl mx-auto bg-[var(--ink)] bg-opacity-70 backdrop-blur-lg rounded-lg p-8 shadow-lg"
    >
      <h2 className="text-3xl font-bold text-[var(--amber)] mb-6">{String(t({ EN: 'Feedback Summary', NL: 'Feedback Samenvatting' }))}</h2>

      <div className="space-y-6 mb-8 max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-[var(--amber)] scrollbar-track-[var(--ink)] pr-4">
        <div>
          <h3 className="font-semibold text-xl text-white mb-4">{String(t({ EN: 'General Information', NL: 'Algemene Informatie' }))}</h3>
          <SummaryItem label={String(t({ EN: 'Name', NL: 'Naam' }))} value={formData.learnerName} />
          <SummaryItem label={String(t({ EN: 'Subjects', NL: 'Onderwerpen' }))} value={formData.subject?.join(', ') ?? ''} />
        </div>

        {formData.overallRating && (
          <div>
            <h3 className="font-semibold text-xl text-white mb-4">{String(t({ EN: 'Ratings', NL: 'Beoordelingen' }))}</h3>
            <SummaryItem label={String(t({ EN: 'Overall Rating', NL: 'Algemene Beoordeling' }))} value={formData.overallRating ?? ''} />
          </div>
        )}

        {(formData.mostValuable || formData.quickImprovement) && (
          <div>
            <h3 className="font-semibold text-xl text-white mb-4">{String(t({ EN: 'Open Feedback', NL: 'Open Feedback' }))}</h3>
            {formData.mostValuable && <SummaryItem label={String(t({ EN: 'Most Valuable Aspect', NL: 'Meest Waardevolle Aspect' }))} value={formData.mostValuable} />}
            {formData.quickImprovement && <SummaryItem label={String(t({ EN: 'Suggestion for Improvement', NL: 'Verbeteringsvoorstel' }))} value={formData.quickImprovement} />}
          </div>
        )}

        {formData.quoteConsent === 'yes' && (
          <div>
            <h3 className="font-semibold text-xl text-white mb-4">{String(t({ EN: 'Quote', NL: 'Citaat' }))}</h3>
            <SummaryItem label={String(t({ EN: 'Quote Text', NL: 'Citaattekst' }))} value={formData.quoteText ?? ''} />
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
          {String(t({ EN: 'Edit Feedback', NL: 'Feedback Bewerken' }))}
          <Edit2 className="ml-2" size={20} />
        </m.button>
        <m.button
          onClick={onSubmit}
          className="px-6 py-3 bg-[var(--amber)] text-[var(--ink)] rounded-full text-lg font-bold hover:bg-[var(--amber)] transition-colors duration-300 flex items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {String(t({ EN: feedbackFormData.submitCTA.buttonText, NL: feedbackFormData.submitCTA.buttonText }))}
          <Send className="ml-2" size={20} />
        </m.button>
      </div>
    </m.div>
  );
};

export default FeedbackSummary;