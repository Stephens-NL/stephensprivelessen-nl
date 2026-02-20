'use client';

import React from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { FaGraduationCap, FaChevronDown, FaChevronUp, FaEye } from 'react-icons/fa';
import { getBusinessData } from '@/data/businessData';
import { subjectNotes, infoSectionTranslations as translations } from '@/data/infoSection';

type InfoSectionCoursesBlockProps = {
  showCourses: boolean;
  selectedLevel: string | null;
  onToggleCourses: () => void;
  onSetLevel: (level: string | null) => void;
  onPreviewNotes: (subject: string) => void;
};

export function InfoSectionCoursesBlock({
  showCourses,
  selectedLevel,
  onToggleCourses,
  onSetLevel,
  onPreviewNotes,
}: InfoSectionCoursesBlockProps) {
  const { t } = useTranslation();
  const businessData = getBusinessData(t);

  const educationLevels = [
    { id: 'basis', title: t(translations.primaryEducation), subjects: businessData.subjects.primary },
    { id: 'voortgezet', title: t(translations.secondaryEducation), subjects: businessData.subjects.secondary },
    { id: 'hoger', title: t(translations.higherEducation), subjects: [...businessData.subjects.higher, ...businessData.subjects.programming] },
  ];

  const renderSubjects = (subjects: Array<{ NL: string; EN: string }>) => (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-8"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {subjects.map((subject, index) => {
          const subjectText = t(subject);
          return (
            <m.div
              key={subject.NL}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05, ease: "easeOut" }}
              className="group relative flex items-center bg-gradient-to-br from-blue-600/30 to-blue-700/40 backdrop-blur-sm hover:from-blue-500/40 hover:to-blue-600/50 rounded-xl transition-all duration-300 border border-blue-500/30 hover:border-blue-400/50 shadow-lg hover:shadow-xl transform hover:-translate-y-1 overflow-hidden h-[60px] w-full"
            >
              <div className="flex-1 p-4 overflow-hidden">
                <div className="overflow-hidden">
                  <m.span className="text-yellow-100 group-hover:text-yellow-200 font-medium transition-colors inline-block whitespace-nowrap">
                    {subjectText}
                  </m.span>
                </div>
              </div>
              {subjectNotes.some((note) => note.subject === subject.NL) && (
                <button
                  onClick={() => onPreviewNotes(subject.NL)}
                  className="h-full flex items-center px-3 bg-blue-500/20 group-hover:bg-blue-500/30 border-l border-blue-500/30 cursor-pointer transition-all duration-200"
                  title={t(translations.previewNotes)}
                  aria-label={t(translations.previewNotes)}
                >
                  <FaEye className="w-4 h-4 text-yellow-300/80 group-hover:text-yellow-300 transition-colors" />
                </button>
              )}
            </m.div>
          );
        })}
      </div>
    </m.div>
  );

  return (
    <m.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.1 }}
      className="bg-blue-700 p-6 rounded-lg"
    >
      <div className="flex items-center justify-between text-yellow-300 mb-6">
        <div className="flex items-center">
          <FaGraduationCap className="text-2xl mr-3" />
          <h3 className="text-xl font-semibold">{t(translations.availableCourses)}</h3>
        </div>
        <button onClick={onToggleCourses} className="p-2 hover:bg-blue-600/50 rounded-lg transition-colors">
          {showCourses ? <FaChevronUp /> : <FaChevronDown />}
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
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="inline-flex bg-blue-600/20 rounded-2xl p-1.5">
                  {educationLevels.map((level, index) => (
                    <m.button
                      key={level.id}
                      onClick={() => onSetLevel(level.id)}
                      className={`relative px-8 py-3 rounded-xl text-center transition-all duration-200 ${
                        selectedLevel === level.id ? "bg-blue-600/50 text-yellow-300 shadow-lg" : "text-yellow-100 hover:text-yellow-200"
                      } ${index !== educationLevels.length - 1 ? "mr-1" : ""}`}
                    >
                      {selectedLevel === level.id && (
                        <m.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-blue-500/20 rounded-xl"
                          initial={false}
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      <span className="relative z-10">{level.title}</span>
                    </m.button>
                  ))}
                </div>
              </div>

              <div className="w-full">
                <AnimatePresence mode="wait">
                  {selectedLevel &&
                    renderSubjects(educationLevels.find((level) => level.id === selectedLevel)?.subjects || [])}
                </AnimatePresence>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>

      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-6 p-4 bg-blue-600/30 rounded-xl border border-blue-500/30"
      >
        <p className="text-yellow-100 text-sm">{t(translations.thesisDescription)}</p>
      </m.div>
    </m.div>
  );
}
