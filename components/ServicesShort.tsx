'use client';

import React, { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

// Service icon imports
import mathIcon from '@/public/images/svg/math-icon.svg';
import programmingIcon from '@/public/images/svg/programming-icon.svg';
import creativeIcon from '@/public/images/svg/creative-workshop-icon.svg';

const serviceIcons = [mathIcon, programmingIcon, creativeIcon];

const ServicesShort: React.FC = () => {
  const t = useTranslations('services');
  const [modalIndex, setModalIndex] = useState<number | null>(null);

  return (
    <section className="bg-[#FCF8F1] bg-opacity-30 py-10 sm:py-16 lg:py-24">
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-3xl font-bold mb-6 text-center">
          {t('ourServices')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[0, 1, 2].map((index) => (
            <m.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setModalIndex(index)}
            >
              <div className="flex justify-center mb-4">
                <Image
                  src={serviceIcons[index]}
                  alt={t(`items.${index}.title`)}
                  width={48}
                  height={48}
                  className="h-12 w-12"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">
                {t(`items.${index}.title`)}
              </h3>
              <p className="text-gray-700 mb-4 text-justify">
                {t(`items.${index}.shortDescription`)}
              </p>
              <div className="text-center mt-4">
                <span className="text-blue-500 hover:text-blue-700 font-bold">
                  {t('learnMore')} &rarr;
                </span>
              </div>
            </m.div>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {modalIndex !== null && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setModalIndex(null)}
          >
            <m.div
              initial={{ scale: 0.95, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0, y: -50 }}
              transition={{ type: "spring", damping: 25, stiffness: 200, exit: { duration: 0.8 } }}
              className="bg-white p-8 rounded-lg w-11/12 max-w-4xl max-h-[90vh] overflow-y-auto"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <h2 className="text-3xl font-bold mb-6">{t(`items.${modalIndex}.title`)}</h2>
              <div className="flex items-center mb-6">
                <Image
                  src={serviceIcons[modalIndex]}
                  alt={t(`items.${modalIndex}.title`)}
                  width={80}
                  height={80}
                  className="h-20 w-20 mr-4"
                />
                <p className="text-xl text-gray-600">{t(`items.${modalIndex}.shortDescription`)}</p>
              </div>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">{t(`items.${modalIndex}.longDescription`)}</p>
              <button
                className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-colors"
                onClick={() => setModalIndex(null)}
              >
                Close
              </button>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ServicesShort;
