'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const AGE_GROUPS = [
  { range: '8-12', labelKey: 'primarySchool' as const },
  { range: '12-16', labelKey: 'highSchool' as const },
  { range: '16-18', labelKey: 'upperSecondary' as const },
  { range: '18+', labelKey: 'higherEducation' as const },
] as const;

const TIME_SLOTS = [
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00',
];

export interface TrialLessonFormProps {
  studentName: string;
  onStudentNameChange: (v: string) => void;
  studentAge: string;
  onStudentAgeChange: (v: string) => void;
  intent: 'trial' | 'info';
  onIntentChange: (v: 'trial' | 'info') => void;
  selectedTime: string[];
  onTimeSelect: (time: string) => void;
  wantsHomeTutoring: boolean;
  onHomeTutoringChange: (v: boolean) => void;
  levelTitle: string;
  subjectDisplay: string;
  onSend: () => void;
  title?: string;
}

export function TrialLessonForm({
  studentName,
  onStudentNameChange,
  studentAge,
  onStudentAgeChange,
  intent,
  onIntentChange,
  selectedTime,
  onTimeSelect,
  wantsHomeTutoring,
  onHomeTutoringChange,
  levelTitle,
  subjectDisplay,
  onSend,
  title,
}: TrialLessonFormProps) {
  const t = useTranslations('boa.form');
  const isFormValid =
    studentName.trim() !== '' &&
    studentAge.trim() !== '' &&
    (intent === 'info' || (intent === 'trial' && selectedTime.length === 3));

  return (
    <div className="grid gap-6 py-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="grid gap-4">
          <Label htmlFor="name" className="text-[var(--cream)] flex items-center gap-2">
            <span className="text-[var(--amber)]">1.</span>
            {t('name')}
            <span className="text-destructive">*</span>
          </Label>
          <Input
            id="name"
            value={studentName}
            className="bg-white/5 border-[var(--amber)]/20 text-white focus:border-[var(--amber)] transition-colors"
            onChange={(e) => onStudentNameChange(e.target.value)}
            placeholder={t('namePlaceholder')}
          />
        </div>
        <div className="grid gap-4">
          <Label htmlFor="age" className="text-[var(--cream)] flex items-center gap-2">
            <span className="text-[var(--amber)]">2.</span>
            {t('age')}
            <span className="text-destructive">*</span>
          </Label>
          <select
            id="age"
            value={studentAge}
            onChange={(e) => onStudentAgeChange(e.target.value)}
            className="w-full p-3 rounded-lg bg-[#4B2E1D] text-white border border-[var(--amber)]/20 focus:outline-none focus:border-[var(--amber)] hover:border-[var(--amber)]/50 transition-colors"
          >
            <option value="" disabled className="bg-[#2A1810]">
              {t('selectAge')}
            </option>
            {AGE_GROUPS.map((group) => (
              <optgroup
                key={group.range}
                label={`${group.range} ${t('years')} - ${t(`ageGroups.${group.labelKey}`)}`}
                className="bg-[#2A1810]"
              >
                {Array.from(
                  {
                    length:
                      group.range === '18+'
                        ? 5
                        : parseInt(group.range.split('-')[1]) - parseInt(group.range.split('-')[0]) + 1,
                  },
                  (_, i) =>
                    group.range === '18+' ? i + 18 : parseInt(group.range.split('-')[0]) + i
                ).map((age) => (
                  <option key={age} value={age} className="bg-[#2A1810]">
                    {age} {t('years')}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="grid gap-4">
          <Label className="text-[var(--cream)] flex items-center gap-2">
            <span className="text-[var(--amber)]">3.</span>
            {t('level')}
          </Label>
          <div className="bg-white/5 border border-[var(--amber)]/20 text-white rounded-md px-3 py-2">
            {levelTitle}
          </div>
        </div>
        <div className="grid gap-4">
          <Label className="text-[var(--cream)] flex items-center gap-2">
            <span className="text-[var(--amber)]">4.</span>
            {t('subject')}
          </Label>
          <div className="bg-white/5 border border-[var(--amber)]/20 text-white rounded-md px-3 py-2">
            {subjectDisplay}
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        <Label className="text-[var(--cream)] flex items-center gap-2">
          <span className="text-[var(--amber)]">5.</span>
          {t('whatToDo')}
          <span className="text-destructive">*</span>
        </Label>
        <div className="grid grid-cols-2 gap-3">
          <div
            role="button"
            tabIndex={0}
            className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all cursor-pointer ${
              intent === 'info'
                ? 'border-[var(--amber)] bg-[var(--amber-hover)]/10'
                : 'border-[var(--amber)]/20 bg-[var(--amber-hover)]/5 hover:border-[var(--amber)]/50'
            }`}
            onClick={() => onIntentChange('info')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onIntentChange('info');
              }
            }}
          >
            <span className="text-2xl">💡</span>
            <Label className="text-white text-center cursor-pointer">
              {t('moreInfo')}
            </Label>
          </div>
          <div
            role="button"
            tabIndex={0}
            className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all cursor-pointer ${
              intent === 'trial'
                ? 'border-[var(--amber)] bg-[var(--amber-hover)]/10'
                : 'border-[var(--amber)]/20 bg-[var(--amber-hover)]/5 hover:border-[var(--amber)]/50'
            }`}
            onClick={() => onIntentChange('trial')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onIntentChange('trial');
              }
            }}
          >
            <span className="text-2xl">📚</span>
            <Label className="text-white text-center cursor-pointer">
              {t('scheduleTrial')}
            </Label>
          </div>
        </div>
      </div>

      {intent === 'trial' && (
        <div className="grid gap-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <Label htmlFor="time" className="text-[var(--cream)] flex items-center gap-2">
              <span className="text-[var(--amber)]">6.</span>
              {t('chooseThreePreferences')}
              <span className="text-destructive">*</span>
            </Label>
            <div className="text-center text-[var(--cream)]/90 text-sm whitespace-nowrap">
              {selectedTime.length === 0
                ? t('chooseThree')
                : selectedTime.length < 3
                  ? t('more', { count: 3 - selectedTime.length })
                  : `✓ ${t('saved')}`}
            </div>
          </div>
          <div
            role="group"
            tabIndex={0}
            className="relative px-1"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-1.5 sm:gap-2">
              {TIME_SLOTS.map((time) => (
                <button
                  key={time}
                  type="button"
                  onMouseDown={(e) => e.stopPropagation()}
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onTimeSelect(time);
                  }}
                  className={`relative flex flex-col items-center p-2 sm:p-3 rounded-lg border transition-all ${
                    selectedTime.includes(time)
                      ? 'border-[var(--amber)] bg-[var(--amber)]/20 text-[var(--cream)]'
                      : selectedTime.length >= 3 && !selectedTime.includes(time)
                        ? 'border-[var(--amber)]/20 bg-[var(--amber-hover)]/5 opacity-50 cursor-not-allowed text-[var(--cream)]/50'
                        : 'border-[var(--amber)]/20 bg-[var(--amber-hover)]/5 hover:border-[var(--amber)]/50 hover:bg-[var(--amber)]/10 text-[var(--cream)]'
                  }`}
                  disabled={selectedTime.length >= 3 && !selectedTime.includes(time)}
                >
                  <div className="text-sm sm:text-base font-medium">{time}</div>
                  {selectedTime.includes(time) && (
                    <div className="absolute -top-1.5 -right-1.5 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[var(--amber)] text-amber-900 flex items-center justify-center text-xs font-bold shadow-lg">
                      {selectedTime.indexOf(time) + 1}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        <Label className="text-[var(--cream)] flex items-center gap-2">
          <span className="text-[var(--amber)]">{intent === 'trial' ? '7.' : '6.'}</span>
          {t('extraOptions')}
        </Label>
        <div className="flex items-center gap-3 p-3 rounded-xl border border-[var(--amber)]/20 bg-[var(--amber-hover)]/5">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="homeTutoring"
              className="w-4 h-4 rounded border-[var(--amber)]/20 bg-[var(--amber-hover)]/5 text-[var(--amber)] focus:ring-[var(--amber)]/20"
              onChange={(e) => onHomeTutoringChange(e.target.checked)}
            />
            <Label htmlFor="homeTutoring" className="text-[var(--cream)]/90 cursor-pointer">
              {t('homeTutoring')}
            </Label>
          </div>
          <span className="text-[var(--cream)]/60 text-sm">
            {t('homeTutoringArea')}
          </span>
        </div>
      </div>

      <Button
        onClick={onSend}
        className="bg-[var(--amber-hover)] hover:bg-[var(--amber)] text-[var(--ink)] font-bold mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!isFormValid}
      >
        {!isFormValid ? t('fillRequired') : t('sendWhatsApp')}
      </Button>
    </div>
  );
}
