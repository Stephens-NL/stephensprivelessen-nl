'use client';

import { m } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
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
      <label className="block text-yellow-300 mb-2">{label} *</label>
      <input
        type="email"
        value={value}
        onChange={onChange}
        className={`w-full p-3 rounded-lg bg-blue-700 text-white border ${
          error ? 'border-red-500' : 'border-blue-600'
        } focus:border-yellow-400 focus:outline-none`}
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
  const { t } = useTranslation();
  return (
    <div>
      <label className="block text-yellow-300 mb-2">
        {String(t({ EN: "Phone Number", NL: "Telefoonnummer" }))} *
      </label>
      <input
        type="tel"
        value={value}
        onChange={onChange}
        placeholder={config.contact.display.phone}
        className={`w-full p-3 rounded-lg bg-blue-700 text-white border ${
          error ? 'border-red-500' : 'border-blue-600'
        } focus:border-yellow-400 focus:outline-none`}
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
