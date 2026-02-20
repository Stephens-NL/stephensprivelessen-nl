'use client';

import { useTranslation } from '@/hooks/useTranslation';
import { m } from 'framer-motion';
import { FaStar, FaMapMarkerAlt, FaClock, FaCheck } from 'react-icons/fa';
import { weekendLocations } from '@/data/weekendTutoring';
import { getBusinessData } from '@/data/businessData';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Header from '@/components/Header';
import { ZuidoostStudentForm } from '@/components/privelessen/zuidoost/ZuidoostStudentForm';
import { ZuidoostOfferVariant } from '@/components/privelessen/zuidoost/ZuidoostOfferVariant';
import { ZuidoostLocationMap } from '@/components/privelessen/zuidoost/ZuidoostLocationMap';
import { ZuidoostSubjectsSection } from '@/components/privelessen/zuidoost/ZuidoostSubjectsSection';
import { config } from '@/data/config';

export default function ZuidoostWeekendContent() {
  const { t } = useTranslation();
  const content = weekendLocations.find((loc) => loc.id === 'zuidoost-weekend');
  if (!content) throw new Error('Content not found for zuidoost-weekend');
  const businessData = getBusinessData(t);

  const educationLevels = [
    { id: 'basis', titleNL: 'Basisonderwijs', titleEN: 'Primary Education', subjects: businessData.subjects.primary, whatsappIntro: "Hi! I'm looking for primary school tutoring", hasDiscount: true },
    { id: 'voortgezet', titleNL: 'Voortgezet Onderwijs', titleEN: 'Secondary Education', subjects: businessData.subjects.secondary, whatsappIntro: "Hi! I'm looking for high school tutoring", hasDiscount: true },
    { id: 'hoger', titleNL: 'Hoger Onderwijs', titleEN: 'Higher Education', subjects: [...businessData.subjects.higher, ...businessData.subjects.programming], whatsappIntro: "Hi! I'm looking for university level tutoring", hasDiscount: false },
  ];

  const offers = [
    { title: "Weekend Tutoring for Students", description: "🎓 Special community discount for students in Zuidoost! Only €30 per hour (regular €60). Home tutoring available in Gein or at Douwe Egberts. Start with a free 30-minute trial lesson!", cta: "Book Free Trial", whatsappMessage: "Hi! I'm interested in the weekend tutoring special offer (€30/hour). I'd like to schedule a free trial lesson." },
    { title: "Personal Coaching & Study Support", description: "💡 Need guidance with your studies or personal development? Available weekends for €30/hour in Zuidoost. First 30-minute consultation is free.", cta: "Get Info", whatsappMessage: "Hi! I'm interested in personal coaching/study support (€30/hour weekend offer). Can you tell me more?" },
    { title: "Flexible Weekend Support", description: "✨ Whether it's math, coaching, or just discussing your studies - I'm here to help! Special rate of €30/hour (save €30). Available at Douwe Egberts or home tutoring in Gein.", cta: "Start Now", whatsappMessage: "Hi! I'm interested in the flexible weekend support (€30/hour). I'd like to learn more about the possibilities." },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-amber-900 to-amber-700 pt-14 md:pt-24">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center text-white">
            <div className="inline-block bg-yellow-500/20 rounded-full px-6 py-2 mb-6">
              <div className="flex items-center gap-2 text-yellow-300 font-bold"><FaStar /><span>{t(content.specialOffer)}</span><FaStar /></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{t(content.title)}</h1>
            <h2 className="text-2xl md:text-3xl mb-6">{t(content.subtitle)}</h2>
            <div className="mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-yellow-300 mb-2">{t(content.discount.text)}</h2>
              <p className="text-xl text-yellow-200">{t(content.discount.subtext)}</p>
            </div>
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-12">
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm w-full md:w-64">
                <h3 className="text-lg font-medium text-yellow-200 mb-2">{t(content.pricing.regularPrice.label)}</h3>
                <div className="text-3xl font-bold mb-1 line-through text-white/70">€{content.pricing.regularPrice.amount}</div>
                <div className="text-sm text-white/60">{t(content.pricing.regularPrice.perHour)}</div>
              </div>
              <div className="text-4xl text-yellow-300">→</div>
              <Dialog>
                <DialogTrigger asChild>
                  <m.div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-6 w-full md:w-72 transform hover:scale-105 transition-transform duration-300 cursor-pointer" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <h3 className="text-lg font-medium text-white mb-2">{t(content.pricing.communityRate.label)}</h3>
                    <div className="text-5xl font-bold mb-1">€{content.pricing.communityRate.amount}</div>
                    <div className="text-sm mb-2">{t(content.pricing.communityRate.perHour)}</div>
                    <div className="bg-yellow-400 text-yellow-900 text-sm font-bold py-1 px-3 rounded-full inline-block">{t(content.pricing.communityRate.savings)}</div>
                  </m.div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-amber-900 text-white">
                  <DialogHeader><DialogTitle className="text-2xl font-bold text-yellow-300 mb-4">Student Information</DialogTitle></DialogHeader>
                  <ZuidoostStudentForm educationLevels={educationLevels} whatsappMessage="Hi! I'm interested in the €30/hour weekend tutoring special offer!" />
                </DialogContent>
              </Dialog>
            </div>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-yellow-300 mb-3"><FaMapMarkerAlt className="text-xl" /><h3 className="font-medium">{t(content.features.location.title)}</h3></div>
                <p className="text-white/90">{t(content.features.location.text)}</p>
              </div>
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-yellow-300 mb-3"><FaClock className="text-xl" /><h3 className="font-medium">{t(content.features.availability.title)}</h3></div>
                <p className="text-white/90">{t(content.features.availability.text)}</p>
              </div>
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-yellow-300 mb-3"><FaCheck className="text-xl" /><h3 className="font-medium">{t(content.features.extras.title)}</h3></div>
                <p className="text-white/90">{t(content.features.extras.text)}</p>
              </div>
            </div>
            <ZuidoostLocationMap />
            <ZuidoostSubjectsSection educationLevels={educationLevels} />
            <div className="grid gap-8 md:grid-cols-3 mb-12">
              {offers.map((offer) => <ZuidoostOfferVariant key={offer.title} {...offer} educationLevels={educationLevels} />)}
            </div>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-12">
              <m.a href={`${config.contact.whatsapp}?text=Hi!%20I'm%20interested%20in%20weekend%20tutoring.%20Can%20I%20book%20a%20trial%20lesson?`} target="_blank" rel="noopener noreferrer" className="bg-yellow-500 hover:bg-yellow-400 text-yellow-900 font-bold py-4 px-8 rounded-full transition-all duration-300" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                {t(content.cta.trial)}
              </m.a>
              <m.a href={config.contact.whatsapp} target="_blank" rel="noopener noreferrer" className="bg-white/20 hover:bg-white/30 text-white font-bold py-4 px-8 rounded-full transition-all duration-300" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                {t(content.cta.whatsapp)}
              </m.a>
            </div>
            <m.p className="text-3xl font-bold text-yellow-300" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>{t(content.footer)}</m.p>
            <m.div className="mt-16 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <p className="text-xl text-white/90 mb-6">Have questions? Feel free to contact us for more information.</p>
              <Dialog>
                <DialogTrigger asChild><Button size="lg" className="bg-yellow-500 hover:bg-yellow-400 text-yellow-900 font-semibold px-8 py-6 text-lg">Contact Us Now</Button></DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-amber-900 text-white">
                  <DialogHeader><DialogTitle className="text-2xl font-bold text-yellow-300 mb-4">Student Information</DialogTitle></DialogHeader>
                  <ZuidoostStudentForm educationLevels={educationLevels} whatsappMessage="Hi! I have some questions about weekend tutoring." />
                </DialogContent>
              </Dialog>
            </m.div>
          </div>
        </div>
      </main>
    </>
  );
}
