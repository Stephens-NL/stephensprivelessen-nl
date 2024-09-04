'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '../contexts/LanguageContext';
import { about } from '../data';
import { PhilosophyCardProps, QuestionAnswer, IntroSectionProps} from '../data';
import { motion } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';


const PhilosophyCard = ({ title, description }: PhilosophyCardProps) => (
  <motion.div
    className="bg-white bg-opacity-80 backdrop-blur-lg rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <h3 className="text-xl font-semibold text-blue-900 mb-3">{title}</h3>
    <p className="text-blue-800">{description}</p>
  </motion.div>
);

const DetailedInfoAccordion = ({ question, answer }: QuestionAnswer) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="border-b border-blue-200 py-4"
      initial={false}
      animate={{ backgroundColor: isOpen ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0)" }}
      transition={{ duration: 0.3 }}
    >
      <button
        className="flex justify-between items-center w-full text-left text-blue-900"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-semibold">{question}</h3>
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }}>▼</motion.span>
      </button>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <p className="mt-2 text-blue-800">{answer}</p>
      </motion.div>
    </motion.div>
  );
};



const IntroSection = ({ title, heading, paragraphs, imageSrc, altText }: IntroSectionProps) => (
  <div className="container mx-auto px-4">
    <motion.h1
      className="text-4xl font-bold text-center text-blue-900 mb-12"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {title}
    </motion.h1>
    <div className="flex flex-col md:flex-row items-center">
      <motion.div
        className="md:w-1/2 mb-8 md:mb-0"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Image src={imageSrc} alt={altText} width={400} height={400} className="rounded-full shadow-lg" />
      </motion.div>
      <motion.div
        className="md:w-1/2 md:pl-8"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-3xl font-semibold text-blue-900 mb-4">{heading}</h2>
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="mb-4 text-blue-800">{paragraph}</p>
        ))}
      </motion.div>
    </div>
  </div>
);

const About = () => {
  const { t } = useTranslation();
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch('/about/api');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setAboutData(data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!aboutData) return null;

  interface ContentType {
    pageTitle: string;
    introHeading: string;
    introParagraphs: string[];
    philosophyTitle: string;
    ctaTitle: string;
    ctaDescription: string;
    ctaButtonText: string;
    detailedInfo: QuestionAnswer[];
    altText: string;
  }

  const content: ContentType = {
    pageTitle: t(about.title),
    introHeading: t(about.introduction.heading),
    introParagraphs: t(about.introduction.paragraphs),
    philosophyTitle: t(about.philosophyTitle),
    ctaTitle: t(about.cta.title),
    ctaDescription: t(about.cta.description),
    ctaButtonText: t(about.cta.buttonText),
    detailedInfo: t(about.detailedInfo),
    altText: t(about.introduction.altText)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-blue-100">
      <section className="py-20">
        <IntroSection
          title={content.pageTitle}
          heading={content.introHeading}
          paragraphs={content.introParagraphs}
          imageSrc={about.introduction.imageSrc}
          altText={t(about.introduction.altText)}
        />
      </section>

      <section className="py-20 bg-blue-50 bg-opacity-50">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-semibold text-center text-blue-900 mb-12"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {content.philosophyTitle}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {about.philosophyPoints.map((point, index) => (
              <PhilosophyCard
                key={index}
                title={t(point.title)}
                description={t(point.description)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-semibold text-center text-blue-900 mb-12"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {t({ EN: "Detailed Information", NL: "Gedetailleerde Informatie" })}
          </motion.h2>
          {Array.isArray(content.detailedInfo) && content.detailedInfo.map((info, index) => (
            <DetailedInfoAccordion key={index} question={info.question} answer={info.answer} />
          ))}
        </div>
      </section>

      <section className="py-20 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            className="text-3xl font-semibold mb-4"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {content.ctaTitle}
          </motion.h2>
          <p className="mb-8">{content.ctaDescription}</p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href={about.cta.buttonLink}
              className="inline-block bg-white text-blue-900 font-semibold py-3 px-8 rounded-full hover:bg-yellow-100 transition-colors duration-300"
            >
              {content.ctaButtonText}
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;