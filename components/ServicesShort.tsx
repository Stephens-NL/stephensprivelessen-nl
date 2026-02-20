'use client';

import React, { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import { generalContent, services, Service } from '../data';
import Image from 'next/image';

const Modal: React.FC<{ service: Service | null, isOpen: boolean, onClose: () => void }> = ({ service, isOpen, onClose }) => {
  const { t } = useTranslation();
  if (!service) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={onClose}
        >
          <m.div
            initial={{ scale: 0.95, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: -50 }}
            transition={{ type: "spring", damping: 25, stiffness: 200, exit: { duration: 0.8 } }}
            className="bg-white p-8 rounded-lg w-11/12 max-w-4xl max-h-[90vh] overflow-y-auto"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <h2 className="text-3xl font-bold mb-6">{String(t(service.title))}</h2>
            <div className="flex items-center mb-6">
              <Image 
                src={service.icon} 
                alt={String(t(service.title))} 
                width={80} // Specify the width
                height={80} // Specify the height
                className="h-20 w-20 mr-4" 
              />
              <p className="text-xl text-gray-600">{String(t(service.shortDescription))}</p>
            </div>
            <p className="text-gray-700 mb-6 text-lg leading-relaxed">{String(t(service.longDescription))}</p>
            <button
              className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-colors"
              onClick={onClose}
            >
              Close
            </button>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
};

const ServicesShort: React.FC = () => {
  const { t } = useTranslation();
  const { ourServices, learnMore } = generalContent;
  const [modalService, setModalService] = useState<Service | null>(null);

  const randomServices = services.slice(0, 3);
  
  const openModal = (service: Service) => {
    setModalService(service);
  };

  const closeModal = () => {
    setModalService(null);
  };

  return (
    <section className="bg-[#FCF8F1] bg-opacity-30 py-10 sm:py-16 lg:py-24">
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-3xl font-bold mb-6 text-center">
          {String(t(ourServices))}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {randomServices.map((service, index) => (
            <m.div
              key={service.id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => openModal(service)}
            >
              <div className="flex justify-center mb-4">
                <Image 
                  src={service.icon} 
                  alt={String(t(service.title))} 
                  width={48} // Specify the width
                  height={48} // Specify the height
                  className="h-12 w-12" 
                />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">
                {String(t(service.title))}
              </h3>
              <p className="text-gray-700 mb-4 text-justify">
                {String(t(service.shortDescription))}
              </p>
              <div className="text-center mt-4">
                <span className="text-blue-500 hover:text-blue-700 font-bold">
                  {String(t(learnMore))} &rarr;
                </span>
              </div>
            </m.div>
          ))}
        </div>
      </div>
      <Modal service={modalService} isOpen={modalService !== null} onClose={closeModal} />
    </section>
  );
};

export default ServicesShort;