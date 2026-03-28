'use client';

import { useReducer } from 'react';
import { useTranslations } from 'next-intl';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { config } from '@/data/config';

type EducationLevel = {
  id: string;
  title: string;
  subjects: Array<{ NL: string; EN: string }>;
};

type FormState = {
  studentName: string;
  studentAge: string;
  selectedLevel: string;
  selectedSubject: string;
};

function formReducer(state: FormState, action: { type: string; payload?: string }): FormState {
  switch (action.type) {
    case 'NAME': return { ...state, studentName: action.payload ?? '' };
    case 'AGE': return { ...state, studentAge: action.payload ?? '' };
    case 'LEVEL': return { ...state, selectedLevel: action.payload ?? '', selectedSubject: '' };
    case 'SUBJECT': return { ...state, selectedSubject: action.payload ?? '' };
    default: return state;
  }
}

export function ZuidoostStudentForm({
  educationLevels,
  whatsappMessage,
}: {
  educationLevels: EducationLevel[];
  whatsappMessage: string;
}) {
  const language = useLanguage();
  const t = useTranslations('weekend.form');
  const [state, dispatch] = useReducer(formReducer, {
    studentName: '',
    studentAge: '',
    selectedLevel: '',
    selectedSubject: '',
  });
  const { studentName, studentAge, selectedLevel, selectedSubject } = state;

  const handleSubmit = () => {
    const level = educationLevels.find((l) => l.id === selectedLevel);
    const subject = level?.subjects.find((s) => s.NL === selectedSubject || s.EN === selectedSubject);
    const message = `${whatsappMessage}\n- Name: ${studentName}\n- Age: ${studentAge}\n- Level: ${level?.title}\n- Subject: ${language === 'NL' ? subject?.NL : subject?.EN}`;
    window.open(`${config.contact.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="grid gap-4 py-4">
      <div className="grid gap-2">
        <Label htmlFor="name">{t('name')}</Label>
        <Input
          id="name"
          value={studentName}
          onChange={(e) => dispatch({ type: 'NAME', payload: e.target.value })}
          className="bg-white/10 border-white/20 text-white"
          placeholder={t('namePlaceholder')}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="age">{t('age')}</Label>
        <Input
          id="age"
          value={studentAge}
          onChange={(e) => dispatch({ type: 'AGE', payload: e.target.value })}
          className="bg-white/10 border-white/20 text-white"
          placeholder={t('agePlaceholder')}
          type="number"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="level">{t('educationLevel')}</Label>
        <Select value={selectedLevel} onValueChange={(v) => dispatch({ type: 'LEVEL', payload: v })}>
          <SelectTrigger className="bg-white/10 border-white/20 text-white">
            <SelectValue placeholder={t('selectLevel')} />
          </SelectTrigger>
          <SelectContent className="bg-amber-900 text-white">
            {educationLevels.map((level) => (
              <SelectItem key={level.id} value={level.id}>
                {level.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {selectedLevel && (
        <div className="grid gap-2">
          <Label htmlFor="subject">{t('subject')}</Label>
          <Select value={selectedSubject} onValueChange={(v) => dispatch({ type: 'SUBJECT', payload: v })}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue placeholder={t('selectSubject')} />
            </SelectTrigger>
            <SelectContent className="bg-amber-900 text-white">
              {educationLevels
                .find((l) => l.id === selectedLevel)
                ?.subjects.map((subject) => (
                  <SelectItem key={`${selectedLevel}-${subject.NL}`} value={language === 'NL' ? subject.NL : subject.EN}>
                    {language === 'NL' ? subject.NL : subject.EN}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      )}
      <Button
        onClick={handleSubmit}
        className="bg-[var(--amber-hover)] hover:bg-[var(--amber)] text-[var(--ink)] font-bold mt-4"
        disabled={!studentName || !studentAge || !selectedLevel || !selectedSubject}
      >
        {t('continueWhatsApp')}
      </Button>
    </div>
  );
}
