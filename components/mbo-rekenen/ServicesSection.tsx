'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

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
    icon: '👤'
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
    icon: '👥'
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
    icon: '📝'
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
    icon: '📍'
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
    icon: '💻'
  }
];

export function ServicesSection() {
  const { language } = useLanguage();

  return (
    <section className="py-20 bg-amber-950">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            {language === 'NL' ? 'Wat bied ik aan?' : 'What do I offer?'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-amber-900 p-6 rounded-lg"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-3">
                  {language === 'NL' ? service.title.nl : service.title.en}
                </h3>
                <p className="text-amber-200">
                  {language === 'NL' ? service.description.nl : service.description.en}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
} 