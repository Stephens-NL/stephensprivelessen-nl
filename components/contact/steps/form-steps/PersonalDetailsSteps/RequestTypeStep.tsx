'use client';

import { m } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';

export function RequestTypeStep({
  requestType,
  onSelect,
}: {
  requestType: string;
  onSelect: (type: 'self' | 'other') => void;
}) {
  const locale = useLocale();
    const language = locale === 'nl' ? 'NL' : 'EN';
    const t = useTranslations('contact');
  return (
    <m.div
      key="requestType"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-4"
    >
      <h2 className="text-lg font-semibold text-white">
        {t('form.whoIsRequestingTheLesson')}
      </h2>
      <div className="flex flex-col gap-4">
        <button
          type="button"
          onClick={() => onSelect('self')}
          className={`p-4 rounded-lg border-2 transition-colors ${
            requestType === 'self'
              ? 'bg-[var(--amber)] text-[var(--ink)] border-[var(--amber)]'
              : 'bg-[var(--ink-light)] text-white border-[var(--ink-light)] hover:border-[var(--amber)]'
          }`}
        >
          {t('form.forMyself')}
        </button>
        <button
          type="button"
          onClick={() => onSelect('other')}
          className={`p-4 rounded-lg border-2 transition-colors ${
            requestType === 'other'
              ? 'bg-[var(--amber)] text-[var(--ink)] border-[var(--amber)]'
              : 'bg-[var(--ink-light)] text-white border-[var(--ink-light)] hover:border-[var(--amber)]'
          }`}
        >
          {t('form.forSomeoneElse')}
        </button>
      </div>
    </m.div>
  );
}
