'use client';

import { m } from 'framer-motion';
import { FaMapMarkerAlt, FaClock, FaCheck } from 'react-icons/fa';

export function WeekendZuidoostHero() {
  return (
    <>
      <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-300 text-transparent bg-clip-text">
          Weekend Bijles & Coaching in Amsterdam Zuidoost
        </h1>
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <p className="text-xl text-blue-100">
            Professionele begeleiding in jouw buurt tegen een spectaculair gereduceerd tarief
          </p>
        </div>
      </m.div>

      <div className="bg-gradient-to-br from-blue-800 to-blue-700 p-8 rounded-2xl mb-12 shadow-xl border border-blue-600/50 relative overflow-hidden">
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
              <span className="text-yellow-400 text-3xl mr-2">⚡️</span>
              <span className="text-yellow-400 font-bold">SPECIALE AANBIEDING</span>
              <span className="text-yellow-400 text-3xl ml-2">⚡️</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-300 text-transparent bg-clip-text">
                Spectaculaire Buurtkorting
              </span>
            </h2>
            <div className="text-5xl font-black bg-gradient-to-r from-yellow-400 to-yellow-300 text-transparent bg-clip-text mb-2">
              50% KORTING!
            </div>
            <p className="text-blue-200">Exclusief voor inwoners van Amsterdam Zuidoost</p>
          </m.div>

          <div className="flex flex-col md:flex-row items-center justify-center mb-12 gap-8 relative">
            <m.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center px-8 py-6 bg-blue-900/50 rounded-2xl relative"
            >
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-red-500 text-white text-sm px-3 py-1 rounded-full">
                Normaal
              </div>
              <div className="text-4xl font-bold text-gray-400 line-through mb-1">€60</div>
              <div className="text-sm text-blue-200">per uur</div>
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
              className="text-center px-8 py-6 bg-green-900/30 rounded-2xl border-2 border-green-500/30 relative"
            >
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-sm px-3 py-1 rounded-full">
                Buurttarief
              </div>
              <div className="text-5xl font-bold text-green-400 mb-1">€30</div>
              <div className="text-sm text-green-300">per uur</div>
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                <span className="bg-yellow-400 text-blue-900 text-xs font-bold px-3 py-1 rounded-full">
                  BESPAAR €30 PER UUR!
                </span>
              </div>
            </m.div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-900/50 p-6 rounded-xl border border-blue-700/50">
              <div className="flex items-center gap-3 mb-3">
                <FaMapMarkerAlt className="text-yellow-400 text-xl" />
                <h3 className="font-semibold text-blue-100">Locatie</h3>
              </div>
              <p className="text-blue-200">Aan huis service in Gein 3 en 4 (beperkte beschikbaarheid)</p>
            </div>
            <div className="bg-blue-900/50 p-6 rounded-xl border border-blue-700/50">
              <div className="flex items-center gap-3 mb-3">
                <FaClock className="text-yellow-400 text-xl" />
                <h3 className="font-semibold text-blue-100">Beschikbaarheid</h3>
              </div>
              <p className="text-blue-200">Zaterdagen en eventueel op zondag, flexibele tijden</p>
            </div>
            <div className="bg-blue-900/50 p-6 rounded-xl border border-blue-700/50">
              <div className="flex items-center gap-3 mb-3">
                <FaCheck className="text-yellow-400 text-xl" />
                <h3 className="font-semibold text-blue-100">Extra&apos;s</h3>
              </div>
              <p className="text-blue-200">Gratis kennismakingsgesprek van 30 minuten</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
