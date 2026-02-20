'use client';

import { useReducer } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { m, AnimatePresence } from 'framer-motion';
import { FaCoffee, FaMapMarkerAlt, FaClock, FaChevronUp, FaChevronDown } from 'react-icons/fa';

function mapReducer(state: { showMap: boolean }, action: { type: 'TOGGLE' }) {
  return { ...state, showMap: !state.showMap };
}

export function ZuidoostLocationMap() {
  const { language } = useLanguage();
  const [{ showMap }, dispatch] = useReducer(mapReducer, { showMap: true });

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 mb-12">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <FaCoffee className="text-3xl text-yellow-300" />
          <h2 className="text-2xl font-bold text-white">
            {language === 'NL' ? 'Locatie: Douwe Egberts Café' : 'Location: Douwe Egberts Café'}
          </h2>
        </div>
        <button
          type="button"
          onClick={() => dispatch({ type: 'TOGGLE' })}
          className="p-3 hover:bg-white/10 rounded-xl transition-colors"
        >
          {showMap ? <FaChevronUp className="text-yellow-300" /> : <FaChevronDown className="text-yellow-300" />}
        </button>
      </div>

      <AnimatePresence>
        {showMap && (
          <m.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="space-y-4">
              <p className="text-white/90 text-lg mb-4">
                {language === 'NL'
                  ? 'Centraal gelegen in Amsterdam Zuidoost, direct bij metrostation Bijlmer Arena. Makkelijk bereikbaar met OV en auto.'
                  : 'Centrally located in Amsterdam Zuidoost, right at Bijlmer Arena metro station. Easily accessible by public transport and car.'}
              </p>
              <div className="relative w-full h-[400px] rounded-xl overflow-hidden">
                <iframe
                  title="Location map"
                  src="https://maps.app.goo.gl/nMBBA9MAaKhDrPmSA?g_st=iwb"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                />
              </div>
              <div className="flex items-center gap-2 text-white/90 mt-4">
                <FaMapMarkerAlt className="text-yellow-300" />
                <span>Bijlmerplein 888, 1102 MG Amsterdam</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <FaClock className="text-yellow-300" />
                <span>{language === 'NL' ? 'Dagelijks geopend: 08:00 - 22:00' : 'Open daily: 08:00 - 22:00'}</span>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
