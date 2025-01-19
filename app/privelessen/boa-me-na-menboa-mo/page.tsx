'use client';

import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useInView } from 'framer-motion';
import { FaStar, FaClock, FaMapMarkerAlt, FaCheck, FaGraduationCap, FaChevronUp, FaChevronDown, FaCoffee, FaSearch, FaHandPointer } from 'react-icons/fa';
import { weekendLocations } from '@/data/weekendTutoring';
import { useState, useRef, useEffect } from 'react';
import { getBusinessData } from '@/data/businessData';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Header from '@/components/Header';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProgramOffer } from '@/data/types';

// Get the content for this page
const content = weekendLocations.find(loc => loc.id === 'boa-me-na-menboa-mo');
if (!content) throw new Error('Content not found for boa-me-na-menboa-mo');

function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorEnlarged, setCursorEnlarged] = useState(false);

  useEffect(() => {
    document.addEventListener('mousemove', (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    });

    return () => {
      document.removeEventListener('mousemove', () => {});
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`fixed pointer-events-none z-50 mix-blend-difference transition-transform duration-300 ease-out ${
        cursorVisible ? 'opacity-100' : 'opacity-0'
      } ${
        cursorEnlarged ? 'scale-[2.5]' : 'scale-100'
      }`}
    >
      <div className="relative w-8 h-8">
        <div className="absolute inset-0 rounded-full bg-yellow-300/30 animate-ping" />
        <div className="absolute inset-2 rounded-full bg-yellow-300" />
      </div>
    </div>
  );
}

function HeroSection() {
  const { language } = useLanguage();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -10]);
  
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const scaleSpring = useSpring(scale, springConfig);
  const rotateSpring = useSpring(rotate, springConfig);

  return (
    <motion.div
      ref={ref}
      className="h-screen relative overflow-hidden flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-amber-950 via-amber-900 to-yellow-900 opacity-50" />
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/patterns/noise.png')] opacity-[0.03] mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent" />
      </div>
      
      <motion.div 
        style={{ 
          y,
          opacity,
          scale: scaleSpring,
          rotateZ: rotateSpring,
        }}
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-8"
        >
          <span className="text-yellow-300 text-lg font-medium tracking-wider uppercase">
            {content.specialOffer[language]}
          </span>
        </motion.div>
        
        <motion.h1 
          className="text-7xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-yellow-300 via-yellow-200 to-yellow-400 mb-6 leading-tight"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          {content.title[language]}
        </motion.h1>

        <motion.p 
          className="text-2xl md:text-4xl text-white/80 mb-12 italic font-light"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          {content.subtitle[language]}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex gap-6 justify-center"
        >
          <Button
            className="bg-yellow-500 hover:bg-yellow-400 text-yellow-900 font-bold text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
            asChild
          >
            <Link href="#offers" className="flex items-center gap-2">
              {content.cta.trial[language]}
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                →
              </motion.span>
            </Link>
          </Button>
          
          <Button
            className="bg-white/10 hover:bg-white/20 text-white font-bold text-lg px-8 py-6 rounded-full backdrop-blur-sm transition-all duration-300"
            asChild
          >
            <Link href="#about">{content.cta.whatsapp[language]}</Link>
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-8 h-14 rounded-full border-2 border-yellow-300/30 flex items-start justify-center p-2">
          <motion.div
            className="w-1 h-3 bg-yellow-300 rounded-full"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

function OfferVariant({ 
  offer, 
  ctaText,
  preSelectedLevel,
  preSelectedSubject,
  educationLevels,
  activeLevel,
  subject
}: { 
  offer: ProgramOffer;
  ctaText: string;
  preSelectedLevel?: string;
  preSelectedSubject?: { NL: string; EN: string; } | undefined;
  educationLevels: Array<{
    id: string;
    title: string;
    subjects: Array<{ NL: string; EN: string; }>;
    icon: string;
    color: string;
  }>;
  activeLevel: string;
  subject: { NL: string; EN: string; };
}) {
  const { language } = useLanguage();
  const [showModal, setShowModal] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [studentAge, setStudentAge] = useState('');
  const [wantsHomeTutoring, setWantsHomeTutoring] = useState(false);
  const [intent, setIntent] = useState<'trial' | 'info'>('info');
  const [selectedTime, setSelectedTime] = useState<string[]>([]);

  const isFormValid = studentName.trim() !== '' && 
    studentAge.trim() !== '' && 
    (intent === 'info' || (intent === 'trial' && selectedTime.length === 3));

  const handleTimeSelect = (time: string) => {
    setSelectedTime(prev => {
      if (prev.includes(time)) {
        return prev.filter(t => t !== time);
      }
      if (prev.length >= 3) return prev;
      
      const newTimes = [...prev, time];
      return newTimes.sort((a, b) => {
        const timeA = new Date(`2024-01-01 ${a}`);
        const timeB = new Date(`2024-01-01 ${b}`);
        return timeA.getTime() - timeB.getTime();
      });
    });
  };

  const getTimeLabel = (index: number) => {
    if (language === 'NL') {
      if (index === 0) return '1e voorkeur';
      if (index === 1) return '2e voorkeur';
      return '3e voorkeur';
    } else {
      if (index === 0) return '1st choice';
      if (index === 1) return '2nd choice';
      return '3rd choice';
    }
  };

  return (
    <motion.div
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
          <Dialog open={showModal} onOpenChange={setShowModal}>
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
                        className="bg-white/5 border-yellow-500/20 text-white focus:border-yellow-500 transition-colors"
                    onChange={(e) => setStudentName(e.target.value)}
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
                    onChange={(e) => setStudentAge(e.target.value)}
                        className="w-full p-3 rounded-lg bg-[#4B2E1D] text-white border border-yellow-500/20 focus:outline-none focus:border-yellow-500 hover:border-yellow-500/50 transition-colors"
                      >
                        <option value="" disabled className="bg-[#2A1810]">
                          {language === 'NL' ? 'Selecteer leeftijd' : 'Select age'}
                        </option>
                        {[
                          { range: '8-12', label: { NL: 'Basisschool', EN: 'Primary School' } },
                          { range: '12-16', label: { NL: 'Middelbare School', EN: 'High School' } },
                          { range: '16-18', label: { NL: 'Bovenbouw', EN: 'Upper Secondary' } },
                          { range: '18+', label: { NL: 'Hoger Onderwijs', EN: 'Higher Education' } }
                        ].map((group) => (
                          <optgroup 
                            key={group.range} 
                            label={`${group.range} ${language === 'NL' ? 'jaar' : 'years'} - ${language === 'NL' ? group.label.NL : group.label.EN}`}
                            className="bg-[#2A1810]"
                          >
                            {Array.from(
                              { length: group.range === '18+' ? 5 : parseInt(group.range.split('-')[1]) - parseInt(group.range.split('-')[0]) + 1 },
                              (_, i) => group.range === '18+' ? i + 18 : parseInt(group.range.split('-')[0]) + i
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
                        {educationLevels.find(level => level.id === activeLevel)?.title}
                </div>
                    </div>
                    <div className="grid gap-4">
                      <Label className="text-yellow-200 flex items-center gap-2">
                        <span className="text-yellow-500">4.</span>
                      {language === 'NL' ? 'Vak' : 'Subject'}
                    </Label>
                      <div className="bg-white/5 border border-yellow-500/20 text-white rounded-md px-3 py-2">
                              {language === 'NL' ? subject.NL : subject.EN}
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
                        className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                          intent === 'info' 
                            ? 'border-yellow-500 bg-yellow-500/10' 
                            : 'border-yellow-500/20 bg-yellow-500/5 hover:border-yellow-500/50'
                        }`}
                        onClick={() => setIntent('info')}
                      >
                        <span className="text-2xl">💡</span>
                        <Label className="text-white text-center cursor-pointer">
                          {language === 'NL' 
                            ? 'Meer informatie' 
                            : 'More information'}
                        </Label>
                      </div>
                      <div 
                        className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                          intent === 'trial' 
                            ? 'border-yellow-500 bg-yellow-500/10' 
                            : 'border-yellow-500/20 bg-yellow-500/5 hover:border-yellow-500/50'
                        }`}
                        onClick={() => setIntent('trial')}
                      >
                        <span className="text-2xl">📚</span>
                        <Label className="text-white text-center cursor-pointer">
                          {language === 'NL' 
                            ? 'Proefles plannen' 
                            : 'Schedule trial'}
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
                            ? (language === 'NL'
                                ? 'Kies drie voorkeuren'
                                : 'Choose three preferences')
                            : selectedTime.length < 3
                              ? (language === 'NL'
                                  ? `Nog ${3 - selectedTime.length}`
                                  : `${3 - selectedTime.length} more`)
                              : (language === 'NL'
                                  ? '✓ Opgeslagen'
                                  : '✓ Saved')}
                        </div>
                      </div>
                      <div className="relative px-1" onClick={(e) => e.stopPropagation()}>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-1.5 sm:gap-2">
                          {[
                            "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
                            "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00"
                          ].map((time) => (
                            <button
                              key={time}
                              type="button"
                              onMouseDown={(e) => e.stopPropagation()}
                              onPointerDown={(e) => e.stopPropagation()}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                const newTimes = selectedTime.includes(time)
                                  ? selectedTime.filter(t => t !== time)
                                  : selectedTime.length < 3
                                    ? [...selectedTime, time].sort((a, b) => {
                                        const timeA = new Date(`2024-01-01 ${a}`);
                                        const timeB = new Date(`2024-01-01 ${b}`);
                                        return timeA.getTime() - timeB.getTime();
                                      })
                                    : selectedTime;
                                setSelectedTime(newTimes);
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
                              <div className="text-sm sm:text-base font-medium">
                                {time}
                              </div>
                              {selectedTime.includes(time) && (
                                <div className="absolute -top-1.5 -right-1.5 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-yellow-400 text-amber-900 flex items-center justify-center text-xs font-bold shadow-lg">
                                  {selectedTime.indexOf(time) + 1}
                                </div>
                              )}
                            </button>
                          ))}
                        </div>
                        <div className="mt-4 text-center text-yellow-200/90 text-sm">
                          {selectedTime.length === 0 
                            ? (language === 'NL'
                                ? 'Kies drie voorkeuren'
                                : 'Choose three preferences')
                            : selectedTime.length < 3
                              ? (language === 'NL'
                                  ? `Nog ${3 - selectedTime.length}`
                                  : `${3 - selectedTime.length} more`)
                              : (language === 'NL'
                                  ? '✓ Opgeslagen'
                                  : '✓ Saved')}
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
                          onChange={(e) => setWantsHomeTutoring(e.target.checked)}
                        />
                        <Label htmlFor="homeTutoring" className="text-yellow-200/90 cursor-pointer">
                          {language === 'NL' 
                            ? 'Bijles aan huis' 
                            : 'Home tutoring'}
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
                    onClick={() => {
                      const fullMessage = `${content.programOffers.weekendTutoring.whatsappMessage[language]}
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
                    }}
                    className="bg-yellow-500 hover:bg-yellow-400 text-yellow-900 font-bold mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!isFormValid}
                  >
                    {!isFormValid 
                      ? (language === 'NL' ? 'Vul alle verplichte velden in (*)' : 'Fill in all required fields (*)')
                      : (language === 'NL' ? 'Verstuur via WhatsApp' : 'Send via WhatsApp')}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function LocationSection() {
  const { language } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.section
      ref={ref}
      id="location"
      className="py-24 px-4"
      style={{
        transform: isInView ? "none" : "translateY(100px)",
        opacity: isInView ? 1 : 0,
        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 mb-4">
            {content.features.location.title[language]}
          </h2>
          <p className="text-white/80 text-lg">
            {content.location.description[language]}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="mt-1">
                <FaMapMarkerAlt className="text-yellow-500 text-2xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-yellow-200 mb-2">
                  {content.location.name[language]}
                </h3>
                <p className="text-white/80">
                  {content.location.address}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="mt-1">
                <FaClock className="text-yellow-500 text-2xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-yellow-200 mb-2">
                  {language === 'NL' ? 'Openingstijden' : 'Opening Hours'}
                </h3>
                <p className="text-white/80">
                  {content.location.hours[language]}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="mt-1">
                <FaCoffee className="text-yellow-500 text-2xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-yellow-200 mb-2">
                  {language === 'NL' ? 'Faciliteiten' : 'Facilities'}
                </h3>
                <p className="text-white/80">
                  {language === 'NL' 
                    ? 'Rustige studieomgeving, gratis WiFi, koffie en thee beschikbaar'
                    : 'Quiet study environment, free WiFi, coffee and tea available'
                  }
                </p>
              </div>
            </div>

            <Button
              className="bg-yellow-500 hover:bg-yellow-400 text-yellow-900 font-bold mt-4"
              asChild
            >
              <Link href={content.location.mapUrl} target="_blank">
                {language === 'NL' ? 'Open in Google Maps' : 'Open in Google Maps'}
              </Link>
            </Button>
          </div>

          <div className="relative aspect-video rounded-2xl overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2438.7374633546367!2d4.945661776676655!3d52.31198427198029!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c60b96d0c5e6cf%3A0x39396e72efb3a37e!2sDouwe%20Egberts%20Cafe!5e0!3m2!1sen!2snl!4v1709924607943!5m2!1sen!2snl"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function AboutSection() {
  const { language } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.section
      ref={ref}
      id="about"
      className="relative z-10 py-24 px-4"
      style={{
        transform: isInView ? "none" : "translateY(100px)",
        opacity: isInView ? 1 : 0,
        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
      }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.h2 
          className="text-4xl font-bold text-yellow-300 mb-8"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          {content.subtitle[language]}
        </motion.h2>
        <motion.div 
          className="prose prose-lg prose-invert"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="space-y-6">
            {content.proverb && (
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-300">{content.proverb.text[language]}</p>
                <p className="text-lg text-yellow-200/80">{content.proverb.meaning[language]}</p>
              </div>
            )}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-yellow-300 mb-3">
                  <FaMapMarkerAlt className="text-xl" />
                  <h3 className="font-medium">{content.features.location.title[language]}</h3>
                </div>
                <p className="text-white/90">{content.features.location.text[language]}</p>
              </div>
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-yellow-300 mb-3">
                  <FaClock className="text-xl" />
                  <h3 className="font-medium">{content.features.availability.title[language]}</h3>
                </div>
                <p className="text-white/90">{content.features.availability.text[language]}</p>
              </div>
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-yellow-300 mb-3">
                  <FaCheck className="text-xl" />
                  <h3 className="font-medium">{content.features.extras.title[language]}</h3>
                </div>
                <p className="text-white/90">{content.features.extras.text[language]}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

function SubjectsSection({
  educationLevels,
  activeLevel,
  setActiveLevel,
  subject,
  setSubject
}: {
  educationLevels: Array<{
    id: string;
    title: string;
    subjects: Array<{ NL: string; EN: string; }>;
    icon: string;
    color: string;
  }>;
  activeLevel: string;
  setActiveLevel: (level: string) => void;
  subject: { NL: string; EN: string; };
  setSubject: (subject: { NL: string; EN: string; }) => void;
}) {
  const { language } = useLanguage();
  const { t } = useTranslation();
  const businessData = getBusinessData(t);
  const [hoveredSubject, setHoveredSubject] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentAge, setStudentAge] = useState('');
  const [wantsHomeTutoring, setWantsHomeTutoring] = useState(false);
  const [intent, setIntent] = useState<'trial' | 'info'>('info');
  const [selectedTime, setSelectedTime] = useState<string[]>([]);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const getActiveSubjects = (levelId: string) => {
    const level = educationLevels.find(l => l.id === levelId);
    return level ? level.subjects : [];
  };

  // Filter subjects based on search query
  const filteredSubjects = searchQuery
    ? businessData.subjects.all.filter(subject => {
        const query = searchQuery.toLowerCase();
        // Check both NL and EN versions of the subject name
        const matchesNL = subject.NL.toLowerCase().includes(query);
        const matchesEN = subject.EN.toLowerCase().includes(query);
        // Also check common variations (e.g., "scheikunde" should match "chemistry")
        const commonVariations: Record<string, string[]> = {
          'scheikunde': ['chemistry'],
          'chemistry': ['scheikunde'],
          'wiskunde': ['mathematics', 'math'],
          'mathematics': ['wiskunde'],
          'math': ['wiskunde'],
          'natuurkunde': ['physics'],
          'physics': ['natuurkunde'],
          'aardrijkskunde': ['geography'],
          'geography': ['aardrijkskunde'],
          'geschiedenis': ['history'],
          'history': ['geschiedenis'],
          'economie': ['economics'],
          'economics': ['economie'],
          'biologie': ['biology'],
          'biology': ['biologie'],
          'engels': ['english'],
          'english': ['engels'],
          'nederlands': ['dutch'],
          'dutch': ['nederlands'],
          'frans': ['french'],
          'french': ['frans'],
          'duits': ['german'],
          'german': ['duits'],
          'spaans': ['spanish'],
          'spanish': ['spaans'],
          'informatica': ['computer science', 'programming'],
          'programming': ['informatica', 'programmeren'],
          'computer science': ['informatica']
        };

        // Check if the search query matches any common variations
        const variations = Object.entries(commonVariations).find(([key]) => 
          query.includes(key.toLowerCase())
        );
        
        const matchesVariation = variations ? 
          variations[1].some(variant => 
            subject.NL.toLowerCase().includes(variant.toLowerCase()) || 
            subject.EN.toLowerCase().includes(variant.toLowerCase())
          ) : false;

        return matchesNL || matchesEN || matchesVariation;
      })
    : getActiveSubjects(activeLevel);

  // Ensure each subject has a unique key by combining level, language, and subject name
  const subjectsWithKeys = filteredSubjects.map(subject => ({
    ...subject,
    uniqueKey: `${activeLevel}-${language}-${subject.EN}-${subject.NL}`
  }));

  const getTimeLabel = (index: number) => {
    if (language === 'NL') {
      if (index === 0) return '1e voorkeur';
      if (index === 1) return '2e voorkeur';
      return '3e voorkeur';
    } else {
      if (index === 0) return '1st choice';
      if (index === 1) return '2nd choice';
      return '3rd choice';
    }
  };

  const handleTimeSelect = (time: string) => {
    if (selectedTime.includes(time)) {
      const newTimes = selectedTime.filter(t => t !== time);
      setSelectedTime(newTimes);
    } else if (selectedTime.length < 3) {
      const newTimes = [...selectedTime, time];
      newTimes.sort((a, b) => {
        const timeA = new Date(`2024-01-01 ${a}`);
        const timeB = new Date(`2024-01-01 ${b}`);
        return timeA.getTime() - timeB.getTime();
      });
      setSelectedTime(newTimes);
    }
  };

  const isFormValid = studentName.trim() !== '' && 
    studentAge.trim() !== '' && 
    (intent === 'info' || (intent === 'trial' && selectedTime.length > 0));

  const handleCustomSubject = () => {
    const customSubject = {
      NL: searchQuery,
      EN: searchQuery
    };
    
    return (
      <Dialog open={showModal} onClose={() => setShowModal(false)}>
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md bg-[#2A1810] rounded-xl p-6 shadow-xl">
            <Dialog.Title className="text-2xl font-bold text-yellow-300 mb-4">
              {language === 'NL' ? 'Plan je gratis proefles' : 'Schedule your free trial'}
            </Dialog.Title>
            
            {/* Student Information Form */}
            <div className="space-y-4">
              <input
                type="text"
                placeholder={language === 'NL' ? 'Naam' : 'Name'}
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:border-yellow-500"
              />
              
              <select
                value={studentAge}
                onChange={(e) => setStudentAge(e.target.value)}
                className="w-full p-3 rounded-lg bg-[#4B2E1D] text-white border border-yellow-500/20 focus:outline-none focus:border-yellow-500 hover:border-yellow-500/50 transition-colors"
              >
                <option value="" disabled className="bg-[#2A1810]">
                  {language === 'NL' ? 'Selecteer leeftijd' : 'Select age'}
                </option>
                {[
                  { range: '8-12', label: { NL: 'Basisschool', EN: 'Primary School' } },
                  { range: '12-16', label: { NL: 'Middelbare School', EN: 'High School' } },
                  { range: '16-18', label: { NL: 'Bovenbouw', EN: 'Upper Secondary' } },
                  { range: '18+', label: { NL: 'Hoger Onderwijs', EN: 'Higher Education' } }
                ].map((group) => (
                  <optgroup 
                    key={group.range} 
                    label={`${group.range} ${language === 'NL' ? 'jaar' : 'years'} - ${language === 'NL' ? group.label.NL : group.label.EN}`}
                    className="bg-[#2A1810]"
                  >
                    {Array.from(
                      { length: group.range === '18+' ? 5 : parseInt(group.range.split('-')[1]) - parseInt(group.range.split('-')[0]) + 1 },
                      (_, i) => group.range === '18+' ? i + 18 : parseInt(group.range.split('-')[0]) + i
                    ).map((age) => (
                      <option key={age} value={age} className="bg-[#2A1810]">
                        {age} {language === 'NL' ? 'jaar' : 'years'}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
              
              {/* Rest of the form */}
              // ... existing code ...
            </div>
          </Dialog.Panel>
              </div>
      </Dialog>
    );
  };

  const renderSubjects = (subjects: Array<{ NL: string, EN: string }>) => {
    return subjects.map((subject) => (
      <motion.div
        key={`${selectedLevel}-${subject.NL}`}
        className="group relative bg-[#4B2E1D] rounded-xl p-5 cursor-pointer hover:bg-[#5B3E2D] transition-all duration-300 hover:scale-[1.02]"
              onClick={() => {
          setSelectedSubject(language === 'NL' ? subject.NL : subject.EN);
          setShowModal(true);
        }}
      >
        <div className="space-y-3">
          <p className="text-2xl font-bold text-yellow-300">
            {language === 'NL' ? subject.NL : subject.EN}
          </p>
          <p className="text-base text-white/80 font-medium">
            {language === 'NL' ? subject.EN : subject.NL}
          </p>
          <div className="flex items-center gap-2 mt-4 text-sm text-yellow-200/90 group-hover:text-yellow-200 transition-colors">
            <FaHandPointer className="text-yellow-300 group-hover:text-yellow-400 transition-colors" />
            <p>{language === 'NL' ? 'Tik voor gratis proefles' : 'Tap for free trial'}</p>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300" />
      </motion.div>
    ));
  };

  return (
    <motion.section
      ref={ref}
      id="subjects"
      className="relative z-10 py-24 px-4"
      style={{
        transform: isInView ? "none" : "translateY(100px)",
        opacity: isInView ? 1 : 0,
        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
      }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-5xl font-bold text-white mb-16 text-center"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          {language === 'NL' ? 'Beschikbare Vakken' : 'Available Subjects'}
        </motion.h2>

        <div className="flex flex-col items-center gap-8 mb-16">
          <div className="w-full max-w-xl">
            <div className="relative">
              <Input
                className="w-full bg-white/5 border-yellow-500/20 text-white placeholder:text-white/50 pl-12 py-6 text-lg"
                placeholder={language === 'NL' ? 'Zoek een vak of voer je eigen vak in...' : 'Search a subject or enter your own...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-500/50" />
            </div>
          </div>

          {!searchQuery && (
            <div className="inline-flex bg-white/5 rounded-2xl p-1.5 backdrop-blur-sm">
              {educationLevels.map((level) => (
                <motion.button
                  key={level.id}
                  onClick={() => setActiveLevel(level.id)}
                  className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 relative ${
                    activeLevel === level.id 
                      ? 'text-amber-950' 
                      : 'text-white hover:text-yellow-200'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {activeLevel === level.id && (
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${level.color} rounded-xl`}
                      layoutId="activePill"
                      transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                    />
                  )}
                  <span className="relative flex items-center gap-2">
                    <span>{level.icon}</span>
                    <span>{level.title}</span>
                  </span>
                </motion.button>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence mode="wait">
            {subjectsWithKeys.map((subject, index) => (
              <motion.div
                key={subject.uniqueKey}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ 
                  duration: 0.3,
                  delay: index * 0.05,
                  ease: "easeOut"
                }}
                onHoverStart={() => setHoveredSubject(subject.NL)}
                onHoverEnd={() => setHoveredSubject(null)}
                className="group relative"
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="cursor-pointer">
                <div className={`absolute inset-0 bg-gradient-to-r ${
                  educationLevels.find(level => level.id === activeLevel)?.color
                      } opacity-0 group-hover:opacity-100 rounded-xl transition-all duration-300 blur-sm`} />
                      
                      <div className="relative h-full bg-[#4B2E1D] group-hover:bg-[#5B3E2D] backdrop-blur-sm rounded-xl border border-yellow-500/20 group-hover:border-yellow-500 transition-all duration-300 overflow-hidden shadow-lg group-hover:shadow-yellow-500/20">
                        <div className="p-6 h-full flex flex-col justify-between">
                          <div>
                            <h3 className="text-2xl font-bold text-yellow-300 group-hover:text-yellow-200 transition-colors">
                      {language === 'NL' ? subject.NL : subject.EN}
                    </h3>
                            <p className="text-base text-white/80 group-hover:text-white/90 mt-2 font-medium">
                              {language === 'NL' ? subject.EN : subject.NL}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 mt-4 text-sm text-yellow-200/75 group-hover:text-yellow-200">
                            <FaHandPointer className="text-yellow-300 group-hover:text-yellow-400" />
                            <p>{language === 'NL' ? 'Tik voor gratis proefles' : 'Tap for free trial'}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                        </DialogTrigger>
                        <DialogContent className="bg-amber-950/90 backdrop-blur-xl border border-yellow-500/20">
                          <DialogHeader>
                            <DialogTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">
                              {language === 'NL' ? 'Even je gegevens' : 'Your details'}
                            </DialogTitle>
                      <DialogDescription className="text-yellow-200/80">
                        {language === 'NL' 
                          ? 'Vul je gegevens in en kies wat je wilt doen' 
                          : 'Fill in your details and choose what you want to do'}
                      </DialogDescription>
                          </DialogHeader>
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
                            className="bg-white/5 border-yellow-500/20 text-white focus:border-yellow-500 transition-colors"
                                onChange={(e) => setStudentName(e.target.value)}
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
                                onChange={(e) => setStudentAge(e.target.value)}
                            className="w-full p-3 rounded-lg bg-[#4B2E1D] text-white border border-yellow-500/20 focus:outline-none focus:border-yellow-500 hover:border-yellow-500/50 transition-colors"
                          >
                            <option value="" disabled className="bg-[#2A1810]">
                              {language === 'NL' ? 'Selecteer leeftijd' : 'Select age'}
                            </option>
                            {[
                              { range: '8-12', label: { NL: 'Basisschool', EN: 'Primary School' } },
                              { range: '12-16', label: { NL: 'Middelbare School', EN: 'High School' } },
                              { range: '16-18', label: { NL: 'Bovenbouw', EN: 'Upper Secondary' } },
                              { range: '18+', label: { NL: 'Hoger Onderwijs', EN: 'Higher Education' } }
                            ].map((group) => (
                              <optgroup 
                                key={group.range} 
                                label={`${group.range} ${language === 'NL' ? 'jaar' : 'years'} - ${language === 'NL' ? group.label.NL : group.label.EN}`}
                                className="bg-[#2A1810]"
                              >
                                {Array.from(
                                  { length: group.range === '18+' ? 5 : parseInt(group.range.split('-')[1]) - parseInt(group.range.split('-')[0]) + 1 },
                                  (_, i) => group.range === '18+' ? i + 18 : parseInt(group.range.split('-')[0]) + i
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
                                {educationLevels.find(level => level.id === activeLevel)?.title}
                              </div>
                            </div>
                        <div className="grid gap-4">
                          <Label className="text-yellow-200 flex items-center gap-2">
                            <span className="text-yellow-500">4.</span>
                                {language === 'NL' ? 'Vak' : 'Subject'}
                              </Label>
                              <div className="bg-white/5 border border-yellow-500/20 text-white rounded-md px-3 py-2">
                                {language === 'NL' ? subject.NL : subject.EN}
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
                            className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                              intent === 'info' 
                                ? 'border-yellow-500 bg-yellow-500/10' 
                                : 'border-yellow-500/20 bg-yellow-500/5 hover:border-yellow-500/50'
                            }`}
                            onClick={() => setIntent('info')}
                          >
                            <span className="text-2xl">💡</span>
                            <Label className="text-white text-center cursor-pointer">
                              {language === 'NL' 
                                ? 'Meer informatie' 
                                : 'More information'}
                            </Label>
                          </div>
                          <div 
                            className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                              intent === 'trial' 
                                ? 'border-yellow-500 bg-yellow-500/10' 
                                : 'border-yellow-500/20 bg-yellow-500/5 hover:border-yellow-500/50'
                            }`}
                            onClick={() => setIntent('trial')}
                          >
                            <span className="text-2xl">📚</span>
                            <Label className="text-white text-center cursor-pointer">
                              {language === 'NL' 
                                ? 'Proefles plannen' 
                                : 'Schedule trial'}
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
                                ? (language === 'NL'
                                    ? 'Kies drie voorkeuren'
                                    : 'Choose three preferences')
                                : selectedTime.length < 3
                                  ? (language === 'NL'
                                      ? `Nog ${3 - selectedTime.length}`
                                      : `${3 - selectedTime.length} more`)
                                  : (language === 'NL'
                                      ? '✓ Opgeslagen'
                                      : '✓ Saved')}
                            </div>
                          </div>
                          <div className="relative px-1" onClick={(e) => e.stopPropagation()}>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-1.5 sm:gap-2">
                              {[
                                "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
                                "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00"
                              ].map((time) => (
                                <button
                                  key={time}
                                  type="button"
                                  onMouseDown={(e) => e.stopPropagation()}
                                  onPointerDown={(e) => e.stopPropagation()}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    const newTimes = selectedTime.includes(time)
                                      ? selectedTime.filter(t => t !== time)
                                      : selectedTime.length < 3
                                        ? [...selectedTime, time].sort((a, b) => {
                                            const timeA = new Date(`2024-01-01 ${a}`);
                                            const timeB = new Date(`2024-01-01 ${b}`);
                                            return timeA.getTime() - timeB.getTime();
                                          })
                                        : selectedTime;
                                    setSelectedTime(newTimes);
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
                                  <div className="text-sm sm:text-base font-medium">
                                    {time}
                                  </div>
                                  {selectedTime.includes(time) && (
                                    <div className="absolute -top-1.5 -right-1.5 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-yellow-400 text-amber-900 flex items-center justify-center text-xs font-bold shadow-lg">
                                      {selectedTime.indexOf(time) + 1}
                                    </div>
                                  )}
                                </button>
                              ))}
                            </div>
                            <div className="mt-4 text-center text-yellow-200/90 text-sm">
                              {selectedTime.length === 0 
                                ? (language === 'NL'
                                    ? 'Kies drie voorkeuren'
                                    : 'Choose three preferences')
                                : selectedTime.length < 3
                                  ? (language === 'NL'
                                      ? `Nog ${3 - selectedTime.length}`
                                      : `${3 - selectedTime.length} more`)
                                  : (language === 'NL'
                                      ? '✓ Opgeslagen'
                                      : '✓ Saved')}
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
                              onChange={(e) => setWantsHomeTutoring(e.target.checked)}
                            />
                            <Label htmlFor="homeTutoring" className="text-yellow-200/90 cursor-pointer">
                              {language === 'NL' 
                                ? 'Bijles aan huis' 
                                : 'Home tutoring'}
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
                              onClick={() => {
                                const fullMessage = `${content.programOffers.weekendTutoring.whatsappMessage[language]}
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
                        }}
                        className="bg-yellow-500 hover:bg-yellow-400 text-yellow-900 font-bold mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!isFormValid}
                      >
                        {!isFormValid 
                          ? (language === 'NL' ? 'Vul alle verplichte velden in (*)' : 'Fill in all required fields (*)')
                          : (language === 'NL' ? 'Verstuur via WhatsApp' : 'Send via WhatsApp')}
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {searchQuery && filteredSubjects.length === 0 && handleCustomSubject()}
      </div>
    </motion.section>
  );
}

function PricingSection() {
  const { language } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.section
      ref={ref}
      id="pricing"
      className="relative z-10 py-24 px-4"
      style={{
        transform: isInView ? "none" : "translateY(100px)",
        opacity: isInView ? 1 : 0,
        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          {/* Regular Price */}
          <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm w-full md:w-64">
            <h3 className="text-lg font-medium text-yellow-200 mb-2">
              {content.pricing.regularPrice.label[language]}
            </h3>
            <div className="text-3xl font-bold mb-1 line-through text-white/70">
              €{content.pricing.regularPrice.amount}
            </div>
            <div className="text-sm text-white/60">
              {content.pricing.regularPrice.perHour[language]}
            </div>
          </div>

          {/* Arrow */}
          <div className="text-4xl text-yellow-300">→</div>

          {/* Community Rate */}
          <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-6 w-full md:w-72">
            <h3 className="text-lg font-medium text-white mb-2">
              {content.pricing.communityRate.label[language]}
            </h3>
            <div className="text-5xl font-bold mb-1">€{content.pricing.communityRate.amount}</div>
            <div className="text-sm mb-2">{content.pricing.communityRate.perHour[language]}</div>
            <div className="bg-yellow-400 text-yellow-900 text-sm font-bold py-1 px-3 rounded-full inline-block">
              {content.pricing.communityRate.savings[language]}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default function Page() {
  const { language } = useLanguage();
  const { t } = useTranslation();
  const businessData = getBusinessData(t);
  const [activeLevel, setActiveLevel] = useState('basis');
  const [subject, setSubject] = useState(businessData.subjects.primary[0]);

  // Update subject when level changes
  const handleLevelChange = (levelId: string) => {
    setActiveLevel(levelId);
    // Set the first subject of the new level
    switch (levelId) {
      case 'basis':
        setSubject(businessData.subjects.primary[0]);
        break;
      case 'voortgezet':
        setSubject(businessData.subjects.secondary[0]);
        break;
      case 'hoger':
        setSubject(businessData.subjects.higher[0]);
        break;
    }
  };

  const educationLevels = [
    {
      id: 'basis',
      title: language === 'NL' ? 'Basisonderwijs' : 'Primary Education',
      subjects: businessData.subjects.primary,
      icon: '🎓',
      color: 'from-amber-400 to-yellow-400'
    },
    {
      id: 'voortgezet',
      title: language === 'NL' ? 'Voortgezet Onderwijs' : 'Secondary Education',
      subjects: businessData.subjects.secondary,
      icon: '📚',
      color: 'from-yellow-400 to-yellow-500'
    },
    {
      id: 'hoger',
      title: language === 'NL' ? 'Hoger Onderwijs' : 'Higher Education',
      subjects: [...businessData.subjects.higher, ...businessData.subjects.programming],
      icon: '🎯',
      color: 'from-yellow-500 to-amber-500'
    }
  ];

  return (
    <div className="min-h-screen bg-amber-950 text-white">
      <CustomCursor />
      <Header />
      <HeroSection />
      <AboutSection />
      <SubjectsSection 
        educationLevels={educationLevels}
        activeLevel={activeLevel}
        setActiveLevel={handleLevelChange}
        subject={subject}
        setSubject={setSubject}
      />
      <PricingSection />
      <section id="offers" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 mb-4">
              {content.specialOffer[language]}
            </h2>
            <div className="flex items-center justify-center gap-2 text-lg text-yellow-200">
              <FaStar className="text-yellow-500" />
              <span>{content.discount.text[language]}</span>
              <FaStar className="text-yellow-500" />
            </div>
            <p className="text-white/60">
              {content.discount.subtext[language]}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <OfferVariant 
              offer={content.programOffers.weekendTutoring} 
              ctaText={content.cta.trial[language]} 
              educationLevels={educationLevels}
              activeLevel={activeLevel}
              subject={subject}
            />
            <OfferVariant 
              offer={content.programOffers.personalCoaching} 
              ctaText={content.cta.trial[language]} 
              educationLevels={educationLevels}
              activeLevel={activeLevel}
              subject={subject}
            />
            <OfferVariant 
              offer={content.programOffers.flexibleSupport} 
              ctaText={content.cta.trial[language]} 
              educationLevels={educationLevels}
              activeLevel={activeLevel}
              subject={subject}
            />
          </div>
        </div>
      </section>
      <LocationSection />
    </div>
  );
} 