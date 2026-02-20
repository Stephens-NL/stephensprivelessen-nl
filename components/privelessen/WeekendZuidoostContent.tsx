'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { FaGraduationCap, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { getBusinessData } from '@/data/businessData';
import { useTranslation } from '@/hooks/useTranslation';
import { WeekendZuidoostHero } from './WeekendZuidoostHero';

const OfferVariant = ({ title, description, cta }: { title: string; description: string; cta: string }) => (
  <Card className="relative overflow-hidden bg-gradient-to-br from-blue-900 to-blue-800 text-white p-8 rounded-2xl border border-blue-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full transform translate-x-16 -translate-y-16" />
    <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full transform -translate-x-16 translate-y-16" />
    <h3 className="text-2xl font-bold mb-4 relative z-10">{title}</h3>
    <p className="mb-6 text-blue-100 relative z-10">{description}</p>
    <Link href="/contact" className="block">
      <Button className="w-full bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-semibold py-6 text-lg relative z-10">
        {cta}
      </Button>
    </Link>
  </Card>
);

export function WeekendZuidoostContent() {
  const { t } = useTranslation();
  const businessData = getBusinessData(t);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [showCourses, setShowCourses] = useState(true);

  const educationLevels = [
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
      title: 'Hoger Onderwijs',
      subjects: [...businessData.subjects.higher, ...businessData.subjects.programming]
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
              className="group relative flex items-center bg-gradient-to-br from-blue-900 to-blue-800
                       rounded-xl transition-all duration-300 
                       border border-blue-700/50 hover:border-blue-600
                       transform hover:-translate-y-1 overflow-hidden h-[60px] w-full
                       hover:shadow-lg hover:shadow-blue-900/20"
            >
              <div className="flex-1 p-4 overflow-hidden">
                <div className="overflow-hidden">
                  <m.span 
                    className="text-blue-100 group-hover:text-white font-medium transition-colors inline-block whitespace-nowrap"
                  >
                    {subject.NL}
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
      description: "🎓 Special community discount for students in Zuidoost! Only €30 per hour (regular €60). Home tutoring available in Gein 3 & 4. Start with a free 30-minute trial lesson!",
      cta: "WhatsApp for Trial Lesson",
      whatsappMessage: "Hi! I&apos;m interested in the weekend tutoring special offer (€30/hour). I&apos;d like to schedule a free trial lesson."
    },
    {
      title: "Personal Coaching & Study Support",
      description: "💡 Need guidance with your studies or personal development? Available weekends for €30/hour in Zuidoost. First 30-minute consultation is free.",
      cta: "WhatsApp for Info",
      whatsappMessage: "Hi! I&apos;m interested in personal coaching/study support (€30/hour weekend offer). Can you tell me more?"
    },
    {
      title: "Flexible Weekend Support",
      description: "✨ Whether it&apos;s math, coaching, or just discussing your studies - I&apos;m here to help! Special rate of €30/hour (save €30). Home service in Gein 3 & 4 (limited spots).",
      cta: "WhatsApp to Start",
      whatsappMessage: "Hi! I&apos;m interested in the flexible weekend support (€30/hour). I&apos;d like to learn more about the possibilities."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 to-blue-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <WeekendZuidoostHero />
        <div className="bg-gradient-to-br from-blue-800 to-blue-700 p-8 rounded-2xl mb-12 shadow-xl border border-blue-600/50">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <FaGraduationCap className="text-3xl text-yellow-400" />
              <h2 className="text-2xl font-bold text-white">Beschikbare Vakken</h2>
            </div>
            <button
              onClick={() => setShowCourses(!showCourses)}
              className="p-3 hover:bg-blue-600/50 rounded-xl transition-colors"
            >
              {showCourses ? <FaChevronUp className="text-yellow-400" /> : <FaChevronDown className="text-yellow-400" />}
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
                    <div className="inline-flex bg-blue-900/50 rounded-2xl p-1.5">
                      {educationLevels.map((level, index) => (
                        <m.button
                          key={level.id}
                          onClick={() => setSelectedLevel(level.id)}
                          className={`
                            relative px-8 py-3 rounded-xl text-center transition-all duration-200
                            ${selectedLevel === level.id 
                              ? 'text-yellow-400' 
                              : 'text-blue-200 hover:text-blue-100'
                            }
                            ${index !== educationLevels.length - 1 ? 'mr-1' : ''}
                          `}
                        >
                          {selectedLevel === level.id && (
                            <m.div
                              layoutId="activeTab"
                              className="absolute inset-0 bg-blue-800/50 rounded-xl"
                              initial={false}
                              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                          )}
                          <span className="relative z-10">{level.titleNL}</span>
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
          <p className="text-xl text-blue-100 mb-6">
            Heb je vragen? Neem gerust contact op voor meer informatie.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-semibold px-8 py-6 text-lg">
              Direct Contact Opnemen
            </Button>
          </Link>
        </m.div>
      </div>
    </div>
  );
} 