import React, { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { navigation, siteTitle } from '@/data/navigation';
import { useTranslation } from '../hooks/useTranslation';
import { NavItem } from '../data';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronUp, Menu } from 'lucide-react';

const FloatingNavbar = () => {
    const pathname = usePathname();
    const [isVisible, setIsVisible] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { setLanguage, language } = useLanguage();
    const { t } = useTranslation();

    const handleScroll = useCallback(() => {
        const currentScrollY = window.scrollY;
        if (currentScrollY < lastScrollY) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
        setLastScrollY(currentScrollY);
    }, [lastScrollY]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    const toggleLanguage = () => {
        const newLanguage = language === 'EN' ? 'NL' : 'EN';
        setLanguage(newLanguage);
    };

    const NavLink = ({ href, label }: NavItem) => (
        <Link
            href={href}
            className={`px-3 py-2 text-sm font-medium transition-all duration-300 rounded-md ${
                pathname === href
                    ? 'text-white bg-white bg-opacity-20'
                    : 'text-white hover:bg-white hover:bg-opacity-10'
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
        >
            {String(t(label))}
        </Link>
    );

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
            >
                <button
                    onClick={() => setIsVisible(true)}
                    className="bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300"
                >
                    <Menu size={24} />
                </button>
            </motion.div>
            <AnimatePresence>
                {isVisible && (
                    <motion.nav
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -100, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-screen-md px-4"
                    >
                        <div className="bg-blue-600 backdrop-blur-md rounded-lg shadow-lg flex items-center justify-between">
                            <div className="flex items-center space-x-2 py-3 pl-4 shrink-0">
                                <ChevronUp className="text-white" size={18} />
                                <span className="text-white font-semibold text-lg">{String(t(siteTitle))}</span>
                            </div>
                            <div className="hidden md:flex items-center space-x-1 pr-2 overflow-x-auto relative scrollbar-hide">
                                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-blue-600 to-transparent pointer-events-none z-10"></div>
                                <div className="flex items-center space-x-1 px-8">
                                    {navigation.map((item) => (
                                        <NavLink key={item.href} href={item.href} label={item.label} />
                                    ))}
                                </div>
                                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-blue-600 to-transparent pointer-events-none z-10"></div>
                                <button
                                    onClick={toggleLanguage}
                                    className="px-3 py-2 text-sm font-medium text-white hover:bg-white hover:bg-opacity-10 transition-all duration-300 rounded-md ml-2 shrink-0"
                                >
                                    {language === 'EN' ? 'NL' : 'EN'}
                                </button>
                            </div>
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="md:hidden px-4 py-3 text-white hover:bg-white hover:bg-opacity-10 transition-all duration-300 shrink-0"
                            >
                                <Menu size={24} />
                            </button>
                        </div>
                        <AnimatePresence>
                            {isMobileMenuOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.2 }}
                                    className="md:hidden mt-2 bg-blue-600 bg-opacity-90 backdrop-blur-md rounded-lg shadow-lg overflow-hidden"
                                >
                                    <div className="py-2">
                                        {navigation.map((item) => (
                                            <div key={item.href} className="px-3 py-1">
                                                <NavLink href={item.href} label={item.label} />
                                            </div>
                                        ))}
                                        <div className="px-3 py-1">
                                            <button
                                                onClick={toggleLanguage}
                                                className="w-full px-3 py-2 text-sm font-medium text-white hover:bg-white hover:bg-opacity-10 transition-all duration-300 text-left rounded-md"
                                            >
                                                {language === 'EN' ? 'Switch to Dutch' : 'Switch to English'}
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.nav>
                )}
            </AnimatePresence>
        </>
    );
};

export default FloatingNavbar;