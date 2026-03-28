import { Bilingual } from './types';
import { config } from './config';
import {
    hboWoOnlinePackages,
    hboWoPhysicalPackages,
    voOnlinePackages,
    voPhysicalPackages,
} from './pricingData';

export interface SubjectNote {
    subject: string;
    noteUrl: string;
}

export interface PricingTier {
    level: string;
    prices: {
        duration: string;
        price: string;
    }[];
}

export interface GroupPricingTier {
    level: string;
    prices: {
        students: number;
        duration: string;
        price: string;
    }[];
}

// --- Helpers to derive display tiers from pricingData (single source of truth) ---

type PackageEntry = { students: number; packagePrice: number; pricePerPerson: number };

/** Format a single pricing tier entry for the pricingTiers display. */
function formatTierPrice(pkg: PackageEntry, studentLabel: string, studentsLabel: string): { duration: string; price: string } {
    const label = pkg.students === 1 ? studentLabel : studentsLabel;
    const price = pkg.students === 1
        ? `\u20AC${pkg.packagePrice}`
        : `\u20AC${pkg.packagePrice} (\u20AC${pkg.pricePerPerson} p.p.)`;
    return { duration: `4 uur \u00B7 ${pkg.students} ${label}`, price };
}

function buildPricingTier(level: string, packages: PackageEntry[], studentLabel: string, studentsLabel: string): PricingTier {
    return {
        level,
        prices: packages.map(pkg => formatTierPrice(pkg, studentLabel, studentsLabel)),
    };
}

/** Build a group pricing tier showing per-person prices, with "—" for unavailable slots. */
function buildGroupPricingTier(level: string, packages: PackageEntry[], maxStudents: number): GroupPricingTier {
    return {
        level,
        prices: Array.from({ length: maxStudents }, (_, i) => {
            const pkg = packages.find(p => p.students === i + 1);
            return {
                students: i + 1,
                duration: "4 uur",
                price: pkg ? `\u20AC${pkg.pricePerPerson}` : "\u2014",
            };
        }),
    };
}

function buildEmptyGroupTier(level: string, studentCount: number): GroupPricingTier {
    return {
        level,
        prices: Array.from({ length: studentCount }, (_, i) => ({
            students: i + 1,
            duration: "4 uur",
            price: "\u2014",
        })),
    };
}

// Pricing tiers — derived from pricingData.ts package arrays.
// HBO/WO tiers show up to 3 students; VO tiers show up to 4 students.
export const pricingTiers: PricingTier[] = [
    buildPricingTier("Hoger Onderwijs \u2014 Online", hboWoOnlinePackages.slice(0, 3), "student", "studenten"),
    buildPricingTier("Hoger Onderwijs \u2014 Fysiek", hboWoPhysicalPackages.slice(0, 3), "student", "studenten"),
    buildPricingTier("Voortgezet Onderwijs \u2014 Online", voOnlinePackages, "leerling", "leerlingen"),
    buildPricingTier("Voortgezet Onderwijs \u2014 Fysiek", voPhysicalPackages, "leerling", "leerlingen"),
];

// Group pricing tiers — derived from pricingData.ts package arrays.
// "Losse sessie" tiers show "—" for all slots (no longer offered).
// "4-uurs pakket" tiers show per-person prices from the online packages.
// HBO/WO 4-student slot shows "—" (not offered for higher education).
export const groupPricingTiers: GroupPricingTier[] = [
    buildEmptyGroupTier("Hoger Onderwijs", 4),
    buildGroupPricingTier("Hoger Onderwijs 4-uurs pakket", hboWoOnlinePackages.slice(0, 3), 4),
    buildEmptyGroupTier("Voortgezet Onderwijs (20-)", 4),
    buildGroupPricingTier("Voortgezet Onderwijs (20-) 4-uurs pakket", voOnlinePackages, 4),
];

export const subjectNotes: SubjectNote[] = [
    // University Level
    {
        subject: 'Calculus',
        noteUrl: '/notes/dummy/ANOVA1.pdf'  // Math-related content
    },
    {
        subject: 'Linear Algebra',
        noteUrl: '/notes/dummy/sparseModels.pdf'  // Math-related content
    },
    {
        subject: 'Statistics',
        noteUrl: '/notes/dummy/plotexample.pdf'  // Statistics visualization
    },
    {
        subject: 'Probability',
        noteUrl: '/notes/dummy/period1-tutorial4.pdf'  // Tutorial content
    },
    {
        subject: 'Physics',
        noteUrl: '/notes/dummy/grid.pdf'  // Technical content
    },
    // HBO Level
    {
        subject: 'Wiskunde',
        noteUrl: '/notes/dummy/tentamen-16-december-2014-antwoorden.pdf'  // Math exam
    },
    {
        subject: 'Statistiek',
        noteUrl: '/notes/dummy/Hand-in3.pdf'  // Assignment content
    },
    {
        subject: 'Natuurkunde',
        noteUrl: '/notes/dummy/ABC-REGEL SEM.pdf'  // Physics content
    },
    // VWO Level
    {
        subject: 'Wiskunde A',
        noteUrl: '/notes/dummy/gr11_hal_h04_oefentoets.pdf'  // Math practice test
    },
    {
        subject: 'Wiskunde B',
        noteUrl: '/notes/dummy/MIMI_1.pdf'  // Math content
    },
    // Programming
    {
        subject: 'Python',
        noteUrl: '/notes/dummy/Caspar.pdf'
    },
    {
        subject: 'JavaScript',
        noteUrl: '/notes/dummy/Create Next App.pdf'  // Web development
    },
    {
        subject: 'React',
        noteUrl: '/notes/dummy/1014.pdf'  // Web framework
    }
];

export const contactLinks = {
    whatsapp: config.contact.whatsapp,
    email: `mailto:${config.contact.email}`,
};

export const infoSectionTranslations: Record<string, Bilingual> = {
    communicationNote: {
        EN: "I prefer to keep communication personal and direct through WhatsApp or email. This allows me to give you my full attention and provide the best possible support for your learning journey.",
        NL: "Ik houd de communicatie graag persoonlijk en direct via WhatsApp of email. Zo kan ik je mijn volledige aandacht geven en de beste ondersteuning bieden voor je leertraject."
    },
    availableCourses: {
        EN: "Available Courses",
        NL: "Beschikbare Vakken"
    },
    primaryEducation: {
        EN: "Primary Education",
        NL: "Basisonderwijs"
    },
    secondaryEducation: {
        EN: "Secondary Education",
        NL: "Voortgezet Onderwijs"
    },
    higherEducation: {
        EN: "Higher Education",
        NL: "Hoger Onderwijs"
    },
    previewNotes: {
        EN: "Preview Notes",
        NL: "Bekijk Notities"
    },
    back: {
        EN: "Back",
        NL: "Terug"
    },
    contactWhatsApp: {
        EN: "Contact via WhatsApp",
        NL: "Contact via WhatsApp"
    },
    contactEmail: {
        EN: "Contact via Email",
        NL: "Contact via Email"
    },
    teachingMethod: {
        EN: "Teaching Method",
        NL: "Lesmethode"
    },
    teachingMethodDescription: {
        EN: "I focus on understanding rather than memorization. We'll work together to build a strong foundation in the subject, using practical examples and clear explanations.",
        NL: "Ik focus op begrip in plaats van uit het hoofd leren. We werken samen aan een sterke basis in het vak, met praktische voorbeelden en heldere uitleg."
    },
    lessonStructure: {
        EN: "Lesson Structure",
        NL: "Lesstructuur"
    },
    standardSession: {
        EN: "A standard session is 60 minutes. For group lessons with 3 or more students, I recommend 1.5-hour sessions to ensure everyone gets sufficient attention.",
        NL: "Een standaard sessie duurt 60 minuten. Voor groepslessen met 3 of meer studenten raad ik sessies van 1,5 uur aan voor voldoende persoonlijke aandacht."
    },
    trialLesson: {
        EN: "We start with a free 30-minute trial lesson to assess your needs and goals. For thesis supervision, the first consultation includes preparation time.",
        NL: "We beginnen met een gratis proefles van 30 minuten om je behoeften en doelen te bespreken. Voor scriptiebegeleiding is het eerste consult inclusief voorbereidingstijd."
    },
    individualSessions: {
        EN: "Individual Sessions",
        NL: "Individuele Sessies"
    },
    rates: {
        EN: "We work exclusively with 4-hour packages. First trial lesson (30 min) is free!",
        NL: "We werken uitsluitend met 4-uurs pakketten. Eerste proefles (30 min) is gratis!"
    },
    ratesNote: {
        EN: "All rates are per 4-hour package. Group rates apply when students form their own group. Payment upfront via Tikkie.",
        NL: "Alle tarieven zijn per 4-uurs pakket. Groepstarieven gelden als studenten zelf een groep vormen. Betaling vooraf per Tikkie."
    },
    groupSessions: {
        EN: "Group Sessions",
        NL: "Groepssessies"
    },
    groupSessionsDescription: {
        EN: "Study together and save! Group rates for 2-4 students. For optimal learning, I recommend 1.5-hour sessions for groups of 3-4 students. All rates for individuals include VAT (21%), business rates exclude VAT.",
        NL: "Samen studeren en besparen! Groepstarieven voor 2-4 studenten. Voor optimaal leren raad ik sessies van 1,5 uur aan voor groepen van 3-4 studenten. Alle tarieven voor particulieren zijn inclusief BTW (21%), zakelijke tarieven zijn exclusief BTW."
    },
    thesisSupervision: {
        EN: "Thesis Supervision",
        NL: "Scriptiebegeleiding"
    },
    thesisDescription: {
        EN: "Professional support for your thesis. First consultation includes preparation time.",
        NL: "Professionele ondersteuning voor je scriptie. Eerste consult inclusief voorbereidingstijd."
    },
    servicesInclude: {
        EN: "Services include:",
        NL: "Diensten omvatten:"
    },
    thesisResearchMethodology: {
        EN: "Research methodology and design",
        NL: "Onderzoeksmethodologie en opzet"
    },
    thesisDataAnalysis: {
        EN: "Data analysis and statistics",
        NL: "Data-analyse en statistiek"
    },
    thesisProofreading: {
        EN: "Proofreading and feedback",
        NL: "Proeflezen en feedback"
    },
    thesisSoftwareSupport: {
        EN: "Software support (R, Python, SPSS)",
        NL: "Software ondersteuning (R, Python, SPSS)"
    },
    thesisPackageNote: {
        EN: "A standard session is 60 minutes. All packages include WhatsApp support for quick questions between sessions. The 10 sessions package is recommended for comprehensive thesis support.",
        NL: "Een standaard sessie duurt 60 minuten. Alle pakketten inclusief WhatsApp ondersteuning voor korte vragen tussen sessies door. Het pakket van 10 sessies wordt aanbevolen voor uitgebreide scriptiebegeleiding."
    },
    showExample: {
        EN: "Show example calculation (1.5-hour session)",
        NL: "Toon rekenvoorbeeld (1,5 uur sessie)"
    },
    costComparison: {
        EN: "Cost comparison for 4 {level} students:",
        NL: "Kostenvergelijking voor 4 {level} studenten:"
    },
    whatsappSupport: {
        EN: "4 sessions includes WhatsApp support for quick questions up to a week after each lesson.",
        NL: "4 sessies inclusief WhatsApp ondersteuning voor korte vragen tot een week na elke les."
    },
    freeTrialNote: {
        EN: "First trial lesson (30 minutes) is always free",
        NL: "Eerste proefles (30 minuten) is altijd gratis"
    }
}; 