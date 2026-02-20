'use client';

import { useReducer } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { m, AnimatePresence } from 'framer-motion';
import { FaGraduationCap, FaChevronUp, FaChevronDown } from 'react-icons/fa';

type EducationLevel = {
  id: string;
  titleNL: string;
  titleEN: string;
  subjects: Array<{ NL: string; EN: string }>;
};

function reducer(state: { selectedLevel: string; showCourses: boolean }, action: { type: 'LEVEL' | 'TOGGLE'; payload?: string }) {
  if (action.type === 'LEVEL') return { ...state, selectedLevel: action.payload ?? '' };
  if (action.type === 'TOGGLE') return { ...state, showCourses: !state.showCourses };
  return state;
}

export function ZuidoostSubjectsSection({ educationLevels }: { educationLevels: EducationLevel[] }) {
  const { language } = useLanguage();
  const [state, dispatch] = useReducer(reducer, { selectedLevel: '', showCourses: true });
  const { selectedLevel, showCourses } = state;

  const subjects = educationLevels.find((l) => l.id === selectedLevel)?.subjects ?? [];

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 mb-12">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <FaGraduationCap className="text-3xl text-yellow-300" />
          <h2 className="text-2xl font-bold text-white">Available Subjects</h2>
        </div>
        <button
          type="button"
          onClick={() => dispatch({ type: 'TOGGLE' })}
          className="p-3 hover:bg-white/10 rounded-xl transition-colors"
        >
          {showCourses ? <FaChevronUp className="text-yellow-300" /> : <FaChevronDown className="text-yellow-300" />}
        </button>
      </div>

      <AnimatePresence>
        {showCourses && (
          <m.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="space-y-8">
              <div className="flex justify-center">
                <div className="inline-flex bg-white/10 rounded-2xl p-1.5">
                  {educationLevels.map((level, index) => (
                    <m.button
                      key={level.id}
                      type="button"
                      onClick={() => dispatch({ type: 'LEVEL', payload: level.id })}
                      className={`relative px-8 py-3 rounded-xl text-center transition-all duration-200 ${
                        selectedLevel === level.id ? 'text-yellow-300' : 'text-white/70 hover:text-white'
                      } ${index !== educationLevels.length - 1 ? 'mr-1' : ''}`}
                    >
                      {selectedLevel === level.id && (
                        <m.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-white/10 rounded-xl"
                          initial={false}
                          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      <span className="relative z-10">{language === 'NL' ? level.titleNL : level.titleEN}</span>
                    </m.button>
                  ))}
                </div>
              </div>

              <div className="w-full">
                <AnimatePresence mode="wait">
                  {selectedLevel && (
                    <m.div
                      key={selectedLevel}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-8"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {subjects.map((subject, index) => (
                          <m.div
                            key={subject.NL}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05, ease: 'easeOut' }}
                            className="group relative flex items-center bg-white/10 backdrop-blur-sm rounded-xl transition-all duration-300 border border-white/10 hover:border-white/20 transform hover:-translate-y-1 overflow-hidden h-[60px] w-full hover:shadow-lg hover:shadow-black/20"
                          >
                            <div className="flex-1 p-4 overflow-hidden">
                              <m.span className="text-white/90 group-hover:text-white font-medium transition-colors inline-block whitespace-nowrap">
                                {language === 'NL' ? subject.NL : subject.EN}
                              </m.span>
                            </div>
                          </m.div>
                        ))}
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
