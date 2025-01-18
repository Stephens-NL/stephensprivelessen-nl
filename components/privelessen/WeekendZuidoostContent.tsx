'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGraduationCap, FaChevronDown, FaChevronUp, FaEye, FaMapMarkerAlt, FaClock, FaCheck } from 'react-icons/fa';
import { getBusinessData } from '@/data/businessData';
import { useTranslation } from '@/hooks/useTranslation';

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
      title: 'Basisonderwijs',
      subjects: businessData.subjects.primary
    },
    {
      id: 'voortgezet',
      title: 'Voortgezet Onderwijs',
      subjects: businessData.subjects.secondary
    },
    {
      id: 'hoger',
      title: 'Hoger Onderwijs',
      subjects: [...businessData.subjects.higher, ...businessData.subjects.programming]
    }
  ];

  const renderSubjects = (subjects: Array<{ NL: string, EN: string }>) => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-8"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {subjects.map((subject, index) => (
            <motion.div 
              key={subject.NL}
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
                  <motion.span 
                    className="text-blue-100 group-hover:text-white font-medium transition-colors inline-block whitespace-nowrap"
                  >
                    {subject.NL}
                  </motion.span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  };

  const offers = [
    {
      title: "Weekend Bijles voor Scholieren",
      description: "🎓 Speciale buurtkorting voor leerlingen in Amsterdam Zuidoost! Voor slechts €30 per uur (normaal €60) krijg je professionele bijles op zaterdag of zondag. Extra voordeel voor Gein 3 en 4: bijles aan huis mogelijk (beperkte plekken). Start met een gratis kennismakingsgesprek van 30 minuten!",
      cta: "Plan je gratis kennismaking"
    },
    {
      title: "Persoonlijke Coaching & Studiebegeleiding",
      description: "💡 Zoek je begeleiding bij je studie of persoonlijke ontwikkeling? Nu in het weekend beschikbaar voor €30 per uur (50% korting op regulier tarief) in Amsterdam Zuidoost. Eerste gesprek van 30 minuten is gratis. Samen werken we aan jouw doelen en studievaardigheden.",
      cta: "Start met gratis gesprek"
    },
    {
      title: "Flexibele Weekend Hulp",
      description: "✨ Of je nu hulp nodig hebt bij wiskunde, coaching zoekt, of gewoon wilt sparren over je studie - in het weekend sta ik voor je klaar in Zuidoost. Profiteer van het speciale buurttarief van €30 per uur (normaal €60). Eerste 30 minuten gratis kennismaking. Aan huis service in Gein 3 en 4 (beperkt beschikbaar).",
      cta: "Maak een afspraak"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 to-blue-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-300 text-transparent bg-clip-text">
            Weekend Bijles & Coaching in Amsterdam Zuidoost
          </h1>
          
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <p className="text-xl text-blue-100">
              Professionele begeleiding in jouw buurt tegen een spectaculair gereduceerd tarief
            </p>
          </div>
        </motion.div>
        
        <div className="bg-gradient-to-br from-blue-800 to-blue-700 p-8 rounded-2xl mb-12 shadow-xl border border-blue-600/50 relative overflow-hidden">
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
                <span className="text-yellow-400 text-3xl mr-2">⚡️</span>
                <span className="text-yellow-400 font-bold">SPECIALE AANBIEDING</span>
                <span className="text-yellow-400 text-3xl ml-2">⚡️</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">
                <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-300 text-transparent bg-clip-text">
                  Spectaculaire Buurtkorting
                </span>
              </h2>
              <div className="text-5xl font-black bg-gradient-to-r from-yellow-400 to-yellow-300 text-transparent bg-clip-text mb-2">
                50% KORTING!
              </div>
              <p className="text-blue-200">Exclusief voor inwoners van Amsterdam Zuidoost</p>
            </motion.div>
          
            <div className="flex flex-col md:flex-row items-center justify-center mb-12 gap-8 relative">
              <motion.div 
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center px-8 py-6 bg-blue-900/50 rounded-2xl relative"
              >
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-red-500 text-white text-sm px-3 py-1 rounded-full">
                  Normaal
                </div>
                <div className="text-4xl font-bold text-gray-400 line-through mb-1">€60</div>
                <div className="text-sm text-blue-200">per uur</div>
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
                className="text-center px-8 py-6 bg-green-900/30 rounded-2xl border-2 border-green-500/30 relative"
              >
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-sm px-3 py-1 rounded-full">
                  Buurttarief
                </div>
                <div className="text-5xl font-bold text-green-400 mb-1">€30</div>
                <div className="text-sm text-green-300">per uur</div>
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <span className="bg-yellow-400 text-blue-900 text-xs font-bold px-3 py-1 rounded-full">
                    BESPAAR €30 PER UUR!
                  </span>
                </div>
              </motion.div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-900/50 p-6 rounded-xl border border-blue-700/50">
                <div className="flex items-center gap-3 mb-3">
                  <FaMapMarkerAlt className="text-yellow-400 text-xl" />
                  <h3 className="font-semibold text-blue-100">Locatie</h3>
                </div>
                <p className="text-blue-200">Aan huis service in Gein 3 en 4 (beperkte beschikbaarheid)</p>
              </div>
              
              <div className="bg-blue-900/50 p-6 rounded-xl border border-blue-700/50">
                <div className="flex items-center gap-3 mb-3">
                  <FaClock className="text-yellow-400 text-xl" />
                  <h3 className="font-semibold text-blue-100">Beschikbaarheid</h3>
                </div>
                <p className="text-blue-200">Zaterdagen en eventueel op zondag, flexibele tijden</p>
              </div>
              
              <div className="bg-blue-900/50 p-6 rounded-xl border border-blue-700/50">
                <div className="flex items-center gap-3 mb-3">
                  <FaCheck className="text-yellow-400 text-xl" />
                  <h3 className="font-semibold text-blue-100">Extra's</h3>
                </div>
                <p className="text-blue-200">Gratis kennismakingsgesprek van 30 minuten</p>
              </div>
            </div>
          </div>
        </div>

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
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="space-y-8">
                  <div className="flex justify-center">
                    <div className="inline-flex bg-blue-900/50 rounded-2xl p-1.5">
                      {educationLevels.map((level, index) => (
                        <motion.button
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
                            <motion.div
                              layoutId="activeTab"
                              className="absolute inset-0 bg-blue-800/50 rounded-xl"
                              initial={false}
                              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                          )}
                          <span className="relative z-10">{level.title}</span>
                        </motion.button>
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
              </motion.div>
            )}
          </AnimatePresence>
        </div>

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
            Heb je vragen? Neem gerust contact op voor meer informatie.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-semibold px-8 py-6 text-lg">
              Direct Contact Opnemen
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
} 