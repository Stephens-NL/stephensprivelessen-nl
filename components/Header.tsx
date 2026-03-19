'use client';

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useLocale } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'
import { m, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'

const navItems = [
    { href: '/privelessen' as const, key: 'privelessen' },
    { href: '/scriptiebegeleiding' as const, key: 'scriptiebegeleiding' },
    { href: '/workshops' as const, key: 'workshops' },
    { href: '/consultancy' as const, key: 'consultancy' },
    { href: '/services' as const, key: 'services' },
] as const;

const infoItems = [
    { href: '/about' as const, key: 'about' },
    { href: '/blog' as const, key: 'blog' },
    { href: '/faq' as const, key: 'faq' },
    { href: '/contact' as const, key: 'contact' },
] as const;

const Header = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [visible, setVisible] = useState(true)
    const { scrollY, scrollYProgress } = useScroll()
    const pathname = usePathname()
    const t = useTranslations('common')
    const locale = useLocale()
    const otherLocale = locale === 'nl' ? 'en' : 'nl'

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

    const isAtTop = scrollY.get() < 20;

    return (
        <>
            {/* Desktop Header */}
            <AnimatePresence mode="wait">
                <m.header
                    className="fixed top-0 w-full z-50 hidden md:block"
                    initial={{
                        opacity: 1,
                        y: 0,
                    }}
                    animate={{
                        y: visible ? 0 : -100,
                        opacity: visible ? 1 : 0,
                    }}
                    transition={{
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                >
                    {/* Background shape that morphs based on scroll position */}
                    <m.div
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
                    >
                        {/* Sheen effect */}
                        {isAtTop && (
                            <m.div
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
                                    {t('siteTitle')}
                                </Link>

                                {/* Navigation items - Now with overflow handling */}
                                <div className="flex items-center gap-2 lg:gap-4 xl:gap-6 overflow-x-auto no-scrollbar relative">
                                    {/* Left shadow */}
                                    <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none z-10 transition-opacity duration-300" style={{ opacity: isAtTop ? 0 : 1 }} />

                                    <div className="flex items-center gap-2 lg:gap-4 xl:gap-6 px-8">
                                        {/* Service navigation items */}
                                        {navItems.map(({ href, key }) => (
                                                <m.div
                                                    key={href}
                                                    whileHover={{
                                                        scale: 1.05,
                                                        transition: { duration: 0.2 }
                                                    }}
                                                    className="relative group"
                                                >
                                                    <Link
                                                        href={href}
                                                        className={`text-sm font-medium transition-all duration-300 whitespace-nowrap cursor-pointer ${
                                                            isAtTop
                                                                ? pathname === href
                                                                    ? 'text-white'
                                                                    : 'text-blue-100 hover:text-white'
                                                                : pathname === href
                                                                    ? 'text-blue-600'
                                                                    : 'text-gray-600 hover:text-blue-600'
                                                        }`}
                                                    >
                                                        {t(`nav.${key}`)}
                                                        <span className="absolute inset-x-0 -bottom-0.5 h-[2px] bg-current transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                                                    </Link>
                                                </m.div>
                                            ))}

                                        {/* Language toggle */}
                                        <Link
                                            href={pathname}
                                            locale={otherLocale}
                                            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                                                isAtTop
                                                    ? 'bg-white/10 text-white hover:bg-white/20'
                                                    : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                                            }`}
                                        >
                                            {locale === 'nl' ? 'English?' : 'Nederlands?'}
                                        </Link>

                                        {/* Info navigation items */}
                                        {infoItems.map(({ href, key }) => (
                                                <m.div
                                                    key={href}
                                                    whileHover={{
                                                        scale: 1.05,
                                                        transition: { duration: 0.2 }
                                                    }}
                                                    className="relative group"
                                                >
                                                    <Link
                                                        href={href}
                                                        className={`text-sm font-medium transition-all duration-300 whitespace-nowrap cursor-pointer ${
                                                            isAtTop
                                                                ? pathname === href
                                                                    ? 'text-white'
                                                                    : 'text-blue-100 hover:text-white'
                                                                : pathname === href
                                                                    ? 'text-blue-600'
                                                                    : 'text-gray-600 hover:text-blue-600'
                                                        }`}
                                                    >
                                                        {t(`nav.${key}`)}
                                                        <span className="absolute inset-x-0 -bottom-0.5 h-[2px] bg-current transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                                                    </Link>
                                                </m.div>
                                            ))}
                                    </div>

                                    {/* Right shadow */}
                                    <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none z-10 transition-opacity duration-300" style={{ opacity: isAtTop ? 0 : 1 }} />
                                </div>
                            </div>
                        </nav>
                    </m.div>
                </m.header>
            </AnimatePresence>

            {/* Mobile Header */}
            <header className="fixed top-0 w-full z-50 bg-blue-900 shadow-lg md:hidden">
                <nav>
                    <div className="flex items-center justify-between h-14 px-4">
                        <Link
                            href="/"
                            className="text-base sm:text-lg font-bold text-white whitespace-nowrap"
                        >
                            {t('siteTitle')}
                        </Link>

                        {/* Language toggle - Centered */}
                        <Link
                            href={pathname}
                            locale={otherLocale}
                            className="px-2.5 py-1 rounded-full text-sm font-medium bg-white/10 text-white hover:bg-white/20 mx-2"
                        >
                            {otherLocale.toUpperCase()}
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-1.5 text-white hover:text-blue-100"
                        >
                            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                        </button>
                    </div>

                    {/* Mobile Navigation */}
                    <AnimatePresence>
                        {isOpen && (
                            <m.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="border-t border-white/10"
                            >
                                <div className="py-1">
                                    {/* Service navigation items */}
                                    {navItems.map(({ href, key }) => (
                                            <Link
                                                key={href}
                                                href={href}
                                                onClick={closeMenu}
                                                className={`block px-4 py-2 text-base font-medium transition-colors ${
                                                    pathname === href
                                                        ? 'text-white bg-white/10'
                                                        : 'text-blue-100 hover:text-white hover:bg-white/5'
                                                }`}
                                            >
                                                {t(`nav.${key}`)}
                                            </Link>
                                        ))}

                                    {/* Info navigation items */}
                                    {infoItems.map(({ href, key }) => (
                                            <Link
                                                key={href}
                                                href={href}
                                                onClick={closeMenu}
                                                className={`block px-4 py-2 text-base font-medium transition-colors ${
                                                    pathname === href
                                                        ? 'text-white bg-white/10'
                                                        : 'text-blue-100 hover:text-white hover:bg-white/5'
                                                }`}
                                            >
                                                {t(`nav.${key}`)}
                                            </Link>
                                        ))}
                                </div>
                            </m.div>
                        )}
                    </AnimatePresence>
                </nav>
            </header>
        </>
    )
}

export default Header
