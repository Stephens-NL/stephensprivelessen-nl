'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { BookOpen, Target, Trophy, Users } from 'lucide-react';

export function AboutSection() {
  const { language } = useLanguage();

  const features = [
    {
      icon: Target,
      title: { NL: 'Gerichte aanpak', EN: 'Targeted approach' },
      description: { NL: 'Persoonlijke begeleiding afgestemd op jouw niveau en doelen', EN: 'Personal guidance tailored to your level and goals' }
    },
    {
      icon: BookOpen,
      title: { NL: 'Bewezen methoden', EN: 'Proven methods' },
      description: { NL: 'Effectieve lesmaterialen en technieken voor optimaal leerresultaat', EN: 'Effective teaching materials and techniques for optimal learning results' }
    },
    {
      icon: Trophy,
      title: { NL: 'Hoog slagingspercentage', EN: 'High success rate' },
      description: { NL: '95% van onze studenten slaagt voor hun rekentoets', EN: '95% of our students pass their math test' }
    },
    {
      icon: Users,
      title: { NL: 'Ervaren docenten', EN: 'Experienced teachers' },
      description: { NL: 'Gespecialiseerd in MBO-rekenen met jarenlange ervaring', EN: 'Specialized in MBO math with years of experience' }
    }
  ];

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
            {language === 'NL' ? 'Waarom kiezen voor ons?' : 'Why choose us?'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {language === 'NL'
              ? 'We begrijpen de uitdagingen van MBO-rekenen en bieden de ondersteuning die je nodig hebt om succesvol te zijn.'
              : 'We understand the challenges of MBO math and provide the support you need to succeed.'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 bg-white rounded-xl mb-6 group-hover:bg-gray-900 group-hover:text-white transition-all duration-300 shadow-sm">
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-4">
                {feature.title[language]}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description[language]}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gray-900 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-light mb-4">
              {language === 'NL' ? 'Klaar voor jouw rekentoets?' : 'Ready for your math test?'}
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              {language === 'NL'
                ? 'Sluit je aan bij honderden studenten die al succesvol hun MBO-rekentoets hebben gehaald met onze begeleiding.'
                : 'Join hundreds of students who have successfully passed their MBO math test with our guidance.'}
            </p>
            <div className="inline-flex items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                {language === 'NL' ? 'Kleine groepen' : 'Small groups'}
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                {language === 'NL' ? 'Flexibele tijden' : 'Flexible times'}
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                {language === 'NL' ? 'Online & offline' : 'Online & offline'}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 