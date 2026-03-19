'use client';

import { m } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { EmailInput } from './ContactInputs';

export function RequesterForm({
  formData,
  onUpdate,
  emailError,
  onEmailChange,
  isFieldComplete,
}: {
  formData: { requesterName?: string; requesterEmail?: string; relationship?: string };
  onUpdate: (updates: Partial<{ requesterName?: string; requesterEmail?: string; relationship?: string }>) => void;
  emailError: string | null;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isFieldComplete: (v: unknown) => boolean;
}) {
  const locale = useLocale();
    const language = locale === 'nl' ? 'NL' : 'EN';
    const t = useTranslations('contact');
  const fadeInUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 } };

  return (
    <m.div key="requesterInfo" {...fadeInUp} className="space-y-4">
      <h3 className="text-lg font-semibold text-[var(--amber)]">
        {t('form.yourInformation')}
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-[var(--amber)] mb-2">
            {t('form.yourName')} *
          </label>
          <input
            type="text"
            value={formData.requesterName || ''}
            onChange={(e) => onUpdate({ requesterName: e.target.value })}
            className="w-full p-3 rounded-lg bg-[var(--ink-light)] text-white border border-[var(--ink-light)] focus:border-[var(--amber)] focus:outline-none"
            required
          />
        </div>
        {isFieldComplete(formData.requesterName) && (
          <m.div {...fadeInUp}>
            <EmailInput
              value={formData.requesterEmail || ''}
              onChange={onEmailChange}
              error={emailError}
              label={t('form.yourEmail')}
            />
          </m.div>
        )}
        {isFieldComplete(formData.requesterEmail) && (
          <m.div {...fadeInUp}>
            <label className="block text-[var(--amber)] mb-2">
              {t('form.relationship')} *
            </label>
            <select
              value={formData.relationship || ''}
              onChange={(e) => onUpdate({ relationship: e.target.value })}
              className="w-full p-3 rounded-lg bg-[var(--ink-light)] text-white border border-[var(--ink-light)] focus:border-[var(--amber)] focus:outline-none"
              required
            >
              <option value="">{t('form.selectRelationship')}</option>
              <option value="parent">{t('form.parent')}</option>
              <option value="guardian">{t('form.guardian')}</option>
              <option value="family">{t('form.familyMember')}</option>
              <option value="other">{t('form.other')}</option>
            </select>
          </m.div>
        )}
      </div>
    </m.div>
  );
}
