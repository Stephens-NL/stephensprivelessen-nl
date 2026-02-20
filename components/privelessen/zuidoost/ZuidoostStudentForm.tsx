'use client';

import { useReducer } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
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
  titleNL: string;
  titleEN: string;
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
  const { language } = useLanguage();
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
    const message = `${whatsappMessage}\n- Name: ${studentName}\n- Age: ${studentAge}\n- Level: ${language === 'NL' ? level?.titleNL : level?.titleEN}\n- Subject: ${language === 'NL' ? subject?.NL : subject?.EN}`;
    window.open(`${config.contact.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="grid gap-4 py-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={studentName}
          onChange={(e) => dispatch({ type: 'NAME', payload: e.target.value })}
          className="bg-white/10 border-white/20 text-white"
          placeholder="Enter student's name"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="age">Age</Label>
        <Input
          id="age"
          value={studentAge}
          onChange={(e) => dispatch({ type: 'AGE', payload: e.target.value })}
          className="bg-white/10 border-white/20 text-white"
          placeholder="Enter student's age"
          type="number"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="level">Education Level</Label>
        <Select value={selectedLevel} onValueChange={(v) => dispatch({ type: 'LEVEL', payload: v })}>
          <SelectTrigger className="bg-white/10 border-white/20 text-white">
            <SelectValue placeholder="Select level" />
          </SelectTrigger>
          <SelectContent className="bg-amber-900 text-white">
            {educationLevels.map((level) => (
              <SelectItem key={level.id} value={level.id}>
                {language === 'NL' ? level.titleNL : level.titleEN}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {selectedLevel && (
        <div className="grid gap-2">
          <Label htmlFor="subject">Subject</Label>
          <Select value={selectedSubject} onValueChange={(v) => dispatch({ type: 'SUBJECT', payload: v })}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue placeholder="Select subject" />
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
        className="bg-yellow-500 hover:bg-yellow-400 text-yellow-900 font-bold mt-4"
        disabled={!studentName || !studentAge || !selectedLevel || !selectedSubject}
      >
        Continue to WhatsApp
      </Button>
    </div>
  );
}
