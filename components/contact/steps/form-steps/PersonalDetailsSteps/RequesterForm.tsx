'use client';

import { m } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
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
  const { t } = useTranslation();
  const fadeInUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 } };

  return (
    <m.div key="requesterInfo" {...fadeInUp} className="space-y-4">
      <h3 className="text-lg font-semibold text-yellow-300">
        {String(t({ EN: "Your Information", NL: "Jouw Gegevens" }))}
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-yellow-300 mb-2">
            {String(t({ EN: "Your Name", NL: "Jouw Naam" }))} *
          </label>
          <input
            type="text"
            value={formData.requesterName || ''}
            onChange={(e) => onUpdate({ requesterName: e.target.value })}
            className="w-full p-3 rounded-lg bg-blue-700 text-white border border-blue-600 focus:border-yellow-400 focus:outline-none"
            required
          />
        </div>
        {isFieldComplete(formData.requesterName) && (
          <m.div {...fadeInUp}>
            <EmailInput
              value={formData.requesterEmail || ''}
              onChange={onEmailChange}
              error={emailError}
              label={String(t({ EN: "Your Email", NL: "Jouw E-mail" }))}
            />
          </m.div>
        )}
        {isFieldComplete(formData.requesterEmail) && (
          <m.div {...fadeInUp}>
            <label className="block text-yellow-300 mb-2">
              {String(t({ EN: "Relationship", NL: "Relatie" }))} *
            </label>
            <select
              value={formData.relationship || ''}
              onChange={(e) => onUpdate({ relationship: e.target.value })}
              className="w-full p-3 rounded-lg bg-blue-700 text-white border border-blue-600 focus:border-yellow-400 focus:outline-none"
              required
            >
              <option value="">{String(t({ EN: "Select relationship", NL: "Kies relatie" }))}</option>
              <option value="parent">{String(t({ EN: "Parent", NL: "Ouder" }))}</option>
              <option value="guardian">{String(t({ EN: "Guardian", NL: "Verzorger" }))}</option>
              <option value="family">{String(t({ EN: "Family member", NL: "Familielid" }))}</option>
              <option value="other">{String(t({ EN: "Other", NL: "Anders" }))}</option>
            </select>
          </m.div>
        )}
      </div>
    </m.div>
  );
}
