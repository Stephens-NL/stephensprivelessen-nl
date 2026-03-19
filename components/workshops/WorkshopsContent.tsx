'use client'

import React, { useState, useMemo, useEffect, useRef, useSyncExternalStore, useReducer } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import workshopsData from '@/data/workshopsData'
import type { Workshop, WorkshopLevel, WorkshopFormat, Workshops } from '@/data/types'
import { FiClock, FiUsers, FiBookOpen, FiFilter, FiChevronDown } from 'react-icons/fi'
import { MobileFilterDrawer, Tab } from './WorkshopsFilters'
import { WorkshopsFilterPanel } from './WorkshopsFilterPanel'

// Map workshop kebab-case IDs to camelCase message keys
const workshopIdToKey: Record<string, string> = {
    'statistics-project': 'statisticsProject',
    'math-innovation': 'mathInnovation',
    'ai-math': 'aiMath',
    'music-production': 'musicProduction',
    'analog-photography': 'analogPhotography',
    'visual-storytelling': 'visualStorytelling',
    'creative-coding': 'creativeCoding',
    'ai-art': 'aiArt',
    'escape-room': 'escapeRoom',
    'data-visualization': 'dataVisualization',
    'math-games': 'mathGames',
    'math-art': 'mathArt',
    'math-modeling': 'mathModeling',
    'math-storytelling': 'mathStorytelling',
    'math-podcasting': 'mathPodcasting',
    'math-video': 'mathVideo',
    'math-assessment': 'mathAssessment',
    'math-differentiation': 'mathDifferentiation',
    'math-mindfulness': 'mathMindfulness',
    'mindfulness': 'mindfulness',
    'time-management': 'timeManagement',
    'exam-preparation': 'examPreparation',
};

const getLevelKey = (level?: WorkshopLevel): string => {
    if (!level) return 'allLevels';
    const map: Record<string, string> = {
        'beginner': 'beginner',
        'intermediate': 'intermediate',
        'advanced': 'advanced',
        'professional': 'professional',
        'all_levels': 'allLevels',
    };
    return map[level] || 'allLevels';
};

const getFormatKey = (format?: WorkshopFormat): string => {
    if (!format) return 'flexible';
    const map: Record<string, string> = {
        'flexible': 'flexible',
        'hands-on': 'handsOn',
        'interactive': 'interactive',
        'technical': 'technical',
        'creative': 'creative',
        'professional': 'professional',
        'media': 'media',
        'wellness': 'wellness',
    };
    return map[format] || 'flexible';
};

const HeroSection: React.FC = () => {
    const t = useTranslations('workshops')

    return (
        <div className="bg-[var(--ink)] text-[var(--cream)]">
            <div className="container mx-auto px-4 py-16 md:py-24">
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-3xl mx-auto text-center"
                >
                    <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">
                        {t('hero.title')}
                    </h1>
                    <p className="text-xl md:text-2xl text-[var(--cream-dark)] mb-8 leading-relaxed">
                        {t('hero.subtitle')}
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center items-center">
                        <div className="flex items-center bg-[var(--cream)]/10 rounded-full px-6 py-3">
                            <FiUsers className="mr-2" />
                            <span>{t('hero.smallGroups')}</span>
                        </div>
                        <div className="flex items-center bg-[var(--cream)]/10 rounded-full px-6 py-3">
                            <FiClock className="mr-2" />
                            <span>{t('hero.flexibleScheduling')}</span>
                        </div>
                        <div className="flex items-center bg-[var(--cream)]/10 rounded-full px-6 py-3">
                            <FiBookOpen className="mr-2" />
                            <span>{t('hero.expertGuidance')}</span>
                        </div>
                    </div>
                </m.div>
            </div>
        </div>
    )
}

interface WorkshopCardProps {
    workshop: Workshop
    index: number
    onRequestInfo: (id: string) => void
}

const WorkshopCard: React.FC<WorkshopCardProps> = ({ workshop, index, onRequestInfo }) => {
    const t = useTranslations('workshops')
    const router = useRouter()

    const msgKey = workshopIdToKey[workshop.id] || workshop.id;

    const isCreative = workshop.type === 'creative'
    const gradientClasses = isCreative
        ? 'from-[var(--sage)]/0 to-[var(--sage)]/90 group-hover:from-[var(--sage)]/50 group-hover:to-[var(--sage)]/90'
        : 'from-[var(--ink)]/0 to-[var(--ink)]/90 group-hover:from-[var(--ink)]/50 group-hover:to-[var(--ink)]/90'

    const tagBgClasses = isCreative
        ? 'bg-[var(--cream-dark)] text-[var(--sage)]'
        : 'bg-[var(--cream-dark)] text-[var(--ink)]'

    const buttonClasses = isCreative
        ? 'from-[var(--sage)] to-[var(--sage-light)] hover:from-[var(--sage-light)] hover:to-[var(--sage)]'
        : 'from-[var(--ink)] to-[var(--ink-light)] hover:from-[var(--ink-light)] hover:to-[var(--ink)]'

    const handleCardClick = () => {
        router.push(`/workshops/${workshop.id}`);
    };

    const handleInfoClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onRequestInfo(workshop.id);
    };

    const handleDetailsClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        handleCardClick();
    };

    return (
        <div className="h-full">
            <div
                role="button"
                tabIndex={0}
                onClick={handleCardClick}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleCardClick(); } }}
                className="bg-[var(--cream)] backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 relative group transform hover:-translate-y-1 flex flex-col h-full cursor-pointer border border-[var(--border-warm)]"
            >
                {/* Hover overlay - only visible on desktop */}
                <div className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${gradientClasses} transition-all duration-300 hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100`}>
                    <div className="text-center px-6 py-8">
                        <p className="font-display text-3xl uppercase tracking-wider mb-2 text-white">
                            {t('card.clickForDetails')}
                        </p>
                        <p className="text-white/80 text-sm">
                            {t('card.learnMore')}
                        </p>
                    </div>
                </div>
                <div className="flex flex-col h-full">
                    <div className="p-6 flex-grow">
                        <div className="flex flex-wrap gap-2 mb-4">
                            <span className={`${tagBgClasses} text-sm font-medium px-3 py-1 rounded-full`}>
                                {t(`formats.${getFormatKey(workshop.format)}`)}
                            </span>
                            <span className={`${tagBgClasses} text-sm font-medium px-3 py-1 rounded-full`}>
                                {isCreative ? t('card.creative') : t('card.academic')}
                            </span>
                        </div>
                        <h3 className="text-xl font-bold text-[var(--ink)] mb-3">
                            {t(`items.${msgKey}.title`)}
                        </h3>
                        <p className="text-[var(--muted-text)] mb-6 line-clamp-3">
                            {t(`items.${msgKey}.description`)}
                        </p>
                        <div className="space-y-3 text-sm text-[var(--muted-text)]">
                            <div className="flex items-center">
                                <FiClock className="mr-2 flex-shrink-0" />
                                <span className="line-clamp-1">{t(`items.${msgKey}.durationText`)}</span>
                            </div>
                            <div className="flex items-center">
                                <FiUsers className="mr-2 flex-shrink-0" />
                                <span className="line-clamp-1">{t(`levels.${getLevelKey(workshop.level)}`)}</span>
                            </div>
                            {workshop.maxParticipants && (
                                <div className="flex items-center">
                                    <FiUsers className="mr-2 flex-shrink-0" />
                                    <span className="line-clamp-1">
                                        {t('card.max')}:{' '}
                                        {workshop.maxParticipants} {t('card.participants')}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="px-6 py-4 bg-[var(--cream-dark)] border-t border-[var(--border-warm)] relative space-y-2">
                        {/* More Info button - only visible on mobile */}
                        <button
                            className={`md:hidden w-full bg-gradient-to-r ${buttonClasses} bg-opacity-80 text-white py-2.5 px-4 rounded-xl transition-all duration-300 font-medium shadow-sm hover:shadow-md flex items-center justify-center gap-2`}
                            onClick={handleDetailsClick}
                        >
                            <FiBookOpen className="w-4 h-4" />
                            {t('card.moreInfo')}
                        </button>
                        <button
                            className={`w-full bg-gradient-to-r ${buttonClasses} text-white py-2.5 px-4 rounded-xl transition-all duration-300 font-medium shadow-sm hover:shadow-md`}
                            onClick={handleInfoClick}
                        >
                            {t('card.requestInformation')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface CustomWorkshopCTAProps {
    onContactUs: () => void
}

const CustomWorkshopCTA: React.FC<CustomWorkshopCTAProps> = ({ onContactUs }) => {
    const t = useTranslations('workshops')

    return (
        <div className="mt-16 bg-[var(--cream-dark)] rounded-2xl p-8 md:p-12 border border-[var(--border-warm)]">
            <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-2xl md:text-3xl font-display font-bold text-[var(--ink)] mb-4">
                    {t('customCTA.title')}
                </h2>
                <p className="text-[var(--warm-text)] mb-8 text-lg">
                    {t('customCTA.description')}
                </p>
                <button
                    onClick={onContactUs}
                    className="bg-[var(--amber)] text-[var(--cream)] py-3 px-8 rounded-xl hover:bg-[var(--amber-hover)] transition-all duration-300 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                    {t('customCTA.button')}
                </button>
            </div>
        </div>
    )
}

// Client-only random seed for workshop shuffle - avoids useEffect(setState, []) hydration flash
const clientSeedStore = (() => {
    let seed: number | null = null;
    const listeners = new Set<() => void>();
    return {
        getSnapshot: () => {
            if (typeof window === 'undefined') return null;
            if (seed === null) seed = Math.random();
            return seed;
        },
        getServerSnapshot: () => null,
        subscribe: (cb: () => void) => {
            listeners.add(cb);
            if (typeof window !== 'undefined' && seed === null) {
                queueMicrotask(() => listeners.forEach((l) => l()));
            }
            return () => listeners.delete(cb);
        },
    };
})();

type FilterState = {
    type: string;
    audience: string;
    size: string;
    duration: string;
    schedule: string;
    isMobileOpen: boolean;
    isDesktopOpen: boolean;
};

const initialFilterState: FilterState = {
    type: 'all',
    audience: 'all',
    size: 'all',
    duration: 'all',
    schedule: 'all',
    isMobileOpen: false,
    isDesktopOpen: false,
};

function filterReducer(state: FilterState, action: { type: string; payload?: string }) {
    switch (action.type) {
        case 'SET_TYPE': return { ...state, type: action.payload ?? 'all' };
        case 'SET_AUDIENCE': return { ...state, audience: action.payload ?? 'all' };
        case 'SET_SIZE': return { ...state, size: action.payload ?? 'all' };
        case 'SET_DURATION': return { ...state, duration: action.payload ?? 'all' };
        case 'SET_SCHEDULE': return { ...state, schedule: action.payload ?? 'all' };
        case 'TOGGLE_MOBILE': return { ...state, isMobileOpen: !state.isMobileOpen };
        case 'CLOSE_MOBILE': return { ...state, isMobileOpen: false };
        case 'TOGGLE_DESKTOP': return { ...state, isDesktopOpen: !state.isDesktopOpen };
        case 'RESET': return initialFilterState;
        default: return state;
    }
}

const WorkshopsContent: React.FC = () => {
    const router = useRouter();
    const t = useTranslations('workshops');
    const [filters, dispatchFilter] = useReducer(filterReducer, initialFilterState);
    const { type: typeFilter, audience: audienceFilter, size: sizeFilter, duration: durationFilter, schedule: scheduleFilter, isMobileOpen: isMobileFilterOpen, isDesktopOpen: isDesktopFilterOpen } = filters;
    const randomSeed = useSyncExternalStore(
        clientSeedStore.subscribe,
        clientSeedStore.getSnapshot,
        clientSeedStore.getServerSnapshot
    );
    const [isScrollingUp, setIsScrollingUp] = useState(true);
    const [isInitialized, setIsInitialized] = useState(false);
    const lastScrollYRef = useRef(0);

    // Function to shuffle array using Fisher-Yates algorithm with seed
    const shuffleArray = <T,>(array: T[], seed: number): T[] => {
        const shuffled = [...array];
        const rng = (n: number) => {
            let x = Math.sin(seed + n) * 10000;
            return x - Math.floor(x);
        };

        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(rng(i) * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    const resetFilters = () => dispatchFilter({ type: 'RESET' });

    const filteredWorkshops = useMemo(() => {
        let filtered = Object.values(workshopsData).filter(workshop => {
            if (typeFilter !== 'all' && workshop.type !== typeFilter) return false;

            if (audienceFilter !== 'all') {
                const level = workshop.level;
                if (audienceFilter === 'students') {
                    // Voor studenten: beginner, intermediate of all_levels
                    return level === 'beginner' || level === 'intermediate' || level === 'all_levels';
                }
                if (audienceFilter === 'teachers') {
                    // Voor docenten: professional, advanced, all_levels
                    return level === 'professional' || level === 'advanced' || level === 'all_levels';
                }
                if (audienceFilter === 'everyone') {
                    // Voor iedereen: all_levels en intermediate
                    return level === 'all_levels' || level === 'intermediate';
                }
            }

            if (sizeFilter !== 'all' && workshop.maxParticipants) {
                if (sizeFilter === 'small' && workshop.maxParticipants > 8) return false;
                if (sizeFilter === 'medium' && (workshop.maxParticipants <= 8 || workshop.maxParticipants > 15)) return false;
                if (sizeFilter === 'large' && workshop.maxParticipants <= 15) return false;
            }

            if (durationFilter !== 'all') {
                const duration = workshop.durationMinutes;
                if (durationFilter === 'short' && (duration < 120 || duration > 180)) return false;
                if (durationFilter === 'medium' && (duration < 240 || duration > 300)) return false;
                if (durationFilter === 'long' && duration < 360) return false;
            }

            if (scheduleFilter !== 'all') {
                const schedule = workshop.schedule;
                if (scheduleFilter === 'single' && schedule !== 'single') return false;
                if (scheduleFilter === 'weekly' && schedule !== 'weekly') return false;
                if (scheduleFilter === 'monthly' && schedule !== 'monthly') return false;
            }

            return true;
        });

        return randomSeed !== null ? shuffleArray(filtered, randomSeed) : filtered;
    }, [typeFilter, audienceFilter, sizeFilter, durationFilter, scheduleFilter, randomSeed]);

    const handleRequestInfo = (workshopId: string) => {
        router.push(`/contact?workshop=${workshopId}`);
    };

    const handleContactUs = () => {
        router.push('/contact?type=custom-workshop');
    };

    const hasActiveFilters = typeFilter !== 'all' || audienceFilter !== 'all' || sizeFilter !== 'all' || durationFilter !== 'all' || scheduleFilter !== 'all';

    // Count workshops by type
    const workshopCounts = useMemo(() => {
        const allWorkshops = Object.values(workshopsData);
        return {
            all: allWorkshops.length,
            creative: allWorkshops.filter(w => w.type === 'creative').length,
            academic: allWorkshops.filter(w => w.type === 'academic').length
        };
    }, []);

    const filterContent = (
        <WorkshopsFilterPanel
            typeFilter={typeFilter}
            audienceFilter={audienceFilter}
            sizeFilter={sizeFilter}
            durationFilter={durationFilter}
            scheduleFilter={scheduleFilter}
            hasActiveFilters={hasActiveFilters}
            onFilterChange={(type, payload) => dispatchFilter({ type, payload })}
            onReset={resetFilters}
        />
    );

    useEffect(() => {
        lastScrollYRef.current = window.scrollY;
        setIsInitialized(true);

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const scrollDelta = currentScrollY - lastScrollYRef.current;

            setIsScrollingUp(
                scrollDelta < -5 ||
                currentScrollY < 100 ||
                currentScrollY < window.innerHeight * 0.5
            );

            lastScrollYRef.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-[var(--cream)] to-[var(--cream-dark)]/50 backdrop-blur">
            <HeroSection />
            <div className="container mx-auto px-4 py-16">
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Mobile Filter Button */}
                    <div className="md:hidden mb-6">
                        <button
                            onClick={() => dispatchFilter({ type: 'TOGGLE_MOBILE' })}
                            className="w-full flex items-center justify-center gap-2 bg-[var(--cream)]/80 backdrop-blur-sm border border-[var(--border-warm)] rounded-xl py-3 px-4 text-[var(--muted-text)] shadow-sm"
                        >
                            <FiFilter />
                            {t('filters.filterWorkshops')}
                            {hasActiveFilters && (
                                <span className="bg-[var(--amber)] text-[var(--cream)] text-xs px-2 py-1 rounded-full ml-2">
                                    {t('filters.active')}
                                </span>
                            )}
                        </button>
                    </div>

                    {/* Type Filter Tabs - Static position */}
                    <div className="mb-6 -mx-4 px-4">
                        <div className="flex gap-2 p-1 bg-[var(--cream-dark)]/50 backdrop-blur-sm rounded-xl overflow-x-auto">
                            <Tab
                                isActive={typeFilter === 'all'}
                                onClick={() => dispatchFilter({ type: 'SET_TYPE', payload: 'all' })}
                                count={workshopCounts.all}
                            >
                                {t('filters.allWorkshops')}
                            </Tab>
                            <Tab
                                isActive={typeFilter === 'creative'}
                                onClick={() => dispatchFilter({ type: 'SET_TYPE', payload: 'creative' })}
                                count={workshopCounts.creative}
                            >
                                {t('filters.creative')}
                            </Tab>
                            <Tab
                                isActive={typeFilter === 'academic'}
                                onClick={() => dispatchFilter({ type: 'SET_TYPE', payload: 'academic' })}
                                count={workshopCounts.academic}
                            >
                                {t('filters.academic')}
                            </Tab>
                        </div>
                    </div>

                    {/* Desktop Filters */}
                    <div className="hidden md:block mb-8">
                        <button
                            onClick={() => dispatchFilter({ type: 'TOGGLE_DESKTOP' })}
                            className="w-full flex items-center justify-between bg-[var(--cream)]/80 backdrop-blur-sm p-4 rounded-xl shadow-sm mb-2"
                        >
                            <div className="flex items-center gap-2">
                                <FiFilter className="text-[var(--muted-text)]" />
                                <span className="font-medium text-[var(--ink)]">
                                    {t('filters.filterWorkshops')}
                                </span>
                                {hasActiveFilters && (
                                    <span className="bg-[var(--amber)] text-[var(--cream)] text-xs px-2 py-1 rounded-full ml-2">
                                        {t('filters.active')}
                                    </span>
                                )}
                            </div>
                            <FiChevronDown
                                className={`transform transition-transform duration-200 ${
                                    isDesktopFilterOpen ? 'rotate-180' : ''
                                }`}
                            />
                        </button>
                        <AnimatePresence>
                            {isDesktopFilterOpen && (
                                <m.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="bg-[var(--cream)]/80 backdrop-blur-sm p-6 rounded-xl shadow-sm overflow-hidden"
                                >
                                    {filterContent}
                                </m.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Mobile Filter Drawer */}
                    <MobileFilterDrawer
                        isOpen={isMobileFilterOpen}
                        onClose={() => dispatchFilter({ type: 'CLOSE_MOBILE' })}
                    >
                        {filterContent}
                    </MobileFilterDrawer>

                    {/* Workshop Grid - suppressHydrationWarning: order differs on client due to seeded shuffle */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" suppressHydrationWarning>
                        <AnimatePresence mode="wait">
                            {filteredWorkshops.map((workshop, index) => (
                                <m.div
                                    key={workshop.id}
                                    layout="position"
                                    layoutId={workshop.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{
                                        duration: 0.2,
                                        layout: {
                                            duration: 0.3,
                                            ease: "easeOut"
                                        }
                                    }}
                                    className="h-full"
                                >
                                    <WorkshopCard
                                        workshop={workshop}
                                        index={index}
                                        onRequestInfo={handleRequestInfo}
                                    />
                                </m.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {filteredWorkshops.length === 0 && (
                        <m.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2 }}
                            className="text-center py-12"
                        >
                            <p className="text-[var(--muted-text)] text-lg">
                                {t('filters.noResults')}
                            </p>
                        </m.div>
                    )}

                    <CustomWorkshopCTA onContactUs={handleContactUs} />
                </m.div>
            </div>
        </div>
    );
};

export default WorkshopsContent
