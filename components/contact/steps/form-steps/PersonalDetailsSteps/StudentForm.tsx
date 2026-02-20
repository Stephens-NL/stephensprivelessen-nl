'use client';

import { m } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
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
  const { t } = useTranslation();
  const fadeInUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 } };

  return (
    <m.div key="studentInfo" {...fadeInUp} className="space-y-4">
      <h3 className="text-lg font-semibold text-yellow-300">
        {String(t({ EN: "Student Information", NL: "Gegevens Leerling" }))}
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-yellow-300 mb-2">
            {String(t({ EN: "Name", NL: "Naam" }))} *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => onUpdate({ name: e.target.value })}
            className="w-full p-3 rounded-lg bg-blue-700 text-white border border-blue-600 focus:border-yellow-400 focus:outline-none"
            required
          />
        </div>
        {isFieldComplete(formData.name) && (
          <m.div {...fadeInUp}>
            <EmailInput
              value={formData.email || ''}
              onChange={onEmailChange}
              error={emailError}
              label={String(t({ EN: "Email", NL: "E-mail" }))}
            />
          </m.div>
        )}
        {isFieldComplete(formData.email) && (
          <m.div {...fadeInUp}>
            <label className="block text-yellow-300 mb-2">
              {String(t({ EN: "Level", NL: "Niveau" }))} *
            </label>
            <select
              value={formData.level}
              onChange={(e) => onUpdate({ level: e.target.value })}
              className="w-full p-3 rounded-lg bg-blue-700 text-white border border-blue-600 focus:border-yellow-400 focus:outline-none"
              required
            >
              <option value="">{String(t({ EN: "Select level", NL: "Kies niveau" }))}</option>
              <option value="university">{String(t({ EN: "University", NL: "Universiteit" }))}</option>
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
