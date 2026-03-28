'use client';

import { m } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useLanguage } from '@/hooks/useLanguage';

export function AgeStep({
  age,
  onAgeChange,
  onSubmit,
  isComplete,
}: {
  age: number;
  onAgeChange: (age: number) => void;
  onSubmit: (e?: React.FormEvent) => void;
  isComplete: boolean;
}) {
  const language = useLanguage();
    const t = useTranslations('contact');
  return (
    <m.form
      key="age"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-4"
      onSubmit={onSubmit}
    >
      <label className="block text-[var(--amber)] mb-2">
        {t('form.whatsYourAge')} *
      </label>
      <input
        type="number"
        value={age || ''}
        onChange={(e) => onAgeChange(parseInt(e.target.value) || 0)}
        className="w-full p-3 rounded-lg bg-[var(--ink-light)] text-white border border-[var(--ink-light)] focus:border-[var(--amber)] focus:outline-none"
        min={0}
        required
      />
      <m.button
        type="submit"
        disabled={!isComplete}
        className={`w-full p-3 rounded-lg transition-colors ${
          isComplete ? 'bg-[var(--amber)] text-[var(--ink)] hover:bg-[var(--amber)]' : 'bg-[var(--muted-text)] text-[var(--muted-text)] cursor-not-allowed'
        }`}
      >
        {t('form.next')}
      </m.button>
    </m.form>
  );
}
