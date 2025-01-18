'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGraduationCap, FaChevronDown, FaChevronUp, FaMapMarkerAlt, FaClock, FaCheck, FaStar, FaWhatsapp, FaSearch } from 'react-icons/fa';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { getBusinessData } from '@/data/businessData';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
  const whatsappLink = `https://wa.me/31687340641?text=${encodeURIComponent(whatsappMessage)}`;
  
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

export function WeekendGhanaContent() {
  const { t } = useTranslation();
  const businessData = getBusinessData(t);
  const [showCourses, setShowCourses] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string | null>('voortgezet');
  const [showModal, setShowModal] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [studentAge, setStudentAge] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<{
    subject: { NL: string; EN: string };
    level: typeof educationLevels[0];
  } | null>(null);

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
      whatsappMessage: "Hi! I'm interested in the weekend tutoring special offer (€30/hour). I'd like to schedule a free trial lesson."
    },
    {
      title: "Personal Coaching & Study Support",
      titleTwi: "Akwankyerɛ ne Mmoa",
      description: "💡 Need guidance with your studies or personal development? Available weekends for €30/hour in Zuidoost. Me ne wo bɛyɛ adwuma! (We'll work together!) First 30-minute consultation is free.",
      cta: "WhatsApp for Info",
      whatsappMessage: "Hi! I'm interested in personal coaching/study support (€30/hour weekend offer). Can you tell me more?"
    },
    {
      title: "Flexible Weekend Support",
      titleTwi: "Mmerɛ-mmerɛ Mmoa",
      description: "✨ Whether it's math, coaching, or just discussing your studies - I'm here to help! Special rate of €30/hour (save €30). Yɛbɛyɛ bi akɔ! Home service in Gein 3 & 4 (limited spots).",
      cta: "WhatsApp to Start",
      whatsappMessage: "Hi! I'm interested in the flexible weekend support (€30/hour). I'd like to learn more about the possibilities."
    }
  ];

  const handleSubjectClick = (subject: { NL: string; EN: string }, level: typeof educationLevels[0]) => {
    setSelectedSubject({ subject, level });
    setShowModal(true);
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
    
    window.open(`https://wa.me/31687340641?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
    setShowModal(false);
    setStudentName('');
    setStudentAge('');
    setSelectedSubject(null);
  };

  const StudentInfoModal = () => (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogContent className="bg-[#654321] border border-yellow-600/50 text-yellow-100">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-yellow-400">
            Student Information
          </DialogTitle>
          <DialogDescription className="text-yellow-200">
            Please provide some information before we connect via WhatsApp
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-yellow-300">
              Student Name / Naam
            </Label>
            <Input
              id="name"
              placeholder="Enter student name..."
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="bg-[#8B4513] border-yellow-600/50 text-yellow-100 placeholder:text-yellow-200/50"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="age" className="text-yellow-300">
              Student Age / Leeftijd
            </Label>
            <Input
              id="age"
              type="number"
              placeholder="Enter student age..."
              value={studentAge}
              onChange={(e) => setStudentAge(e.target.value)}
              className="bg-[#8B4513] border-yellow-600/50 text-yellow-100 placeholder:text-yellow-200/50"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={() => setShowModal(false)}
            className="border-yellow-600/50 text-yellow-200 hover:bg-[#8B4513] hover:text-yellow-100"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSendWhatsApp}
            disabled={!studentName || !studentAge}
            className="bg-green-500 hover:bg-green-400 text-white flex items-center gap-2"
          >
            <FaWhatsapp />
            Continue to WhatsApp
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  const SubjectsSection = () => (
    <div className="bg-[#8B4513] p-8 rounded-2xl mb-12 shadow-xl border border-yellow-600/50 relative overflow-hidden">
      <div className="relative">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <FaGraduationCap className="text-3xl text-yellow-400" />
            <div>
              <h2 className="text-2xl font-bold text-yellow-400">Available Subjects</h2>
              <p className="text-yellow-200 text-sm">Find your subject and click to ask about it</p>
            </div>
          </div>
        </div>

        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-yellow-400" />
          </div>
          <input
            type="text"
            placeholder="Zoek een vak / Search a subject..."
            className="w-full pl-10 pr-4 py-3 bg-[#654321] border border-yellow-600/50 rounded-xl text-yellow-100 placeholder-yellow-200/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-[#654321] rounded-2xl p-1.5">
            {educationLevels.map((level, index) => (
              <motion.button
                key={level.id}
                onClick={() => setSelectedLevel(level.id)}
                className={`
                  relative px-6 py-3 rounded-xl text-center transition-all duration-200
                  ${selectedLevel === level.id 
                    ? 'text-yellow-400' 
                    : 'text-yellow-200 hover:text-yellow-100'
                  }
                  ${index !== educationLevels.length - 1 ? 'mr-1' : ''}
                `}
              >
                {selectedLevel === level.id && (
                  <motion.div
                    layoutId="activeSubjectTab"
                    className="absolute inset-0 bg-[#8B4513]/50 rounded-xl"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <div className="relative z-10">
                  <div className="font-bold text-base">{level.titleNL}</div>
                  <div className="text-sm opacity-75">{level.titleEN}</div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {selectedLevel && (
            <motion.div
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
                    <motion.div
                      key={subject.NL}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-[#654321] p-4 rounded-xl border border-yellow-600/50 hover:border-yellow-400/50 
                               transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer group"
                      onClick={() => handleSubjectClick(subject, currentLevel)}
                    >
                      <div className="font-medium text-yellow-100 group-hover:text-yellow-400 transition-colors">
                        {subject.NL}
                      </div>
                      <div className="text-sm text-yellow-200/75 group-hover:text-yellow-300 transition-colors">
                        {subject.EN}
                      </div>
                      <div className="mt-2 pt-2 border-t border-yellow-600/30 text-xs text-yellow-200/50 group-hover:text-yellow-200 transition-colors flex items-center gap-1">
                        <FaWhatsapp className="text-sm" />
                        {currentLevel.hasDiscount ? (
                          "Click to ask about this subject (€30/hour)"
                        ) : (
                          "Click to ask about this subject (€60/hour)"
                        )}
                      </div>
                    </motion.div>
                  );
                })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#654321] to-[#8B4513] text-white">
      <div className="container mx-auto px-4 py-16 relative">
        <AdinkraPattern />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="flex justify-center mb-4">
            <span className="bg-yellow-400/20 text-yellow-400 px-4 py-2 rounded-full text-lg">
              Akwaaba! 🌟
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-center bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-300 text-transparent bg-clip-text">
            Adesua Ne Akwankyerɛ
          </h1>
          <p className="text-xl text-center text-yellow-200 mb-6">
            Weekend Tutoring & Coaching
          </p>
          
          <p className="text-2xl text-center text-yellow-400 mb-2 font-medium">
            Boa me na menboa wo
          </p>
          <p className="text-lg text-center text-yellow-200 mb-6 italic">
            (Help me and let me help you)
          </p>
          
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <p className="text-2xl text-yellow-400 font-medium">
              Yɛn nkɔso ne yɛn baako!
            </p>
            <p className="text-lg text-yellow-200 mt-1 italic">
              (Our progress lies in our unity!)
            </p>
          </div>
        </motion.div>
        
        <div className="bg-[#8B4513] p-8 rounded-2xl mb-12 shadow-xl border border-yellow-600/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/5 rounded-full transform translate-x-32 -translate-y-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-400/5 rounded-full transform -translate-x-32 translate-y-32" />
          
          <div className="relative">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8"
            >
              <div className="inline-block bg-yellow-400/10 rounded-full px-6 py-2 mb-4">
                <span className="text-yellow-400 text-3xl mr-2">⭐</span>
                <span className="text-yellow-400 font-bold">ABOƆDEN NHYEHYƐE</span>
                <span className="text-yellow-400 text-3xl ml-2">⭐</span>
              </div>
              <p className="text-yellow-200 text-lg mb-4 italic">
                (SPECIAL COMMUNITY OFFER)
              </p>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-2">
                <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-300 text-transparent bg-clip-text">
                  Nea onnim no sua a, ohu!
                </span>
              </h2>
              <p className="text-yellow-200 text-lg mb-4 italic">
                (One who doesn't know can learn!)
              </p>
              <div className="text-5xl font-black bg-gradient-to-r from-yellow-400 to-yellow-300 text-transparent bg-clip-text mb-2">
                FA MA YƐNKA!
              </div>
              <p className="text-yellow-200 text-lg italic">
                (50% DISCOUNT!)
              </p>
            </motion.div>

            <div className="flex flex-col md:flex-row items-center justify-center mb-12 gap-8">
              <motion.div 
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center px-8 py-6 bg-[#654321] rounded-2xl relative"
              >
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-red-500 text-white text-sm px-3 py-1 rounded-full">
                  Regular Price
                </div>
                <div className="text-4xl font-bold text-gray-400 line-through mb-1">€60</div>
                <div className="text-sm text-yellow-200">per hour</div>
              </motion.div>

              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
                className="text-5xl font-black text-yellow-400"
              >
                →
              </motion.div>

              <motion.div 
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center px-8 py-6 bg-green-900/30 rounded-2xl border-2 border-yellow-500/30 relative"
              >
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-sm px-3 py-1 rounded-full">
                  Community Rate
                </div>
                <div className="text-5xl font-bold text-green-400 mb-1">€30</div>
                <div className="text-sm text-green-300">per hour</div>
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <span className="bg-yellow-400 text-[#654321] text-xs font-bold px-3 py-1 rounded-full">
                    SAVE €30 EVERY HOUR!
                  </span>
                </div>
              </motion.div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-[#654321] p-6 rounded-xl border border-yellow-600/50">
                <div className="flex items-center gap-3 mb-3">
                  <FaMapMarkerAlt className="text-yellow-400 text-xl" />
                  <h3 className="font-semibold text-yellow-100">Location</h3>
                </div>
                <p className="text-yellow-200">Home tutoring in Gein 3 & 4 (limited availability)</p>
              </div>
              
              <div className="bg-[#654321] p-6 rounded-xl border border-yellow-600/50">
                <div className="flex items-center gap-3 mb-3">
                  <FaClock className="text-yellow-400 text-xl" />
                  <h3 className="font-semibold text-yellow-100">Availability</h3>
                </div>
                <p className="text-yellow-200">Saturdays and Sundays, flexible hours</p>
              </div>
              
              <div className="bg-[#654321] p-6 rounded-xl border border-yellow-600/50">
                <div className="flex items-center gap-3 mb-3">
                  <FaCheck className="text-yellow-400 text-xl" />
                  <h3 className="font-semibold text-yellow-100">Extras</h3>
                </div>
                <p className="text-yellow-200">Free 30-minute trial lesson - Sɔhwɛ adesua!</p>
              </div>
            </div>
          </div>
        </div>

        <SubjectsSection />

        <div className="grid gap-8 md:grid-cols-3 mb-12">
          {offers.map((offer, index) => (
            <OfferVariant key={index} {...offer} />
          ))}
        </div>

        <motion.div 
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
            href="https://wa.me/31687340641?text=Hi!%20I%20have%20a%20question%20about%20the%20weekend%20tutoring%20offer."
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" className="bg-green-500 hover:bg-green-400 text-white font-semibold px-8 py-6 text-lg flex items-center gap-2">
              <FaWhatsapp className="text-2xl" />
              WhatsApp Now - Frɛ Me!
            </Button>
          </a>
        </motion.div>
      </div>
      <StudentInfoModal />
    </div>
  );
} 