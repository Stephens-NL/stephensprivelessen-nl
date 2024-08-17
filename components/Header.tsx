import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { navigation, siteTitle } from '@/data/navigation';
import { useTranslation } from '../hooks/useTranslation';
import { NavItem } from '../data';
import { useLanguage } from '@/contexts/LanguageContext';
import { Menu, X } from 'lucide-react';

const OPACITY_THRESHOLD = 0.3;

const Header = () => {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const { setLanguage } = useLanguage();
    const { t, isEnglish } = useTranslation();

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const opacity = Math.max(1 - scrollY / 300, 0);
    const isClickable = opacity > OPACITY_THRESHOLD;

    const toggleLanguage = () => {
        if (isClickable) {
            const newLanguage = isEnglish ? 'NL' : 'EN';
            setLanguage(newLanguage);
        }
    };

    const toggleMenu = () => {
        if (isClickable) {
            setIsMenuOpen(!isMenuOpen);
        }
    };

    const NavLink = ({ href, label }: NavItem) => (
        <motion.div 
            whileHover={{ scale: isClickable ? 1.05 : 1 }} 
            whileTap={{ scale: isClickable ? 0.95 : 1 }}
            className="w-full sm:w-auto"
        >
            <Link
                href={isClickable ? href : '#'}
                onClick={(e) => { 
                    if (!isClickable) e.preventDefault();
                    setIsMenuOpen(false);
                }}
                className={`block w-full px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    pathname === href
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-800 hover:bg-blue-500 hover:text-white'
                } ${!isClickable ? 'pointer-events-none opacity-50' : ''}`}
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
                        animate={{ x: Math.min(scrollY / 5, 50) }}
                        transition={{ duration: 0.5 }}
                    >
                        <Link 
                            href={isClickable ? "/" : "#"}
                            onClick={(e) => !isClickable && e.preventDefault()}
                            className={`text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors duration-200 ${!isClickable ? 'pointer-events-none opacity-50' : ''}`}
                        >
                            {isEnglish ? siteTitle.EN : siteTitle.NL}
                        </Link>
                    </motion.div>
                    <motion.button
                        className={`lg:hidden p-2 rounded-md bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors duration-200 ${!isClickable ? 'pointer-events-none opacity-50' : ''}`}
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                        whileHover={{ scale: isClickable ? 1.05 : 1 }}
                        whileTap={{ scale: isClickable ? 0.95 : 1 }}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </motion.button>
                    <motion.ul
                        className="hidden lg:flex space-x-4 items-center"
                        initial={{ opacity: 1, y: 0 }}
                        animate={{ x: Math.min(scrollY / 5, 50) }}
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
                                className={`px-4 py-2 rounded-md text-sm font-medium text-gray-800 hover:bg-blue-500 hover:text-white transition-colors duration-200 ${!isClickable ? 'pointer-events-none opacity-50' : ''}`}
                                whileHover={{ scale: isClickable ? 1.05 : 1 }}
                                whileTap={{ scale: isClickable ? 0.95 : 1 }}
                            >
                                {isEnglish ? 'NL' : 'EN'}
                            </motion.button>
                        </motion.li>
                    </motion.ul>
                </nav>
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            className="lg:hidden fixed inset-0 bg-white z-40"
                            initial={{ opacity: 0, x: '100%' }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: '100%' }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                            <div className="flex flex-col h-full">
                                <div className="flex justify-between items-center p-4 border-b">
                                    <span className="text-2xl font-bold text-blue-600">
                                        {isEnglish ? siteTitle.EN : siteTitle.NL}
                                    </span>
                                    <button
                                        onClick={toggleMenu}
                                        className="p-2 rounded-md bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors duration-200"
                                    >
                                        <X size={24} />
                                    </button>
                                </div>
                                <nav className="flex-grow overflow-y-auto">
                                    <ul className="p-4 space-y-4">
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
                                                    if (isClickable) {
                                                        toggleLanguage();
                                                        setIsMenuOpen(false);
                                                    }
                                                }}
                                                className={`w-full text-left px-4 py-2 rounded-md text-sm font-medium text-gray-800 hover:bg-blue-500 hover:text-white transition-colors duration-200 ${!isClickable ? 'pointer-events-none opacity-50' : ''}`}
                                            >
                                                {isEnglish ? 'Prefer Dutch' : 'Prefer English?'}
                                            </button>
                                        </motion.li>
                                    </ul>
                                </nav>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
};

export default Header;