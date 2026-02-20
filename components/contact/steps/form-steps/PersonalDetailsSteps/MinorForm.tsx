'use client';

import { m } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
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
  const { t } = useTranslation();
  const fadeInUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 } };

  return (
    <m.div key="minorMessage" {...fadeInUp} className="space-y-4">
      <div className="p-4 bg-yellow-400/10 rounded-lg text-yellow-300">
        {String(t({
          EN: "Since you are under 18, this form needs to be filled out by a parent or guardian.",
          NL: "Omdat je jonger bent dan 18, moet dit formulier door een ouder of voogd worden ingevuld."
        }))}
      </div>
      <h3 className="text-lg font-semibold text-yellow-300">
        {String(t({ EN: "Parent/Guardian Information", NL: "Ouder/Voogd Gegevens" }))}
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-yellow-300 mb-2">
            {String(t({ EN: "Parent/Guardian Name", NL: "Naam Ouder/Voogd" }))} *
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
              value={formData.parentEmail || ''}
              onChange={onEmailChange}
              error={parentEmailError}
              label={String(t({ EN: "Parent/Guardian Email", NL: "E-mail Ouder/Voogd" }))}
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
            <label className="block text-yellow-300 mb-2">
              {String(t({ EN: "Relationship to Student", NL: "Relatie tot Leerling" }))} *
            </label>
            <select
              value={formData.relationship || ''}
              onChange={(e) => onUpdate({ relationship: e.target.value })}
              className="w-full p-3 rounded-lg bg-blue-700 text-white border border-blue-600 focus:border-yellow-400 focus:outline-none"
              required
            >
              <option value="">{String(t({ EN: "Select relationship", NL: "Kies relatie" }))}</option>
              <option value="parent">{String(t({ EN: "Parent", NL: "Ouder" }))}</option>
              <option value="guardian">{String(t({ EN: "Guardian", NL: "Voogd" }))}</option>
            </select>
          </m.div>
        )}
      </div>
    </m.div>
  );
}
