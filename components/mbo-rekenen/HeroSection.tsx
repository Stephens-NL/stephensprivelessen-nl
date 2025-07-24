'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { ArrowRight, Calculator, TrendingUp, Users } from 'lucide-react';

export function HeroSection() {
  const { language } = useLanguage();

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const stats = [
    {
      icon: Calculator,
      value: '95%',
      label: { NL: 'Slagingspercentage', EN: 'Success rate' }
    },
    {
      icon: Users,
      value: '500+',
      label: { NL: 'Studenten geholpen', EN: 'Students helped' }
    },
    {
      icon: TrendingUp,
      value: '8.9',
      label: { NL: 'Gemiddelde beoordeling', EN: 'Average rating' }
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        <div className="text-center">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
              <Calculator className="w-4 h-4" />
              {language === 'NL' ? 'MBO Rekenondersteuning' : 'MBO Math Support'}
            </div>
            
            <h1 className="text-5xl md:text-7xl font-light text-gray-900 mb-8 tracking-tight leading-tight">
              {language === 'NL' ? (
                <>
                  Jouw <span className="italic">rekentoets</span><br />
                  <span className="font-normal">meesterlijk</span> halen
                </>
              ) : (
                <>
                  Master your <span className="italic">math test</span><br />
                  with <span className="font-normal">confidence</span>
                </>
              )}
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              {language === 'NL' 
                ? 'Sinds rekenen verplicht werd voor het MBO-diploma, helpen wij studenten met gerichte begeleiding en bewezen methoden om succesvol te slagen.'
                : 'Since math became mandatory for the MBO diploma, we help students with targeted guidance and proven methods to succeed.'}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={scrollToContact}
                className="group bg-gray-900 text-white px-8 py-4 rounded-xl text-lg font-medium hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                {language === 'NL' ? 'Start vandaag' : 'Start today'}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  const element = document.querySelector('[data-section="pricing"]');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-white border-2 border-gray-200 text-gray-900 px-8 py-4 rounded-xl text-lg font-medium hover:border-gray-900 transition-all duration-300"
              >
                {language === 'NL' ? 'Bekijk trajecten' : 'View programs'}
              </motion.button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl mb-4 group-hover:bg-gray-900 group-hover:text-white transition-all duration-300">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-3xl font-light text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 text-sm">
                  {stat.label[language]}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
} 