import { Bilingual } from './types';
import { contactInfo } from './config';

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

export const pricingTiers: PricingTier[] = [
    {
        level: "Hoger Onderwijs",
        prices: [
            { duration: "1 uur", price: "€80" },
            { duration: "2 uren", price: "€135" },
            { duration: "4 uren", price: "€250" },
        ]
    },
    {
        level: "Voortgezet Onderwijs (20+)",
        prices: [
            { duration: "1 uur", price: "€75" },
            { duration: "2 uren", price: "€130" },
            { duration: "4 uren", price: "€230" },
        ]
    },
    {
        level: "Voortgezet Onderwijs (20-)",
        prices: [
            { duration: "1 uur", price: "€60" },
            { duration: "2 uren", price: "€100" },
            { duration: "4 uren", price: "€200" },
        ]
    }
];

export const groupPricingTiers: GroupPricingTier[] = [
    {
        level: "Hoger Onderwijs",
        prices: [
            { students: 1, duration: "1 uur", price: "€80" },
            { students: 2, duration: "1 uur", price: "€55" },
            { students: 3, duration: "1,5 uur", price: "€40" },
            { students: 4, duration: "1,5 uur", price: "€35" },
        ]
    },
    {
        level: "Hoger Onderwijs 4-uurs pakket",
        prices: [
            { students: 1, duration: "4 uur", price: "€62,50" },
            { students: 2, duration: "4 uur", price: "€45" },
            { students: 3, duration: "4 uur", price: "€32,50" },
            { students: 4, duration: "4 uur", price: "€27,50" },
        ]
    },
    {
        level: "Middelbare School",
        prices: [
            { students: 1, duration: "1 uur", price: "€60" },
            { students: 2, duration: "1 uur", price: "€40" },
            { students: 3, duration: "1,5 uur", price: "€30" },
            { students: 4, duration: "1,5 uur", price: "€25" },
        ]
    },
    {
        level: "Middelbare School 4-uurs pakket",
        prices: [
            { students: 1, duration: "4 uur", price: "€50" },
            { students: 2, duration: "4 uur", price: "€35" },
            { students: 3, duration: "4 uur", price: "€27,50" },
            { students: 4, duration: "4 uur", price: "€22,50" },
        ]
    }
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
    whatsapp: contactInfo.phone.whatsapp,
    email: "mailto:info@stephensprivelessen.nl" // Replace with your actual email
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
        EN: "Rates start at €60 per hour. First trial lesson (30 min) is free!",
        NL: "Tarieven vanaf €60 per uur. Eerste proefles (30 min) is gratis!"
    },
    ratesNote: {
        EN: "A standard session is 60 minutes. Longer sessions are possible on request. All rates for individuals include VAT (21%).",
        NL: "Een standaard sessie duurt 60 minuten. Langere sessies zijn mogelijk op aanvraag. Alle tarieven voor particulieren zijn inclusief BTW (21%)."
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
    thesisServices: {
        researchMethodology: {
            EN: "Research methodology and design",
            NL: "Onderzoeksmethodologie en opzet"
        },
        dataAnalysis: {
            EN: "Data analysis and statistics",
            NL: "Data-analyse en statistiek"
        },
        proofreading: {
            EN: "Proofreading and feedback",
            NL: "Proeflezen en feedback"
        },
        softwareSupport: {
            EN: "Software support (R, Python, SPSS)",
            NL: "Software ondersteuning (R, Python, SPSS)"
        }
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