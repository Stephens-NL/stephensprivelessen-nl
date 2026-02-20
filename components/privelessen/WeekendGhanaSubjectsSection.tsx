'use client';

import { m, AnimatePresence } from 'framer-motion';
import { FaGraduationCap, FaSearch, FaWhatsapp } from 'react-icons/fa';
import { Bilingual } from '@/data/types';

export type EducationLevel = {
  id: string;
  titleNL: string;
  titleEN: string;
  subjects: Bilingual[];
  whatsappIntro: string;
  hasDiscount: boolean;
};

interface WeekendGhanaSubjectsSectionProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedLevel: string | null;
  setSelectedLevel: (level: string) => void;
  educationLevels: EducationLevel[];
  filteredSubjects: (subjects: Bilingual[]) => Bilingual[];
  onSubjectClick: (subject: Bilingual, level: EducationLevel) => void;
  language: 'NL' | 'EN';
}

export function WeekendGhanaSubjectsSection({
  searchTerm,
  setSearchTerm,
  selectedLevel,
  setSelectedLevel,
  educationLevels,
  filteredSubjects,
  onSubjectClick,
  language,
}: WeekendGhanaSubjectsSectionProps) {
  return (
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
              <m.button
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
                  <m.div
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
              </m.button>
            ))}
          </div>
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
                      className="bg-[#654321] p-4 rounded-xl border border-yellow-600/50 hover:border-yellow-400/50 
                               transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer group"
                      onClick={() => onSubjectClick(subject, currentLevel)}
                    >
                      <div className="font-medium text-yellow-100 group-hover:text-yellow-400 transition-colors">
                        {language === 'NL' ? subject.NL : subject.EN}
                      </div>
                      <div className="text-sm text-yellow-200/75 group-hover:text-yellow-300 transition-colors">
                        {language === 'NL' ? subject.EN : subject.NL}
                      </div>
                      <div className="mt-2 pt-2 border-t border-yellow-600/30 text-xs text-yellow-200/50 group-hover:text-yellow-200 transition-colors flex items-center gap-1">
                        <FaWhatsapp className="text-sm" />
                        {currentLevel.hasDiscount ? (
                          "Click to ask about this subject (€30/hour)"
                        ) : (
                          "Click to ask about this subject (€60/hour)"
                        )}
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
