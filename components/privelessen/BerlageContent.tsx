'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useReducer } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { FaGraduationCap, FaSearch, FaWhatsapp, FaMapMarkerAlt, FaClock, FaCheck } from 'react-icons/fa';
import { getBusinessData } from '@/data/businessData';
import { StudentInfoModal } from './StudentInfoModal';
import { useTranslation } from 'react-i18next';
import { config } from '@/data/config';

const OfferVariant = ({ title, description, cta, whatsappMessage }: { 
  title: string;
  description: string;
  cta: string;
  whatsappMessage: string;
}) => {
  const whatsappLink = `${config.contact.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;
  
  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-purple-600 to-purple-800 text-white p-8 rounded-2xl border border-purple-300/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full transform translate-x-16 -translate-y-16" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full transform -translate-x-16 translate-y-16" />
      <h3 className="text-2xl font-bold mb-2 relative z-10">{title}</h3>
      <p className="mb-6 text-purple-100 relative z-10">{description}</p>
      <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="block">
        <Button className="w-full bg-green-500 hover:bg-green-400 text-white font-semibold py-6 text-lg relative z-10 flex items-center justify-center gap-2">
          <FaWhatsapp className="text-2xl" />
          {cta}
        </Button>
      </a>
    </Card>
  );
};

type BerlageEducationLevel = {
  id: string;
  titleNL: string;
  titleEN: string;
  subjects: Array<{ NL: string; EN: string }>;
  whatsappIntro: string;
  hasDiscount: boolean;
};

function BerlageSubjectsSection({
  searchTerm,
  setSearchTerm,
  selectedLevel,
  educationLevels,
  filteredSubjects,
  handleSubjectClick,
}: {
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  selectedLevel: string | null;
  educationLevels: BerlageEducationLevel[];
  filteredSubjects: (subjects: Array<{ NL: string; EN: string }>) => Array<{ NL: string; EN: string }>;
  handleSubjectClick: (subject: { NL: string; EN: string }, level: BerlageEducationLevel) => void;
}) {
  return (
    <div className="bg-purple-800 p-8 rounded-2xl mb-12 shadow-xl border border-purple-300/50 relative overflow-hidden">
      <div className="relative">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <FaGraduationCap className="text-3xl text-purple-400" />
            <div>
              <h2 className="text-2xl font-bold text-purple-400">Available Subjects</h2>
              <p className="text-purple-200 text-sm">Find your subject and click to ask about it</p>
            </div>
          </div>
        </div>

        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-purple-400" />
          </div>
          <input
            type="text"
            placeholder="Zoek een vak / Search a subject..."
            className="w-full pl-10 pr-4 py-3 bg-purple-900 border border-purple-300/50 rounded-xl text-purple-100 placeholder-purple-200/50 focus:outline-none focus:ring-2 focus:ring-purple-400/50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <AnimatePresence mode="wait">
          {selectedLevel && (
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              {filteredSubjects(educationLevels.find(level => level.id === selectedLevel)?.subjects || [])
                .map((subject, index) => {
                  const currentLevel = educationLevels.find(level => level.id === selectedLevel);
                  if (!currentLevel) return null;
                  return (
                    <m.div
                      key={`${selectedLevel}-${subject.NL}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-purple-900 p-4 rounded-xl border border-purple-300/50 hover:border-purple-200/50 
                               transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer group"
                      onClick={() => handleSubjectClick(subject, currentLevel)}
                    >
                      <div className="font-medium text-purple-100 group-hover:text-purple-400 transition-colors">
                        {subject.NL}
                      </div>
                      <div className="text-sm text-purple-200/75 group-hover:text-purple-300 transition-colors">
                        {subject.EN}
                      </div>
                      <div className="mt-2 pt-2 border-t border-purple-300/30 text-xs text-purple-200/50 group-hover:text-purple-200 transition-colors flex items-center gap-1">
                        <FaWhatsapp className="text-sm" />
                        Click to ask about this subject
                      </div>
                    </m.div>
                  );
                })}
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

type BerlageFormState = {
  searchTerm: string;
  selectedLevel: string | null;
  showModal: boolean;
  studentName: string;
  studentAge: string;
  selectedSubject: { subject: { NL: string; EN: string }; level: BerlageEducationLevel } | null;
};

function berlageFormReducer(state: BerlageFormState, action: { type: string; payload?: unknown }): BerlageFormState {
  switch (action.type) {
    case 'SEARCH': return { ...state, searchTerm: (action.payload as string) ?? '' };
    case 'LEVEL': return { ...state, selectedLevel: (action.payload as string | null) ?? null };
    case 'MODAL': return { ...state, showModal: (action.payload as boolean) ?? !state.showModal };
    case 'STUDENT_NAME': return { ...state, studentName: (action.payload as string) ?? '' };
    case 'STUDENT_AGE': return { ...state, studentAge: (action.payload as string) ?? '' };
    case 'SUBJECT': return { ...state, selectedSubject: (action.payload as BerlageFormState['selectedSubject']) ?? null };
    case 'RESET': return { ...state, showModal: false, studentName: '', studentAge: '', selectedSubject: null };
    default: return state;
  }
}

export function BerlageContent() {
  const { t } = useTranslation();
  const businessData = getBusinessData(t);
  const [formState, dispatch] = useReducer(berlageFormReducer, {
    searchTerm: '',
    selectedLevel: 'voortgezet',
    showModal: false,
    studentName: '',
    studentAge: '',
    selectedSubject: null,
  });
  const { searchTerm, selectedLevel, showModal, studentName, studentAge, selectedSubject } = formState;

  const educationLevels: BerlageEducationLevel[] = [
    {
      id: 'voortgezet',
      titleNL: 'Voortgezet Onderwijs',
      titleEN: 'Secondary Education',
      subjects: businessData.subjects.secondary,
      whatsappIntro: "Hi! I&apos;m looking for tutoring at Berlage",
      hasDiscount: true
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
      title: "Berlage Student Support",
      description: "📚 Expert tutoring for Berlage students! Get help with your subjects, exam preparation, and homework. Start with a free 30-minute trial lesson to experience the difference.",
      cta: "WhatsApp for Trial Lesson",
      whatsappMessage: "Hi! I&apos;m interested in tutoring for Berlage. I&apos;d like to schedule a free trial lesson."
    },
    {
      title: "Exam Preparation",
      description: "🎯 Focused exam preparation sessions to help you succeed. We&apos;ll work on past papers, study techniques, and subject-specific strategies.",
      cta: "WhatsApp for Info",
      whatsappMessage: "Hi! I&apos;m interested in exam preparation tutoring at Berlage. Can you tell me more?"
    },
    {
      title: "Homework Support",
      description: "✏️ Need help with homework or assignments? Get personalized support to understand concepts better and improve your grades.",
      cta: "WhatsApp to Start",
      whatsappMessage: "Hi! I need help with homework/assignments at Berlage. I&apos;d like to learn more about the tutoring options."
    }
  ];

  const handleSubjectClick = (subject: { NL: string; EN: string }, level: BerlageEducationLevel) => {
    dispatch({ type: 'SUBJECT', payload: { subject, level } });
    dispatch({ type: 'MODAL', payload: true });
  };

  const handleSendWhatsApp = () => {
    if (!selectedSubject) return;
    
    const { subject, level } = selectedSubject;
    
    const whatsappMessage = `${level.whatsappIntro}.
Student: ${studentName}
Age: ${studentAge}
Subject: ${subject.EN} (${subject.NL})

Can you tell me more about tutoring for this subject?`;
    
    window.open(`${config.contact.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
    dispatch({ type: 'RESET' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-purple-800 text-white">
      <div className="container mx-auto px-4 py-16 relative">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="flex justify-center mb-4">
            <span className="bg-purple-400/20 text-purple-400 px-4 py-2 rounded-full text-lg">
              Welcome to Berlage Tutoring! 🌟
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-center bg-gradient-to-r from-purple-300 via-purple-400 to-purple-300 text-transparent bg-clip-text">
            Expert Tutoring for Berlage Students
          </h1>
          <p className="text-xl text-center text-purple-200 mb-12">
            Personalized support to help you excel in your studies
          </p>
          
          <div className="bg-purple-800 p-8 rounded-2xl mb-12 shadow-xl border border-purple-300/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-400/5 rounded-full transform translate-x-32 -translate-y-32" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-400/5 rounded-full transform -translate-x-32 translate-y-32" />
            
            <div className="relative">
              <m.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-8"
              >
                <div className="inline-block bg-purple-400/10 rounded-full px-6 py-2 mb-4">
                  <span className="text-purple-400 text-3xl mr-2">⭐</span>
                  <span className="text-purple-400 font-bold">SPECIAL STUDENT OFFER</span>
                  <span className="text-purple-400 text-3xl ml-2">⭐</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-purple-300 via-purple-400 to-purple-300 text-transparent bg-clip-text">
                    Succeed in Your Studies!
                  </span>
                </h2>
              </m.div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-purple-900 p-6 rounded-xl border border-purple-300/50">
                  <div className="flex items-center gap-3 mb-3">
                    <FaMapMarkerAlt className="text-purple-400 text-xl" />
                    <h3 className="font-semibold text-purple-100">Location</h3>
                  </div>
                  <p className="text-purple-200">At Berlage or nearby study locations</p>
                </div>
                
                <div className="bg-purple-900 p-6 rounded-xl border border-purple-300/50">
                  <div className="flex items-center gap-3 mb-3">
                    <FaClock className="text-purple-400 text-xl" />
                    <h3 className="font-semibold text-purple-100">Availability</h3>
                  </div>
                  <p className="text-purple-200">Flexible hours, before or after school</p>
                </div>
                
                <div className="bg-purple-900 p-6 rounded-xl border border-purple-300/50">
                  <div className="flex items-center gap-3 mb-3">
                    <FaCheck className="text-purple-400 text-xl" />
                    <h3 className="font-semibold text-purple-100">Extras</h3>
                  </div>
                  <p className="text-purple-200">Free 30-minute trial lesson!</p>
                </div>
              </div>
            </div>
          </div>

          <BerlageSubjectsSection
            searchTerm={searchTerm}
            setSearchTerm={(v) => dispatch({ type: 'SEARCH', payload: v })}
            selectedLevel={selectedLevel}
            educationLevels={educationLevels}
            filteredSubjects={filteredSubjects}
            handleSubjectClick={handleSubjectClick}
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
            <p className="text-xl text-purple-100 mb-6">
              Questions? Message me directly on WhatsApp!
            </p>
            <a 
              href={`${config.contact.whatsapp}?text=Hi!%20I%20have%20a%20question%20about%20tutoring%20at%20Berlage.`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="bg-green-500 hover:bg-green-400 text-white font-semibold px-8 py-6 text-lg flex items-center gap-2">
                <FaWhatsapp className="text-2xl" />
                WhatsApp Now
              </Button>
            </a>
          </m.div>
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
        contentClassName="bg-purple-900 border border-purple-300/50 text-purple-100"
        titleClassName="text-2xl font-bold text-purple-400"
        descriptionClassName="text-purple-200"
        labelClassName="text-purple-300"
        inputClassName="bg-purple-800 border-purple-300/50 text-purple-100 placeholder:text-purple-200/50"
        cancelClassName="border-purple-300/50 text-purple-200 hover:bg-purple-800 hover:text-purple-100"
      />
    </div>
  );
} 