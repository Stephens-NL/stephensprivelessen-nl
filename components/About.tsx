'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useSWR from 'swr';
import { PhilosophyCardProps, QuestionAnswer, IntroSectionProps, AboutData, Bilingual } from '../data/types';
import { AnimatePresence, m } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';

const fetcher = (url: string) => fetch(url).then((res) => {
  if (!res.ok) throw new Error('Failed to fetch data');
  return res.json();
});


const PhilosophyCard = ({ title, description }: {title: string, description: string}) => (
  <m.div
    className="bg-white bg-opacity-80 backdrop-blur-lg rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300"
    whileHover={{ scale: 1.03, transition: { duration: 0.2, ease: "easeInOut" } }}
    whileTap={{ scale: 0.98 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
  >
    <h3 className="text-xl font-semibold text-blue-900 mb-3">{title}</h3>
    <p className="text-blue-800">{description}</p>
  </m.div>
);

const DetailedInfoAccordion = ({ question, answer }: QuestionAnswer) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <m.div
      className="border-b border-blue-200 py-4"
      initial={false}
      animate={{ backgroundColor: isOpen ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0)" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <button
        className="flex justify-between items-center w-full text-left text-blue-900"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-semibold">{question}</h3>
        <m.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >▼</m.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <p className="mt-2 text-blue-800">{answer}</p>
          </m.div>
        )}
      </AnimatePresence>
    </m.div>
  );
};

const IntroSection = ({ title, heading, paragraphs, imageSrc, altText }: IntroSectionProps) => (
  <div className="container mx-auto px-4">
    <m.h1
      className="text-4xl font-bold text-center text-blue-900 mb-12"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {title}
    </m.h1>
    <div className="flex flex-col md:flex-row items-center">
      <m.div
        className="md:w-1/2 mb-8 md:mb-0"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      >
        <Image src={imageSrc} alt={altText} width={400} height={400} className="rounded-full shadow-lg" />
      </m.div>
      <m.div
        className="md:w-1/2 md:pl-8"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
      >
        <h2 className="text-3xl font-semibold text-blue-900 mb-4">{heading}</h2>
        {paragraphs.map((paragraph: string, index: number) => (
          <m.p
            key={index}
            className="mb-4 text-blue-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.6 + index * 0.1 }}
          >
            {paragraph}
          </m.p>
        ))}
      </m.div>
    </div>
  </div>
);

const About = () => {
  const { t, language } = useTranslation();
  const { data: aboutData, isLoading: loading, error: swrError } = useSWR<AboutData>('/api/about', fetcher);
  const error = swrError?.message ?? null;

  if (loading) return <div>{t({ EN: "Loading...", NL: "Laden..." })}</div>;
  if (error) return <div>{t({ EN: "Error: ", NL: "Fout: " })}{error}</div>;
  if (!aboutData) return null;

  // Destructure 'about' first
  const {
    title,
    introduction: { heading, paragraphs, altText, imageSrc },
    philosophyTitle,
    cta: { title: ctaTitle, description: ctaDescription, buttonText, buttonLink },
    detailedTitle,
    detailedInfo,
    philosophyPoints
  } = aboutData.about;

  interface ContentType {
    pageTitle: string;
    introHeading: string;
    introParagraphs: string[];
    philosophyTitle: string;
    ctaTitle: string;
    ctaDescription: string;
    ctaButtonText: string;
    detailedTitle: string;
    detailedInfo: QuestionAnswer[];
    altText: string;
  }

  const content: ContentType = {
    pageTitle: String(t(title)),
    introHeading: String(t(heading)),
    introParagraphs: paragraphs[language] || [],
    philosophyTitle: String(t(philosophyTitle)),
    ctaTitle: String(t(ctaTitle)),
    ctaDescription: String(t(ctaDescription)),
    ctaButtonText: String(t(buttonText)),
    detailedTitle: String(t(detailedTitle)),
    detailedInfo: detailedInfo[language] || [],
    altText: String(t(altText)),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-blue-100">
      <section className="py-20">
        <IntroSection
          title={content.pageTitle}
          heading={content.introHeading}
          paragraphs={content.introParagraphs}
          imageSrc={imageSrc}
          altText={content.altText}
        />
      </section>

      <section className="py-20 bg-blue-50 bg-opacity-50">
        <div className="container mx-auto px-4">
          <m.h2
            className="text-3xl font-semibold text-center text-blue-900 mb-12"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {content.philosophyTitle}
          </m.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {philosophyPoints.map((point: {title: Bilingual; description: Bilingual}) => (
              <PhilosophyCard key={point.title.EN} title={String(t(point.title))} description={String(t(point.description))} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <m.h2
            className="text-3xl font-semibold text-center text-blue-900 mb-12"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {String(t(detailedTitle))}
          </m.h2>
          {Array.isArray(content.detailedInfo) &&
            content.detailedInfo.map((info) => (
              <DetailedInfoAccordion key={info.question} question={info.question} answer={info.answer} />
            ))}
        </div>
      </section>

      <section className="py-20 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <m.h2
            className="text-3xl font-semibold mb-4"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {content.ctaTitle}
          </m.h2>
          <p className="mb-8">{content.ctaDescription}</p>
          <m.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href={buttonLink}
              className="inline-block bg-white text-blue-900 font-semibold py-3 px-8 rounded-full hover:bg-yellow-100 transition-colors duration-300"
            >
              {content.ctaButtonText}
            </Link>
          </m.div>
        </div>
      </section>
    </div>
  );
};

export default About;