'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaMapMarkerAlt, FaClock, FaCoffee } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { WeekendLocation } from '@/data/types';

interface LocationSectionProps {
  content: WeekendLocation;
}

export function LocationSection({ content }: LocationSectionProps) {
  const { language } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.section
      ref={ref}
      id="location"
      className="py-24 px-4"
      style={{
        transform: isInView ? "none" : "translateY(100px)",
        opacity: isInView ? 1 : 0,
        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 mb-4">
            {content.features.location.title[language]}
          </h2>
          <p className="text-white/80 text-lg">
            {content.location.description[language]}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="mt-1">
                <FaMapMarkerAlt className="text-yellow-500 text-2xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-yellow-200 mb-2">
                  {content.location.name[language]}
                </h3>
                <p className="text-white/80">
                  {content.location.address}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="mt-1">
                <FaClock className="text-yellow-500 text-2xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-yellow-200 mb-2">
                  {language === 'NL' ? 'Openingstijden' : 'Opening Hours'}
                </h3>
                <p className="text-white/80">
                  {content.location.hours[language]}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="mt-1">
                <FaCoffee className="text-yellow-500 text-2xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-yellow-200 mb-2">
                  {language === 'NL' ? 'Faciliteiten' : 'Facilities'}
                </h3>
                <p className="text-white/80">
                  {language === 'NL' 
                    ? 'Rustige studieomgeving, gratis WiFi, koffie en thee beschikbaar'
                    : 'Quiet study environment, free WiFi, coffee and tea available'
                  }
                </p>
              </div>
            </div>

            <Button
              className="bg-yellow-500 hover:bg-yellow-400 text-yellow-900 font-bold mt-4"
              asChild
            >
              <Link href={content.location.mapUrl} target="_blank">
                {language === 'NL' ? 'Open in Google Maps' : 'Open in Google Maps'}
              </Link>
            </Button>
          </div>

          <div className="relative aspect-video rounded-2xl overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2438.7374633546367!2d4.945661776676655!3d52.31198427198029!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c60b96d0c5e6cf%3A0x39396e72efb3a37e!2sDouwe%20Egberts%20Cafe!5e0!3m2!1sen!2snl!4v1709924607943!5m2!1sen!2snl"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
} 