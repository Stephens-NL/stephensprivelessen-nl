'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Target, Heart, BookOpenCheck, Lightbulb } from 'lucide-react';

const reasons = [
  {
    title: {
      nl: 'Rustige en duidelijke uitleg',
      en: 'Calm and clear explanation'
    },
    description: {
      nl: 'Zonder haast, met alle tijd voor jouw vragen en begrip.',
      en: 'Without rushing, with all the time for your questions and understanding.'
    },
    icon: Target
  },
  {
    title: {
      nl: 'Geduldig en ondersteunend',
      en: 'Patient and supportive'
    },
    description: {
      nl: 'We werken samen aan jouw zelfvertrouwen in rekenen.',
      en: 'We work together on your confidence in mathematics.'
    },
    icon: Heart
  },
  {
    title: {
      nl: 'Ruime ervaring',
      en: 'Extensive experience'
    },
    description: {
      nl: 'Met verschillende onderwijsniveaus en diverse doelgroepen.',
      en: 'With different education levels and diverse target groups.'
    },
    icon: BookOpenCheck
  },
  {
    title: {
      nl: 'Praktisch en begrijpelijk',
      en: 'Practical and understandable'
    },
    description: {
      nl: 'Ik maak rekenen praktisch en begrijpelijk, zodat je het direct kunt toepassen.',
      en: 'I make mathematics practical and understandable, so you can apply it immediately.'
    },
    icon: Lightbulb
  }
];

export function WhyChooseSection() {
  const { language } = useLanguage();

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 tracking-tight">
            {language === 'NL' 
              ? 'Waarom kiezen studenten voor ons?' 
              : 'Why do students choose us?'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {language === 'NL'
              ? 'Onze aanpak zorgt ervoor dat studenten niet alleen beter worden in rekenen, maar ook meer zelfvertrouwen krijgen.'
              : 'Our approach ensures that students not only improve in mathematics, but also gain more confidence.'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex items-start gap-6">
                                 <div className="inline-flex items-center justify-center w-14 h-14 bg-white rounded-xl group-hover:bg-gray-900 group-hover:text-white transition-all duration-300 shadow-sm flex-shrink-0">
                   {React.createElement(reason.icon, { className: "w-7 h-7" })}
                 </div>
                <div className="flex-1">
                  <h3 className="text-xl font-medium text-gray-900 mb-3">
                    {language === 'NL' ? reason.title.nl : reason.title.en}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {language === 'NL' ? reason.description.nl : reason.description.en}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gray-900 rounded-2xl p-8 text-white max-w-4xl mx-auto">
            <h3 className="text-2xl font-light mb-4">
              {language === 'NL' ? 'Klaar om te beginnen?' : 'Ready to get started?'}
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              {language === 'NL'
                ? 'Laat je niet tegenhouden door rekenen. Met de juiste begeleiding kun je het wel!'
                : 'Don\'t let mathematics hold you back. With the right guidance, you can do it!'}
            </p>
            <button
              onClick={() => {
                const element = document.getElementById('contact');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-white text-gray-900 px-8 py-4 rounded-xl font-medium hover:bg-gray-100 transition-colors duration-300"
            >
              {language === 'NL' ? 'Neem contact op' : 'Get in touch'}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 