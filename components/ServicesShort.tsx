'use client';

import React from 'react';
import { services } from '../data';
import { motion } from 'framer-motion';

import { useTranslation } from '../hooks/useTranslation';

const Services = () => {
const { isEnglish } = useTranslation();

  // Randomly select three services to display
  const randomServices = services.sort(() => 0.5 - Math.random()).slice(0, 3);

  return (
    <section className="bg-[#FCF8F1] bg-opacity-30 py-10 sm:py-16 lg:py-24">
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-3xl font-bold mb-6 text-center">
          {isEnglish ? 'Our Services' : 'Onze Diensten'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {randomServices.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex justify-center mb-4">
                <img src={service.icon} alt={isEnglish ? service.title.EN : service.title.NL} className="h-12 w-12" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">
                {isEnglish ? service.title.EN : service.title.NL}
              </h3>
              <p className="text-gray-700 mb-4 text-justify">
                {isEnglish ? service.shortDescription.EN : service.shortDescription.NL}
              </p>
              <div className="text-center mt-4">
                <a href="/services" className="text-blue-500 hover:text-blue-700 font-bold">
                  {isEnglish ? 'More Information' : 'Meer informatie'} &rarr;
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;