'use client';

import { m } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
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
          error ? 'border-red-500' : 'border-[var(--ink-light)]'
        } focus:border-[var(--amber)] focus:outline-none`}
        required
      />
      {error && (
        <m.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 text-red-500 text-sm">
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
  const locale = useLocale();
    const language = locale === 'nl' ? 'NL' : 'EN';
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
          error ? 'border-red-500' : 'border-[var(--ink-light)]'
        } focus:border-[var(--amber)] focus:outline-none`}
        required
      />
      {error && (
        <m.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 text-red-500 text-sm">
          {error}
        </m.p>
      )}
    </div>
  );
}
