'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

const reasons = [
  {
    title: {
      nl: 'Rustige en duidelijke uitleg',
      en: 'Calm and clear explanation'
    },
    description: {
      nl: 'Zonder haast.',
      en: 'Without rushing.'
    },
    icon: '🎯'
  },
  {
    title: {
      nl: 'Geduldig en ondersteunend',
      en: 'Patient and supportive'
    },
    description: {
      nl: 'We werken samen aan jouw zelfvertrouwen.',
      en: 'We work together on your confidence.'
    },
    icon: '🤝'
  },
  {
    title: {
      nl: 'Ruime ervaring',
      en: 'Extensive experience'
    },
    description: {
      nl: 'Met verschillende onderwijsniveaus en doelgroepen.',
      en: 'With different education levels and target groups.'
    },
    icon: '📚'
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
    icon: '💡'
  }
];

export function WhyChooseSection() {
  const { language } = useLanguage();

  return (
    <section className="py-20 bg-amber-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            {language === 'NL' 
              ? 'Waarom kiezen studenten voor mij?' 
              : 'Why do students choose me?'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-amber-950 p-6 rounded-lg flex items-start space-x-4"
              >
                <div className="text-4xl">{reason.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {language === 'NL' ? reason.title.nl : reason.title.en}
                  </h3>
                  <p className="text-amber-200">
                    {language === 'NL' ? reason.description.nl : reason.description.en}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
} 