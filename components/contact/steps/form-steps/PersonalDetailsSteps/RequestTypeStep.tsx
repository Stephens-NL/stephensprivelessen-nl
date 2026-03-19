'use client';

import { m } from 'framer-motion';
import { useLocale } from 'next-intl';

export function RequestTypeStep({
  requestType,
  onSelect,
}: {
  requestType: string;
  onSelect: (type: 'self' | 'other') => void;
}) {
  const locale = useLocale();
  const language = locale.toUpperCase() as 'EN' | 'NL';
  const t = (obj: Record<string, string> | string) => typeof obj === 'string' ? obj : obj[language] || obj['EN'] || '';
  return (
    <m.div
      key="requestType"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-4"
    >
      <h2 className="text-lg font-semibold text-white">
        {String(t({ EN: "Who is requesting the lesson?", NL: "Wie vraagt de les aan?" }))}
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
          {String(t({ EN: "For myself", NL: "Voor mezelf" }))}
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
          {String(t({ EN: "For someone else", NL: "Voor iemand anders" }))}
        </button>
      </div>
    </m.div>
  );
}
