'use client';

import { useReducer } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { m } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
  showModal: boolean;
  studentName: string;
  studentAge: string;
  selectedLevel: string;
  selectedSubject: string;
};

function formReducer(state: FormState, action: { type: string; payload?: string | boolean }): FormState {
  switch (action.type) {
    case 'MODAL': return { ...state, showModal: (action.payload as boolean) ?? !state.showModal };
    case 'NAME': return { ...state, studentName: (action.payload as string) ?? '' };
    case 'AGE': return { ...state, studentAge: (action.payload as string) ?? '' };
    case 'LEVEL': return { ...state, selectedLevel: (action.payload as string) ?? '', selectedSubject: '' };
    case 'SUBJECT': return { ...state, selectedSubject: (action.payload as string) ?? '' };
    default: return state;
  }
}

export function ZuidoostOfferVariant({
  title,
  titleTwi,
  description,
  cta,
  whatsappMessage,
  educationLevels,
}: {
  title: string;
  titleTwi?: string;
  description: string;
  cta: string;
  whatsappMessage: string;
  educationLevels: EducationLevel[];
}) {
  const { language } = useLanguage();
  const [state, dispatch] = useReducer(formReducer, {
    showModal: false,
    studentName: '',
    studentAge: '',
    selectedLevel: '',
    selectedSubject: '',
  });
  const { showModal, studentName, studentAge, selectedLevel, selectedSubject } = state;

  const handleSubmit = () => {
    const level = educationLevels.find((l) => l.id === selectedLevel);
    const subject = level?.subjects.find((s) => s.NL === selectedSubject || s.EN === selectedSubject);
    const fullMessage = `${whatsappMessage}
- Name: ${studentName}
- Age: ${studentAge}
- Level: ${language === 'NL' ? level?.titleNL : level?.titleEN}
- Subject: ${language === 'NL' ? subject?.NL : subject?.EN}`;
    window.open(`${config.contact.whatsapp}?text=${encodeURIComponent(fullMessage)}`, '_blank');
    dispatch({ type: 'MODAL', payload: false });
  };

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 rounded-xl p-6 backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
    >
      <h3 className="text-xl font-bold text-yellow-300 mb-2">{title}</h3>
      {titleTwi && <p className="text-lg text-yellow-200/80 mb-4 italic">{titleTwi}</p>}
      <p className="text-white/90 mb-6">{description}</p>
      <Dialog open={showModal} onOpenChange={(v) => dispatch({ type: 'MODAL', payload: v })}>
        <DialogTrigger asChild>
          <Button className="bg-yellow-500 hover:bg-yellow-400 text-yellow-900 font-bold">{cta}</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-amber-900 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-yellow-300 mb-4">Student Information</DialogTitle>
          </DialogHeader>
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
                        <SelectItem key={subject.NL} value={language === 'NL' ? subject.NL : subject.EN}>
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
        </DialogContent>
      </Dialog>
    </m.div>
  );
}
