'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaTimes } from 'react-icons/fa';
import { useTranslation } from '@/hooks/useTranslation';
import QRCode from 'react-qr-code';
import { usePathname } from 'next/navigation';

const WHATSAPP_NUMBER = '+31687944850';
const WHATSAPP_MESSAGE = 'Hallo, ik heb een vraag over je diensten';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

export default function WhatsAppButton() {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [yPosition, setYPosition] = useState('-50%');
  const expandTimeoutRef = useRef<NodeJS.Timeout>();
  const opacityTimeoutRef = useRef<NodeJS.Timeout>();
  const pathname = usePathname();

  // Don't show on contact page
  if (pathname === '/contact') return null;

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };

    const updateYPosition = () => {
      const isMediumScreen = window.innerWidth >= 768 && window.innerWidth < 1024;
      setYPosition(isMediumScreen ? '0' : '-50%');
    };

    checkDevice();
    updateYPosition();

    window.addEventListener('resize', () => {
      checkDevice();
      updateYPosition();
    });

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('resize', updateYPosition);
    };
  }, []);

  const handleMouseEnter = () => {
    setIsExpanded(true);
    setIsHovered(true);
    if (expandTimeoutRef.current) {
      clearTimeout(expandTimeoutRef.current);
    }
    if (opacityTimeoutRef.current) {
      clearTimeout(opacityTimeoutRef.current);
    }
  };

  const handleMouseLeave = () => {
    expandTimeoutRef.current = setTimeout(() => {
      setIsExpanded(false);
    }, 4000);

    opacityTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 5000);
  };

  const handleClick = () => {
    if (isMobile) {
      window.open(WHATSAPP_URL, '_blank');
    } else {
      setIsModalOpen(true);
    }
  };

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (expandTimeoutRef.current) {
        clearTimeout(expandTimeoutRef.current);
      }
      if (opacityTimeoutRef.current) {
        clearTimeout(opacityTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <motion.button
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="fixed left-6 top-1/2 md:bottom-6 md:top-auto lg:top-1/2 lg:bottom-auto -translate-y-1/2 md:translate-y-0 lg:-translate-y-1/2 z-30 bg-green-500 text-white p-4 md:p-5 rounded-full shadow-lg hover:bg-green-600 transition-all duration-700 flex items-center gap-3 group"
        initial={{ y: -1000, opacity: 0 }}
        animate={{ 
          y: yPosition,
          opacity: isHovered ? 1 : 0.3,
          transition: {
            y: { duration: 3, ease: [0.4, 0, 0.2, 1] },
            opacity: { 
              duration: 0.5,
              delay: isHovered ? 0 : 0.5
            }
          }
        }}
        whileHover={{ scale: 1.05 }}
      >
        <FaWhatsapp className="text-2xl md:text-3xl" />
        <motion.span 
          className="overflow-hidden whitespace-nowrap text-base md:text-lg"
          initial={{ width: 0, opacity: 0 }}
          animate={{ 
            width: isExpanded ? 'auto' : 0,
            opacity: isExpanded ? 1 : 0
          }}
          transition={{ 
            duration: 0.8,
            ease: 'easeInOut'
          }}
        >
          {String(t({
            EN: 'Chat with us',
            NL: 'Chat met ons'
          }))}
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl p-6 max-w-md w-full relative"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="text-xl" />
              </button>

              <h3 className="text-2xl font-bold text-center mb-6">
                {String(t({
                  EN: 'Connect on WhatsApp',
                  NL: 'Contact via WhatsApp'
                }))}
              </h3>

              <div className="flex flex-col items-center gap-6">
                <div className="bg-white p-4 rounded-lg">
                  <QRCode value={WHATSAPP_URL} size={200} />
                </div>

                <div className="text-center">
                  <p className="text-gray-600 mb-2">
                    {String(t({
                      EN: 'Scan with your phone or click below',
                      NL: 'Scan met je telefoon of klik hieronder'
                    }))}
                  </p>
                  <p className="font-mono text-gray-800 mb-4">{WHATSAPP_NUMBER}</p>
                </div>

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition-colors duration-300 flex items-center gap-2"
                >
                  <FaWhatsapp className="text-xl" />
                  <span>WhatsApp Web</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 