'use client';

import React from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { useLocale } from 'next-intl';
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
  const locale = useLocale();
  const language = locale.toUpperCase() as 'EN' | 'NL';
  const t = (obj: Record<string, string> | string) => typeof obj === 'string' ? obj : obj[language] || obj['EN'] || '';
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
              className="group relative flex items-center bg-gradient-to-br from-[var(--ink-light)]/30 to-[var(--ink-light)]/40 backdrop-blur-sm hover:from-[var(--ink)]/40 hover:to-[var(--ink-light)]/50 rounded-xl transition-all duration-300 border border-[var(--ink)]/30 hover:border-[var(--amber)]/50 shadow-lg hover:shadow-xl transform hover:-translate-y-1 overflow-hidden h-[60px] w-full"
            >
              <div className="flex-1 p-4 overflow-hidden">
                <div className="overflow-hidden">
                  <m.span className="text-[var(--cream)] group-hover:text-[var(--cream)] font-medium transition-colors inline-block whitespace-nowrap">
                    {subjectText}
                  </m.span>
                </div>
              </div>
              {subjectNotes.some((note) => note.subject === subject.NL) && (
                <button
                  onClick={() => onPreviewNotes(subject.NL)}
                  className="h-full flex items-center px-3 bg-[var(--ink)]/20 group-hover:bg-[var(--ink)]/30 border-l border-[var(--ink)]/30 cursor-pointer transition-all duration-200"
                  title={t(translations.previewNotes)}
                  aria-label={t(translations.previewNotes)}
                >
                  <FaEye className="w-4 h-4 text-[var(--amber)]/80 group-hover:text-[var(--amber)] transition-colors" />
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
      className="bg-[var(--ink-light)] p-6 rounded-lg"
    >
      <div className="flex items-center justify-between text-[var(--amber)] mb-6">
        <div className="flex items-center">
          <FaGraduationCap className="text-2xl mr-3" />
          <h3 className="text-xl font-semibold">{t(translations.availableCourses)}</h3>
        </div>
        <button onClick={onToggleCourses} className="p-2 hover:bg-[var(--ink-light)]/50 rounded-lg transition-colors">
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
                <div className="inline-flex bg-[var(--ink-light)]/20 rounded-2xl p-1.5">
                  {educationLevels.map((level, index) => (
                    <m.button
                      key={level.id}
                      onClick={() => onSetLevel(level.id)}
                      className={`relative px-8 py-3 rounded-xl text-center transition-all duration-200 ${
                        selectedLevel === level.id ? "bg-[var(--ink-light)]/50 text-[var(--amber)] shadow-lg" : "text-[var(--cream)] hover:text-[var(--cream)]"
                      } ${index !== educationLevels.length - 1 ? "mr-1" : ""}`}
                    >
                      {selectedLevel === level.id && (
                        <m.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-[var(--ink)]/20 rounded-xl"
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
        className="mt-6 p-4 bg-[var(--ink-light)]/30 rounded-xl border border-[var(--ink)]/30"
      >
        <p className="text-[var(--cream)] text-sm">{t(translations.thesisDescription)}</p>
      </m.div>
    </m.div>
  );
}
