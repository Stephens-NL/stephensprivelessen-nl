'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { User, Users, BookOpen, MapPin, Monitor } from 'lucide-react';

const services = [
  {
    title: {
      nl: 'Persoonlijke begeleiding',
      en: 'Personal guidance'
    },
    description: {
      nl: 'Individuele lessen op maat, afgestemd op jouw tempo en behoeften.',
      en: 'Individual lessons tailored to your pace and needs.'
    },
    icon: User
  },
  {
    title: {
      nl: 'Kleine groepjes',
      en: 'Small groups'
    },
    description: {
      nl: 'Je kunt ook samen met maximaal 3 medestudenten les volgen. Dit is voordeliger én gezellig.',
      en: 'You can also take lessons together with up to 3 fellow students. This is more affordable and fun.'
    },
    icon: Users
  },
  {
    title: {
      nl: 'Specifieke examenvoorbereiding',
      en: 'Specific exam preparation'
    },
    description: {
      nl: 'We oefenen specifiek op de vaardigheden en kennis die nodig zijn voor het mbo-rekenexamen.',
      en: 'We practice specifically on the skills and knowledge needed for the MBO math exam.'
    },
    icon: BookOpen
  },
  {
    title: {
      nl: 'Flexibiliteit in locatie',
      en: 'Location flexibility'
    },
    description: {
      nl: 'Lessen kunnen plaatsvinden in Amsterdam-Oost. Voor groepen van 3 à 4 studenten kom ik ook op locatie binnen de regio Amsterdam.',
      en: 'Lessons can take place in Amsterdam-East. For groups of 3-4 students, I also come to your location within the Amsterdam region.'
    },
    icon: MapPin
  },
  {
    title: {
      nl: 'Online lessen',
      en: 'Online lessons'
    },
    description: {
      nl: 'Wil je liever vanuit huis leren? Dat kan, tegen een gereduceerd tarief.',
      en: 'Would you prefer to learn from home? That\'s possible, at a reduced rate.'
    },
    icon: Monitor
  }
];

export function ServicesSection() {
  const { language } = useLanguage();

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 tracking-tight">
            {language === 'NL' ? 'Onze diensten' : 'Our services'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {language === 'NL'
              ? 'Van individuele begeleiding tot groepslessen - we bieden flexibele oplossingen voor elke leerstijl.'
              : 'From individual guidance to group lessons - we offer flexible solutions for every learning style.'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group border border-gray-200"
            >
                             <div className="inline-flex items-center justify-center w-14 h-14 bg-gray-100 rounded-xl mb-6 group-hover:bg-gray-900 group-hover:text-white transition-all duration-300">
                 {React.createElement(service.icon, { className: "w-7 h-7" })}
               </div>
              <h3 className="text-xl font-medium text-gray-900 mb-4">
                {language === 'NL' ? service.title.nl : service.title.en}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {language === 'NL' ? service.description.nl : service.description.en}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 