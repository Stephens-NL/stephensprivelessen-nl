'use client';

import { m } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Star, Zap, ArrowRight } from 'lucide-react';

type Course = {
  id: string;
  name: { NL: string; EN: string };
  description: { NL: string; EN: string };
  duration: { NL: string; EN: string };
  lessons: { NL: string; EN: string };
  pricePerPerson: string;
  pricePerLessonHour: string;
  highlight: { NL: string; EN: string };
  color: string;
  featured?: boolean;
};

export function RekentrajectenCard({
  course,
  index,
  language,
  onSelect,
}: {
  course: Course;
  index: number;
  language: 'NL' | 'EN';
  onSelect: () => void;
}) {
  return (
    <m.div
      key={course.id}
      initial={{ opacity: 0, y: 100, rotateX: 15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
      className={`group relative cursor-pointer ${index % 2 === 0 ? 'lg:mt-0' : 'lg:mt-12'}`}
    >
      <div
        className={`relative h-full bg-white/70 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl shadow-black/5 transition-all duration-700 group-hover:scale-[1.02] group-hover:shadow-3xl group-hover:shadow-black/10 overflow-hidden ${
          course.featured ? 'ring-2 ring-purple-500/30' : ''
        }`}
      >
        {course.featured && (
          <div className="absolute -top-3 -right-3 z-20">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-2xl text-sm font-bold flex items-center gap-2 shadow-lg">
              <Star className="w-4 h-4 fill-current" />
              AANBEVOLEN
            </div>
          </div>
        )}
        <div className={`absolute inset-0 bg-gradient-to-br ${course.color} opacity-5 rounded-3xl`} />
        <div className="relative z-10 p-8 h-full flex flex-col">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-3xl font-black text-gray-900 tracking-tight">{course.name[language]}</h3>
              <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${course.color} flex items-center justify-center`}>
                <Zap className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-5xl font-black text-gray-900 mb-2">{course.pricePerPerson}</div>
            <p className="text-gray-600 font-medium">{course.description[language]}</p>
          </div>
          <div className="space-y-4 mb-8 flex-grow">
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-purple-500 rounded-full" />
              <span className="font-medium text-gray-700">{course.duration[language]}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <span className="font-medium text-gray-700">{course.lessons[language]}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-emerald-500 rounded-full" />
              <span className="font-medium text-gray-700">{course.pricePerLessonHour} per uur</span>
            </div>
          </div>
          <div className={`bg-gradient-to-r ${course.color} bg-opacity-10 rounded-2xl p-4 mb-6`}>
            <p className="text-sm font-bold text-gray-900">💡 {course.highlight[language]}</p>
          </div>
          <Button
            onClick={onSelect}
            className={`w-full py-4 text-lg font-bold rounded-2xl transition-all duration-300 bg-gradient-to-r ${course.color} text-white hover:scale-105 hover:shadow-xl shadow-lg`}
          >
            SELECTEER
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
        <div className={`absolute inset-0 bg-gradient-to-r ${course.color} opacity-0 group-hover:opacity-10 transition-opacity duration-700 rounded-3xl`} />
      </div>
    </m.div>
  );
}
