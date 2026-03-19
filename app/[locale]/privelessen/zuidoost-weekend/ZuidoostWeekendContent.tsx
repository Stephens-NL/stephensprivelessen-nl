'use client';

import { useLocale, useTranslations } from 'next-intl';
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
  const t = useTranslations('weekend');
  const content = weekendLocations.find((loc) => loc.id === 'zuidoost-weekend');
  if (!content) throw new Error('Content not found for zuidoost-weekend');
  const legacyT = (obj: Record<string, string> | string) => typeof obj === 'string' ? obj : obj['EN'] || '';
  const businessData = getBusinessData(legacyT);

  const educationLevels = [
    { id: 'basis', title: t('educationLevels.primary'), subjects: businessData.subjects.primary },
    { id: 'voortgezet', title: t('educationLevels.secondary'), subjects: businessData.subjects.secondary },
    { id: 'hoger', title: t('educationLevels.higher'), subjects: [...businessData.subjects.higher, ...businessData.subjects.programming] },
  ];

  const offerKeys = ['weekendTutoring', 'personalCoaching', 'flexibleSupport'];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-amber-900 to-amber-700 pt-14 md:pt-24">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center text-white">
            <div className="inline-block bg-[var(--amber-hover)]/20 rounded-full px-6 py-2 mb-6">
              <div className="flex items-center gap-2 text-[var(--amber)] font-bold"><FaStar /><span>{t('specialOffer')}</span><FaStar /></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{t('title')}</h1>
            <h2 className="text-2xl md:text-3xl mb-6">{t('subtitle')}</h2>
            <div className="mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-[var(--amber)] mb-2">{t('discount.text')}</h2>
              <p className="text-xl text-[var(--cream)]">{t('discount.subtext')}</p>
            </div>
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-12">
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm w-full md:w-64">
                <h3 className="text-lg font-medium text-[var(--cream)] mb-2">{t('pricing.regularPrice.label')}</h3>
                <div className="text-3xl font-bold mb-1 line-through text-white/70">€{content.pricing.regularPrice.amount}</div>
                <div className="text-sm text-white/60">{t('pricing.regularPrice.perHour')}</div>
              </div>
              <div className="text-4xl text-[var(--amber)]">→</div>
              <Dialog>
                <DialogTrigger asChild>
                  <m.div className="bg-gradient-to-br from-[var(--amber)] to-[var(--amber-hover)] rounded-xl p-6 w-full md:w-72 transform hover:scale-105 transition-transform duration-300 cursor-pointer" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <h3 className="text-lg font-medium text-white mb-2">{t('pricing.weekendRate.label')}</h3>
                    <div className="text-5xl font-bold mb-1">€{content.pricing.communityRate.amount}</div>
                    <div className="text-sm mb-2">{t('pricing.weekendRate.perHour')}</div>
                    <div className="bg-[var(--amber)] text-[var(--ink)] text-sm font-bold py-1 px-3 rounded-full inline-block">{t('pricing.weekendRate.savings')}</div>
                  </m.div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-amber-900 text-white">
                  <DialogHeader><DialogTitle className="text-2xl font-bold text-[var(--amber)] mb-4">{t('form.studentInfo')}</DialogTitle></DialogHeader>
                  <ZuidoostStudentForm educationLevels={educationLevels} whatsappMessage={t('form.trialWhatsApp')} />
                </DialogContent>
              </Dialog>
            </div>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-[var(--amber)] mb-3"><FaMapMarkerAlt className="text-xl" /><h3 className="font-medium">{t('features.location.title')}</h3></div>
                <p className="text-white/90">{t('features.location.text')}</p>
              </div>
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-[var(--amber)] mb-3"><FaClock className="text-xl" /><h3 className="font-medium">{t('features.availability.title')}</h3></div>
                <p className="text-white/90">{t('features.availability.text')}</p>
              </div>
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-[var(--amber)] mb-3"><FaCheck className="text-xl" /><h3 className="font-medium">{t('features.extras.title')}</h3></div>
                <p className="text-white/90">{t('features.extras.text')}</p>
              </div>
            </div>
            <ZuidoostLocationMap />
            <ZuidoostSubjectsSection educationLevels={educationLevels} />
            <div className="grid gap-8 md:grid-cols-3 mb-12">
              {offerKeys.map((key) => <ZuidoostOfferVariant key={key} offerKey={key} educationLevels={educationLevels} />)}
            </div>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-12">
              <m.a href={`${config.contact.whatsapp}?text=Hi!%20I'm%20interested%20in%20weekend%20tutoring.%20Can%20I%20book%20a%20trial%20lesson?`} target="_blank" rel="noopener noreferrer" className="bg-[var(--amber-hover)] hover:bg-[var(--amber)] text-[var(--ink)] font-bold py-4 px-8 rounded-full transition-all duration-300" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                {t('cta.trial')}
              </m.a>
              <m.a href={config.contact.whatsapp} target="_blank" rel="noopener noreferrer" className="bg-white/20 hover:bg-white/30 text-white font-bold py-4 px-8 rounded-full transition-all duration-300" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                {t('cta.whatsapp')}
              </m.a>
            </div>
            <m.p className="text-3xl font-bold text-[var(--amber)]" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>{t('footer')}</m.p>
            <m.div className="mt-16 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <p className="text-xl text-white/90 mb-6">{t('form.questionsText')}</p>
              <Dialog>
                <DialogTrigger asChild><Button size="lg" className="bg-[var(--amber-hover)] hover:bg-[var(--amber)] text-[var(--ink)] font-semibold px-8 py-6 text-lg">{t('form.contactUs')}</Button></DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-amber-900 text-white">
                  <DialogHeader><DialogTitle className="text-2xl font-bold text-[var(--amber)] mb-4">{t('form.studentInfo')}</DialogTitle></DialogHeader>
                  <ZuidoostStudentForm educationLevels={educationLevels} whatsappMessage={t('form.questionsWhatsApp')} />
                </DialogContent>
              </Dialog>
            </m.div>
          </div>
        </div>
      </main>
    </>
  );
}
