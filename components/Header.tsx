'use client';

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { useTranslation } from '@/hooks/useTranslation'
import { useLanguage } from '@/contexts/LanguageContext'
import { FiMenu, FiX } from 'react-icons/fi'
import { siteTitle } from '@/data/navigation'

const Header = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [visible, setVisible] = useState(true)
    const { scrollY, scrollYProgress } = useScroll()
    const pathname = usePathname()
    const { t } = useTranslation()
    const { language, setLanguage } = useLanguage()

    useMotionValueEvent(scrollYProgress, "change", (current) => {
        if (typeof current === "number") {
            const direction = current - scrollYProgress.getPrevious()!;
            const isAtTop = scrollY.get() < 20;
            const isScrollingABit = scrollY.get() > 100 && scrollY.get() < 400;
            const isNearTop = scrollY.get() < 100;

            if (isAtTop || isNearTop) {
                setVisible(true);
            } else if (isScrollingABit) {
                setVisible(true);
            } else {
                setVisible(direction < 0);
            }
        }
    });

    const closeMenu = () => setIsOpen(false)
    
    const toggleLanguage = () => {
        setLanguage(language === 'EN' ? 'NL' : 'EN')
    }

    const navItems = [
        { href: '/', label: { EN: 'Home', NL: 'Home' } },
        { href: '/services', label: { EN: 'Services', NL: 'Diensten' } },
        { href: '/workshops', label: { EN: 'Workshops', NL: 'Workshops' } },
        { href: '/about', label: { EN: 'About', NL: 'Over Mij' } },
        { href: '/faq', label: { EN: 'FAQ', NL: 'FAQ' } },
        { href: '/contact', label: { EN: 'Contact', NL: 'Contact' } },
    ]

    const isAtTop = scrollY.get() < 20;

    return (
        <AnimatePresence mode="wait">
            <motion.header 
                className="fixed w-full z-50"
                initial={{
                    opacity: 1,
                    y: -100,
                }}
                animate={{
                    y: visible ? (isAtTop ? 0 : 20) : -100,
                    opacity: visible ? 1 : 0,
                }}
                transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                }}
            >
                {/* Background shape that morphs based on scroll position */}
                <motion.div
                    className="absolute inset-x-0 overflow-hidden"
                    animate={{ 
                        height: isAtTop ? '96px' : '64px',
                        width: isAtTop ? '100%' : 'clamp(min(90%, 900px), 85%, 95%)',
                        borderRadius: isAtTop ? '0px' : '32px',
                        left: isAtTop ? '0%' : '50%',
                        x: isAtTop ? '0%' : '-50%',
                        backgroundColor: isAtTop ? '#1E40AF' : 'white',
                        boxShadow: isAtTop 
                            ? 'none'
                            : '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                        y: isAtTop ? 0 : 10,
                    }}
                    transition={{ 
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                        backgroundColor: {
                            duration: 0.8,
                            ease: [0.22, 1, 0.36, 1],
                        }
                    }}
                    style={{
                        filter: isAtTop ? 'none' : 'drop-shadow(0 20px 13px rgb(0 0 0 / 0.03)) drop-shadow(0 8px 5px rgb(0 0 0 / 0.08))'
                    }}
                >
                    {/* Sheen effect */}
                    {isAtTop && (
                        <motion.div
                            className="absolute inset-0 pointer-events-none"
                            initial={{ x: '-100%', opacity: 0.5 }}
                            animate={{ 
                                x: '200%',
                                opacity: [0.3, 0.5, 0.3],
                                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
                                backgroundSize: '200% 100%',
                            }}
                            transition={{ 
                                repeat: Infinity,
                                duration: 4,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                        />
                    )}
                    
                    {/* Content */}
                    <div className="relative h-full">
                        <nav className={`h-full mx-auto ${
                            isAtTop 
                                ? 'max-w-[1400px] px-4 sm:px-6 md:px-8 lg:px-12' 
                                : 'px-4 sm:px-5'
                        }`}>
                            <div className="flex items-center justify-between h-full">
                                <Link 
                                    href="/" 
                                    className={`text-lg sm:text-xl font-bold whitespace-nowrap transition-all duration-500 ${
                                        isAtTop ? 'text-white' : 'text-gray-900'
                                    }`}
                                >
                                    {String(t(siteTitle))}
                                </Link>

                                {/* Desktop Navigation */}
                                <div className="hidden md:flex items-center justify-between flex-1 pl-8">
                                    {/* Left side navigation items */}
                                    <div className="flex items-center gap-4 lg:gap-6 xl:gap-8">
                                        {navItems.slice(0, Math.ceil(navItems.length / 2)).map(({ href, label }) => (
                                            <Link
                                                key={href}
                                                href={href}
                                                className={`text-sm font-medium transition-all duration-500 whitespace-nowrap ${
                                                    isAtTop
                                                        ? pathname === href
                                                            ? 'text-white'
                                                            : 'text-blue-100 hover:text-white'
                                                        : pathname === href
                                                            ? 'text-blue-600'
                                                            : 'text-gray-600 hover:text-blue-600'
                                                }`}
                                            >
                                                {String(t(label))}
                                            </Link>
                                        ))}
                                    </div>

                                    {/* Language toggle in center */}
                                    <motion.button
                                        onClick={toggleLanguage}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                                            isAtTop
                                                ? 'bg-white/10 text-white hover:bg-white/20'
                                                : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                                        }`}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {language === 'EN' ? 'Nederlands?' : 'English?'}
                                    </motion.button>

                                    {/* Right side navigation items */}
                                    <div className="flex items-center gap-4 lg:gap-6 xl:gap-8">
                                        {navItems.slice(Math.ceil(navItems.length / 2)).map(({ href, label }) => (
                                            <Link
                                                key={href}
                                                href={href}
                                                className={`text-sm font-medium transition-all duration-500 whitespace-nowrap ${
                                                    isAtTop
                                                        ? pathname === href
                                                            ? 'text-white'
                                                            : 'text-blue-100 hover:text-white'
                                                        : pathname === href
                                                            ? 'text-blue-600'
                                                            : 'text-gray-600 hover:text-blue-600'
                                                }`}
                                            >
                                                {String(t(label))}
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                {/* Mobile Menu Button */}
                                <div className="md:hidden flex items-center gap-3">
                                    <motion.button
                                        onClick={toggleLanguage}
                                        className={`px-2 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${
                                            isAtTop
                                                ? 'bg-white/10 text-white hover:bg-white/20'
                                                : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                                        }`}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {language === 'EN' ? 'NL' : 'EN'}
                                    </motion.button>
                                    <button
                                        onClick={() => setIsOpen(!isOpen)}
                                        className={`p-1.5 transition-colors duration-200 ${
                                            isAtTop ? 'text-white hover:text-blue-100' : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                    >
                                        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                                    </button>
                                </div>

                                {/* Mobile Navigation */}
                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="md:hidden fixed top-[64px] left-0 right-0 bg-white shadow-xl mx-4 rounded-2xl border border-gray-100 z-50"
                                            style={{
                                                maxHeight: 'calc(100vh - 80px)',
                                                overflowY: 'auto'
                                            }}
                                        >
                                            <div className="p-6">
                                                <div className="flex flex-col space-y-4">
                                                    {navItems.map(({ href, label }) => (
                                                        <Link
                                                            key={href}
                                                            href={href}
                                                            onClick={closeMenu}
                                                            className={`text-base font-medium transition-colors hover:text-blue-600 py-2 ${
                                                                pathname === href ? 'text-blue-600' : 'text-gray-600'
                                                            }`}
                                                        >
                                                            {String(t(label))}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </nav>
                    </div>
                </motion.div>
            </motion.header>
        </AnimatePresence>
    )
}

export default Header