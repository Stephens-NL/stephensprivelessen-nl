import { Bilingual } from './types';
import { Workshop, WorkshopType, WorkshopLevel, WorkshopFormat, Workshops } from './workshopTypes';

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

export const workshops: Workshops = {
    'statistics-project': {
        id: 'statistics-project',
        title: { EN: 'Statistics Project Course', NL: 'Statistiek Project Cursus' },
        description: {
            EN: 'Comprehensive statistics workshops for entire classes or small groups. Perfect for high school students working on research projects, with flexible scheduling options to accommodate class schedules.',
            NL: 'Uitgebreide statistiek workshops voor hele klassen of kleine groepen. Perfect voor middelbare scholieren die aan onderzoeksprojecten werken, met flexibele planning om aan te sluiten bij lesroosters.'
        },
        durationMinutes: 120,
        durationText: { EN: '1-2 hours per session', NL: '1-2 uur per sessie' },
        level: 'intermediate',
        format: 'flexible',
        details: {
            EN: [
                'Available for entire classes or small groups',
                'Customized to match curriculum requirements',
                'Hands-on practice with real datasets',
                'Focus on research methodology',
                'Interactive learning approach',
                'Online or in-person sessions'
            ],
            NL: [
                'Beschikbaar voor hele klassen of kleine groepen',
                'Aangepast aan curriculum vereisten',
                'Praktijkervaring met echte datasets',
                'Focus op onderzoeksmethodologie',
                'Interactieve leeraanpak',
                'Online of fysieke sessies'
            ]
        },
        price: defaultPrice,
        maxParticipants: 30,
        prerequisites: defaultPrerequisites,
        materials: defaultMaterials,
        location: defaultLocation,
        type: 'academic',
        schedule: 'weekly'
    },
    'math-innovation': {
        id: 'math-innovation',
        title: { EN: 'Math Teachers Innovation Workshop', NL: 'Wiskunde Docenten Innovatie Workshop' },
        description: {
            EN: 'Workshop for math teachers focusing on innovative teaching methods, incorporating technology and modern approaches to engage students better.',
            NL: 'Workshop voor wiskundedocenten gericht op innovatieve onderwijsmethoden, integratie van technologie en moderne benaderingen om leerlingen beter te betrekken.'
        },
        durationMinutes: 240,
        durationText: { EN: '4 hours', NL: '4 uur' },
        level: 'professional',
        format: 'interactive',
        details: {
            EN: [
                'Modern teaching methodologies',
                'Technology integration in math education',
                'Student engagement strategies',
                'Practical examples and exercises',
                'Resources and tools overview'
            ],
            NL: [
                'Moderne onderwijsmethodologieën',
                'Technologie integratie in wiskundeonderwijs',
                'Strategieën voor leerlingbetrokkenheid',
                'Praktische voorbeelden en oefeningen',
                'Overzicht van hulpmiddelen en tools'
            ]
        },
        price: defaultPrice,
        maxParticipants: 15,
        prerequisites: defaultPrerequisites,
        materials: defaultMaterials,
        location: defaultLocation,
        type: 'academic',
        schedule: 'weekly'
    },
    'ai-math': {
        id: 'ai-math',
        title: { EN: 'AI & Mathematics Workshop', NL: 'AI & Wiskunde Workshop' },
        description: {
            EN: 'Explore the intersection of artificial intelligence and mathematics. Learn how AI can enhance mathematical understanding and problem-solving.',
            NL: 'Verken het snijvlak van kunstmatige intelligentie en wiskunde. Leer hoe AI wiskundig begrip en probleemoplossing kan verbeteren.'
        },
        durationMinutes: 180,
        durationText: { EN: '3 hours', NL: '3 uur' },
        level: 'advanced',
        format: 'hands-on',
        details: {
            EN: [
                'Introduction to AI concepts',
                'Mathematical foundations of AI',
                'Practical applications in education',
                'Hands-on experience with AI tools',
                'Future trends and developments'
            ],
            NL: [
                'Introductie tot AI concepten',
                'Wiskundige fundamenten van AI',
                'Praktische toepassingen in onderwijs',
                'Praktijkervaring met AI tools',
                'Toekomstige trends en ontwikkelingen'
            ]
        },
        price: defaultPrice,
        maxParticipants: 12,
        prerequisites: defaultPrerequisites,
        materials: defaultMaterials,
        location: defaultLocation,
        type: 'academic',
        schedule: 'weekly'
    },
    'music-production': {
        id: 'music-production',
        title: { EN: 'Music Production & DJ Workshop', NL: 'Muziekproductie & DJ Workshop' },
        description: {
            EN: 'Learn the basics of music production and DJing, from creating beats to mixing tracks. Perfect for anyone interested in music, technology, or performance.',
            NL: 'Leer de basis van muziekproductie en DJ\'en, van beats maken tot tracks mixen. Perfect voor iedereen met interesse in muziek, technologie of performance.'
        },
        durationMinutes: 120,
        durationText: { EN: '2-4 hours', NL: '2-4 uur' },
        level: 'all_levels',
        format: 'practical',
        details: {
            EN: [
                'Introduction to music production software (Ableton Live)',
                'Creating beats, sampling, and melodies',
                'DJ mixing techniques and controller usage',
                'Creating flow in a DJ set',
                'Hands-on track creation',
                'Personal DJ set practice'
            ],
            NL: [
                'Introductie tot muziekproductie software (Ableton Live)',
                'Beats maken, samplen en melodieën creëren',
                'DJ mixtechnieken en gebruik van controllers',
                'Flow creëren in een DJ-set',
                'Hands-on track maken',
                'Persoonlijke DJ-set oefening'
            ]
        },
        price: defaultPrice,
        maxParticipants: 12,
        prerequisites: defaultPrerequisites,
        materials: defaultMaterials,
        location: defaultLocation,
        type: 'creative',
        schedule: 'weekly'
    },
    'analog-photography': {
        id: 'analog-photography',
        title: { EN: 'Analog Photography & Editing', NL: 'Analoge Fotografie & Bewerking' },
        description: {
            EN: 'Explore the art of analog photography using professional cameras. Learn about film selection, development, and digital post-processing.',
            NL: 'Ontdek de kunst van analoge fotografie met professionele camera\'s. Leer over filmkeuze, ontwikkeling en digitale nabewerking.'
        },
        durationMinutes: 180,
        durationText: { EN: '3-4 hours', NL: '3-4 uur' },
        level: 'all_levels',
        format: 'practical',
        details: {
            EN: [
                'Basics of analog photography',
                'Using professional cameras (Canon A1, Mamiya 645)',
                'Film selection and light manipulation',
                'Film development and scanning',
                'Digital editing with Lightroom/Photoshop',
                'Creating a photo series'
            ],
            NL: [
                'Basis van analoge fotografie',
                'Werken met professionele camera\'s (Canon A1, Mamiya 645)',
                'Filmkeuze en lichtmanipulatie',
                'Film ontwikkelen en scannen',
                'Digitale bewerking met Lightroom/Photoshop',
                'Fotoserie maken'
            ]
        },
        price: defaultPrice,
        maxParticipants: 10,
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
        durationMinutes: 120,
        durationText: { EN: '2-3 hours', NL: '2-3 uur' },
        level: 'all_levels',
        format: 'practical',
        details: {
            EN: [
                'Graphic design fundamentals',
                'Color theory and composition',
                'Typography basics',
                'Using Canva and Adobe Illustrator',
                'Creating posters and logos',
                'Visual storytelling techniques'
            ],
            NL: [
                'Grafisch ontwerp fundamenten',
                'Kleurtheorie en compositie',
                'Typografie basis',
                'Werken met Canva en Adobe Illustrator',
                'Posters en logo\'s maken',
                'Visuele storytelling technieken'
            ]
        },
        price: defaultPrice,
        maxParticipants: 12,
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
        durationMinutes: 120,
        durationText: { EN: '2-3 hours', NL: '2-3 uur' },
        level: 'beginner',
        format: 'practical',
        details: {
            EN: [
                'Introduction to Python programming',
                'Using Processing.py and Pygame',
                'Creating interactive visuals',
                'Animation basics',
                'Algorithmic thinking',
                'Pattern generation'
            ],
            NL: [
                'Introductie tot Python programmeren',
                'Werken met Processing.py en Pygame',
                'Interactieve visuals maken',
                'Basis van animatie',
                'Algoritmisch denken',
                'Patronen genereren'
            ]
        },
        price: defaultPrice,
        maxParticipants: 12,
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
        durationMinutes: 120,
        durationText: { EN: '2-3 hours', NL: '2-3 uur' },
        level: 'all_levels',
        format: 'interactive',
        details: {
            EN: [
                'Introduction to AI art tools',
                'Using DALL·E and RunwayML',
                'AI in music and visual art',
                'Creating AI-assisted artworks',
                'Ethical considerations',
                'Future of AI in art'
            ],
            NL: [
                'Introductie tot AI-kunsttools',
                'Werken met DALL·E en RunwayML',
                'AI in muziek en beeldende kunst',
                'AI-ondersteunde kunstwerken maken',
                'Ethische overwegingen',
                'Toekomst van AI in kunst'
            ]
        },
        price: defaultPrice,
        maxParticipants: 12,
        prerequisites: defaultPrerequisites,
        materials: defaultMaterials,
        location: defaultLocation,
        type: 'creative',
        schedule: 'weekly'
    },
    'escape-room': {
        id: 'escape-room',
        title: { EN: 'Escape Room Design Workshop', NL: 'Escape Room Ontwerp Workshop' },
        description: {
            EN: 'Learn to design and program escape room puzzles. Combine storytelling, technology, and problem-solving in this unique workshop.',
            NL: 'Leer escape room puzzels ontwerpen en programmeren. Combineer storytelling, technologie en probleemoplossing in deze unieke workshop.'
        },
        durationMinutes: 180,
        durationText: { EN: '3-4 hours', NL: '3-4 uur' },
        level: 'all_levels',
        format: 'interactive',
        details: {
            EN: [
                'Escape room design principles',
                'Storytelling and puzzle creation',
                'Using Arduino for interactive elements',
                'Basic programming concepts',
                'Testing and refining puzzles',
                'Creating a mini escape room'
            ],
            NL: [
                'Escape room ontwerpprincipes',
                'Storytelling en puzzels maken',
                'Arduino gebruiken voor interactieve elementen',
                'Basis programmeerconcepten',
                'Puzzels testen en verfijnen',
                'Mini escape room maken'
            ]
        },
        price: defaultPrice,
        maxParticipants: 12,
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
        durationMinutes: 180,
        durationText: { 
            EN: '3 hours', 
            NL: '3 uur' 
        },
        level: 'intermediate',
        format: 'hands-on',
        details: {
            EN: ['Introduction to data visualization principles', 'Working with Matplotlib and Seaborn', 'Interactive visualizations with Plotly', 'Best practices for data presentation', 'Real-world dataset examples'],
            NL: ['Introductie tot datavisualisatie principes', 'Werken met Matplotlib en Seaborn', 'Interactieve visualisaties met Plotly', 'Best practices voor datapresentatie', 'Praktijkvoorbeelden met echte datasets']
        },
        price: defaultPrice,
        maxParticipants: 15,
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
        durationMinutes: 240,
        durationText: { 
            EN: '4 hours', 
            NL: '4 uur' 
        },
        level: 'all_levels',
        format: 'creative',
        details: {
            EN: ['Game design principles', 'Educational game mechanics', 'Basic programming concepts', 'Testing and iteration', 'Implementation strategies'],
            NL: ['Spelontwerp principes', 'Educatieve spelmechanismen', 'Basis programmeerconcepten', 'Testen en iteratie', 'Implementatiestrategieën']
        },
        price: defaultPrice,
        maxParticipants: 12,
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
        durationMinutes: 180,
        durationText: { 
            EN: '3 hours', 
            NL: '3 uur' 
        },
        level: 'all_levels',
        format: 'creative',
        details: {
            EN: ['Geometric patterns', 'Fractals and recursion', 'Golden ratio in art', 'Digital pattern creation', 'Mathematical symmetry'],
            NL: ['Geometrische patronen', 'Fractals en recursie', 'Gulden snede in kunst', 'Digitale patroonvorming', 'Wiskundige symmetrie']
        },
        price: defaultPrice,
        maxParticipants: 15,
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
        durationMinutes: 240,
        durationText: { 
            EN: '4 hours', 
            NL: '4 uur' 
        },
        level: 'intermediate',
        format: 'technical',
        details: {
            EN: ['3D geometry basics', 'Working with modeling software', 'Mathematical transformations', 'Creating educational models', 'Printing and sharing models'],
            NL: ['3D-geometrie basis', 'Werken met modelleersoftware', 'Wiskundige transformaties', 'Educatieve modellen maken', 'Modellen printen en delen']
        },
        price: defaultPrice,
        maxParticipants: 10,
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
        durationMinutes: 180,
        durationText: { 
            EN: '3 hours', 
            NL: '3 uur' 
        },
        level: 'all_levels',
        format: 'creative',
        details: {
            EN: ['Storytelling techniques', 'Mathematical concept integration', 'Visual storytelling', 'Interactive narratives', 'Digital story creation'],
            NL: ['Verhaaltechnieken', 'Integratie van wiskundige concepten', 'Visueel verhalen vertellen', 'Interactieve verhalen', 'Digitale verhalen maken']
        },
        price: defaultPrice,
        maxParticipants: 15,
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
        durationMinutes: 240,
        durationText: { 
            EN: '4 hours', 
            NL: '4 uur' 
        },
        level: 'all_levels',
        format: 'media',
        details: {
            EN: ['Podcast planning', 'Audio recording basics', 'Script writing', 'Editing techniques', 'Distribution platforms'],
            NL: ['Podcast planning', 'Audio opname basis', 'Script schrijven', 'Bewerkingstechnieken', 'Distributieplatforms']
        },
        price: defaultPrice,
        maxParticipants: 8,
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
        durationMinutes: 360,
        durationText: { 
            EN: '6 hours', 
            NL: '6 uur' 
        },
        level: 'intermediate',
        format: 'media',
        details: {
            EN: ['Video planning', 'Recording techniques', 'Visual effects', 'Animation basics', 'Publishing strategies'],
            NL: ['Video planning', 'Opnametechnieken', 'Visuele effecten', 'Animatie basis', 'Publicatiestrategieën']
        },
        price: defaultPrice,
        maxParticipants: 10,
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
        durationMinutes: 240,
        durationText: { 
            EN: '4 hours', 
            NL: '4 uur' 
        },
        level: 'advanced',
        format: 'professional',
        details: {
            EN: ['Alternative assessment methods', 'Digital tools for assessment', 'Rubric development', 'Feedback strategies', 'Portfolio assessment'],
            NL: ['Alternatieve toetsingsmethoden', 'Digitale tools voor toetsing', 'Rubric ontwikkeling', 'Feedback strategieën', 'Portfolio beoordeling']
        },
        price: defaultPrice,
        maxParticipants: 20,
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
        durationMinutes: 300,
        durationText: { 
            EN: '5 hours', 
            NL: '5 uur' 
        },
        level: 'advanced',
        format: 'professional',
        details: {
            EN: ['Differentiation strategies', 'Task design', 'Group management', 'Assessment adaptation', 'Digital tools for differentiation'],
            NL: ['Differentiatiestrategieën', 'Taakontwerp', 'Groepsmanagement', 'Toetsingsaanpassing', 'Digitale tools voor differentiatie']
        },
        price: defaultPrice,
        maxParticipants: 15,
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
        durationMinutes: 180,
        durationText: { 
            EN: '3 hours', 
            NL: '3 uur' 
        },
        level: 'all_levels',
        format: 'wellness',
        details: {
            EN: ['Math anxiety management', 'Mindfulness exercises', 'Focus techniques', 'Stress reduction', 'Classroom implementation'],
            NL: ['Wiskundeangst management', 'Mindfulness oefeningen', 'Focustechnieken', 'Stressreductie', 'Klasimplementatie']
        },
        price: defaultPrice,
        maxParticipants: 12,
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
        durationMinutes: 180,
        durationText: { 
            EN: '3 hours', 
            NL: '3 uur' 
        },
        level: 'all_levels',
        format: 'wellness',
        details: {
            EN: ['Mindfulness techniques', 'Stress reduction', 'Mental health improvement', 'Classroom implementation'],
            NL: ['Mindfulness-technieken', 'Stressreductie', 'Mentale gezondheid verbeteren', 'Klasimplementatie']
        },
        price: defaultPrice,
        maxParticipants: 12,
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
        durationMinutes: 180,
        durationText: { 
            EN: '3 hours', 
            NL: '3 uur' 
        },
        level: 'all_levels',
        format: 'wellness',
        details: {
            EN: ['Time management techniques', 'Productivity improvement', 'Stress reduction', 'Classroom implementation'],
            NL: ['Tijdmanagementtechnieken', 'Productiviteit verbeteren', 'Stressreductie', 'Klasimplementatie']
        },
        price: defaultPrice,
        maxParticipants: 12,
        prerequisites: defaultPrerequisites,
        materials: defaultMaterials,
        location: defaultLocation,
        type: 'creative',
        schedule: 'single'
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
        durationMinutes: 180,
        durationText: { 
            EN: '3 hours', 
            NL: '3 uur' 
        },
        level: 'all_levels',
        format: 'wellness',
        details: {
            EN: ['Exam preparation strategies', 'Time management', 'Stress reduction', 'Classroom implementation'],
            NL: ['Examenvoorbereidingsstrategieën', 'Tijdmanagement', 'Stressreductie', 'Klasimplementatie']
        },
        price: defaultPrice,
        maxParticipants: 12,
        prerequisites: defaultPrerequisites,
        materials: defaultMaterials,
        location: defaultLocation,
        type: 'creative',
        schedule: 'weekly'
    }
}; 