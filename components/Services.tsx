'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { Hero, HeroData, Service, ServiceData, generalContent } from '../data';
import { useTranslation } from '@/hooks/useTranslation';
import ButtonTrial from './ButtonTrial';
import ButtonLearnMore from './ButtonLearnMore';
import { X } from 'lucide-react';
import Link from 'next/link';

const Services = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const { t } = useTranslation();
  const [serviceData, setServiceData] = useState<ServiceData | null>(null);
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await fetch('/api/hero');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data: HeroData = await response.json();
        setHeroData(data);

        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    }
    const fetchServiceData = async () => {
      try {
        const response = await fetch('/api/services');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data: ServiceData = await response.json();
        setServiceData(data);

        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchServiceData();
    fetchHeroData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!serviceData) return null;
  if (!heroData) return null;

  const { services } = serviceData;
  const { hero } = heroData;
  const { ourServices, learnMore } = generalContent;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-blue-100 to-blue-800 overflow-hidden relative">
      {/* Background graphics */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute -top-20 -left-20 sm:-top-40 sm:-left-40 w-40 h-40 sm:w-80 sm:h-80 bg-blue-300 rounded-full opacity-20 mix-blend-multiply"></div>
        <div className="absolute top-10 right-10 sm:top-20 sm:right-20 w-30 h-30 sm:w-60 sm:h-60 bg-yellow-300 rounded-full opacity-20 mix-blend-multiply"></div>
        <div className="absolute bottom-20 -left-10 sm:bottom-40 sm:-left-20 w-50 h-50 sm:w-100 sm:h-100 bg-pink-300 rounded-full opacity-20 mix-blend-multiply"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 md:mb-16 text-center text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {String(t(ourServices))}
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {services.map(({ icon, title, shortDescription }, index) => (
            <motion.div
              key={index}
              className="bg-white bg-opacity-90 p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col transform hover:-translate-y-2"
              variants={itemVariants}
            >
              <div className="flex justify-center mb-4 sm:mb-6">
                <Image
                  src={icon}
                  alt={String(t(title))}
                  width={60}
                  height={60}
                  className="text-blue-500 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20"
                />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-center text-blue-900">
                {String(t(title))}
              </h3>
              <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6 text-center flex-grow">
                {String(t(shortDescription))}
              </p>
              <motion.div
                className="text-center mt-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {services[index].title.EN === "Mathematics & General Tutoring" || services[index].title.EN === "Programming Lessons" ? (
                  <Link href="/bijles">
                    <button className="inline-block bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-600 transition-colors duration-300">
                      {String(t(learnMore))} &rarr;
                    </button>
                  </Link>
                ) : services[index].title.EN === "Creative Workshops" ? (
                  <Link href="/workshops?type=creative">
                    <button className="inline-block bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-600 transition-colors duration-300">
                      {String(t(learnMore))} &rarr;
                    </button>
                  </Link>
                ) : services[index].title.EN === "Non-Creative Workshops" ? (
                  <Link href="/workshops?type=academic">
                    <button className="inline-block bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-600 transition-colors duration-300">
                      {String(t(learnMore))} &rarr;
                    </button>
                  </Link>
                ) : services[index].title.EN === "Consultancy & Advisory" ? (
                  <Link href="/consultancy">
                    <button className="inline-block bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-600 transition-colors duration-300">
                      {String(t(learnMore))} &rarr;
                    </button>
                  </Link>
                ) : (
                  <ButtonLearnMore t={t} onButtonClick={() => setSelectedService(services[index])} index={index} />
                )}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedService && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg p-6 sm:p-8 w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto shadow-lg relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            >
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
              <div className="text-center">
                <Image
                  src={selectedService.icon}
                  alt={String(t(selectedService.title))}
                  width={80}
                  height={80}
                  className="mx-auto mb-4 sm:mb-6 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
                />
                <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-blue-900">
                  {String(t(selectedService.title))}
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-4 sm:mb-6">
                  {String(t(selectedService.longDescription))}
                </p>
                {selectedService.subjectsList && (
                  <div className="mb-4 sm:mb-6">
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 text-blue-900">Subjects covered:</h3>
                    <div className="flex flex-wrap justify-center gap-2">
                      {selectedService.subjectsList.map((subject, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <ButtonTrial hero={hero} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Services;