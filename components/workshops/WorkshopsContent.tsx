'use client'

import React, { useState, useMemo, useEffect, useRef, useSyncExternalStore, useReducer } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { useTranslation } from '@/hooks/useTranslation'
import { useRouter } from 'next/navigation'
import workshopsData from '@/data/workshopsData'
import type { Workshop, WorkshopLevel, WorkshopFormat, Workshops } from '@/data/types'
import type { Bilingual } from '@/data/types'
import { FiClock, FiUsers, FiBookOpen, FiFilter, FiChevronDown } from 'react-icons/fi'
import { MobileFilterDrawer, Tab } from './WorkshopsFilters'
import { WorkshopsFilterPanel } from './WorkshopsFilterPanel'

// Helper functions for translations
const getLevelTranslation = (level?: WorkshopLevel): Bilingual => {
    if (!level) {
        return { EN: 'All Levels', NL: 'Alle Niveaus' };
    }
    return {
        EN: level.charAt(0).toUpperCase() + level.slice(1).replace('_', ' '),
        NL: level === 'beginner' ? 'Beginner' :
            level === 'intermediate' ? 'Gevorderd' :
            level === 'advanced' ? 'Vergevorderd' :
            level === 'professional' ? 'Professional' :
            'Alle Niveaus'
    };
};

const getFormatTranslation = (format?: WorkshopFormat): Bilingual => {
    if (!format) {
        return { EN: 'Flexible', NL: 'Flexibel' };
    }
    return {
        EN: format.charAt(0).toUpperCase() + format.slice(1).replace('-', ' '),
        NL: format === 'hands-on' ? 'Praktisch' :
            format === 'interactive' ? 'Interactief' :
            format === 'technical' ? 'Technisch' :
            format === 'creative' ? 'Creatief' :
            format === 'professional' ? 'Professioneel' :
            format === 'media' ? 'Media' :
            format === 'flexible' ? 'Flexibel' :
            format === 'wellness' ? 'Welzijn' : format
    };
};

const HeroSection: React.FC = () => {
    const { t } = useTranslation()
    
    return (
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white">
            <div className="container mx-auto px-4 py-16 md:py-24">
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-3xl mx-auto text-center"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                        {String(t({ EN: 'Interactive Workshops', NL: 'Interactieve Workshops' }))}
                    </h1>
                    <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
                        {String(t({
                            EN: 'Discover our specialized workshops designed to enhance learning through practical experience and expert guidance.',
                            NL: 'Ontdek onze gespecialiseerde workshops ontworpen om leren te verbeteren door praktijkervaring en deskundige begeleiding.'
                        }))}
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center items-center">
                        <div className="flex items-center bg-white/10 rounded-full px-6 py-3">
                            <FiUsers className="mr-2" />
                            <span>{String(t({ EN: 'Small Groups', NL: 'Kleine Groepen' }))}</span>
                        </div>
                        <div className="flex items-center bg-white/10 rounded-full px-6 py-3">
                            <FiClock className="mr-2" />
                            <span>{String(t({ EN: 'Flexible Scheduling', NL: 'Flexibele Planning' }))}</span>
                        </div>
                        <div className="flex items-center bg-white/10 rounded-full px-6 py-3">
                            <FiBookOpen className="mr-2" />
                            <span>{String(t({ EN: 'Expert Guidance', NL: 'Expert Begeleiding' }))}</span>
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
    const { t } = useTranslation()
    const router = useRouter()

    const isCreative = workshop.type === 'creative'
    const gradientClasses = isCreative 
        ? 'from-purple-900/0 to-purple-900/90 group-hover:from-purple-900/50 group-hover:to-purple-900/90'
        : 'from-blue-900/0 to-blue-900/90 group-hover:from-blue-900/50 group-hover:to-blue-900/90'
    
    const tagBgClasses = isCreative
        ? 'bg-purple-50 text-purple-700'
        : 'bg-blue-50 text-blue-700'

    const buttonClasses = isCreative
        ? 'from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800'
        : 'from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'

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
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 relative group transform hover:-translate-y-1 flex flex-col h-full cursor-pointer"
            >
                {/* Hover overlay - only visible on desktop */}
                <div className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${gradientClasses} transition-all duration-300 hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100`}>
                    <div className="text-center px-6 py-8">
                        <p className="font-anton text-3xl uppercase tracking-wider mb-2 text-white">
                            {String(t({ 
                                EN: 'Click for Details', 
                                NL: 'Klik voor Details' 
                            }))}
                        </p>
                        <p className="text-white/80 text-sm">
                            {String(t({ 
                                EN: 'Learn more about this workshop', 
                                NL: 'Lees meer over deze workshop' 
                            }))}
                        </p>
                    </div>
                </div>
                <div className="flex flex-col h-full">
                    <div className="p-6 flex-grow">
                        <div className="flex flex-wrap gap-2 mb-4">
                            <span className={`${tagBgClasses} text-sm font-medium px-3 py-1 rounded-full`}>
                                {String(t(getFormatTranslation(workshop.format)))}
                            </span>
                            <span className={`${tagBgClasses} text-sm font-medium px-3 py-1 rounded-full`}>
                                {String(t({ 
                                    EN: workshop.type === 'creative' ? 'Creative' : 'Academic',
                                    NL: workshop.type === 'creative' ? 'Creatief' : 'Academisch'
                                }))}
                            </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                            {String(t(workshop.title))}
                        </h3>
                        <p className="text-gray-600 mb-6 line-clamp-3">
                            {String(t(workshop.description))}
                        </p>
                        <div className="space-y-3 text-sm text-gray-500">
                            <div className="flex items-center">
                                <FiClock className="mr-2 flex-shrink-0" />
                                <span className="line-clamp-1">{String(t(workshop.durationText))}</span>
                            </div>
                            <div className="flex items-center">
                                <FiUsers className="mr-2 flex-shrink-0" />
                                <span className="line-clamp-1">{String(t(getLevelTranslation(workshop.level)))}</span>
                            </div>
                            {workshop.maxParticipants && (
                                <div className="flex items-center">
                                    <FiUsers className="mr-2 flex-shrink-0" />
                                    <span className="line-clamp-1">
                                        {String(t({ EN: 'Max', NL: 'Max' }))}:{' '}
                                        {workshop.maxParticipants} {String(t({ EN: 'participants', NL: 'deelnemers' }))}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="px-6 py-4 bg-gray-50 border-t relative space-y-2">
                        {/* More Info button - only visible on mobile */}
                        <button 
                            className={`md:hidden w-full bg-gradient-to-r ${buttonClasses} bg-opacity-80 text-white py-2.5 px-4 rounded-xl transition-all duration-300 font-medium shadow-sm hover:shadow-md flex items-center justify-center gap-2`}
                            onClick={handleDetailsClick}
                        >
                            <FiBookOpen className="w-4 h-4" />
                            {String(t({ EN: 'More Info', NL: 'Meer Info' }))}
                        </button>
                        <button 
                            className={`w-full bg-gradient-to-r ${buttonClasses} text-white py-2.5 px-4 rounded-xl transition-all duration-300 font-medium shadow-sm hover:shadow-md`}
                            onClick={handleInfoClick}
                        >
                            {String(t({ EN: 'Request Information', NL: 'Informatie Aanvragen' }))}
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
    const { t } = useTranslation()

    return (
        <div className="mt-16 bg-gradient-to-r from-yellow-100 to-yellow-50 rounded-2xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-4">
                    {String(t({
                        EN: 'Looking for a Custom Workshop?',
                        NL: 'Op Zoek naar een Workshop op Maat?'
                    }))}
                </h2>
                <p className="text-gray-700 mb-8 text-lg">
                    {String(t({
                        EN: "We can create a tailored program that perfectly matches your organization's needs and goals.",
                        NL: "We kunnen een programma op maat maken dat perfect aansluit bij de behoeften en doelen van jouw organisatie."
                    }))}
                </p>
                <button 
                    onClick={onContactUs}
                    className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 py-3 px-8 rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                    {String(t({ EN: 'Contact Us', NL: 'Neem Contact Op' }))}
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
    const { t } = useTranslation();
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
        <div className="min-h-screen bg-gradient-to-b from-warm-gray-50 to-warm-gray-100/50 backdrop-blur">
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
                            className="w-full flex items-center justify-center gap-2 bg-white/80 backdrop-blur-sm border border-warm-gray-200 rounded-xl py-3 px-4 text-gray-600 shadow-sm"
                        >
                            <FiFilter />
                            {String(t({ EN: 'Filter Workshops', NL: 'Filter Workshops' }))}
                            {hasActiveFilters && (
                                <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full ml-2">
                                    {String(t({ EN: 'Active', NL: 'Actief' }))}
                                </span>
                            )}
                        </button>
                    </div>

                    {/* Type Filter Tabs - Static position */}
                    <div className="mb-6 -mx-4 px-4">
                        <div className="flex gap-2 p-1 bg-warm-gray-100/50 backdrop-blur-sm rounded-xl overflow-x-auto">
                            <Tab 
                                isActive={typeFilter === 'all'} 
                                onClick={() => dispatchFilter({ type: 'SET_TYPE', payload: 'all' })}
                                count={workshopCounts.all}
                            >
                                {String(t({ EN: 'All Workshops', NL: 'Alle Workshops' }))}
                            </Tab>
                            <Tab 
                                isActive={typeFilter === 'creative'} 
                                onClick={() => dispatchFilter({ type: 'SET_TYPE', payload: 'creative' })}
                                count={workshopCounts.creative}
                            >
                                {String(t({ EN: 'Creative', NL: 'Creatief' }))}
                            </Tab>
                            <Tab 
                                isActive={typeFilter === 'academic'} 
                                onClick={() => dispatchFilter({ type: 'SET_TYPE', payload: 'academic' })}
                                count={workshopCounts.academic}
                            >
                                {String(t({ EN: 'Academic', NL: 'Academisch' }))}
                            </Tab>
                        </div>
                    </div>

                    {/* Desktop Filters */}
                    <div className="hidden md:block mb-8">
                        <button
                            onClick={() => dispatchFilter({ type: 'TOGGLE_DESKTOP' })}
                            className="w-full flex items-center justify-between bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm mb-2"
                        >
                            <div className="flex items-center gap-2">
                                <FiFilter className="text-gray-500" />
                                <span className="font-medium text-gray-900">
                                    {String(t({ EN: 'Filter Workshops', NL: 'Filter Workshops' }))}
                                </span>
                                {hasActiveFilters && (
                                    <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full ml-2">
                                        {String(t({ EN: 'Active', NL: 'Actief' }))}
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
                                    className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm overflow-hidden"
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
                            <p className="text-gray-500 text-lg">
                                {String(t({
                                    EN: 'No workshops found matching your filters.',
                                    NL: 'Geen workshops gevonden die aan je filters voldoen.'
                                }))}
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