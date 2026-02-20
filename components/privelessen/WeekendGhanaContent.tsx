'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useReducer } from 'react';
import { m } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { getBusinessData } from '@/data/businessData';
import { useLanguage } from '@/contexts/LanguageContext';
import { StudentInfoModal } from './StudentInfoModal';
import { WeekendGhanaSubjectsSection, type EducationLevel } from './WeekendGhanaSubjectsSection';
import { WeekendGhanaHero } from './WeekendGhanaHero';
import { config } from '@/data/config';

// Adinkra symbols as background patterns
const AdinkraPattern = () => (
  <div className="absolute inset-0 opacity-5 pointer-events-none">
    <div className="absolute top-0 right-0 w-32 h-32 bg-[url('/images/sankofa.svg')] bg-no-repeat bg-contain transform rotate-45" />
    <div className="absolute bottom-0 left-0 w-32 h-32 bg-[url('/images/adinkrahene.svg')] bg-no-repeat bg-contain" />
  </div>
);

const OfferVariant = ({ title, titleTwi, description, cta, whatsappMessage }: { 
  title: string;
  titleTwi: string;
  description: string;
  cta: string;
  whatsappMessage: string;
}) => {
  const whatsappLink = `${config.contact.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;
  
  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-[#8B4513] to-[#654321] text-white p-8 rounded-2xl border border-yellow-600/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full transform translate-x-16 -translate-y-16" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-yellow-500/10 rounded-full transform -translate-x-16 translate-y-16" />
      <h3 className="text-2xl font-bold mb-2 relative z-10">{title}</h3>
      <p className="text-yellow-400 italic mb-4">{titleTwi}</p>
      <p className="mb-6 text-yellow-100 relative z-10">{description}</p>
      <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="block">
        <Button className="w-full bg-green-500 hover:bg-green-400 text-white font-semibold py-6 text-lg relative z-10 flex items-center justify-center gap-2">
          <FaWhatsapp className="text-2xl" />
          {cta}
        </Button>
      </a>
    </Card>
  );
};

type WeekendFormState = {
  showCourses: boolean;
  searchTerm: string;
  selectedLevel: string | null;
  showModal: boolean;
  studentName: string;
  studentAge: string;
  selectedSubject: { subject: { NL: string; EN: string }; level: EducationLevel } | null;
};

function weekendFormReducer(state: WeekendFormState, action: { type: string; payload?: unknown }): WeekendFormState {
  switch (action.type) {
    case 'COURSES': return { ...state, showCourses: (action.payload as boolean) ?? !state.showCourses };
    case 'SEARCH': return { ...state, searchTerm: (action.payload as string) ?? '' };
    case 'LEVEL': return { ...state, selectedLevel: (action.payload as string | null) ?? null };
    case 'MODAL': return { ...state, showModal: (action.payload as boolean) ?? !state.showModal };
    case 'STUDENT_NAME': return { ...state, studentName: (action.payload as string) ?? '' };
    case 'STUDENT_AGE': return { ...state, studentAge: (action.payload as string) ?? '' };
    case 'SUBJECT': return { ...state, selectedSubject: (action.payload as WeekendFormState['selectedSubject']) ?? null };
    case 'RESET': return { ...state, showModal: false, studentName: '', studentAge: '', selectedSubject: null };
    default: return state;
  }
}

export function WeekendGhanaContent() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const businessData = getBusinessData(t);
  const [formState, dispatch] = useReducer(weekendFormReducer, {
    showCourses: true,
    searchTerm: '',
    selectedLevel: 'voortgezet',
    showModal: false,
    studentName: '',
    studentAge: '',
    selectedSubject: null,
  });
  const { showCourses, searchTerm, selectedLevel, showModal, studentName, studentAge, selectedSubject } = formState;

  const educationLevels: EducationLevel[] = [
    {
      id: 'basis',
      titleNL: 'Basisonderwijs',
      titleEN: 'Primary Education',
      subjects: businessData.subjects.primary,
      whatsappIntro: "Hi! I&apos;m looking for primary school tutoring",
      hasDiscount: true
    },
    {
      id: 'voortgezet',
      titleNL: 'Voortgezet Onderwijs',
      titleEN: 'Secondary Education',
      subjects: businessData.subjects.secondary,
      whatsappIntro: "Hi! I&apos;m looking for high school tutoring",
      hasDiscount: true
    },
    {
      id: 'hoger',
      titleNL: 'Hoger Onderwijs',
      titleEN: 'Higher Education',
      subjects: [...businessData.subjects.higher, ...businessData.subjects.programming],
      whatsappIntro: "Hi! I&apos;m looking for university level tutoring",
      hasDiscount: false
    }
  ];

  const filteredSubjects = (subjects: Array<{ NL: string, EN: string }>) => {
    return subjects.filter(subject => 
      subject.NL.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.EN.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const offers = [
    {
      title: "Weekend Tutoring for Students",
      titleTwi: "Adesua mma sukuufo",
      description: "🎓 Special community discount for Ghanaian youth in Zuidoost! Only €30 per hour (regular €60). Home tutoring available in Gein 3 & 4. Ɛyɛ mmerɛw! Start with a free 30-minute trial lesson!",
      cta: "WhatsApp for Trial Lesson",
      whatsappMessage: "Hi! I&apos;m interested in the weekend tutoring special offer (€30/hour). I&apos;d like to schedule a free trial lesson."
    },
    {
      title: "Personal Coaching & Study Support",
      titleTwi: "Akwankyerɛ ne Mmoa",
      description: "💡 Need guidance with your studies or personal development? Available weekends for €30/hour in Zuidoost. Me ne wo bɛyɛ adwuma! (We&apos;ll work together!) First 30-minute consultation is free.",
      cta: "WhatsApp for Info",
      whatsappMessage: "Hi! I&apos;m interested in personal coaching/study support (€30/hour weekend offer). Can you tell me more?"
    },
    {
      title: "Flexible Weekend Support",
      titleTwi: "Mmerɛ-mmerɛ Mmoa",
      description: "✨ Whether it&apos;s math, coaching, or just discussing your studies - I&apos;m here to help! Special rate of €30/hour (save €30). Yɛbɛyɛ bi akɔ! Home service in Gein 3 & 4 (limited spots).",
      cta: "WhatsApp to Start",
      whatsappMessage: "Hi! I&apos;m interested in the flexible weekend support (€30/hour). I&apos;d like to learn more about the possibilities."
    }
  ];

  const handleSubjectClick = (subject: { NL: string; EN: string }, level: EducationLevel) => {
    dispatch({ type: 'SUBJECT', payload: { subject, level } });
    dispatch({ type: 'MODAL', payload: true });
  };

  const handleSendWhatsApp = () => {
    if (!selectedSubject) return;
    
    const { subject, level } = selectedSubject;
    const priceInfo = level.hasDiscount ? 
      "with community discount (€30/hour)" : 
      "(regular rate €60/hour)";
    
    const whatsappMessage = `${level.whatsappIntro} (${level.titleNL}).
Student: ${studentName}
Age: ${studentAge}
Subject: ${subject.EN} (${subject.NL})

Can you tell me more about the weekend tutoring ${priceInfo}?`;
    
    window.open(`${config.contact.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
    dispatch({ type: 'RESET' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#654321] to-[#8B4513] text-white">
      <div className="container mx-auto px-4 py-16 relative">
        <AdinkraPattern />
        <WeekendGhanaHero />
        <WeekendGhanaSubjectsSection
          searchTerm={searchTerm}
          setSearchTerm={(v) => dispatch({ type: 'SEARCH', payload: v })}
          selectedLevel={selectedLevel}
          setSelectedLevel={(v) => dispatch({ type: 'LEVEL', payload: v })}
          educationLevels={educationLevels}
          filteredSubjects={filteredSubjects}
          onSubjectClick={handleSubjectClick}
          language={language}
        />

        <div className="grid gap-8 md:grid-cols-3 mb-12">
          {offers.map((offer) => (
            <OfferVariant key={offer.title} {...offer} />
          ))}
        </div>

        <m.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-xl text-yellow-100 mb-6">
            Questions? Message me directly on WhatsApp!<br/>
            <span className="text-yellow-400 italic">Wo wɔ asɛm bi ka? Bra ma yɛnkasa!</span>
          </p>
          <a 
            href={`${config.contact.whatsapp}?text=Hi!%20I%20have%20a%20question%20about%20the%20weekend%20tutoring%20offer.`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" className="bg-green-500 hover:bg-green-400 text-white font-semibold px-8 py-6 text-lg flex items-center gap-2">
              <FaWhatsapp className="text-2xl" />
              WhatsApp Now - Frɛ Me!
            </Button>
          </a>
        </m.div>
      </div>
      <StudentInfoModal
        open={showModal}
        onOpenChange={(v) => dispatch({ type: 'MODAL', payload: v })}
        studentName={studentName}
        setStudentName={(v) => dispatch({ type: 'STUDENT_NAME', payload: v })}
        studentAge={studentAge}
        setStudentAge={(v) => dispatch({ type: 'STUDENT_AGE', payload: v })}
        onSend={handleSendWhatsApp}
        contentClassName="bg-[#654321] border border-yellow-600/50 text-yellow-100"
        titleClassName="text-2xl font-bold text-yellow-400"
        descriptionClassName="text-yellow-200"
        labelClassName="text-yellow-300"
        inputClassName="bg-[#8B4513] border-yellow-600/50 text-yellow-100 placeholder:text-yellow-200/50"
        cancelClassName="border-yellow-600/50 text-yellow-200 hover:bg-[#8B4513] hover:text-yellow-100"
      />
    </div>
  );
} 