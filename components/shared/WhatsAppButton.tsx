'use client';

import { useState, useEffect, useRef, useReducer } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaTimes } from 'react-icons/fa';
import { useTranslations } from 'next-intl';
import { usePathname } from '@/i18n/navigation';
import QRCode from 'react-qr-code';
import { config } from '@/data/config';

const WHATSAPP_MESSAGE = 'Hallo, ik heb een vraag over je diensten';
const WHATSAPP_URL = `${config.contact.whatsapp}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

type UIState = { isModalOpen: boolean; isMobile: boolean; isHovered: boolean };

function uiReducer(state: UIState, action: { type: string; payload?: boolean }): UIState {
  switch (action.type) {
    case 'MODAL': return { ...state, isModalOpen: action.payload ?? !state.isModalOpen };
    case 'MOBILE': return { ...state, isMobile: action.payload ?? state.isMobile };
    case 'HOVERED': return { ...state, isHovered: action.payload ?? !state.isHovered };
    default: return state;
  }
}

export default function WhatsAppButton() {
  const t = useTranslations('common');
  const [ui, dispatchUI] = useReducer(uiReducer, {
    isModalOpen: false,
    isMobile: true,
    isHovered: false,
  });
  const { isModalOpen, isMobile, isHovered } = ui;
  const pathname = usePathname();

  useEffect(() => {
    dispatchUI({ type: 'MOBILE', payload: /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) });
  }, []);

  // Don't show on contact page
  if (pathname === '/contact') return null;

  const handleClick = () => {
    if (isMobile) {
      window.open(WHATSAPP_URL, '_blank');
    } else {
      dispatchUI({ type: 'MODAL', payload: true });
    }
  };

  return (
    <>
      {/* Floating button -- bottom right, minimal pill shape */}
      <m.button
        onClick={handleClick}
        onMouseEnter={() => dispatchUI({ type: 'HOVERED', payload: true })}
        onMouseLeave={() => dispatchUI({ type: 'HOVERED', payload: false })}
        className="fixed bottom-6 right-6 z-30 flex items-center gap-2.5 bg-[var(--ink)] text-[var(--cream)] pl-4 pr-5 py-3 rounded-full shadow-lg shadow-black/15 hover:shadow-xl hover:shadow-black/20 transition-all duration-300"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 1, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        <FaWhatsapp className="text-lg text-[#25D366]" />
        <m.span
          className="text-sm font-medium overflow-hidden whitespace-nowrap"
          animate={{ width: isHovered ? 'auto' : 0, opacity: isHovered ? 1 : 0 }}
          initial={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          {t('whatsappLabel')}
        </m.span>
      </m.button>

      {/* QR Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[var(--ink)]/60 backdrop-blur-sm z-40 flex items-center justify-center p-4"
            onClick={() => dispatchUI({ type: 'MODAL', payload: false })}
          >
            <m.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ duration: 0.25 }}
              className="bg-[var(--cream)] rounded-xl p-8 max-w-sm w-full relative border border-[var(--border-warm)]"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => dispatchUI({ type: 'MODAL', payload: false })}
                className="absolute top-4 right-4 text-[var(--muted-text)] hover:text-[var(--ink)] transition-colors"
              >
                <FaTimes className="text-lg" />
              </button>

              <h3 className="font-display text-2xl font-semibold text-[var(--ink)] text-center mb-6">
                {t('whatsappLabel')}
              </h3>

              <div className="flex flex-col items-center gap-6">
                <div className="p-4 bg-[var(--cream)] rounded-lg border border-[var(--border-warm)]">
                  <QRCode value={WHATSAPP_URL} size={180} bgColor="#ffffff" fgColor="#0D2818" />
                </div>

                <div className="text-center">
                  <p className="text-sm font-medium text-[var(--ink)] font-mono">{config.contact.display.phone}</p>
                </div>

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[var(--ink)] text-[var(--cream)] px-6 py-3 rounded-lg hover:bg-[var(--ink-light)] transition-colors text-sm font-semibold"
                >
                  <FaWhatsapp className="text-lg text-[#25D366]" />
                  WhatsApp Web
                </a>
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
