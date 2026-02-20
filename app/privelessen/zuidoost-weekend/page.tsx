'use client';

import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/contexts/LanguageContext';
import { m, AnimatePresence } from 'framer-motion';
import { FaStar, FaClock, FaMapMarkerAlt, FaCheck, FaGraduationCap, FaChevronUp, FaChevronDown, FaCoffee } from 'react-icons/fa';
import { weekendLocations } from '@/data/weekendTutoring';
import { useState } from 'react';
import { getBusinessData } from '@/data/businessData';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { config } from '@/data/config';

interface Subject {
  NL: string;
  EN: string;
  id: string;
}

type EducationLevel = {
  id: string;
  titleNL: string;
  titleEN: string;
  subjects: Array<{ NL: string; EN: string }>;
};

function StudentInfoDialogContent({ educationLevels, whatsappMessage }: { educationLevels: EducationLevel[]; whatsappMessage: string }) {
  const { language } = useLanguage();
  const [studentName, setStudentName] = useState('');
  const [studentAge, setStudentAge] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');

  const handleSubmit = () => {
    const level = educationLevels.find(l => l.id === selectedLevel);
    const subject = level?.subjects.find(s => s.NL === selectedSubject || s.EN === selectedSubject);
    const message = `${whatsappMessage}\n- Name: ${studentName}\n- Age: ${studentAge}\n- Level: ${language === 'NL' ? level?.titleNL : level?.titleEN}\n- Subject: ${language === 'NL' ? subject?.NL : subject?.EN}`;
    window.open(`${config.contact.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="grid gap-4 py-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" value={studentName} onChange={(e) => setStudentName(e.target.value)} className="bg-white/10 border-white/20 text-white" placeholder="Enter student's name" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="age">Age</Label>
        <Input id="age" value={studentAge} onChange={(e) => setStudentAge(e.target.value)} className="bg-white/10 border-white/20 text-white" placeholder="Enter student's age" type="number" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="level">Education Level</Label>
        <Select value={selectedLevel} onValueChange={setSelectedLevel}>
          <SelectTrigger className="bg-white/10 border-white/20 text-white"><SelectValue placeholder="Select level" /></SelectTrigger>
          <SelectContent className="bg-amber-900 text-white">
            {educationLevels.map((level) => (
              <SelectItem key={level.id} value={level.id}>{language === 'NL' ? level.titleNL : level.titleEN}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {selectedLevel && (
        <div className="grid gap-2">
          <Label htmlFor="subject">Subject</Label>
          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white"><SelectValue placeholder="Select subject" /></SelectTrigger>
            <SelectContent className="bg-amber-900 text-white">
              {educationLevels.find(l => l.id === selectedLevel)?.subjects.map((subject) => (
                <SelectItem key={`${selectedLevel}-${subject.NL}`} value={language === 'NL' ? subject.NL : subject.EN}>
                  {language === 'NL' ? subject.NL : subject.EN}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      <Button onClick={handleSubmit} className="bg-yellow-500 hover:bg-yellow-400 text-yellow-900 font-bold mt-4" disabled={!studentName || !studentAge || !selectedLevel || !selectedSubject}>
        Continue to WhatsApp
      </Button>
    </div>
  );
}

function OfferVariant({ title, description, cta, whatsappMessage, educationLevels }: { 
  title: string; 
  description: string; 
  cta: string; 
  whatsappMessage: string;
  educationLevels: Array<{
    id: string;
    titleNL: string;
    titleEN: string;
    subjects: Array<{ NL: string; EN: string; }>;
  }>;
}) {
  const [showModal, setShowModal] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [studentAge, setStudentAge] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const { language } = useLanguage();

  const handleSubmit = () => {
    const level = educationLevels.find(l => l.id === selectedLevel);
    const subject = level?.subjects.find(s => s.NL === selectedSubject || s.EN === selectedSubject);
    
    const fullMessage = `${whatsappMessage}
- Name: ${studentName}
- Age: ${studentAge}
- Level: ${language === 'NL' ? level?.titleNL : level?.titleEN}
- Subject: ${language === 'NL' ? subject?.NL : subject?.EN}`;

    window.open(`${config.contact.whatsapp}?text=${encodeURIComponent(fullMessage)}`, '_blank');
    setShowModal(false);
  };

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 rounded-xl p-6 backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
    >
      <h3 className="text-xl font-bold text-yellow-300 mb-4">{title}</h3>
      <p className="text-white/90 mb-6">{description}</p>
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogTrigger asChild>
          <Button
            className="bg-yellow-500 hover:bg-yellow-400 text-yellow-900 font-bold"
          >
            {cta}
          </Button>
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
                onChange={(e) => setStudentName(e.target.value)}
                className="bg-white/10 border-white/20 text-white"
                placeholder="Enter student's name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                value={studentAge}
                onChange={(e) => setStudentAge(e.target.value)}
                className="bg-white/10 border-white/20 text-white"
                placeholder="Enter student's age"
                type="number"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="level">Education Level</Label>
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
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
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent className="bg-amber-900 text-white">
                    {educationLevels
                      .find(l => l.id === selectedLevel)
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
              onClick={() => {
                const level = educationLevels.find(l => l.id === selectedLevel);
                const subject = level?.subjects.find(s => s.NL === selectedSubject || s.EN === selectedSubject);
                
                const message = `Hi! I have some questions about weekend tutoring.
- Name: ${studentName}
- Age: ${studentAge}
- Level: ${language === 'NL' ? level?.titleNL : level?.titleEN}
- Subject: ${language === 'NL' ? subject?.NL : subject?.EN}`;

                window.open(`${config.contact.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
                setShowModal(false);
              }}
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

function LocationMap() {
  const [showMap, setShowMap] = useState(true);
  const { language } = useLanguage();

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 mb-12">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <FaCoffee className="text-3xl text-yellow-300" />
          <h2 className="text-2xl font-bold text-white">
            {language === 'NL' ? 'Locatie: Douwe Egberts Café' : 'Location: Douwe Egberts Café'}
          </h2>
        </div>
        <button
          onClick={() => setShowMap(!showMap)}
          className="p-3 hover:bg-white/10 rounded-xl transition-colors"
        >
          {showMap ? <FaChevronUp className="text-yellow-300" /> : <FaChevronDown className="text-yellow-300" />}
        </button>
      </div>

      <AnimatePresence>
        {showMap && (
          <m.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="space-y-4">
              <p className="text-white/90 text-lg mb-4">
                {language === 'NL' 
                  ? 'Centraal gelegen in Amsterdam Zuidoost, direct bij metrostation Bijlmer Arena. Makkelijk bereikbaar met OV en auto.'
                  : 'Centrally located in Amsterdam Zuidoost, right at Bijlmer Arena metro station. Easily accessible by public transport and car.'}
              </p>
              <div className="relative w-full h-[400px] rounded-xl overflow-hidden">
                <iframe
                  title="Location map"
                  src="https://maps.app.goo.gl/nMBBA9MAaKhDrPmSA?g_st=iwb"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                />
              </div>
              <div className="flex items-center gap-2 text-white/90 mt-4">
                <FaMapMarkerAlt className="text-yellow-300" />
                <span>Bijlmerplein 888, 1102 MG Amsterdam</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <FaClock className="text-yellow-300" />
                <span>{language === 'NL' ? 'Dagelijks geopend: 08:00 - 22:00' : 'Open daily: 08:00 - 22:00'}</span>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ZuidoostWeekendPage() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const content = weekendLocations.find(loc => loc.id === 'zuidoost-weekend');
  if (!content) throw new Error('Content not found for zuidoost-weekend');
  const businessData = getBusinessData(t);
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [showCourses, setShowCourses] = useState(true);

  const educationLevels = [
    {
      id: 'basis',
      titleNL: 'Basisonderwijs',
      titleEN: 'Primary Education',
      subjects: businessData.subjects.primary,
      whatsappIntro: "Hi! I'm looking for primary school tutoring",
      hasDiscount: true
    },
    {
      id: 'voortgezet',
      titleNL: 'Voortgezet Onderwijs',
      titleEN: 'Secondary Education',
      subjects: businessData.subjects.secondary,
      whatsappIntro: "Hi! I'm looking for high school tutoring",
      hasDiscount: true
    },
    {
      id: 'hoger',
      titleNL: 'Hoger Onderwijs',
      titleEN: 'Higher Education',
      subjects: [...businessData.subjects.higher, ...businessData.subjects.programming],
      whatsappIntro: "Hi! I'm looking for university level tutoring",
      hasDiscount: false
    }
  ];

  const renderSubjects = (subjects: Array<{ NL: string, EN: string }>) => {
    return (
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-8"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {subjects.map((subject, index) => (
            <m.div 
              key={`${selectedLevel}-${subject.NL}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.3,
                delay: index * 0.05,
                ease: "easeOut"
              }}
              className="group relative flex items-center bg-white/10 backdrop-blur-sm
                       rounded-xl transition-all duration-300 
                       border border-white/10 hover:border-white/20
                       transform hover:-translate-y-1 overflow-hidden h-[60px] w-full
                       hover:shadow-lg hover:shadow-black/20"
            >
              <div className="flex-1 p-4 overflow-hidden">
                <div className="overflow-hidden">
                  <m.span 
                    className="text-white/90 group-hover:text-white font-medium transition-colors inline-block whitespace-nowrap"
                  >
                    {language === 'NL' ? subject.NL : subject.EN}
                  </m.span>
                </div>
              </div>
            </m.div>
          ))}
        </div>
      </m.div>
    );
  };

  const offers = [
    {
      title: "Weekend Tutoring for Students",
      description: "🎓 Special community discount for students in Zuidoost! Only €30 per hour (regular €60). Home tutoring available in Gein or at Douwe Egberts. Start with a free 30-minute trial lesson!",
      cta: "Book Free Trial",
      whatsappMessage: "Hi! I'm interested in the weekend tutoring special offer (€30/hour). I'd like to schedule a free trial lesson."
    },
    {
      title: "Personal Coaching & Study Support",
      description: "💡 Need guidance with your studies or personal development? Available weekends for €30/hour in Zuidoost. First 30-minute consultation is free.",
      cta: "Get Info",
      whatsappMessage: "Hi! I'm interested in personal coaching/study support (€30/hour weekend offer). Can you tell me more?"
    },
    {
      title: "Flexible Weekend Support",
      description: "✨ Whether it's math, coaching, or just discussing your studies - I'm here to help! Special rate of €30/hour (save €30). Available at Douwe Egberts or home tutoring in Gein.",
      cta: "Start Now",
      whatsappMessage: "Hi! I'm interested in the flexible weekend support (€30/hour). I'd like to learn more about the possibilities."
    }
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-amber-900 to-amber-700 pt-14 md:pt-24">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center text-white">
            {/* Special Offer Banner */}
            <div className="inline-block bg-yellow-500/20 rounded-full px-6 py-2 mb-6">
              <div className="flex items-center gap-2 text-yellow-300 font-bold">
                <FaStar />
                <span>{t(content.specialOffer)}</span>
                <FaStar />
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {t(content.title)}
            </h1>
            <h2 className="text-2xl md:text-3xl mb-6">
              {t(content.subtitle)}
            </h2>

            {/* Big Discount Text */}
            <div className="mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-yellow-300 mb-2">
                {t(content.discount.text)}
              </h2>
              <p className="text-xl text-yellow-200">{t(content.discount.subtext)}</p>
            </div>

            {/* Pricing Comparison */}
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-12">
              {/* Regular Price */}
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm w-full md:w-64">
                <h3 className="text-lg font-medium text-yellow-200 mb-2">
                  {t(content.pricing.regularPrice.label)}
                </h3>
                <div className="text-3xl font-bold mb-1 line-through text-white/70">
                  €{content.pricing.regularPrice.amount}
                </div>
                <div className="text-sm text-white/60">{t(content.pricing.regularPrice.perHour)}</div>
              </div>

              {/* Arrow */}
              <div className="text-4xl text-yellow-300">→</div>

              {/* Community Rate */}
              <Dialog>
                <DialogTrigger asChild>
                  <m.div 
                    className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-6 w-full md:w-72 
                             transform hover:scale-105 transition-transform duration-300 cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <h3 className="text-lg font-medium text-white mb-2">
                      {t(content.pricing.communityRate.label)}
                    </h3>
                    <div className="text-5xl font-bold mb-1">€{content.pricing.communityRate.amount}</div>
                    <div className="text-sm mb-2">{t(content.pricing.communityRate.perHour)}</div>
                    <div className="bg-yellow-400 text-yellow-900 text-sm font-bold py-1 px-3 rounded-full inline-block">
                      {t(content.pricing.communityRate.savings)}
                    </div>
                  </m.div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-amber-900 text-white">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-yellow-300 mb-4">Student Information</DialogTitle>
                  </DialogHeader>
                  <StudentInfoDialogContent
                    educationLevels={educationLevels}
                    whatsappMessage="Hi! I'm interested in the €30/hour weekend tutoring special offer!"
                  />
                </DialogContent>
              </Dialog>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-yellow-300 mb-3">
                  <FaMapMarkerAlt className="text-xl" />
                  <h3 className="font-medium">{t(content.features.location.title)}</h3>
                </div>
                <p className="text-white/90">{t(content.features.location.text)}</p>
              </div>

              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-yellow-300 mb-3">
                  <FaClock className="text-xl" />
                  <h3 className="font-medium">{t(content.features.availability.title)}</h3>
                </div>
                <p className="text-white/90">{t(content.features.availability.text)}</p>
              </div>

              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-yellow-300 mb-3">
                  <FaCheck className="text-xl" />
                  <h3 className="font-medium">{t(content.features.extras.title)}</h3>
                </div>
                <p className="text-white/90">{t(content.features.extras.text)}</p>
              </div>
            </div>

            {/* Location Map */}
            <LocationMap />

            {/* Available Subjects Section */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 mb-12">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <FaGraduationCap className="text-3xl text-yellow-300" />
                  <h2 className="text-2xl font-bold text-white">Available Subjects</h2>
                </div>
                <button
                  onClick={() => setShowCourses(!showCourses)}
                  className="p-3 hover:bg-white/10 rounded-xl transition-colors"
                >
                  {showCourses ? <FaChevronUp className="text-yellow-300" /> : <FaChevronDown className="text-yellow-300" />}
                </button>
              </div>

              <AnimatePresence>
                {showCourses && (
                  <m.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-8">
                      <div className="flex justify-center">
                        <div className="inline-flex bg-white/10 rounded-2xl p-1.5">
                          {educationLevels.map((level, index) => (
                            <m.button
                              key={level.id}
                              onClick={() => setSelectedLevel(level.id)}
                              className={`
                                relative px-8 py-3 rounded-xl text-center transition-all duration-200
                                ${selectedLevel === level.id 
                                  ? 'text-yellow-300' 
                                  : 'text-white/70 hover:text-white'
                                }
                                ${index !== educationLevels.length - 1 ? 'mr-1' : ''}
                              `}
                            >
                              {selectedLevel === level.id && (
                                <m.div
                                  layoutId="activeTab"
                                  className="absolute inset-0 bg-white/10 rounded-xl"
                                  initial={false}
                                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                              )}
                              <span className="relative z-10">
                                {language === 'NL' ? level.titleNL : level.titleEN}
                              </span>
                            </m.button>
                          ))}
                        </div>
                      </div>

                      <div className="w-full">
                        <AnimatePresence mode="wait">
                          {selectedLevel && (
                            renderSubjects(
                              educationLevels.find(level => level.id === selectedLevel)?.subjects || []
                            )
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </m.div>
                )}
              </AnimatePresence>
            </div>

            {/* Offers Grid */}
            <div className="grid gap-8 md:grid-cols-3 mb-12">
              {offers.map((offer) => (
                <OfferVariant 
                  key={offer.title} 
                  {...offer} 
                  educationLevels={educationLevels}
                />
              ))}
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-12">
              <m.a 
                href={`${config.contact.whatsapp}?text=Hi!%20I'm%20interested%20in%20weekend%20tutoring.%20Can%20I%20book%20a%20trial%20lesson?`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-yellow-500 hover:bg-yellow-400 text-yellow-900 font-bold py-4 px-8 rounded-full transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t(content.cta.trial)}
              </m.a>
              <m.a 
                href={config.contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/20 hover:bg-white/30 text-white font-bold py-4 px-8 rounded-full transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t(content.cta.whatsapp)}
              </m.a>
            </div>

            {/* Footer */}
            <m.p 
              className="text-3xl font-bold text-yellow-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {t(content.footer)}
            </m.p>

            {/* Contact Section */}
            <m.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-16 text-center"
            >
              <p className="text-xl text-white/90 mb-6">
                Have questions? Feel free to contact us for more information.
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" className="bg-yellow-500 hover:bg-yellow-400 text-yellow-900 font-semibold px-8 py-6 text-lg">
                    Contact Us Now
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-amber-900 text-white">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-yellow-300 mb-4">Student Information</DialogTitle>
                  </DialogHeader>
                  <StudentInfoDialogContent
                    educationLevels={educationLevels}
                    whatsappMessage="Hi! I have some questions about weekend tutoring."
                  />
                </DialogContent>
              </Dialog>
            </m.div>
          </div>
        </div>
      </main>
    </>
  );
} 