'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import TextBlock from './TextBlock';
import ButtonTrial from '../ButtonTrial';
import SignInHere from './SignInHere';
import { useTranslation } from '../../hooks/useTranslation';
import { HeroData } from '@/data';



const Hero = () => {
  const { t } = useTranslation();
  const [heroData, setHeroData] = useState<HeroData|null>(null);
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
    };

    fetchHeroData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!heroData) return null;

  const { hero } = heroData;

  const { img } = hero
  const { imageSrc, altern } = img


  return (
    <section className="bg-[#FCF8F1] bg-opacity-30 py-10 sm:py-16 lg:py-24">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid items-center grid-cols-1 gap-8 md:gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <TextBlock hero={hero}/>
            <ButtonTrial hero={hero}/>
            <SignInHere hero={hero} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative w-full max-w-lg mx-auto"
          >
            <Image
              src={imageSrc}
              alt={String(t(altern))}
              width={600}
              height={400}
              className="rounded-xl shadow-lg"
            />
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute bottom-0 left-0 w-1/3 p-2 sm:p-4 bg-white bg-opacity-80 rounded-tr-lg shadow-md"
            >
              {/* <SecondaryImage isEnglish /> 
            </motion.div> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;