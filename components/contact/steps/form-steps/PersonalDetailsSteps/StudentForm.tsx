'use client';

import { m } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useLanguage } from '@/hooks/useLanguage';
import { EmailInput } from './ContactInputs';

export function StudentForm({
  formData,
  onUpdate,
  emailError,
  onEmailChange,
  isFieldComplete,
}: {
  formData: { name: string; email?: string; level?: string };
  onUpdate: (updates: Partial<{ name?: string; email?: string; level?: string }>) => void;
  emailError: string | null;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isFieldComplete: (v: unknown) => boolean;
}) {
  const language = useLanguage();
    const t = useTranslations('contact');
  const fadeInUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 } };

  return (
    <m.div key="studentInfo" {...fadeInUp} className="space-y-4">
      <h3 className="text-lg font-semibold text-[var(--amber)]">
        {t('form.studentInformation')}
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-[var(--amber)] mb-2">
            {t('form.name')} *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => onUpdate({ name: e.target.value })}
            className="w-full p-3 rounded-lg bg-[var(--ink-light)] text-white border border-[var(--ink-light)] focus:border-[var(--amber)] focus:outline-none"
            required
          />
        </div>
        {isFieldComplete(formData.name) && (
          <m.div {...fadeInUp}>
            <EmailInput
              value={formData.email || ''}
              onChange={onEmailChange}
              error={emailError}
              label={t('form.email')}
            />
          </m.div>
        )}
        {isFieldComplete(formData.email) && (
          <m.div {...fadeInUp}>
            <label className="block text-[var(--amber)] mb-2">
              {t('form.level')} *
            </label>
            <select
              value={formData.level}
              onChange={(e) => onUpdate({ level: e.target.value })}
              className="w-full p-3 rounded-lg bg-[var(--ink-light)] text-white border border-[var(--ink-light)] focus:border-[var(--amber)] focus:outline-none"
              required
            >
              <option value="">{t('form.selectLevel')}</option>
              <option value="university">{t('form.university')}</option>
              <option value="hbo">HBO</option>
              <option value="vwo">VWO</option>
              <option value="havo">HAVO</option>
              <option value="vmbo">VMBO</option>
            </select>
          </m.div>
        )}
      </div>
    </m.div>
  );
}
