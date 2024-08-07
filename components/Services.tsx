'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Service, services, generalContent } from '../data';
import { useTranslation } from '@/hooks/useTranslation';
import ButtonTrial from './ButtonTrial';
import ButtonLearnMore2 from './ButtonLearnMore2';
import ButtonLearnMore from './ButtonLearnMore';

const Services = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const { t } = useTranslation();

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

  const { ourServices, learnMore } = generalContent;


  return (
    <section className="py-20 bg-gradient-to-br from-blue-100 to-blue-800">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold mb-12 text-center text-blue-900"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {t(ourServices)}
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {services.map(({ icon, title, shortDescription, longDescription }, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col"
              variants={itemVariants}
            >
              <div className="flex justify-center mb-6">
                <Image
                  src={icon}
                  alt={t(title)}
                  width={64}
                  height={64}
                  className="text-blue-500"
                />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-center text-blue-900">
                {t(title)}
              </h3>
              <p className="text-gray-700 mb-6 text-center flex-grow">
                {t(shortDescription)}
              </p>
              <motion.div
                className="text-center mt-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ButtonLearnMore t={t} onButtonClick={setSelectedService} index = {index} />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-lg mx-auto shadow-lg relative">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4 text-blue-900">
                {t(selectedService.title)}
              </h2>
              <p className="text-gray-700 mb-6">
                {t(selectedService.longDescription)}
              </p>
              <ButtonTrial translation={t} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;