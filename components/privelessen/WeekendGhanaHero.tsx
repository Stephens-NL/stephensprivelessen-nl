'use client';

import { m } from 'framer-motion';
import { FaMapMarkerAlt, FaClock, FaCheck } from 'react-icons/fa';

export function WeekendGhanaHero() {
  return (
    <>
      <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative">
        <div className="flex justify-center mb-4">
          <span className="bg-yellow-400/20 text-yellow-400 px-4 py-2 rounded-full text-lg">Akwaaba! 🌟</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-2 text-center bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-300 text-transparent bg-clip-text">
          Adesua Ne Akwankyerɛ
        </h1>
        <p className="text-xl text-center text-yellow-200 mb-6">Weekend Tutoring & Coaching</p>
        <p className="text-2xl text-center text-yellow-400 mb-2 font-medium">Boa me na menboa wo</p>
        <p className="text-lg text-center text-yellow-200 mb-6 italic">(Help me and let me help you)</p>
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <p className="text-2xl text-yellow-400 font-medium">Yɛn nkɔso ne yɛn baako!</p>
          <p className="text-lg text-yellow-200 mt-1 italic">(Our progress lies in our unity!)</p>
        </div>
      </m.div>

      <div className="bg-[#8B4513] p-8 rounded-2xl mb-12 shadow-xl border border-yellow-600/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/5 rounded-full transform translate-x-32 -translate-y-32" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-400/5 rounded-full transform -translate-x-32 translate-y-32" />
        <div className="relative">
          <m.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <div className="inline-block bg-yellow-400/10 rounded-full px-6 py-2 mb-4">
              <span className="text-yellow-400 text-3xl mr-2">⭐</span>
              <span className="text-yellow-400 font-bold">ABOƆDEN NHYEHYƐE</span>
              <span className="text-yellow-400 text-3xl ml-2">⭐</span>
            </div>
            <p className="text-yellow-200 text-lg mb-4 italic">(SPECIAL COMMUNITY OFFER)</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-300 text-transparent bg-clip-text">
                Nea onnim no sua a, ohu!
              </span>
            </h2>
            <p className="text-yellow-200 text-lg mb-4 italic">(One who doesn&apos;t know can learn!)</p>
            <div className="text-5xl font-black bg-gradient-to-r from-yellow-400 to-yellow-300 text-transparent bg-clip-text mb-2">
              FA MA YƐNKA!
            </div>
            <p className="text-yellow-200 text-lg italic">(50% DISCOUNT!)</p>
          </m.div>

          <div className="flex flex-col md:flex-row items-center justify-center mb-12 gap-8">
            <m.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center px-8 py-6 bg-[#654321] rounded-2xl relative"
            >
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-red-500 text-white text-sm px-3 py-1 rounded-full">
                Regular Price
              </div>
              <div className="text-4xl font-bold text-gray-400 line-through mb-1">€60</div>
              <div className="text-sm text-yellow-200">per hour</div>
            </m.div>
            <m.div
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
              className="text-5xl font-black text-yellow-400"
            >
              →
            </m.div>
            <m.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center px-8 py-6 bg-green-900/30 rounded-2xl border-2 border-yellow-500/30 relative"
            >
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-sm px-3 py-1 rounded-full">
                Community Rate
              </div>
              <div className="text-5xl font-bold text-green-400 mb-1">€30</div>
              <div className="text-sm text-green-300">per hour</div>
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                <span className="bg-yellow-400 text-[#654321] text-xs font-bold px-3 py-1 rounded-full">
                  SAVE €30 EVERY HOUR!
                </span>
              </div>
            </m.div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-[#654321] p-6 rounded-xl border border-yellow-600/50">
              <div className="flex items-center gap-3 mb-3">
                <FaMapMarkerAlt className="text-yellow-400 text-xl" />
                <h3 className="font-semibold text-yellow-100">Location</h3>
              </div>
              <p className="text-yellow-200">Home tutoring in Gein 3 & 4 (limited availability)</p>
            </div>
            <div className="bg-[#654321] p-6 rounded-xl border border-yellow-600/50">
              <div className="flex items-center gap-3 mb-3">
                <FaClock className="text-yellow-400 text-xl" />
                <h3 className="font-semibold text-yellow-100">Availability</h3>
              </div>
              <p className="text-yellow-200">Saturdays and Sundays, flexible hours</p>
            </div>
            <div className="bg-[#654321] p-6 rounded-xl border border-yellow-600/50">
              <div className="flex items-center gap-3 mb-3">
                <FaCheck className="text-yellow-400 text-xl" />
                <h3 className="font-semibold text-yellow-100">Extras</h3>
              </div>
              <p className="text-yellow-200">Free 30-minute trial lesson - Sɔhwɛ adesua!</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
