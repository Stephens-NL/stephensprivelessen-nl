'use client';

import React from 'react';
import Image from 'next/image';
import { m } from 'framer-motion';
import TextBlock from './TextBlock';
import ButtonTrial from '../ButtonTrial';
import SignInHere from './SignInHere';
import { useTranslation } from '../../hooks/useTranslation';
import { hero } from '@/data/hero';
import portrait2 from '@/public/images/jpeg/portrait2.jpeg';

const Hero = () => {
  const { t } = useTranslation();
  const { img } = hero;
  const { imageSrc, altern } = img;

  return (
    <section className="bg-[#FCF8F1] bg-opacity-30 py-10 sm:py-16 lg:py-24">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid items-center grid-cols-1 gap-8 md:gap-12 md:grid-cols-2">
          <m.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <TextBlock />
            <div className="space-y-4">
              <ButtonTrial />
              <SignInHere />
            </div>
          </m.div>

          <m.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative w-full max-w-lg mx-auto"
          >
            <Image
              src={portrait2}
              alt={String(t(altern))}
              width={600}
              height={400}
              className="rounded-xl shadow-lg"
              priority
              placeholder="blur"
            />
          </m.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;