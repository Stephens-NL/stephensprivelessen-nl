'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { m, useScroll, useTransform, useSpring } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { WeekendLocation } from '@/data/types';

interface HeroSectionProps {
  content: WeekendLocation;
}

export function HeroSection({ content }: HeroSectionProps) {
  const { language } = useLanguage();
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -10]);
  
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const scaleSpring = useSpring(scale, springConfig);
  const rotateSpring = useSpring(rotate, springConfig);

  return (
    <m.div
      className="h-screen relative overflow-hidden flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-amber-950 via-amber-900 to-yellow-900 opacity-50" />
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/patterns/noise.png')] opacity-[0.03] mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent" />
      </div>
      
      <m.div 
        style={{ 
          y,
          opacity,
          scale: scaleSpring,
          rotateZ: rotateSpring,
        }}
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
      >
        <m.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-8"
        >
          <span className="text-yellow-300 text-lg font-medium tracking-wider uppercase">
            {content.specialOffer[language]}
          </span>
        </m.div>
        
        <m.h1 
          className="text-7xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-yellow-300 via-yellow-200 to-yellow-400 mb-6 leading-tight"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          {content.title[language]}
        </m.h1>

        <m.p 
          className="text-2xl md:text-4xl text-white/80 mb-12 italic font-light"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          {content.subtitle[language]}
        </m.p>

        <m.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex gap-6 justify-center"
        >
          <Button
            className="bg-yellow-500 hover:bg-yellow-400 text-yellow-900 font-bold text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
            asChild
          >
            <Link href="#offers" className="flex items-center gap-2">
              {content.cta.trial[language]}
              <m.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                →
              </m.span>
            </Link>
          </Button>
          
          <Button
            className="bg-white/10 hover:bg-white/20 text-white font-bold text-lg px-8 py-6 rounded-full backdrop-blur-sm transition-all duration-300"
            asChild
          >
            <Link href="#about">{content.cta.whatsapp[language]}</Link>
          </Button>
        </m.div>
      </m.div>

      <m.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-8 h-14 rounded-full border-2 border-yellow-300/30 flex items-start justify-center p-2">
          <m.div
            className="w-1 h-3 bg-yellow-300 rounded-full"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </m.div>
    </m.div>
  );
} 