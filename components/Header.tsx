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
    const [scrolled, setScrolled] = useState(false)
    const { scrollY, scrollYProgress } = useScroll()
    const pathname = usePathname()
    const t = useTranslations('common')
    const locale = useLocale()
    const otherLocale = locale === 'nl' ? 'en' : 'nl'

    useMotionValueEvent(scrollYProgress, "change", (current) => {
        if (typeof current === "number") {
            const direction = current - scrollYProgress.getPrevious()!;
            const yPos = scrollY.get();
            setScrolled(yPos > 40);

            if (yPos < 100) {
                setVisible(true);
            } else {
                setVisible(direction < 0);
            }
        }
    });

    const closeMenu = () => setIsOpen(false)

    return (
        <>
            {/* Desktop Header */}
            <AnimatePresence mode="wait">
                <m.header
                    className="fixed top-0 w-full z-50 hidden md:block"
                    initial={{ opacity: 1, y: 0 }}
                    animate={{
                        y: visible ? 0 : -100,
                        opacity: visible ? 1 : 0,
                    }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                    <m.div
                        className="absolute inset-x-0 transition-all duration-500"
                        animate={{
                            height: scrolled ? '56px' : '72px',
                            backgroundColor: scrolled ? 'rgba(13, 40, 24, 0.97)' : '#0D2818',
                            backdropFilter: scrolled ? 'blur(12px)' : 'none',
                        }}
                    >
                        <nav className="h-full mx-auto max-w-[1400px] px-6 lg:px-12">
                            <div className="flex items-center justify-between h-full">
                                {/* Logo */}
                                <Link
                                    href="/"
                                    className="font-display text-lg lg:text-xl font-semibold text-[#FAF7F2] tracking-tight"
                                >
                                    {t('siteTitle')}
                                </Link>

                                {/* Nav links */}
                                <div className="flex items-center gap-1 lg:gap-2">
                                    {navItems.map(({ href, key }) => (
                                        <Link
                                            key={href}
                                            href={href}
                                            className={`px-3 py-1.5 text-sm font-medium transition-all duration-200 rounded-md whitespace-nowrap ${
                                                pathname === href
                                                    ? 'text-[#C9963B] bg-white/5'
                                                    : 'text-[#FAF7F2]/70 hover:text-[#FAF7F2] hover:bg-white/5'
                                            }`}
                                        >
                                            {t(`nav.${key}`)}
                                        </Link>
                                    ))}

                                    <div className="w-px h-5 bg-white/15 mx-2" />

                                    {infoItems.map(({ href, key }) => (
                                        <Link
                                            key={href}
                                            href={href}
                                            className={`px-3 py-1.5 text-sm font-medium transition-all duration-200 rounded-md whitespace-nowrap ${
                                                pathname === href
                                                    ? 'text-[#C9963B] bg-white/5'
                                                    : 'text-[#FAF7F2]/70 hover:text-[#FAF7F2] hover:bg-white/5'
                                            }`}
                                        >
                                            {t(`nav.${key}`)}
                                        </Link>
                                    ))}

                                    <div className="w-px h-5 bg-white/15 mx-2" />

                                    {/* Language toggle */}
                                    <Link
                                        href={pathname as any}
                                        locale={otherLocale}
                                        className="px-3 py-1.5 text-sm font-medium text-[#C9963B] border border-[#C9963B]/30 rounded-md hover:bg-[#C9963B]/10 transition-all duration-200"
                                    >
                                        {locale === 'nl' ? 'English?' : 'Nederlands?'}
                                    </Link>
                                </div>
                            </div>
                        </nav>
                    </m.div>
                </m.header>
            </AnimatePresence>

            {/* Mobile Header */}
            <header className="fixed top-0 w-full z-50 bg-[#0D2818] md:hidden">
                <nav>
                    <div className="flex items-center justify-between h-14 px-4">
                        <Link
                            href="/"
                            className="font-display text-base font-semibold text-[#FAF7F2] tracking-tight"
                        >
                            {t('siteTitle')}
                        </Link>

                        <div className="flex items-center gap-2">
                            <Link
                                href={pathname as any}
                                locale={otherLocale}
                                className="px-2 py-1 text-sm font-medium text-[#C9963B] border border-[#C9963B]/30 rounded"
                            >
                                {otherLocale.toUpperCase()}
                            </Link>

                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="p-1.5 text-[#FAF7F2]"
                            >
                                {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
                            </button>
                        </div>
                    </div>

                    <AnimatePresence>
                        {isOpen && (
                            <m.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="border-t border-white/10"
                            >
                                <div className="py-2 px-2">
                                    {navItems.map(({ href, key }) => (
                                        <Link
                                            key={href}
                                            href={href}
                                            onClick={closeMenu}
                                            className={`block px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                                                pathname === href
                                                    ? 'text-[#C9963B] bg-white/5'
                                                    : 'text-[#FAF7F2]/70 hover:text-[#FAF7F2] hover:bg-white/5'
                                            }`}
                                        >
                                            {t(`nav.${key}`)}
                                        </Link>
                                    ))}
                                    <div className="h-px bg-white/10 my-1 mx-3" />
                                    {infoItems.map(({ href, key }) => (
                                        <Link
                                            key={href}
                                            href={href}
                                            onClick={closeMenu}
                                            className={`block px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                                                pathname === href
                                                    ? 'text-[#C9963B] bg-white/5'
                                                    : 'text-[#FAF7F2]/70 hover:text-[#FAF7F2] hover:bg-white/5'
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
