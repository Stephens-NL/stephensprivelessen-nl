'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Bilingual, ProgramOffer } from '@/data/types';

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

export function OfferVariant({ 
  offer, 
  ctaText,
  educationLevels,
  activeLevel,
  subject
}: OfferVariantProps) {
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
                                handleTimeSelect(time);
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