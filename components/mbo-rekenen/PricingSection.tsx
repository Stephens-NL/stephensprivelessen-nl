'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { RekentrajectenComparison } from './RekentrajectenComparison';
import { MessageCircle, Phone, Calendar } from 'lucide-react';

export function PricingSection() {
  const { language } = useLanguage();

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const contactMethods = [
    {
      icon: MessageCircle,
      title: { NL: 'WhatsApp', EN: 'WhatsApp' },
      description: { NL: 'Direct contact voor snelle vragen', EN: 'Direct contact for quick questions' },
      action: { NL: 'Stuur bericht', EN: 'Send message' }
    },
    {
      icon: Phone,
      title: { NL: 'Telefonisch', EN: 'Phone call' },
      description: { NL: 'Persoonlijk gesprek over jouw situatie', EN: 'Personal conversation about your situation' },
      action: { NL: 'Bel nu', EN: 'Call now' }
    },
    {
      icon: Calendar,
      title: { NL: 'Kennismaking', EN: 'Meet & Greet' },
      description: { NL: 'Gratis intakegesprek op locatie', EN: 'Free intake meeting on location' },
      action: { NL: 'Plan afspraak', EN: 'Schedule meeting' }
    }
  ];

  return (
    <div data-section="pricing">
      {/* Individual Lessons Info */}
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
              {language === 'NL' ? 'Flexibele begeleiding' : 'Flexible guidance'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
              {language === 'NL'
                ? 'Naast onze groepstrajecten bieden we ook individuele lessen aan voor persoonlijke begeleiding.'
                : 'In addition to our group programs, we also offer individual lessons for personal guidance.'}
            </p>

            <div className="bg-gray-50 rounded-2xl p-8 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-light text-gray-900 mb-2">€50</div>
                  <div className="text-gray-600">
                    {language === 'NL' ? 'per uur' : 'per hour'}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {language === 'NL' ? 'Individuele lessen' : 'Individual lessons'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-light text-gray-900 mb-2">€35</div>
                  <div className="text-gray-600">
                    {language === 'NL' ? 'per uur' : 'per hour'}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {language === 'NL' ? 'Groepslessen (2-4 personen)' : 'Group lessons (2-4 people)'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-light text-gray-900 mb-2">Online</div>
                  <div className="text-gray-600">
                    {language === 'NL' ? 'beschikbaar' : 'available'}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {language === 'NL' ? 'Alle opties' : 'All options'}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {contactMethods.map((method, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer"
                    onClick={scrollToContact}
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl mb-4 group-hover:bg-gray-900 group-hover:text-white transition-all duration-300">
                      <method.icon className="w-6 h-6" />
                    </div>
                    <h4 className="font-medium text-gray-900 mb-2">
                      {method.title[language]}
                    </h4>
                    <p className="text-sm text-gray-600 mb-4">
                      {method.description[language]}
                    </p>
                    <div className="text-sm font-medium text-gray-900 group-hover:text-gray-700">
                      {method.action[language]} →
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Group Programs Comparison */}
      <RekentrajectenComparison />
    </div>
  );
} 