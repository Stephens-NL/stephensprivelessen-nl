'use client';

import { useLocale, useTranslations } from 'next-intl';

import { m, AnimatePresence, useInView } from 'framer-motion';
import { useRef, useReducer } from 'react';
import { FaHandPointer, FaSearch } from 'react-icons/fa';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Bilingual } from '@/data/types';
import { getBusinessData } from '@/data/businessData';
import { config } from '@/data/config';
import { TrialLessonForm } from './TrialLessonForm';

interface SubjectsSectionProps {
  educationLevels: Array<{
    id: string;
    title: string;
    subjects: Bilingual[];
    icon: string;
    color: string;
  }>;
  activeLevel: string;
  setActiveLevel: (level: string) => void;
  subject: Bilingual;
  setSubject: (subject: Bilingual) => void;
}

type FormState = {
  searchQuery: string;
  hoveredSubject: string | null;
  studentName: string;
  studentAge: string;
  wantsHomeTutoring: boolean;
  intent: 'trial' | 'info';
  selectedTime: string[];
  showModal: boolean;
  selectedSubject: Bilingual | null;
};

function formReducer(state: FormState, action: { type: string; payload?: unknown }): FormState {
  switch (action.type) {
    case 'SEARCH': return { ...state, searchQuery: (action.payload as string) ?? '' };
    case 'HOVER': return { ...state, hoveredSubject: (action.payload as string | null) ?? null };
    case 'STUDENT_NAME': return { ...state, studentName: (action.payload as string) ?? '' };
    case 'STUDENT_AGE': return { ...state, studentAge: (action.payload as string) ?? '' };
    case 'HOME_TUTORING': return { ...state, wantsHomeTutoring: (action.payload as boolean) ?? !state.wantsHomeTutoring };
    case 'INTENT': return { ...state, intent: (action.payload as 'trial' | 'info') ?? state.intent };
    case 'TIME': return { ...state, selectedTime: (action.payload as string[]) ?? state.selectedTime };
    case 'MODAL': return { ...state, showModal: (action.payload as boolean) ?? !state.showModal };
    case 'SUBJECT': return { ...state, selectedSubject: (action.payload as Bilingual | null) ?? null };
    case 'RESET': return { ...state, showModal: false, studentName: '', studentAge: '', selectedTime: [], selectedSubject: null };
    default: return state;
  }
}

const initialFormState: FormState = {
  searchQuery: '',
  hoveredSubject: null,
  studentName: '',
  studentAge: '',
  wantsHomeTutoring: false,
  intent: 'info',
  selectedTime: [],
  showModal: false,
  selectedSubject: null,
};

export function SubjectsSection({
  educationLevels,
  activeLevel,
  setActiveLevel,
  subject,
  setSubject
}: SubjectsSectionProps) {
  const locale = useLocale();
  const language = locale === 'nl' ? 'NL' : 'EN';
  const t = useTranslations('boa');

  // businessData subjects are data objects with NL/EN keys - not UI translations
  const businessData = getBusinessData((obj: Record<string, string> | string) => typeof obj === 'string' ? obj : obj[language] || obj['EN'] || '');
  const [formState, dispatch] = useReducer(formReducer, initialFormState);
  const { searchQuery, hoveredSubject, studentName, studentAge, wantsHomeTutoring, intent, selectedTime, showModal, selectedSubject } = formState;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const getActiveSubjects = (levelId: string) => {
    const level = educationLevels.find(l => l.id === levelId);
    return level ? level.subjects : [];
  };

  // Filter subjects based on search query
  const filteredSubjects = searchQuery
    ? [...businessData.subjects.primary,
       ...businessData.subjects.secondary,
       ...businessData.subjects.higher,
       ...businessData.subjects.programming].filter((subject: Bilingual) => {
        const query = searchQuery.toLowerCase();
        const matchesNL = subject.NL.toLowerCase().includes(query);
        const matchesEN = subject.EN.toLowerCase().includes(query);
        return matchesNL || matchesEN;
      })
    : getActiveSubjects(activeLevel);

  // Ensure each subject has a unique key by combining level, language, and subject name
  const subjectsWithKeys = filteredSubjects.map(subject => ({
    ...subject,
    uniqueKey: `${activeLevel}-${language}-${subject.EN}-${subject.NL}`
  }));

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

  return (
    <m.section
      ref={ref}
      id="subjects"
      className="relative z-10 py-24 px-4"
      style={{
        transform: isInView ? "none" : "translateY(100px)",
        opacity: isInView ? 1 : 0,
        transition: "transform 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s, opacity 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
      }}
    >
      <div className="max-w-7xl mx-auto">
        <m.h2
          className="text-5xl font-bold text-white mb-16 text-center"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          {t('subjects.title')}
        </m.h2>

        <div className="flex flex-col items-center gap-8 mb-16">
          <div className="w-full max-w-xl">
            <div className="relative">
              <Input
                className="w-full bg-white/5 border-[var(--amber)]/20 text-white placeholder:text-white/50 pl-12 py-6 text-lg"
                placeholder={t('subjects.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => dispatch({ type: 'SEARCH', payload: e.target.value })}
              />
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--amber)]/50" />
            </div>
          </div>

          {!searchQuery && (
            <div className="inline-flex bg-white/5 rounded-2xl p-1.5 backdrop-blur-sm">
              {educationLevels.map((level) => (
                <m.button
                  key={level.id}
                  onClick={() => setActiveLevel(level.id)}
                  className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 relative ${
                    activeLevel === level.id
                      ? 'text-amber-950'
                      : 'text-white hover:text-[var(--cream)]'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {activeLevel === level.id && (
                    <m.div
                      className={`absolute inset-0 bg-gradient-to-r ${level.color} rounded-xl`}
                      layoutId="activePill"
                      transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                    />
                  )}
                  <span className="relative flex items-center gap-2">
                    <span>{level.icon}</span>
                    <span>{level.title}</span>
                  </span>
                </m.button>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence mode="wait">
            {subjectsWithKeys.map((subject, index) => (
              <m.div
                key={subject.uniqueKey}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05,
                  ease: "easeOut"
                }}
                onHoverStart={() => dispatch({ type: 'HOVER', payload: subject.NL })}
                onHoverEnd={() => dispatch({ type: 'HOVER', payload: null })}
                className="group relative"
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="cursor-pointer">
                      <div className={`absolute inset-0 bg-gradient-to-r ${
                        educationLevels.find(level => level.id === activeLevel)?.color
                      } opacity-0 group-hover:opacity-100 rounded-xl transition-all duration-300 blur-sm`} />

                      <div className="relative h-full bg-[#4B2E1D] group-hover:bg-[#5B3E2D] backdrop-blur-sm rounded-xl border border-[var(--amber)]/20 group-hover:border-[var(--amber)] transition-all duration-300 overflow-hidden shadow-lg group-hover:shadow-[var(--amber)]/20">
                        <div className="p-6 h-full flex flex-col justify-between">
                          <div>
                            <h3 className="text-2xl font-bold text-[var(--amber)] group-hover:text-[var(--cream)] transition-colors">
                              {language === 'NL' ? subject.NL : subject.EN}
                            </h3>
                            <p className="text-base text-white/80 group-hover:text-white/90 mt-2 font-medium">
                              {language === 'NL' ? subject.EN : subject.NL}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 mt-4 text-sm text-[var(--cream)]/75 group-hover:text-[var(--cream)]">
                            <FaHandPointer className="text-[var(--amber)] group-hover:text-[var(--amber)]" />
                            <p>{t('subjects.tapForTrial')}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="bg-amber-950/90 backdrop-blur-xl border border-[var(--amber)]/20">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--amber)] to-[var(--amber-hover)]">
                        {t('subjects.dialogTitle')}
                      </DialogTitle>
                      <DialogDescription className="text-[var(--cream)]/80">
                        {t('subjects.dialogDescription')}
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
                      onSend={() => {
                        const fullMessage = `${t('subjects.whatsappIntro')}
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
                        window.open(`${config.contact.whatsapp}?text=${encodeURIComponent(fullMessage)}`, '_blank');
                      }}
                    />
                  </DialogContent>
                </Dialog>
              </m.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </m.section>
  );
}
