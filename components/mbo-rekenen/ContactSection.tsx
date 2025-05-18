'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import WhatsAppButton from '@/components/shared/WhatsAppButton';

export function ContactSection() {
  const { language } = useLanguage();

  return (
    <section id="contact" className="py-20 bg-amber-950">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            {language === 'NL' ? 'Contact opnemen?' : 'Get in touch?'}
          </h2>
          <p className="text-xl mb-8">
            {language === 'NL'
              ? 'Wil je meer informatie, een kennismaking of meteen lessen plannen?'
              : 'Would you like more information, an introduction, or to schedule lessons right away?'}
          </p>
          <p className="text-lg mb-12 text-amber-200">
            {language === 'NL'
              ? 'Samen zorgen we ervoor dat rekenen geen obstakel meer is, maar een vaardigheid die je onder controle hebt.'
              : 'Together, we\'ll make sure mathematics is no longer an obstacle, but a skill you have under control.'}
          </p>
          <div className="flex flex-col items-center space-y-4">
            <WhatsAppButton />
            <a
              href="https://stephensprivelessen.nl"
              className="text-amber-400 hover:text-amber-300 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              stephensprivelessen.nl
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 