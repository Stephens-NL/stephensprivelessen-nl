'use client';

import { m } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useLanguage } from '@/hooks/useLanguage';
import { config } from '@/data/config';

export function EmailInput({
  value,
  onChange,
  error,
  label,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string | null;
  label: string;
}) {
  return (
    <div>
      <label className="block text-[var(--amber)] mb-2">{label} *</label>
      <input
        type="email"
        value={value}
        onChange={onChange}
        className={`w-full p-3 rounded-lg bg-[var(--ink-light)] text-white border ${
          error ? 'border-destructive' : 'border-[var(--ink-light)]'
        } focus:border-[var(--amber)] focus:outline-none`}
        required
      />
      {error && (
        <m.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 text-destructive text-sm">
          {error}
        </m.p>
      )}
    </div>
  );
}

export function PhoneInput({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string | null;
}) {
  const language = useLanguage();
    const t = useTranslations('contact');
  return (
    <div>
      <label className="block text-[var(--amber)] mb-2">
        {t('form.phoneNumber')} *
      </label>
      <input
        type="tel"
        value={value}
        onChange={onChange}
        placeholder={config.contact.display.phone}
        className={`w-full p-3 rounded-lg bg-[var(--ink-light)] text-white border ${
          error ? 'border-destructive' : 'border-[var(--ink-light)]'
        } focus:border-[var(--amber)] focus:outline-none`}
        required
      />
      {error && (
        <m.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 text-destructive text-sm">
          {error}
        </m.p>
      )}
    </div>
  );
}
