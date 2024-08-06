'use client';
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { navigation, siteTitle } from '@/data/navigation';
import { useTranslation } from '../hooks/useTranslation';

import { NavItem } from '../data';
import { useLanguage } from '@/contexts/LanguageContext';

const Header = () => {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrollY, setScrollY] = useState(0);
      const { setLanguage } = useLanguage();
    //   const isEnglish = language === 'EN';
    const { t, isEnglish } = useTranslation();

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const opacity = Math.max(1 - scrollY / 300, 0); // Adjust fade-out speed

    const toggleLanguage = () => {
        const newLanguage = isEnglish ? 'NL' : 'EN';
        setLanguage(newLanguage);
    };

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const NavLink = ({ href, label }: NavItem) => (
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
                href={href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${pathname === href
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-800 hover:bg-blue-500 hover:text-white'
                    }`}
            >
                {isEnglish ? label.EN : label.NL}
            </Link>
        </motion.div>
    );

    return (
        <header className="sticky top-0 z-50 w-full bg-white shadow-lg" style={{ opacity }}>
            <div className="container mx-auto px-4">
                <nav className="flex items-center justify-between h-20">
                    <motion.div
                        initial={{ opacity: 1, x: 0 }}
                        animate={{ x: Math.min(scrollY / 5, 100) }} // Adjust movement speed
                        transition={{ duration: 0.5 }}
                    >
                        <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors duration-200">
                            {isEnglish ? siteTitle.EN : siteTitle.NL}
                        </Link>
                    </motion.div>
                    <motion.button
                        className="md:hidden p-2 rounded-md bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors duration-200"
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </motion.button>
                    <motion.ul
                        className="hidden md:flex space-x-4"
                        initial={{ opacity: 1, y: 0 }}
                        animate={{ x: Math.min(scrollY / 5, 100) }} // Adjust movement speed
                        transition={{ duration: 0.5, staggerChildren: 0.1 }}
                    >
                        {navigation.map((item) => (
                            <motion.li key={item.href} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <NavLink href={item.href} label={item.label} />
                            </motion.li>
                        ))}
                        <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <motion.button
                                onClick={toggleLanguage}
                                className="px-3 py-2 rounded-md text-sm font-medium text-gray-800 hover:bg-blue-500 hover:text-white transition-colors duration-200"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {isEnglish ? 'NL' : 'EN'}
                            </motion.button>
                        </motion.li>
                    </motion.ul>
                </nav>
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            className="md:hidden"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ul className="pt-2 pb-3 space-y-1">
                                {navigation.map((item) => (
                                    <motion.li
                                        key={item.href}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <NavLink href={item.href} label={item.label} />
                                    </motion.li>
                                ))}
                                <motion.li
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <button
                                        onClick={() => {
                                            toggleLanguage();
                                            setIsMenuOpen(false);
                                        }}
                                        className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:bg-blue-500 hover:text-white transition-colors duration-200"
                                    >
                                        {isEnglish ? 'Prefer Dutch' : 'Prefer English?'}
                                    </button>
                                </motion.li>
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
};

export default Header;