'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { rekentrajectenComparison } from '@/data/pricingData';
import { Button } from '@/components/ui/button';
import { Star, Zap, ArrowRight, Info } from 'lucide-react';

export function RekentrajectenComparison() {
  const { language } = useLanguage();
  const [showDetails, setShowDetails] = useState(false);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const getCourseValue = (course: any, featureId: string) => {
    switch (featureId) {
      case 'duration': return course.duration[language];
      case 'lessons': return course.lessons[language];
      case 'personalSupport': return course.personalSupport[language];
      case 'contactHours': return course.contactHours[language];
      case 'pricePerPerson': return course.pricePerPerson;
      case 'pricePerLessonHour': return course.pricePerLessonHour;
      case 'refundPolicy': return course.refundPolicy[language];
      default: return '—';
    }
  };

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Liquid Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-200/30 to-cyan-200/30 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-emerald-200/20 to-teal-200/20 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 max-w-7xl">
        {/* Brutalist Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-block relative">
            <h2 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent mb-4 leading-none tracking-tighter">
              REKENTRAJECTEN
            </h2>
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
          </div>
          <p className="text-xl md:text-2xl text-gray-600 font-light tracking-wide max-w-2xl mx-auto">
            {rekentrajectenComparison.subtitle[language]}
          </p>
        </motion.div>

        {/* Liquid Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {rekentrajectenComparison.courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 100, rotateX: 15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.2,
                ease: [0.22, 1, 0.36, 1]
              }}
              viewport={{ once: true }}
              className={`group relative cursor-pointer ${
                index % 2 === 0 ? 'lg:mt-0' : 'lg:mt-12'
              }`}
            >
              {/* Glassmorphism Card */}
              <div className={`relative h-full bg-white/70 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl shadow-black/5 transition-all duration-700 group-hover:scale-[1.02] group-hover:shadow-3xl group-hover:shadow-black/10 overflow-hidden ${
                course.featured ? 'ring-2 ring-purple-500/30' : ''
              }`}>
                
                {/* Featured Badge */}
                {course.featured && (
                  <div className="absolute -top-3 -right-3 z-20">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-2xl text-sm font-bold flex items-center gap-2 shadow-lg">
                      <Star className="w-4 h-4 fill-current" />
                      AANBEVOLEN
                    </div>
                  </div>
                )}

                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${course.color} opacity-5 rounded-3xl`}></div>

                <div className="relative z-10 p-8 h-full flex flex-col">
                  {/* Header */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-3xl font-black text-gray-900 tracking-tight">
                        {course.name[language]}
                      </h3>
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${course.color} flex items-center justify-center`}>
                        <Zap className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="text-5xl font-black text-gray-900 mb-2">
                      {course.pricePerPerson}
                    </div>
                    <p className="text-gray-600 font-medium">
                      {course.description[language]}
                    </p>
                  </div>

                  {/* Key Features */}
                  <div className="space-y-4 mb-8 flex-grow">
                    <div className="flex items-center gap-4">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="font-medium text-gray-700">{course.duration[language]}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="font-medium text-gray-700">{course.lessons[language]}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="font-medium text-gray-700">{course.pricePerLessonHour} per uur</span>
                    </div>
                  </div>

                  {/* Highlight */}
                  <div className={`bg-gradient-to-r ${course.color} bg-opacity-10 rounded-2xl p-4 mb-6`}>
                    <p className="text-sm font-bold text-gray-900">
                      💡 {course.highlight[language]}
                    </p>
                  </div>

                  {/* CTA */}
                  <Button
                    onClick={scrollToContact}
                    className={`w-full py-4 text-lg font-bold rounded-2xl transition-all duration-300 bg-gradient-to-r ${course.color} text-white hover:scale-105 hover:shadow-xl shadow-lg`}
                  >
                    SELECTEER
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>

                {/* Hover Glow */}
                <div className={`absolute inset-0 bg-gradient-to-r ${course.color} opacity-0 group-hover:opacity-10 transition-opacity duration-700 rounded-3xl`}></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Detailed Comparison Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Button
            onClick={() => setShowDetails(!showDetails)}
            variant="outline"
            size="lg"
            className="px-8 py-4 text-lg font-bold border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 rounded-2xl"
          >
            {showDetails ? 'VERBERG DETAILS' : 'TOON DETAILS'}
            <Info className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>

        {/* Detailed Table */}
        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -50 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -50 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
                {/* Table Header */}
                <div className="bg-gradient-to-r from-gray-900 to-gray-700 text-white p-8">
                  <h3 className="text-3xl font-black tracking-tight mb-2">
                    VOLLEDIGE VERGELIJKING
                  </h3>
                  <p className="text-gray-300">Alle details op een rij</p>
                </div>

                {/* Mobile Accordion View */}
                <div className="lg:hidden">
                  {rekentrajectenComparison.courses.map((course, courseIndex) => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: courseIndex * 0.1 }}
                      className="border-b border-gray-200 last:border-b-0"
                    >
                      <div className={`p-6 bg-gradient-to-r ${course.color} bg-opacity-5`}>
                        <h4 className="text-2xl font-bold text-gray-900 mb-4">
                          {course.name[language]}
                        </h4>
                        <div className="space-y-3">
                          {rekentrajectenComparison.features.map((feature) => (
                            <div key={feature.id} className="flex justify-between items-center">
                              <span className="text-gray-600 font-medium">
                                {feature.short[language]}:
                              </span>
                              <span className="font-bold text-gray-900">
                                {getCourseValue(course, feature.id)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Desktop Table View */}
                <div className="hidden lg:block overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left p-6 text-gray-900 font-black text-lg">
                          KENMERK
                        </th>
                        {rekentrajectenComparison.courses.map((course) => (
                          <th
                            key={course.id}
                            className={`text-center p-6 font-black relative ${
                              course.featured ? `bg-gradient-to-b ${course.color} bg-opacity-5` : ''
                            }`}
                          >
                            <div className="text-xl text-gray-900 mb-2">
                              {course.name[language]}
                            </div>
                            <div className="text-3xl font-black text-gray-900">
                              {course.pricePerPerson}
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {rekentrajectenComparison.features.map((feature, index) => (
                        <motion.tr
                          key={feature.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05, duration: 0.5 }}
                          className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors duration-200"
                        >
                          <td className="p-6 text-gray-900 font-bold">
                            {feature.label[language]}
                          </td>
                          {rekentrajectenComparison.courses.map((course) => (
                            <td
                              key={`${course.id}-${feature.id}`}
                              className={`p-6 text-center font-bold ${
                                course.featured ? `bg-gradient-to-b ${course.color} bg-opacity-5` : ''
                              }`}
                            >
                              <span className={`${
                                feature.id === 'pricePerPerson' 
                                  ? 'text-2xl font-black text-gray-900' 
                                  : 'text-gray-700'
                              }`}>
                                {getCourseValue(course, feature.id)}
                              </span>
                            </td>
                          ))}
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur-xl opacity-30"></div>
            <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-12 border border-white/20 shadow-2xl">
              <h3 className="text-4xl font-black text-gray-900 mb-4">
                KLAAR VOOR DE VOLGENDE STAP?
              </h3>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Kies jouw ideale traject en start vandaag nog met je rekenvoorbereiding.
              </p>
              <Button
                onClick={scrollToContact}
                size="lg"
                className="px-12 py-6 text-xl font-black bg-gradient-to-r from-gray-900 to-gray-700 text-white hover:scale-105 transition-all duration-300 rounded-2xl shadow-lg hover:shadow-xl"
              >
                START NU
                <Zap className="w-6 h-6 ml-3" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 