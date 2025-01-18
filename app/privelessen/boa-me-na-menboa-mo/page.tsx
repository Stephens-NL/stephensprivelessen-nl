'use client';

import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';

const content = {
  hero: {
    title: {
      EN: 'Boa me na menboa mo',
      NL: 'Boa me na menboa mo'
    },
    subtitle: {
      EN: 'Weekend Tutoring for Ghanaian Youth in Amsterdam Zuidoost',
      NL: 'Weekend Bijles voor Ghanese Jongeren in Amsterdam Zuidoost'
    },
    description: {
      EN: 'Expert tutoring tailored to support Ghanaian students in their academic journey. €30/hour with experienced tutors who understand both educational systems.',
      NL: 'Deskundige bijles op maat om Ghanese studenten te ondersteunen in hun academische reis. €30/uur met ervaren docenten die beide onderwijssystemen begrijpen.'
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
    EN: 'Yɛbɛyɛ bi akɔ!',
    NL: 'Yɛbɛyɛ bi akɔ!'
  }
};

export default function BoaMeNaMenboaMoPage() {
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
                href="https://wa.me/31687340641?text=Hi!%20I'm%20interested%20in%20the%20Boa%20me%20na%20menboa%20mo%20tutoring%20program.%20Can%20I%20book%20a%20trial%20lesson?"
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