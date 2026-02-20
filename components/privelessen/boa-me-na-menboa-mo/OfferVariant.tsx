'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { m } from 'framer-motion';
import { useReducer } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Bilingual, ProgramOffer } from '@/data/types';
import { TrialLessonForm } from './TrialLessonForm';

interface OfferVariantProps {
  offer: ProgramOffer;
  ctaText: string;
  educationLevels: Array<{
    id: string;
    title: string;
    subjects: Bilingual[];
    icon: string;
    color: string;
  }>;
  activeLevel: string;
  subject: Bilingual;
}

type OfferFormState = { showModal: boolean; studentName: string; studentAge: string; wantsHomeTutoring: boolean; intent: 'trial' | 'info'; selectedTime: string[] };

function offerFormReducer(state: OfferFormState, action: { type: string; payload?: unknown }): OfferFormState {
  switch (action.type) {
    case 'MODAL': return { ...state, showModal: (action.payload as boolean) ?? !state.showModal };
    case 'STUDENT_NAME': return { ...state, studentName: (action.payload as string) ?? '' };
    case 'STUDENT_AGE': return { ...state, studentAge: (action.payload as string) ?? '' };
    case 'HOME_TUTORING': return { ...state, wantsHomeTutoring: (action.payload as boolean) ?? !state.wantsHomeTutoring };
    case 'INTENT': return { ...state, intent: (action.payload as 'trial' | 'info') ?? state.intent };
    case 'TIME': return { ...state, selectedTime: (action.payload as string[]) ?? state.selectedTime };
    default: return state;
  }
}

export function OfferVariant({ 
  offer, 
  ctaText,
  educationLevels,
  activeLevel,
  subject
}: OfferVariantProps) {
  const { language } = useLanguage();
  const [state, dispatch] = useReducer(offerFormReducer, {
    showModal: false,
    studentName: '',
    studentAge: '',
    wantsHomeTutoring: false,
    intent: 'info',
    selectedTime: [],
  });
  const { showModal, studentName, studentAge, wantsHomeTutoring, intent, selectedTime } = state;

  const handleTimeSelect = (time: string) => {
    const next = selectedTime.includes(time)
      ? selectedTime.filter((x) => x !== time)
      : selectedTime.length >= 3
        ? selectedTime
        : [...selectedTime, time].sort((a, b) => {
            const timeA = new Date(`2024-01-01 ${a}`);
            const timeB = new Date(`2024-01-01 ${b}`);
            return timeA.getTime() - timeB.getTime();
          });
    dispatch({ type: 'TIME', payload: next });
  };

  const handleSend = () => {
    const fullMessage = `${offer.whatsappMessage[language]}
- Name: ${studentName}
- Age: ${studentAge}
- Level: ${educationLevels.find(level => level.id === activeLevel)?.title}
- Subject: ${language === 'NL' ? subject.NL : subject.EN}
- Home tutoring requested: ${wantsHomeTutoring ? 'Yes' : 'No'}
- Request type: ${intent === 'trial' ? 'Trial lesson (30 min)' : 'Information'}${
  intent === 'trial' 
    ? `\n- Preferred times:\n  1. ${selectedTime[0]}\n  2. ${selectedTime[1]}\n  3. ${selectedTime[2]}`
    : ''
}`;
    window.open(`https://wa.me/31647357426?text=${encodeURIComponent(fullMessage)}`, '_blank');
  };

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <div className="bg-[#4B2E1D] backdrop-blur-sm rounded-xl border border-yellow-500/20 overflow-hidden shadow-lg">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
        <div className="relative bg-amber-950/50 backdrop-blur-xl rounded-2xl p-8 ring-1 ring-white/10 hover:ring-yellow-300/50 transition duration-300">
          <div className="h-full flex flex-col">
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 mb-2">
              {offer.title[language]}
            </h3>
            {offer.titleTwi && (
              <p className="text-lg text-yellow-200/80 mb-4 italic font-light">
                {offer.titleTwi}
              </p>
            )}
            <p className="text-white/80 mb-8 flex-grow">
              {offer.description[language]}
            </p>
            <Dialog open={showModal} onOpenChange={(v) => dispatch({ type: 'MODAL', payload: v })}>
              <DialogTrigger asChild>
                <Button className="bg-yellow-500 hover:bg-yellow-400 text-yellow-900 font-bold">
                  {ctaText}
                </Button>
              </DialogTrigger>
              <DialogContent 
                className="bg-amber-950/90 backdrop-blur-xl border border-yellow-500/20"
                onClick={(e) => e.stopPropagation()}
              >
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">
                    {offer.title[language]}
                  </DialogTitle>
                  <DialogDescription className="text-yellow-200/80">
                    {language === 'NL' 
                      ? 'Vul je gegevens in en kies wat je wilt doen' 
                      : 'Fill in your details and choose what you want to do'}
                  </DialogDescription>
                </DialogHeader>
                <TrialLessonForm
                  studentName={studentName}
                  onStudentNameChange={(v) => dispatch({ type: 'STUDENT_NAME', payload: v })}
                  studentAge={studentAge}
                  onStudentAgeChange={(v) => dispatch({ type: 'STUDENT_AGE', payload: v })}
                  intent={intent}
                  onIntentChange={(v) => dispatch({ type: 'INTENT', payload: v })}
                  selectedTime={selectedTime}
                  onTimeSelect={handleTimeSelect}
                  wantsHomeTutoring={wantsHomeTutoring}
                  onHomeTutoringChange={(v) => dispatch({ type: 'HOME_TUTORING', payload: v })}
                  levelTitle={educationLevels.find(level => level.id === activeLevel)?.title ?? ''}
                  subjectDisplay={language === 'NL' ? subject.NL : subject.EN}
                  onSend={handleSend}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </m.div>
  );
} 