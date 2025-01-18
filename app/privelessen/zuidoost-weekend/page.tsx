'use client';

import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';

const content = {
  hero: {
    title: {
      EN: 'Weekend Tutoring',
      NL: 'Weekend Bijles'
    },
    subtitle: {
      EN: 'Weekend Tutoring Services in Amsterdam Zuidoost',
      NL: 'Weekend Bijles Diensten in Amsterdam Zuidoost'
    },
    description: {
      EN: 'Flexible weekend tutoring to fit your schedule. €30/hour with experienced tutors available on Saturdays and Sundays.',
      NL: 'Flexibele weekend bijles die past bij jouw schema. €30/uur met ervaren docenten beschikbaar op zaterdag en zondag.'
    }
  },
  cta: {
    trial: {
      EN: 'Book Free Trial',
      NL: 'Boek Gratis Proefles'
    },
    whatsapp: {
      EN: 'WhatsApp Us',
      NL: 'WhatsApp Ons'
    }
  },
  footer: {
    EN: 'Available Saturdays & Sundays',
    NL: 'Beschikbaar op Zaterdag & Zondag'
  }
};

export default function ZuidoostWeekendPage() {
  const { t } = useTranslation();
  const { language } = useLanguage();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-green-600 to-yellow-500 pt-14 md:pt-24">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {t(content.hero.title)}
            </h1>
            <h2 className="text-2xl md:text-3xl mb-6">
              {t(content.hero.subtitle)}
            </h2>
            <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
              {t(content.hero.description)}
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <a 
                href="https://wa.me/31687340641?text=Hi!%20I'm%20interested%20in%20weekend%20tutoring.%20Can%20I%20book%20a%20trial%20lesson?"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-400 text-white font-bold py-3 px-8 rounded-full transition-all duration-300"
              >
                {t(content.cta.trial)}
              </a>
              <a 
                href="https://wa.me/31687340641"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-bold py-3 px-8 rounded-full transition-all duration-300"
              >
                {t(content.cta.whatsapp)}
              </a>
            </div>

            <p className="mt-12 text-2xl font-bold">
              {t(content.footer)}
            </p>
          </div>
        </div>
      </main>
    </>
  );
} 