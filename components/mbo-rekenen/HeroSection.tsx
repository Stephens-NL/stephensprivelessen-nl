'use client';

import { useTranslations } from 'next-intl';
import { useLanguage } from '@/hooks/useLanguage';
import { m } from 'framer-motion';
import { ArrowRight, Calculator, TrendingUp, Users } from 'lucide-react';
import { staggeredFadeInUp } from '@/lib/animations';
import { scrollToElement } from '@/lib/scroll';

export function HeroSection() {
  const language = useLanguage();
  const t = useTranslations('mbo');

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
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-[var(--cream)] to-[var(--cream-dark)]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        <div className="text-center">
          {/* Main Content */}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-[var(--cream-dark)] text-[var(--warm-text)] px-4 py-2 rounded-full text-sm font-medium mb-8">
              <Calculator className="w-4 h-4" />
              {t('form.mboMathSupport')}
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-light text-[var(--ink)] mb-8 tracking-tight leading-tight">
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
            
            <p className="text-xl md:text-2xl text-[var(--muted-text)] mb-12 max-w-4xl mx-auto leading-relaxed">
              {t('form.sinceMathBecameMandatoryForTheMboDiplomaWeHelpStud')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <m.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => scrollToElement('contact')}
                className="group bg-[var(--ink)] text-[var(--cream)] px-8 py-4 rounded-xl text-lg font-medium hover:bg-[var(--ink-light)] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                {t('form.startToday')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </m.button>
              
              <m.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  const element = document.querySelector('[data-section="pricing"]');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-[var(--cream)] border-2 border-[var(--border-warm)] text-[var(--ink)] px-8 py-4 rounded-xl text-lg font-medium hover:border-[var(--ink)] transition-all duration-300"
              >
                {t('form.viewPrograms')}
              </m.button>
            </div>
          </m.div>

          {/* Stats */}
          <m.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <m.div
                key={stat.label?.[language] ?? stat.value ?? index}
                {...staggeredFadeInUp(index, 0.6)}
                className="bg-[var(--cream)] rounded-2xl border border-[var(--border-warm)] p-8 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-[var(--cream-dark)] rounded-xl mb-4 group-hover:bg-[var(--ink)] group-hover:text-[var(--cream)] transition-all duration-300">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-3xl font-light text-[var(--ink)] mb-2">
                  {stat.value}
                </div>
                <div className="text-[var(--muted-text)] text-sm">
                  {stat.label[language]}
                </div>
              </m.div>
            ))}
          </m.div>
        </div>
      </div>
    </section>
  );
} 