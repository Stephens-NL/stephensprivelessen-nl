import { Bilingual, Workshop, WorkshopType, WorkshopLevel, WorkshopFormat, Workshops, WorkshopsPageContent } from './types';

const defaultPrice: Bilingual = {
    EN: 'Contact for pricing',
    NL: 'Neem contact op voor prijzen'
};

const defaultMaterials: Bilingual = {
    EN: 'Will be communicated upon registration',
    NL: 'Wordt bij aanmelding gecommuniceerd'
};

const defaultLocation: Bilingual = {
    EN: 'Online or in-person',
    NL: 'Online of op locatie'
};

const defaultPrerequisites: Bilingual = {
    EN: 'No specific prerequisites',
    NL: 'Geen specifieke voorvereisten'
};

const workshopItems: Workshops = {
    'statistics-project': {
        id: 'statistics-project',
        type: 'academic',
        title: { EN: 'Statistics Project Course', NL: 'Statistiek Project Cursus' },
        description: {
            EN: 'Comprehensive statistics workshops for entire classes or small groups. Perfect for high school students working on research projects, with flexible scheduling options to accommodate class schedules.',
            NL: 'Uitgebreide statistiek workshops voor hele klassen of kleine groepen. Perfect voor middelbare scholieren die aan onderzoeksprojecten werken, met flexibele planning om aan te sluiten bij lesroosters.'
        },
        durationMinutes: 90,
        durationText: { EN: '90 minutes per session', NL: '90 minuten per sessie' },
        totalSessions: 6,
        sessionStructure: 'series',
        level: 'intermediate',
        format: 'flexible',
        details: {
            EN: [
                'Available for entire classes or small groups',
                'Customized to match curriculum requirements',
                'Hands-on practice with real datasets',
                'Focus on research methodology',
                'Interactive learning approach',
                'Online or in-person sessions',
                'Series of 6 sessions over 6-12 weeks'
            ],
            NL: [
                'Beschikbaar voor hele klassen of kleine groepen',
                'Aangepast aan curriculum vereisten',
                'Praktijkervaring met echte datasets',
                'Focus op onderzoeksmethodologie',
                'Interactieve leeraanpak',
                'Online of fysieke sessies',
                'Serie van 6 sessies over 6-12 weken'
            ]
        },
        price: defaultPrice,
        minParticipants: 8,
        maxParticipants: 24,
        prerequisites: defaultPrerequisites,
        materials: defaultMaterials,
        location: defaultLocation,
        schedule: 'weekly'
    },
    'math-innovation': {
        id: 'math-innovation',
        type: 'academic',
        title: { EN: 'Math Teachers Innovation Workshop', NL: 'Wiskunde Docenten Innovatie Workshop' },
        description: {
            EN: 'Workshop for math teachers focusing on innovative teaching methods, incorporating technology and modern approaches to engage students better.',
            NL: 'Workshop voor wiskundedocenten gericht op innovatieve onderwijsmethoden, integratie van technologie en moderne benaderingen om leerlingen beter te betrekken.'
        },
        durationMinutes: 180,
        durationText: { EN: '3 hours per session', NL: '3 uur per sessie' },
        totalSessions: 4,
        sessionStructure: 'series',
        level: 'professional',
        format: 'professional',
        details: {
            EN: [
                'Innovative teaching methods',
                'Technology integration in math education',
                'Modern engagement strategies',
                'Hands-on practice with tools',
                'Collaborative learning techniques'
            ],
            NL: [
                'Innovatieve onderwijsmethoden',
                'Technologie-integratie in wiskundeonderwijs',
                'Moderne betrokkenheidstrategieën',
                'Praktische oefening met tools',
                'Samenwerkende leertechnieken'
            ]
        },
        price: defaultPrice,
        minParticipants: 6,
        maxParticipants: 12,
        prerequisites: defaultPrerequisites,
        materials: defaultMaterials,
        location: defaultLocation,
        schedule: 'weekly'
    },
    'ai-math': {
        id: 'ai-math',
        title: { EN: 'AI & Mathematics Workshop', NL: 'AI & Wiskunde Workshop' },
        description: {
            EN: 'Explore the intersection of artificial intelligence and mathematics. Learn how AI can enhance mathematical understanding and problem-solving.',
            NL: 'Verken het snijvlak van kunstmatige intelligentie en wiskunde. Leer hoe AI wiskundig begrip en probleemoplossing kan verbeteren.'
        },
        level: 'advanced',
        format: 'flexible',
        details: {
            EN: [
                'Fundamentals of AI algorithms',
                'Mathematical principles in machine learning',
                'Practical applications in data analysis',
                'Problem-solving with AI tools'
            ],
            NL: [
                'Fundamenten van AI-algoritmen',
                'Wiskundige principes in machine learning',
                'Praktische toepassingen in data-analyse',
                'Probleemoplossing met AI-tools'
            ]
        },
        durationMinutes: 120,
        durationText: { EN: '2 hours per session', NL: '2 uur per sessie' },
        totalSessions: 3,
        sessionStructure: 'series',
        minParticipants: 4,
        maxParticipants: 8,
        prerequisites: defaultPrerequisites,
        materials: defaultMaterials,
        location: defaultLocation,
        type: 'academic',
        schedule: 'weekly',
        price: defaultPrice
    },
    'creative-coding': {
        id: 'creative-coding',
        title: { EN: 'Creative Coding: Art & Animation', NL: 'Creatief Coderen: Kunst & Animatie' },
        description: {
            EN: 'Combine programming and art using Python. Create interactive visuals and animations while learning coding basics.',
            NL: 'Combineer programmeren en kunst met Python. Maak interactieve visuals en animaties terwijl je de basis van coderen leert.'
        },
        level: 'beginner',
        format: 'hands-on',
        details: {
            EN: ['Learn Python basics', 'Create digital art with code', 'Build interactive animations', 'Understand creative algorithms'],
            NL: ['Leer Python basis', 'Maak digitale kunst met code', 'Bouw interactieve animaties', 'Begrijp creatieve algoritmes']
        },
        price: defaultPrice,
        durationMinutes: 120,
        durationText: { EN: '2 hours per session', NL: '2 uur per sessie' },
        totalSessions: 4,
        sessionStructure: 'series',
        minParticipants: 4,
        maxParticipants: 8,
        prerequisites: defaultPrerequisites,
        materials: defaultMaterials,
        location: defaultLocation,
        type: 'creative',
        schedule: 'weekly'
    },
    'data-visualization': {
        id: 'data-visualization',
        title: {
            EN: 'Data Visualization with Python',
            NL: 'Data Visualisatie met Python'
        },
        description: {
            EN: 'Learn to create stunning data visualizations using Python libraries like Matplotlib, Seaborn, and Plotly. Perfect for both students and teachers looking to enhance their data presentation skills.',
            NL: 'Leer indrukwekkende datavisualisaties maken met Python-bibliotheken zoals Matplotlib, Seaborn en Plotly. Perfect voor zowel leerlingen als docenten die hun datapresenatievaardigheden willen verbeteren.'
        },
        level: 'intermediate',
        format: 'hands-on',
        details: {
            EN: [
                'Introduction to Python visualization libraries',
                'Creating static and interactive plots',
                'Data presentation best practices',
                'Advanced visualization techniques'
            ],
            NL: [
                'Introductie tot Python visualisatie bibliotheken',
                'Statische en interactieve plots maken',
                'Best practices voor data presentatie',
                'Geavanceerde visualisatie technieken'
            ]
        },
        price: defaultPrice,
        durationMinutes: 180,
        durationText: { EN: '3 hours per session', NL: '3 uur per sessie' },
        totalSessions: 3,
        sessionStructure: 'series',
        minParticipants: 5,
        maxParticipants: 12,
        prerequisites: defaultPrerequisites,
        materials: defaultMaterials,
        location: defaultLocation,
        type: 'academic',
        schedule: 'weekly'
    },
    'exam-preparation': {
        id: 'exam-preparation',
        title: {
            EN: 'Exam Preparation',
            NL: 'Examenvoorbereiding'
        },
        description: {
            EN: 'Learn effective exam preparation strategies to improve exam performance.',
            NL: 'Leer effectieve examvoorbereidingsstrategieën om examenprestaties te verbeteren.'
        },
        level: 'intermediate',
        format: 'interactive',
        details: {
            EN: [
                'Study planning and time management',
                'Effective note-taking techniques',
                'Memory and retention strategies',
                'Practice exam strategies'
            ],
            NL: [
                'Studieplanning en tijdmanagement',
                'Effectieve aantekentechnieken',
                'Geheugen- en retentiestrategieën',
                'Oefenexamenstrategieën'
            ]
        },
        price: defaultPrice,
        durationMinutes: 180,
        durationText: { EN: '3 hours per session', NL: '3 uur per sessie' },
        totalSessions: 3,
        sessionStructure: 'series',
        minParticipants: 4,
        maxParticipants: 10,
        prerequisites: defaultPrerequisites,
        materials: defaultMaterials,
        location: defaultLocation,
        type: 'creative',
        schedule: 'weekly'
    }
};

export const workshops: WorkshopsPageContent = {
    id: 'workshops',
    title: {
        EN: 'Workshops & Courses',
        NL: 'Workshops & Cursussen'
    },
    description: {
        EN: 'Discover my diverse range of workshops and courses designed to enhance your skills and knowledge.',
        NL: 'Ontdek mijn diverse aanbod van workshops en cursussen ontworpen om je vaardigheden en kennis te verbeteren.'
    },
    categories: [
        {
            type: 'academic',
            items: Object.values(workshopItems).filter(workshop => workshop.type === 'academic')
        },
        {
            type: 'creative',
            items: Object.values(workshopItems).filter(workshop => workshop.type === 'creative')
        }
    ]
};

export default workshopItems; 