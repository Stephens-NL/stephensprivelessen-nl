import React, { useState, useEffect, useCallback } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { m, AnimatePresence } from 'framer-motion';
import { ChevronUp, Menu } from 'lucide-react';
import { getOtherLocale } from '@/hooks/useLanguage';

const navItems = [
    { href: '/' as const, key: 'home' },
    { href: '/privelessen' as const, key: 'privelessen' },
    { href: '/mbo-rekenen' as const, key: 'mboRekenen' },
    { href: '/scriptiebegeleiding' as const, key: 'scriptiebegeleiding' },
    { href: '/about' as const, key: 'about' },
    { href: '/workshops' as const, key: 'workshops' },
    { href: '/consultancy' as const, key: 'consultancy' },
    { href: '/blog' as const, key: 'blog' },
    { href: '/faq' as const, key: 'faq' },
    { href: '/contact' as const, key: 'contact' },
] as const;

type NavLinkProps = {
    href: string;
    navKey: string;
    pathname: string;
    t: (key: string) => string;
    onClose: () => void;
};

const NavLink = ({ href, navKey, pathname, t, onClose }: NavLinkProps) => (
    <Link
        href={href as any}
        className={`px-3 py-2 text-sm font-body font-medium transition-all duration-300 rounded-md ${
            pathname === href
                ? 'text-on-dark bg-white/20'
                : 'text-on-dark hover:bg-white/10'
        }`}
        onClick={onClose}
    >
        {t(`nav.${navKey}`)}
    </Link>
);

const FloatingNavbar = () => {
    const pathname = usePathname();
    const [isVisible, setIsVisible] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const t = useTranslations('common');
    const locale = useLocale();
    const otherLocale = getOtherLocale(locale);

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

    const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);

    return (
        <>
            <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
            >
                <button
                    onClick={() => setIsVisible(true)}
                    className="bg-[var(--ink)] text-on-dark p-2 rounded-full shadow-sm hover:bg-[var(--ink-light)] transition-colors duration-300"
                >
                    <Menu size={24} />
                </button>
            </m.div>
            <AnimatePresence>
                {isVisible && (
                    <m.nav
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -100, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-screen-md px-4"
                    >
                        <div className="bg-[var(--ink)] backdrop-blur-md rounded-lg shadow-sm flex items-center justify-between">
                            <div className="flex items-center space-x-2 py-3 pl-4 shrink-0">
                                <ChevronUp className="text-on-dark" size={18} />
                                <span className="text-on-dark font-display font-semibold text-lg">{t('siteTitle')}</span>
                            </div>
                            <div className="hidden md:flex items-center space-x-1 pr-2 overflow-x-auto relative scrollbar-hide">
                                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[var(--ink)] to-transparent pointer-events-none z-10"></div>
                                <div className="flex items-center space-x-1 px-8">
                                    {navItems.map((item) => (
                                        <NavLink key={item.href} href={item.href} navKey={item.key} pathname={pathname} t={t} onClose={closeMobileMenu} />
                                    ))}
                                </div>
                                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[var(--ink)] to-transparent pointer-events-none z-10"></div>
                                <Link
                                    href={pathname as any}
                                    locale={otherLocale}
                                    className="px-3 py-2 text-sm font-body font-medium text-on-dark hover:bg-white/10 transition-all duration-300 rounded-md ml-2 shrink-0"
                                >
                                    {otherLocale.toUpperCase()}
                                </Link>
                            </div>
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="md:hidden px-4 py-3 text-on-dark hover:bg-white/10 transition-all duration-300 shrink-0"
                            >
                                <Menu size={24} />
                            </button>
                        </div>
                        <AnimatePresence>
                            {isMobileMenuOpen && (
                                <m.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.2 }}
                                    className="md:hidden mt-2 bg-[var(--ink)]/90 backdrop-blur-md rounded-lg shadow-sm overflow-hidden"
                                >
                                    <div className="py-2">
                                        {navItems.map((item) => (
                                            <div key={item.href} className="px-3 py-1">
                                                <NavLink href={item.href} navKey={item.key} pathname={pathname} t={t} onClose={closeMobileMenu} />
                                            </div>
                                        ))}
                                        <div className="px-3 py-1">
                                            <Link
                                                href={pathname as any}
                                                locale={otherLocale}
                                                className="w-full px-3 py-2 text-sm font-body font-medium text-on-dark hover:bg-white/10 transition-all duration-300 text-left rounded-md block"
                                            >
                                                {locale === 'nl' ? 'Switch to English' : 'Schakel naar Nederlands'}
                                            </Link>
                                        </div>
                                    </div>
                                </m.div>
                            )}
                        </AnimatePresence>
                    </m.nav>
                )}
            </AnimatePresence>
        </>
    );
};

export default FloatingNavbar;
