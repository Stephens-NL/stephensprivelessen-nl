'use client';

import { m } from 'framer-motion';
import { useLocale } from 'next-intl';

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
  const locale = useLocale();
  const language = locale.toUpperCase() as 'EN' | 'NL';
  const t = (obj: Record<string, string> | string) => typeof obj === 'string' ? obj : obj[language] || obj['EN'] || '';
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
        {String(t({ EN: "What's your age?", NL: "Wat is je leeftijd?" }))} *
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
        {String(t({ EN: "Next", NL: "Volgende" }))}
      </m.button>
    </m.form>
  );
}
