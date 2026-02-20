'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { m } from 'framer-motion';
import { Mail, MessageCircle, Phone, MapPin, Clock } from 'lucide-react';

export function ContactSection() {
  const { language } = useLanguage();

  const contactInfo = [
    {
      icon: MessageCircle,
      label: { NL: 'WhatsApp', EN: 'WhatsApp' },
      value: '+31 6 12345678',
      href: 'https://wa.me/31612345678',
      description: { NL: 'Snelste manier voor contact', EN: 'Fastest way to contact' }
    },
    {
      icon: Mail,
      label: { NL: 'E-mail', EN: 'Email' },
      value: 'info@stephensprivelessen.nl',
      href: 'mailto:info@stephensprivelessen.nl',
      description: { NL: 'Voor uitgebreidere vragen', EN: 'For more detailed questions' }
    },
    {
      icon: Phone,
      label: { NL: 'Telefoon', EN: 'Phone' },
      value: '+31 6 12345678',
      href: 'tel:+31612345678',
      description: { NL: 'Persoonlijk gesprek', EN: 'Personal conversation' }
    }
  ];

  const availability = [
    { NL: 'Maandag - Vrijdag: 9:00 - 21:00', EN: 'Monday - Friday: 9:00 - 21:00' },
    { NL: 'Zaterdag: 10:00 - 18:00', EN: 'Saturday: 10:00 - 18:00' },
    { NL: 'Zondag: Op afspraak', EN: 'Sunday: By appointment' }
  ];

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 tracking-tight">
            {language === 'NL' ? 'Laten we kennismaken' : 'Let\'s get in touch'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {language === 'NL'
              ? 'Klaar om te starten? Neem contact op voor een gratis kennismakingsgesprek en ontdek hoe we jou kunnen helpen.'
              : 'Ready to start? Contact us for a free introductory meeting and discover how we can help you.'}
          </p>
        </m.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Methods */}
          <m.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-light text-gray-900 mb-8">
              {language === 'NL' ? 'Neem contact op' : 'Get in touch'}
            </h3>
            
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <m.a
                  key={info.label?.[language] ?? info.value ?? index}
                  href={info.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="block bg-white rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group border border-gray-200"
                >
                  <div className="flex items-start gap-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl group-hover:bg-gray-900 group-hover:text-white transition-all duration-300">
                      <info.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-1">
                        {info.label[language]}
                      </h4>
                      <p className="text-gray-900 font-mono text-sm mb-2">
                        {info.value}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {info.description[language]}
                      </p>
                    </div>
                  </div>
                </m.a>
              ))}
            </div>
          </m.div>

          {/* Info & Availability */}
          <m.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Availability */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-6 h-6 text-gray-700" />
                <h3 className="text-xl font-medium text-gray-900">
                  {language === 'NL' ? 'Beschikbaarheid' : 'Availability'}
                </h3>
              </div>
              <div className="space-y-3">
                {availability.map((time) => (
                  <div key={time[language]} className="text-gray-600">
                    {time[language]}
                  </div>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="w-6 h-6 text-gray-700" />
                <h3 className="text-xl font-medium text-gray-900">
                  {language === 'NL' ? 'Locaties' : 'Locations'}
                </h3>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    {language === 'NL' ? 'Amsterdam & omgeving' : 'Amsterdam & surroundings'}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {language === 'NL' 
                      ? 'Flexibele locaties: thuis, op school, bibliotheek of online'
                      : 'Flexible locations: at home, at school, library or online'}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    {language === 'NL' ? 'Online lessen' : 'Online lessons'}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {language === 'NL'
                      ? 'Mogelijk voor alle trajecten via Zoom of Teams'
                      : 'Available for all programs via Zoom or Teams'}
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gray-900 rounded-2xl p-8 text-white text-center">
              <h3 className="text-xl font-light mb-4">
                {language === 'NL' ? 'Gratis kennismaking' : 'Free introduction'}
              </h3>
              <p className="text-gray-300 text-sm mb-6">
                {language === 'NL'
                  ? 'Geen verplichtingen, gewoon kennismaken en kijken of we bij elkaar passen.'
                  : 'No obligations, just getting to know each other and see if we\'re a good match.'}
              </p>
              <a
                href="https://wa.me/31612345678"
                className="inline-block bg-white text-gray-900 px-6 py-3 rounded-xl font-medium hover:bg-gray-100 transition-colors duration-300"
              >
                {language === 'NL' ? 'Plan kennismaking' : 'Schedule introduction'}
              </a>
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
} 