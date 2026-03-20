'use client';

import { useReducer } from 'react';
import { useTranslations } from 'next-intl';
import { m, AnimatePresence } from 'framer-motion';
import { FaCoffee, FaMapMarkerAlt, FaClock, FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { config } from '@/data/config';

function mapReducer(state: { showMap: boolean }, action: { type: 'TOGGLE' }) {
  return { ...state, showMap: !state.showMap };
}

export function ZuidoostLocationMap() {
  const t = useTranslations('weekend');
  const [{ showMap }, dispatch] = useReducer(mapReducer, { showMap: true });

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 mb-12">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <FaCoffee className="text-3xl text-[var(--amber)]" />
          <h2 className="text-2xl font-bold text-white">
            {t('location.title')}
          </h2>
        </div>
        <button
          type="button"
          onClick={() => dispatch({ type: 'TOGGLE' })}
          className="p-3 hover:bg-white/10 rounded-xl transition-colors"
        >
          {showMap ? <FaChevronUp className="text-[var(--amber)]" /> : <FaChevronDown className="text-[var(--amber)]" />}
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
                {t('location.description')}
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
                <FaMapMarkerAlt className="text-[var(--amber)]" />
                <span>{config.business.weekendOffice.address}, {config.business.weekendOffice.postalCode} {config.business.weekendOffice.city}</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <FaClock className="text-[var(--amber)]" />
                <span>{t('location.hours')}</span>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
