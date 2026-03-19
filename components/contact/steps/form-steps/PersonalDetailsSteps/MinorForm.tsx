'use client';

import { m } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { EmailInput, PhoneInput } from './ContactInputs';

export function MinorForm({
  formData,
  onUpdate,
  parentEmailError,
  phoneError,
  onEmailChange,
  onPhoneChange,
  isFieldComplete,
}: {
  formData: { requesterName?: string; parentEmail?: string; parentPhone?: string; relationship?: string };
  onUpdate: (updates: Partial<{ requesterName?: string; parentEmail?: string; parentPhone?: string; relationship?: string }>) => void;
  parentEmailError: string | null;
  phoneError: string | null;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isFieldComplete: (v: unknown) => boolean;
}) {
  const locale = useLocale();
    const language = locale === 'nl' ? 'NL' : 'EN';
    const t = useTranslations('contact');
  const fadeInUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 } };

  return (
    <m.div key="minorMessage" {...fadeInUp} className="space-y-4">
      <div className="p-4 bg-[var(--amber)]/10 rounded-lg text-[var(--amber)]">
        {t('form.sinceYouAreUnder18ThisFormNeedsToBeFilledOutByAPar')}
      </div>
      <h3 className="text-lg font-semibold text-[var(--amber)]">
        {t('form.parentguardianInformation')}
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-[var(--amber)] mb-2">
            {t('form.parentguardianName')} *
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
              value={formData.parentEmail || ''}
              onChange={onEmailChange}
              error={parentEmailError}
              label={t('form.parentguardianEmail')}
            />
          </m.div>
        )}
        {isFieldComplete(formData.parentEmail) && !parentEmailError && (
          <m.div {...fadeInUp}>
            <PhoneInput value={formData.parentPhone || ''} onChange={onPhoneChange} error={phoneError} />
          </m.div>
        )}
        {isFieldComplete(formData.relationship) && (
          <m.div {...fadeInUp}>
            <label className="block text-[var(--amber)] mb-2">
              {t('form.relationshipToStudent')} *
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
            </select>
          </m.div>
        )}
      </div>
    </m.div>
  );
}
