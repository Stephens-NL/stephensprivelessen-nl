'use client';

import { m } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';

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
  const { t } = useTranslation();
  return (
    <m.form
      key="age"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-4"
      onSubmit={onSubmit}
    >
      <label className="block text-yellow-300 mb-2">
        {String(t({ EN: "What's your age?", NL: "Wat is je leeftijd?" }))} *
      </label>
      <input
        type="number"
        value={age || ''}
        onChange={(e) => onAgeChange(parseInt(e.target.value) || 0)}
        className="w-full p-3 rounded-lg bg-blue-700 text-white border border-blue-600 focus:border-yellow-400 focus:outline-none"
        min={0}
        required
      />
      <m.button
        type="submit"
        disabled={!isComplete}
        className={`w-full p-3 rounded-lg transition-colors ${
          isComplete ? 'bg-yellow-400 text-blue-900 hover:bg-yellow-300' : 'bg-gray-700 text-gray-400 cursor-not-allowed'
        }`}
      >
        {String(t({ EN: "Next", NL: "Volgende" }))}
      </m.button>
    </m.form>
  );
}
