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
    'music-production': {
        id: 'music-production',
        title: { EN: 'Music Production & DJ Workshop', NL: 'Muziekproductie & DJ Workshop' },
        description: {
            EN: 'Learn the basics of music production and DJing, from creating beats to mixing tracks. Perfect for anyone interested in music, technology, or performance.',
            NL: 'Leer de basis van muziekproductie en DJ\'en, van beats maken tot tracks mixen. Perfect voor iedereen met interesse in muziek, technologie of performance.'
        },
        level: 'beginner',
        format: 'hands-on',
        details: {
            EN: [
                'Understanding basic music theory',
                'Creating beats and melodies',
                'Using DJ equipment',
                'Mixing and transitioning between tracks'
            ],
            NL: [
                'Begrip van basis muziektheorie',
                'Beats en melodieën maken',
                'DJ-apparatuur gebruiken',
                'Mixen en overgangen tussen tracks'
            ]
        },
        durationMinutes: 180,
        durationText: { EN: '3 hours', NL: '3 uur' },
        sessionStructure: 'single',
        minParticipants: 3,
        maxParticipants: 6,
        prerequisites: defaultPrerequisites,
        materials: defaultMaterials,
        location: defaultLocation,
        type: 'creative',
        schedule: 'weekly',
        price: defaultPrice
    },
    'analog-photography': {
        id: 'analog-photography',
        title: { EN: 'Analog Photography & Editing', NL: 'Analoge Fotografie & Bewerking' },
        description: {
            EN: 'Explore the art of analog photography using professional cameras. Learn about film selection, development, and digital post-processing.',
            NL: 'Ontdek de kunst van analoge fotografie met professionele camera\'s. Leer over filmkeuze, ontwikkeling en digitale nabewerking.'
        },
        level: 'beginner',
        format: 'hands-on',
        details: {
            EN: ['Professional analog camera handling', 'Film selection and loading', 'Development process', 'Digital post-processing techniques'],
            NL: ['Professionele analoge camera bediening', 'Filmkeuze en laden', 'Ontwikkelingsproces', 'Digitale nabewerkingstechnieken']
        },
        price: defaultPrice,
        durationMinutes: 240,
        durationText: { EN: '4 hours', NL: '4 uur' },
        sessionStructure: 'single',
        minParticipants: 3,
        maxParticipants: 6,
        prerequisites: defaultPrerequisites,
        materials: defaultMaterials,
        location: defaultLocation,
        type: 'creative',
        schedule: 'weekly'
    },
    'visual-storytelling': {
        id: 'visual-storytelling',
        title: { EN: 'Visual Storytelling & Design', NL: 'Visuele Storytelling & Design' },
        description: {
            EN: 'Learn to communicate visually through graphic design. Master color, composition, and typography using professional tools.',
            NL: 'Leer visueel communiceren door grafisch ontwerp. Beheers kleur, compositie en typografie met professionele tools.'
        },
        level: 'beginner',
        format: 'hands-on',
        details: {
            EN: ['Color theory and psychology', 'Composition principles', 'Typography basics', 'Professional design tools', 'Visual storytelling techniques'],
            NL: ['Kleurtheorie en psychologie', 'Compositieprincipes', 'Typografie basis', 'Professionele ontwerptools', 'Visuele storytelling technieken']
        },
        price: defaultPrice,
        durationMinutes: 180,
        durationText: { EN: '3 hours per session', NL: '3 uur per sessie' },
        totalSessions: 2,
        sessionStructure: 'series',
        minParticipants: 4,
        maxParticipants: 8,
        prerequisites: defaultPrerequisites,
        materials: defaultMaterials,
        location: defaultLocation,
        type: 'creative',
        schedule: 'weekly'
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
    'ai-art': {
        id: 'ai-art',
        title: { EN: 'AI & Creativity Workshop', NL: 'AI & Creativiteit Workshop' },
        description: {
            EN: 'Explore the intersection of AI and art. Learn to use AI tools for creating unique artworks and music.',
            NL: 'Verken het snijvlak van AI en kunst. Leer AI-tools gebruiken voor het maken van unieke kunstwerken en muziek.'
        },
        level: 'beginner',
        format: 'hands-on',
        details: {
            EN: [
                'Introduction to AI art generation tools',
                'Creating digital artwork with AI assistance',
                'Music generation with AI',
                'Ethics and future of AI in creative fields'
            ],
            NL: [
                'Introductie tot AI kunstgeneratie tools',
                'Digitale kunst maken met AI-ondersteuning',
                'Muziek genereren met AI',
                'Ethiek en toekomst van AI in creatieve velden'
            ]
        },
        durationMinutes: 180,
        durationText: { EN: '3 hours', NL: '3 uur' },
        sessionStructure: 'single',
        minParticipants: 4,
        maxParticipants: 10,
        prerequisites: defaultPrerequisites,
        materials: defaultMaterials,
        location: defaultLocation,
        type: 'creative',
        schedule: 'weekly',
        price: defaultPrice
    },
    'escape-room': {
        id: 'escape-room',
        title: { EN: 'Escape Room Design Workshop', NL: 'Escape Room Ontwerp Workshop' },
        description: {
            EN: 'Learn to design and program escape room puzzles. Combine storytelling, technology, and problem-solving in this unique workshop.',
            NL: 'Leer escape room puzzels ontwerpen en programmeren. Combineer storytelling, technologie en probleemoplossing in deze unieke workshop.'
        },
        level: 'intermediate',
        format: 'flexible',
        details: {
            EN: [
                'Design engaging puzzle mechanics',
                'Program interactive elements',
                'Create compelling narratives',
                'Test and refine escape room experiences'
            ],
            NL: [
                'Ontwerp boeiende puzzelmechanismen',
                'Programmeer interactieve elementen',
                'Creëer meeslepende verhaallijnen',
                'Test en verfijn escape room ervaringen'
            ]
        },
        price: defaultPrice,
        durationMinutes: 240,
        durationText: { EN: '4 hours per session', NL: '4 uur per sessie' },
        totalSessions: 2,
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
    'math-games': {
        id: 'math-games',
        title: {
            EN: 'Mathematical Game Design',
            NL: 'Wiskundige Spelontwikkeling'
        },
        description: {
            EN: 'Create engaging mathematical games using simple programming tools. Learn how to make math fun and interactive for students through game-based learning.',
            NL: 'Creëer boeiende wiskundige spellen met eenvoudige programmeertools. Leer hoe je wiskunde leuk en interactief kunt maken voor leerlingen door middel van spelend leren.'
        },
        level: 'intermediate',
        format: 'hands-on',
        details: {
            EN: [
                'Game design principles for educational content',
                'Integrating mathematical concepts into games',
                'Using programming tools for math games',
                'Testing and improving game mechanics'
            ],
            NL: [
                'Spelontwerp principes voor educatieve inhoud',
                'Integratie van wiskundige concepten in spellen',
                'Gebruik van programmeertools voor wiskundespellen',
                'Testen en verbeteren van spelmechanismen'
            ]
        },
        price: defaultPrice,
        durationMinutes: 180,
        durationText: { EN: '3 hours', NL: '3 uur' },
        sessionStructure: 'single',
        minParticipants: 6,
        maxParticipants: 15,
        prerequisites: defaultPrerequisites,
        materials: defaultMaterials,
        location: defaultLocation,
        type: 'creative',
        schedule: 'weekly'
    },
    'math-art': {
        id: 'math-art',
        title: {
            EN: 'Mathematical Art & Patterns',
            NL: 'Wiskundige Kunst & Patronen'
        },
        description: {
            EN: 'Explore the beautiful intersection of mathematics and art. Create stunning visual patterns using mathematical principles and digital tools.',
            NL: 'Ontdek het prachtige snijvlak van wiskunde en kunst. Creëer verbluffende visuele patronen met behulp van wiskundige principes en digitale tools.'
        },
        level: 'intermediate',
        format: 'hands-on',
        details: {
            EN: [
                'Learn geometric pattern principles',
                'Create fractal-based artwork',
                'Explore symmetry and tessellation',
                'Use digital tools for mathematical art'
            ],
            NL: [
                'Leer geometrische patroonprincipes',
                'Maak kunst gebaseerd op fractalen',
                'Verken symmetrie en tessellatie',
                'Gebruik digitale tools voor wiskundige kunst'
            ]
        },
        price: defaultPrice,
        durationMinutes: 180,
        durationText: { EN: '3 hours', NL: '3 uur' },
        sessionStructure: 'single',
        minParticipants: 4,
        maxParticipants: 10,
        prerequisites: defaultPrerequisites,
        materials: defaultMaterials,
        location: defaultLocation,
        type: 'creative',
        schedule: 'weekly'
    },
    'math-modeling': {
        id: 'math-modeling',
        title: {
            EN: '3D Mathematical Modeling',
            NL: '3D Wiskundig Modelleren'
        },
        description: {
            EN: 'Learn to create 3D models using mathematical principles. Perfect for visualizing geometric concepts and creating educational materials.',
            NL: 'Leer 3D-modellen maken met wiskundige principes. Perfect voor het visualiseren van geometrische concepten en het maken van educatief materiaal.'
        },
        level: 'advanced',
        format: 'flexible',
        details: {
            EN: [
                'Mathematical principles of 3D modeling',
                'Geometric transformations',
                'Creating parametric models',
                'Visualization techniques'
            ],
            NL: [
                'Wiskundige principes van 3D-modellering',
                'Geometrische transformaties',
                'Parametrische modellen maken',
                'Visualisatietechnieken'
            ]
        },
        price: defaultPrice,
        durationMinutes: 180,
        durationText: { EN: '3 hours per session', NL: '3 uur per sessie' },
        totalSessions: 4,
        sessionStructure: 'series',
        minParticipants: 4,
        maxParticipants: 8,
        prerequisites: defaultPrerequisites,
        materials: defaultMaterials,
        location: defaultLocation,
        type: 'academic',
        schedule: 'weekly'
    },
    'math-storytelling': {
        id: 'math-storytelling',
        title: {
            EN: 'Mathematical Storytelling',
            NL: 'Wiskundig Verhalen Vertellen'
        },
        description: {
            EN: 'Learn to create engaging stories that incorporate mathematical concepts. Perfect for teachers looking to make math more accessible and interesting.',
            NL: 'Leer boeiende verhalen maken die wiskundige concepten bevatten. Perfect voor docenten die wiskunde toegankelijker en interessanter willen maken.'
        },
        level: 'intermediate',
        format: 'interactive',
        details: {
            EN: [
                'Story structure and mathematical integration',
                'Creating engaging narratives',
                'Adapting stories for different age groups',
                'Practice sessions with feedback'
            ],
            NL: [
                'Verhaalstructuur en wiskundige integratie',
                'Boeiende verhalen creëren',
                'Verhalen aanpassen voor verschillende leeftijdsgroepen',
                'Oefensessies met feedback'
            ]
        },
        price: defaultPrice,
        durationMinutes: 150,
        durationText: { EN: '2.5 hours', NL: '2.5 uur' },
        sessionStructure: 'single',
        minParticipants: 5,
        maxParticipants: 12,
        prerequisites: defaultPrerequisites,
        materials: defaultMaterials,
        location: defaultLocation,
        type: 'creative',
        schedule: 'weekly'
    },
    'math-podcasting': {
        id: 'math-podcasting',
        title: {
            EN: 'Mathematical Podcasting',
            NL: 'Wiskundige Podcasting'
        },
        description: {
            EN: 'Create engaging audio content about mathematical concepts. Learn podcast production and storytelling techniques for educational content.',
            NL: 'Maak boeiende audio-inhoud over wiskundige concepten. Leer podcastproductie en verhaaltechnieken voor educatieve content.'
        },
        level: 'intermediate',
        format: 'hands-on',
        details: {
            EN: [
                'Audio production basics',
                'Mathematical storytelling techniques',
                'Recording and editing skills',
                'Content planning and structure'
            ],
            NL: [
                'Basis audio-productie',
                'Wiskundige verhaaltechnieken',
                'Opname- en bewerkingsvaardigheden',
                'Content planning en structuur'
            ]
        },
        price: defaultPrice,
        durationMinutes: 180,
        durationText: { EN: '3 hours per session', NL: '3 uur per sessie' },
        totalSessions: 2,
        sessionStructure: 'series',
        minParticipants: 3,
        maxParticipants: 6,
        prerequisites: defaultPrerequisites,
        materials: defaultMaterials,
        location: defaultLocation,
        type: 'creative',
        schedule: 'weekly'
    },
    'math-video': {
        id: 'math-video',
        title: {
            EN: 'Educational Math Videos',
            NL: 'Educatieve Wiskundevideo\'s'
        },
        description: {
            EN: 'Learn to create engaging educational math videos. Master video production techniques and visual explanation methods.',
            NL: 'Leer boeiende educatieve wiskundevideo\'s maken. Beheers videoproductietechnieken en visuele uitlegmethoden.'
        },
        level: 'intermediate',
        format: 'hands-on',
        details: {
            EN: [
                'Video production basics',
                'Mathematical content presentation',
                'Visual storytelling techniques',
                'Video editing and post-production'
            ],
            NL: [
                'Basis videoproductie',
                'Wiskundige inhoud presenteren',
                'Visuele vertellingtechnieken',
                'Video-editing en postproductie'
            ]
        },
        price: defaultPrice,
        durationMinutes: 240,
        durationText: { EN: '4 hours per session', NL: '4 uur per sessie' },
        totalSessions: 3,
        sessionStructure: 'series',
        minParticipants: 3,
        maxParticipants: 6,
        prerequisites: defaultPrerequisites,
        materials: defaultMaterials,
        location: defaultLocation,
        type: 'creative',
        schedule: 'weekly'
    },
    'math-assessment': {
        id: 'math-assessment',
        title: {
            EN: 'Innovative Math Assessment',
            NL: 'Innovatieve Wiskundetoetsing'
        },
        description: {
            EN: 'Explore innovative ways to assess mathematical understanding using technology and creative methods.',
            NL: 'Ontdek innovatieve manieren om wiskundig begrip te toetsen met behulp van technologie en creatieve methoden.'
        },
        level: 'advanced',
        format: 'interactive',
        details: {
            EN: [
                'Technology-enhanced assessment methods',
                'Creative evaluation techniques',
                'Digital tools for math assessment',
                'Formative assessment strategies'
            ],
            NL: [
                'Technologie-verbeterde beoordelingsmethoden',
                'Creatieve evaluatietechnieken',
                'Digitale hulpmiddelen voor wiskundetoetsing',
                'Formatieve beoordelingsstrategieën'
            ]
        },
        price: defaultPrice,
        durationMinutes: 180,
        durationText: { EN: '3 hours per session', NL: '3 uur per sessie' },
        totalSessions: 2,
        sessionStructure: 'series',
        minParticipants: 6,
        maxParticipants: 15,
        prerequisites: defaultPrerequisites,
        materials: defaultMaterials,
        location: defaultLocation,
        type: 'academic',
        schedule: 'weekly'
    },
    'math-differentiation': {
        id: 'math-differentiation',
        title: {
            EN: 'Differentiation in Math Education',
            NL: 'Differentiatie in Wiskundeonderwijs'
        },
        description: {
            EN: 'Learn effective strategies for differentiating math instruction to meet diverse student needs.',
            NL: 'Leer effectieve strategieën voor het differentiëren van wiskundeonderwijs om aan diverse leerlingbehoeften te voldoen.'
        },
        level: 'advanced',
        format: 'interactive',
        details: {
            EN: [
                'Understanding student learning differences',
                'Differentiation strategies for math instruction',
                'Assessment and adaptation techniques',
                'Creating inclusive math learning environments'
            ],
            NL: [
                'Begrip van verschillen in leren',
                'Differentiatiestrategieën voor wiskundeonderwijs',
                'Beoordelings- en aanpassingstechnieken',
                'Creëren van inclusieve wiskundeleeromgevingen'
            ]
        },
        price: defaultPrice,
        durationMinutes: 180,
        durationText: { EN: '3 hours per session', NL: '3 uur per sessie' },
        totalSessions: 3,
        sessionStructure: 'series',
        minParticipants: 6,
        maxParticipants: 12,
        prerequisites: defaultPrerequisites,
        materials: defaultMaterials,
        location: defaultLocation,
        type: 'academic',
        schedule: 'weekly'
    },
    'math-mindfulness': {
        id: 'math-mindfulness',
        title: {
            EN: 'Mindfulness in Mathematics',
            NL: 'Mindfulness in Wiskunde'
        },
        description: {
            EN: 'Integrate mindfulness techniques into mathematics education to reduce anxiety and improve focus.',
            NL: 'Integreer mindfulness-technieken in wiskundeonderwijs om angst te verminderen en focus te verbeteren.'
        },
        level: 'intermediate',
        format: 'interactive',
        details: {
            EN: [
                'Understanding math anxiety and its impact',
                'Practical mindfulness techniques for the classroom',
                'Integration strategies for mathematical concepts',
                'Building confidence through mindful practice'
            ],
            NL: [
                'Begrip van wiskundeangst en de impact ervan',
                'Praktische mindfulness-technieken voor in de klas',
                'Integratiestrategieën voor wiskundige concepten',
                'Opbouwen van vertrouwen door mindful oefenen'
            ]
        },
        price: defaultPrice,
        durationMinutes: 120,
        durationText: { EN: '2 hours', NL: '2 uur' },
        sessionStructure: 'single',
        minParticipants: 4,
        maxParticipants: 10,
        prerequisites: defaultPrerequisites,
        materials: defaultMaterials,
        location: defaultLocation,
        type: 'academic',
        schedule: 'weekly'
    },
    'mindfulness': {
        id: 'mindfulness',
        title: {
            EN: 'Mindfulness',
            NL: 'Mindfulness'
        },
        description: {
            EN: 'Learn mindfulness techniques to reduce stress and improve mental health.',
            NL: 'Leer mindfulness-technieken om stress te verminderen en mentale gezondheid te verbeteren.'
        },
        level: 'beginner',
        format: 'interactive',
        details: {
            EN: ['Stress reduction techniques', 'Mental health awareness', 'Mindfulness practices', 'Guided meditation'],
            NL: ['Stressverminderingstechnieken', 'Bewustzijn van mentale gezondheid', 'Mindfulness-oefeningen', 'Begeleide meditatie']
        },
        price: defaultPrice,
        durationMinutes: 120,
        durationText: { EN: '2 hours', NL: '2 uur' },
        sessionStructure: 'single',
        minParticipants: 4,
        maxParticipants: 10,
        prerequisites: defaultPrerequisites,
        materials: defaultMaterials,
        location: defaultLocation,
        type: 'creative',
        schedule: 'monthly'
    },
    'time-management': {
        id: 'time-management',
        title: {
            EN: 'Time Management',
            NL: 'Tijdmanagement'
        },
        description: {
            EN: 'Learn effective time management techniques to improve productivity and reduce stress.',
            NL: 'Leer effectieve tijdmanagementtechnieken om productiviteit te verbeteren en stress te verminderen.'
        },
        durationMinutes: 150,
        durationText: { EN: '2.5 hours', NL: '2.5 uur' },
        sessionStructure: 'single',
        minParticipants: 4,
        maxParticipants: 12,
        prerequisites: defaultPrerequisites,
        materials: defaultMaterials,
        location: defaultLocation,
        type: 'creative',
        schedule: 'single',
        level: 'intermediate',
        format: 'interactive',
        details: {
            EN: [
                'Time management principles and techniques',
                'Productivity optimization strategies',
                'Stress reduction through better planning',
                'Priority setting and task organization'
            ],
            NL: [
                'Tijdmanagement principes en technieken',
                'Productiviteitsoptimalisatie strategieën',
                'Stressvermindering door betere planning',
                'Prioriteiten stellen en taakorganisatie'
            ]
        },
        price: defaultPrice
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
        EN: 'Discover our diverse range of workshops and courses designed to enhance your skills and knowledge.',
        NL: 'Ontdek ons diverse aanbod van workshops en cursussen ontworpen om je vaardigheden en kennis te verbeteren.'
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