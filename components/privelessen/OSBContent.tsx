'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGraduationCap, FaSearch, FaWhatsapp, FaMapMarkerAlt, FaClock, FaCheck } from 'react-icons/fa';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getBusinessData } from '@/data/businessData';
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
    <Card className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800 text-white p-8 rounded-2xl border border-blue-300/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full transform translate-x-16 -translate-y-16" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full transform -translate-x-16 translate-y-16" />
      <h3 className="text-2xl font-bold mb-2 relative z-10">{title}</h3>
      <p className="mb-6 text-blue-100 relative z-10">{description}</p>
      <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="block">
        <Button className="w-full bg-green-500 hover:bg-green-400 text-white font-semibold py-6 text-lg relative z-10 flex items-center justify-center gap-2">
          <FaWhatsapp className="text-2xl" />
          {cta}
        </Button>
      </a>
    </Card>
  );
};

export function OSBContent() {
  const { t } = useTranslation();
  const businessData = getBusinessData(t);
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
      id: 'voortgezet',
      titleNL: 'Voortgezet Onderwijs',
      titleEN: 'Secondary Education',
      subjects: businessData.subjects.secondary,
      whatsappIntro: "Hi! I&apos;m looking for tutoring at OSB",
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
      title: "OSB Student Support",
      description: "📚 Expert tutoring for OSB students! Get help with your subjects, exam preparation, and homework. Start with a free 30-minute trial lesson to experience the difference.",
      cta: "WhatsApp for Trial Lesson",
      whatsappMessage: "Hi! I&apos;m interested in tutoring for OSB. I&apos;d like to schedule a free trial lesson."
    },
    {
      title: "Exam Preparation",
      description: "🎯 Focused exam preparation sessions to help you succeed. We&apos;ll work on past papers, study techniques, and subject-specific strategies.",
      cta: "WhatsApp for Info",
      whatsappMessage: "Hi! I&apos;m interested in exam preparation tutoring at OSB. Can you tell me more?"
    },
    {
      title: "Homework Support",
      description: "✏️ Need help with homework or assignments? Get personalized support to understand concepts better and improve your grades.",
      cta: "WhatsApp to Start",
      whatsappMessage: "Hi! I need help with homework/assignments at OSB. I&apos;d like to learn more about the tutoring options."
    }
  ];

  const handleSubjectClick = (subject: { NL: string; EN: string }, level: typeof educationLevels[0]) => {
    setSelectedSubject({ subject, level });
    setShowModal(true);
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
    setShowModal(false);
    setStudentName('');
    setStudentAge('');
    setSelectedSubject(null);
  };

  const StudentInfoModal = () => (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogContent className="bg-blue-900 border border-blue-300/50 text-blue-100">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-blue-400">
            Student Information
          </DialogTitle>
          <DialogDescription className="text-blue-200">
            Please provide some information before we connect via WhatsApp
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-blue-300">
              Student Name / Naam
            </Label>
            <Input
              id="name"
              placeholder="Enter student name..."
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="bg-blue-800 border-blue-300/50 text-blue-100 placeholder:text-blue-200/50"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="age" className="text-blue-300">
              Student Age / Leeftijd
            </Label>
            <Input
              id="age"
              type="number"
              placeholder="Enter student age..."
              value={studentAge}
              onChange={(e) => setStudentAge(e.target.value)}
              className="bg-blue-800 border-blue-300/50 text-blue-100 placeholder:text-blue-200/50"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={() => setShowModal(false)}
            className="border-blue-300/50 text-blue-200 hover:bg-blue-800 hover:text-blue-100"
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
    <div className="bg-blue-800 p-8 rounded-2xl mb-12 shadow-xl border border-blue-300/50 relative overflow-hidden">
      <div className="relative">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <FaGraduationCap className="text-3xl text-blue-400" />
            <div>
              <h2 className="text-2xl font-bold text-blue-400">Available Subjects</h2>
              <p className="text-blue-200 text-sm">Find your subject and click to ask about it</p>
            </div>
          </div>
        </div>

        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-blue-400" />
          </div>
          <input
            type="text"
            placeholder="Zoek een vak / Search a subject..."
            className="w-full pl-10 pr-4 py-3 bg-blue-900 border border-blue-300/50 rounded-xl text-blue-100 placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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
                      key={`${selectedLevel}-${subject.NL}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-blue-900 p-4 rounded-xl border border-blue-300/50 hover:border-blue-200/50 
                               transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer group"
                      onClick={() => handleSubjectClick(subject, currentLevel)}
                    >
                      <div className="font-medium text-blue-100 group-hover:text-blue-400 transition-colors">
                        {subject.NL}
                      </div>
                      <div className="text-sm text-blue-200/75 group-hover:text-blue-300 transition-colors">
                        {subject.EN}
                      </div>
                      <div className="mt-2 pt-2 border-t border-blue-300/30 text-xs text-blue-200/50 group-hover:text-blue-200 transition-colors flex items-center gap-1">
                        <FaWhatsapp className="text-sm" />
                        Click to ask about this subject
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
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-800 text-white">
      <div className="container mx-auto px-4 py-16 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="flex justify-center mb-4">
            <span className="bg-blue-400/20 text-blue-400 px-4 py-2 rounded-full text-lg">
              Welcome to OSB Tutoring! 🌟
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-center bg-gradient-to-r from-blue-300 via-blue-400 to-blue-300 text-transparent bg-clip-text">
            Expert Tutoring for OSB Students
          </h1>
          <p className="text-xl text-center text-blue-200 mb-12">
            Personalized support to help you excel in your studies
          </p>
          
          <div className="bg-blue-800 p-8 rounded-2xl mb-12 shadow-xl border border-blue-300/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/5 rounded-full transform translate-x-32 -translate-y-32" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/5 rounded-full transform -translate-x-32 translate-y-32" />
            
            <div className="relative">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-8"
              >
                <div className="inline-block bg-blue-400/10 rounded-full px-6 py-2 mb-4">
                  <span className="text-blue-400 text-3xl mr-2">⭐</span>
                  <span className="text-blue-400 font-bold">SPECIAL STUDENT OFFER</span>
                  <span className="text-blue-400 text-3xl ml-2">⭐</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-blue-300 via-blue-400 to-blue-300 text-transparent bg-clip-text">
                    Succeed in Your Studies!
                  </span>
                </h2>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-900 p-6 rounded-xl border border-blue-300/50">
                  <div className="flex items-center gap-3 mb-3">
                    <FaMapMarkerAlt className="text-blue-400 text-xl" />
                    <h3 className="font-semibold text-blue-100">Location</h3>
                  </div>
                  <p className="text-blue-200">At OSB or nearby study locations</p>
                </div>
                
                <div className="bg-blue-900 p-6 rounded-xl border border-blue-300/50">
                  <div className="flex items-center gap-3 mb-3">
                    <FaClock className="text-blue-400 text-xl" />
                    <h3 className="font-semibold text-blue-100">Availability</h3>
                  </div>
                  <p className="text-blue-200">Flexible hours, before or after school</p>
                </div>
                
                <div className="bg-blue-900 p-6 rounded-xl border border-blue-300/50">
                  <div className="flex items-center gap-3 mb-3">
                    <FaCheck className="text-blue-400 text-xl" />
                    <h3 className="font-semibold text-blue-100">Extras</h3>
                  </div>
                  <p className="text-blue-200">Free 30-minute trial lesson!</p>
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
            <p className="text-xl text-blue-100 mb-6">
              Questions? Message me directly on WhatsApp!
            </p>
            <a 
              href={`${config.contact.whatsapp}?text=Hi!%20I%20have%20a%20question%20about%20tutoring%20at%20OSB.`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="bg-green-500 hover:bg-green-400 text-white font-semibold px-8 py-6 text-lg flex items-center gap-2">
                <FaWhatsapp className="text-2xl" />
                WhatsApp Now
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </div>
      <StudentInfoModal />
    </div>
  );
} 