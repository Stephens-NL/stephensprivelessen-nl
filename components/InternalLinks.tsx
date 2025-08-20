'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const InternalLinks: React.FC = () => {
  const locationLinks = [
    {
      href: '/privelessen/amsterdam-zuid',
      title: 'Bijles Amsterdam Zuid',
      description: 'Online bijles of op Science Park - Wiskunde & statistiek',
      keywords: 'bijles amsterdam zuid, wiskunde zuid, statistiek zuid, online bijles'
    },
    {
      href: '/privelessen/amsterdam-centrum',
      title: 'Bijles Amsterdam Centrum',
      description: 'Online bijles of op Science Park - Wiskunde & statistiek',
      keywords: 'bijles amsterdam centrum, wiskunde centrum, statistiek centrum, online bijles'
    },
    {
      href: '/privelessen/amsterdam-west',
      title: 'Bijles Amsterdam West',
      description: 'Online bijles of op Science Park - Wiskunde & statistiek',
      keywords: 'bijles amsterdam west, wiskunde west, statistiek west, online bijles'
    },
    {
      href: '/privelessen/amsterdam-oost',
      title: 'Bijles Amsterdam Oost',
      description: 'Online bijles of op Science Park - Wiskunde & statistiek',
      keywords: 'bijles amsterdam oost, wiskunde oost, statistiek oost, online bijles'
    }
  ];

  const subjectLinks = [
    {
      href: '/bijles/onderwerp/statistiek/psychologie',
      title: 'Statistiek voor Psychologie',
      description: 'SPSS begeleiding en statistische analyses voor psychologie studenten',
      keywords: 'statistiek psychologie, spss bijles, psychologie statistiek'
    },
    {
      href: '/bijles/onderwerp/calculus',
      title: 'Calculus Bijles',
      description: 'Differentiëren en integreren voor life sciences en economie',
      keywords: 'calculus bijles, differentiëren, integreren, wiskunde life sciences'
    },
    {
      href: '/bijles/onderwerp/programmeren',
      title: 'Python & R Bijles',
      description: 'Data science en programmeren voor niet-bèta studenten',
      keywords: 'python bijles, r studio bijles, data science bijles'
    }
  ];

  const campusLinks = [
    {
      href: '/bijles/campus/uva',
      title: 'UvA Bijles',
      description: 'Online bijles of op Science Park - Voor UvA studenten',
      keywords: 'uva bijles, science park bijles, online bijles uva'
    },
    {
      href: '/bijles/campus/vu',
      title: 'VU Bijles',
      description: 'Online bijles of op Science Park - Voor VU studenten',
      keywords: 'vu bijles, science park bijles, online bijles vu'
    }
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Bijles in Amsterdam - Online & Science Park
        </h2>
        
        {/* Locatie Links */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-6 text-center">Bijles per Regio</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {locationLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link 
                  href={link.href}
                  className="block bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-full"
                >
                  <h4 className="text-lg font-semibold mb-2 text-blue-600 hover:text-blue-800">
                    {link.title}
                  </h4>
                  <p className="text-gray-600 text-sm mb-3">
                    {link.description}
                  </p>
                  <span className="text-blue-500 text-sm font-medium">
                    Meer info →
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Vak Links */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-6 text-center">Bijles per Vak</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subjectLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link 
                  href={link.href}
                  className="block bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-full"
                >
                  <h4 className="text-lg font-semibold mb-2 text-blue-600 hover:text-blue-800">
                    {link.title}
                  </h4>
                  <p className="text-gray-600 text-sm mb-3">
                    {link.description}
                  </p>
                  <span className="text-blue-500 text-sm font-medium">
                    Meer info →
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Campus Links */}
        <div>
          <h3 className="text-2xl font-semibold mb-6 text-center">Bijles voor Studenten</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {campusLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link 
                  href={link.href}
                  className="block bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-full border-l-4 border-blue-500"
                >
                  <h4 className="text-lg font-semibold mb-2 text-blue-600 hover:text-blue-800">
                    {link.title}
                  </h4>
                  <p className="text-gray-600 text-sm mb-3">
                    {link.description}
                  </p>
                  <span className="text-blue-500 text-sm font-medium">
                    Meer info →
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InternalLinks;
