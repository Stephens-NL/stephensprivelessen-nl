'use client';

import { m } from 'framer-motion';
import { FaMapMarkerAlt, FaClock, FaCheck } from 'react-icons/fa';

export function WeekendZuidoostHero() {
  return (
    <>
      <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center bg-gradient-to-r from-[var(--amber)] via-[var(--amber-hover)] to-[var(--amber)] text-transparent bg-clip-text">
          Weekend Bijles & Coaching in Amsterdam Zuidoost
        </h1>
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <p className="text-xl text-[var(--cream)]">
            Professionele begeleiding in jouw buurt tegen een spectaculair gereduceerd tarief
          </p>
        </div>
      </m.div>

      <div className="bg-gradient-to-br from-[var(--ink)] to-[var(--ink-light)] p-8 rounded-2xl mb-12 shadow-xl border border-[var(--amber)]/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--amber)]/5 rounded-full transform translate-x-32 -translate-y-32" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--amber)]/5 rounded-full transform -translate-x-32 translate-y-32" />
        <div className="relative">
          <m.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <div className="inline-block bg-[var(--amber)]/10 rounded-full px-6 py-2 mb-4">
              <span className="text-[var(--amber)] text-3xl mr-2">⚡️</span>
              <span className="text-[var(--amber)] font-bold">SPECIALE AANBIEDING</span>
              <span className="text-[var(--amber)] text-3xl ml-2">⚡️</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              <span className="bg-gradient-to-r from-[var(--amber)] via-[var(--amber-hover)] to-[var(--amber)] text-transparent bg-clip-text">
                Spectaculaire Buurtkorting
              </span>
            </h2>
            <div className="text-5xl font-black bg-gradient-to-r from-[var(--amber)] to-[var(--amber-hover)] text-transparent bg-clip-text mb-2">
              50% KORTING!
            </div>
            <p className="text-[var(--cream-dark)]">Exclusief voor inwoners van Amsterdam Zuidoost</p>
          </m.div>

          <div className="flex flex-col md:flex-row items-center justify-center mb-12 gap-8 relative">
            <m.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center px-8 py-6 bg-[var(--ink-light)]/50 rounded-2xl relative"
            >
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-red-500 text-white text-sm px-3 py-1 rounded-full">
                Normaal
              </div>
              <div className="text-4xl font-bold text-[var(--muted-text)] line-through mb-1">€60</div>
              <div className="text-sm text-[var(--cream-dark)]">per uur</div>
            </m.div>
            <m.div
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
              className="text-5xl font-black text-[var(--amber)]"
            >
              →
            </m.div>
            <m.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center px-8 py-6 bg-[var(--sage)]/20 rounded-2xl border-2 border-[var(--sage)]/30 relative"
            >
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[var(--sage)] text-white text-sm px-3 py-1 rounded-full">
                Buurttarief
              </div>
              <div className="text-5xl font-bold text-[var(--sage)] mb-1">€30</div>
              <div className="text-sm text-[var(--sage)]">per uur</div>
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                <span className="bg-[var(--amber)] text-[var(--ink)] text-xs font-bold px-3 py-1 rounded-full">
                  BESPAAR €30 PER UUR!
                </span>
              </div>
            </m.div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-[var(--ink-light)]/50 p-6 rounded-xl border border-[var(--amber)]/30">
              <div className="flex items-center gap-3 mb-3">
                <FaMapMarkerAlt className="text-[var(--amber)] text-xl" />
                <h3 className="font-semibold text-[var(--cream)]">Locatie</h3>
              </div>
              <p className="text-[var(--cream-dark)]">Aan huis service in Gein 3 en 4 (beperkte beschikbaarheid)</p>
            </div>
            <div className="bg-[var(--ink-light)]/50 p-6 rounded-xl border border-[var(--amber)]/30">
              <div className="flex items-center gap-3 mb-3">
                <FaClock className="text-[var(--amber)] text-xl" />
                <h3 className="font-semibold text-[var(--cream)]">Beschikbaarheid</h3>
              </div>
              <p className="text-[var(--cream-dark)]">Zaterdagen en eventueel op zondag, flexibele tijden</p>
            </div>
            <div className="bg-[var(--ink-light)]/50 p-6 rounded-xl border border-[var(--amber)]/30">
              <div className="flex items-center gap-3 mb-3">
                <FaCheck className="text-[var(--amber)] text-xl" />
                <h3 className="font-semibold text-[var(--cream)]">Extra&apos;s</h3>
              </div>
              <p className="text-[var(--cream-dark)]">Gratis kennismakingsgesprek van 30 minuten</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
