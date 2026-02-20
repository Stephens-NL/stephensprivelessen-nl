'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const AGE_GROUPS = [
  { range: '8-12', label: { NL: 'Basisschool', EN: 'Primary School' } },
  { range: '12-16', label: { NL: 'Middelbare School', EN: 'High School' } },
  { range: '16-18', label: { NL: 'Bovenbouw', EN: 'Upper Secondary' } },
  { range: '18+', label: { NL: 'Hoger Onderwijs', EN: 'Higher Education' } },
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
  const { language } = useLanguage();
  const isFormValid =
    studentName.trim() !== '' &&
    studentAge.trim() !== '' &&
    (intent === 'info' || (intent === 'trial' && selectedTime.length === 3));

  return (
    <div className="grid gap-6 py-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="grid gap-4">
          <Label htmlFor="name" className="text-yellow-200 flex items-center gap-2">
            <span className="text-yellow-500">1.</span>
            {language === 'NL' ? 'Naam' : 'Name'}
            <span className="text-red-400">*</span>
          </Label>
          <Input
            id="name"
            value={studentName}
            className="bg-white/5 border-yellow-500/20 text-white focus:border-yellow-500 transition-colors"
            onChange={(e) => onStudentNameChange(e.target.value)}
            placeholder={language === 'NL' ? 'Jouw naam' : 'Your name'}
          />
        </div>
        <div className="grid gap-4">
          <Label htmlFor="age" className="text-yellow-200 flex items-center gap-2">
            <span className="text-yellow-500">2.</span>
            {language === 'NL' ? 'Leeftijd' : 'Age'}
            <span className="text-red-400">*</span>
          </Label>
          <select
            id="age"
            value={studentAge}
            onChange={(e) => onStudentAgeChange(e.target.value)}
            className="w-full p-3 rounded-lg bg-[#4B2E1D] text-white border border-yellow-500/20 focus:outline-none focus:border-yellow-500 hover:border-yellow-500/50 transition-colors"
          >
            <option value="" disabled className="bg-[#2A1810]">
              {language === 'NL' ? 'Selecteer leeftijd' : 'Select age'}
            </option>
            {AGE_GROUPS.map((group) => (
              <optgroup
                key={group.range}
                label={`${group.range} ${language === 'NL' ? 'jaar' : 'years'} - ${language === 'NL' ? group.label.NL : group.label.EN}`}
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
                    {age} {language === 'NL' ? 'jaar' : 'years'}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="grid gap-4">
          <Label className="text-yellow-200 flex items-center gap-2">
            <span className="text-yellow-500">3.</span>
            {language === 'NL' ? 'Niveau' : 'Level'}
          </Label>
          <div className="bg-white/5 border border-yellow-500/20 text-white rounded-md px-3 py-2">
            {levelTitle}
          </div>
        </div>
        <div className="grid gap-4">
          <Label className="text-yellow-200 flex items-center gap-2">
            <span className="text-yellow-500">4.</span>
            {language === 'NL' ? 'Vak' : 'Subject'}
          </Label>
          <div className="bg-white/5 border border-yellow-500/20 text-white rounded-md px-3 py-2">
            {subjectDisplay}
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        <Label className="text-yellow-200 flex items-center gap-2">
          <span className="text-yellow-500">5.</span>
          {language === 'NL' ? 'Wat wil je doen?' : 'What would you like to do?'}
          <span className="text-red-400">*</span>
        </Label>
        <div className="grid grid-cols-2 gap-3">
          <div
            role="button"
            tabIndex={0}
            className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all cursor-pointer ${
              intent === 'info'
                ? 'border-yellow-500 bg-yellow-500/10'
                : 'border-yellow-500/20 bg-yellow-500/5 hover:border-yellow-500/50'
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
              {language === 'NL' ? 'Meer informatie' : 'More information'}
            </Label>
          </div>
          <div
            role="button"
            tabIndex={0}
            className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all cursor-pointer ${
              intent === 'trial'
                ? 'border-yellow-500 bg-yellow-500/10'
                : 'border-yellow-500/20 bg-yellow-500/5 hover:border-yellow-500/50'
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
              {language === 'NL' ? 'Proefles plannen' : 'Schedule trial'}
            </Label>
          </div>
        </div>
      </div>

      {intent === 'trial' && (
        <div className="grid gap-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <Label htmlFor="time" className="text-yellow-200 flex items-center gap-2">
              <span className="text-yellow-500">6.</span>
              {language === 'NL'
                ? 'Kies drie voorkeuren voor je proefles (30 min)'
                : 'Choose three preferences for your trial lesson (30 min)'}
              <span className="text-red-400">*</span>
            </Label>
            <div className="text-center text-yellow-200/90 text-sm whitespace-nowrap">
              {selectedTime.length === 0
                ? language === 'NL'
                  ? 'Kies drie voorkeuren'
                  : 'Choose three preferences'
                : selectedTime.length < 3
                  ? language === 'NL'
                    ? `Nog ${3 - selectedTime.length}`
                    : `${3 - selectedTime.length} more`
                  : language === 'NL'
                    ? '✓ Opgeslagen'
                    : '✓ Saved'}
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
                      ? 'border-yellow-400 bg-yellow-400/20 text-yellow-100'
                      : selectedTime.length >= 3 && !selectedTime.includes(time)
                        ? 'border-yellow-500/20 bg-yellow-500/5 opacity-50 cursor-not-allowed text-yellow-200/50'
                        : 'border-yellow-500/20 bg-yellow-500/5 hover:border-yellow-400/50 hover:bg-yellow-400/10 text-yellow-200'
                  }`}
                  disabled={selectedTime.length >= 3 && !selectedTime.includes(time)}
                >
                  <div className="text-sm sm:text-base font-medium">{time}</div>
                  {selectedTime.includes(time) && (
                    <div className="absolute -top-1.5 -right-1.5 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-yellow-400 text-amber-900 flex items-center justify-center text-xs font-bold shadow-lg">
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
        <Label className="text-yellow-200 flex items-center gap-2">
          <span className="text-yellow-500">{intent === 'trial' ? '7.' : '6.'}</span>
          {language === 'NL' ? 'Extra opties' : 'Extra options'}
        </Label>
        <div className="flex items-center gap-3 p-3 rounded-xl border border-yellow-500/20 bg-yellow-500/5">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="homeTutoring"
              className="w-4 h-4 rounded border-yellow-500/20 bg-yellow-500/5 text-yellow-500 focus:ring-yellow-500/20"
              onChange={(e) => onHomeTutoringChange(e.target.checked)}
            />
            <Label htmlFor="homeTutoring" className="text-yellow-200/90 cursor-pointer">
              {language === 'NL' ? 'Bijles aan huis' : 'Home tutoring'}
            </Label>
          </div>
          <span className="text-yellow-200/60 text-sm">
            {language === 'NL'
              ? '(alleen beschikbaar in Gein en Reigersbos)'
              : '(only available in Gein and Reigersbos)'}
          </span>
        </div>
      </div>

      <Button
        onClick={onSend}
        className="bg-yellow-500 hover:bg-yellow-400 text-yellow-900 font-bold mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!isFormValid}
      >
        {!isFormValid
          ? language === 'NL'
            ? 'Vul alle verplichte velden in (*)'
            : 'Fill in all required fields (*)'
          : language === 'NL'
            ? 'Verstuur via WhatsApp'
            : 'Send via WhatsApp'}
      </Button>
    </div>
  );
}
