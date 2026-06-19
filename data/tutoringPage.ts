import { TutoringPage } from '@/data/types';

export const tutoringPage: TutoringPage = {
  hero: {
    title: {
      EN: 'Tailored tutoring in maths, statistics and programming',
      NL: 'Bijles op maat in wiskunde, statistiek en programmeren'
    },
    subtitle: {
      EN: 'Expert tutoring in mathematics, statistics, and programming with personalized attention and proven results.',
      NL: 'Professionele bijles in wiskunde, statistiek en programmeren met persoonlijke aandacht en bewezen resultaten.'
    },
    stats: [],
    cta: {
      primary: {
        text: { EN: 'Schedule Free Trial', NL: 'Plan Gratis Proefles' },
        href: '/contact'
      },
      secondary: {
        text: { EN: 'View Subjects', NL: 'Bekijk Vakken' },
        href: '#subjects'
      }
    }
  },
  features: [
    {
      icon: 'PersonalizedLearning',
      title: { EN: 'Personalized Learning', NL: 'Persoonlijk Leren' },
      description: {
        EN: 'Tailored lessons that adapt to your learning style and pace.',
        NL: 'Lessen op maat die zich aanpassen aan jouw leerstijl en tempo.'
      },
      animation: 'fade-right'
    },
    {
      icon: 'ExpertSupport',
      title: { EN: 'Expert Support', NL: 'Expert Ondersteuning' },
      description: {
        EN: 'Learn from an experienced tutor with proven results.',
        NL: 'Leer van een ervaren docent met bewezen resultaten.'
      },
      animation: 'fade-up'
    },
    {
      icon: 'FlexibleScheduling',
      title: { EN: 'Flexible Scheduling', NL: 'Flexibele Planning' },
      description: {
        EN: 'Book sessions at times that work best for you.',
        NL: 'Plan sessies op momenten die het beste bij jou passen.'
      },
      animation: 'fade-left'
    }
  ],
  subjects: [
    {
      name: { EN: 'Mathematics', NL: 'Wiskunde' },
      icon: 'Calculator',
      subjects: [
        { name: { EN: 'Calculus', NL: 'Calculus' }, level: 'Advanced' },
        { name: { EN: 'Linear Algebra', NL: 'Lineaire Algebra' }, level: 'Intermediate' },
        { name: { EN: 'Statistics', NL: 'Statistiek' }, level: 'All Levels' }
      ]
    },
    {
      name: { EN: 'Programming', NL: 'Programmeren' },
      icon: 'Code',
      subjects: [
        { name: { EN: 'Python', NL: 'Python' }, level: 'All Levels' },
        { name: { EN: 'JavaScript', NL: 'JavaScript' }, level: 'Beginner' },
        { name: { EN: 'Java', NL: 'Java' }, level: 'Intermediate' }
      ]
    },
    {
      name: { EN: 'Data Science', NL: 'Data Science' },
      icon: 'Database',
      subjects: [
        { name: { EN: 'Machine Learning', NL: 'Machine Learning' }, level: 'Advanced' },
        { name: { EN: 'Data Analysis', NL: 'Data Analyse' }, level: 'Intermediate' },
        { name: { EN: 'R Programming', NL: 'R Programmeren' }, level: 'Beginner' }
      ]
    }
  ],
  process: {
    title: { EN: 'Your Learning Journey', NL: 'Jouw Leertraject' },
    steps: [
      {
        number: 1,
        title: { EN: 'Initial Consultation', NL: 'Eerste Gesprek' },
        description: {
          EN: 'I discuss your goals and assess your current level.',
          NL: 'Ik bespreek je doelen en beoordeel je huidige niveau.'
        },
        icon: 'Chat'
      },
      {
        number: 2,
        title: { EN: 'Customized Plan', NL: 'Plan op Maat' },
        description: {
          EN: 'I create a learning plan tailored to your needs.',
          NL: 'Ik maak een leerplan op maat van jouw behoeften.'
        },
        icon: 'Plan'
      },
      {
        number: 3,
        title: { EN: 'Regular Sessions', NL: 'Regelmatige Sessies' },
        description: {
          EN: 'Engage in interactive learning sessions with Stephen.',
          NL: 'Volg interactieve leersessies met Stephen.'
        },
        icon: 'Calendar'
      },
      {
        number: 4,
        title: { EN: 'Progress Tracking', NL: 'Voortgang Volgen' },
        description: {
          EN: 'Monitor your improvement with regular assessments.',
          NL: 'Volg je verbetering met regelmatige evaluaties.'
        },
        icon: 'Chart'
      }
    ]
  },
  testimonials: {
    title: { EN: 'Student Success Stories', NL: 'Succesverhalen van Studenten' },
    subtitle: {
      EN: 'Read what students say about their experience.',
      NL: 'Lees wat studenten over hun ervaring vertellen.'
    },
    slides: []
  },
  pricing: {
    title: { EN: 'Tutoring Packages', NL: 'Bijlespakketten' },
    subtitle: {
      EN: 'Quality tutoring starting from €75 per hour - Online or at Science Park',
      NL: 'Kwaliteitsbijles vanaf €75 per uur - Online of op Science Park'
    },
    plans: [
      {
        name: { EN: 'Individual Tutoring', NL: 'Individuele Bijles' },
        price: { EN: 'From €75', NL: 'Vanaf €75' },
        interval: { EN: 'per hour', NL: 'per uur' },
        features: [
          { EN: 'Personalized attention', NL: 'Persoonlijke aandacht' },
          { EN: 'All subjects available', NL: 'Alle vakken beschikbaar' },
          { EN: 'Flexible scheduling', NL: 'Flexibele planning' },
          { EN: 'Online or Science Park', NL: 'Online of op Science Park' }
        ],
        cta: {
          text: { EN: 'Schedule Trial', NL: 'Plan Proefles' },
          href: '/contact'
        }
      },
      {
        name: { EN: 'Group Lessons (2 persons)', NL: 'Groepslessen (2 personen)' },
        price: { EN: 'From €55', NL: 'Vanaf €55' },
        interval: { EN: 'per hour per person', NL: 'per uur per persoon' },
        features: [
          { EN: 'Shared learning experience', NL: 'Gedeelde leerervaring' },
          { EN: 'Reduced cost per person', NL: 'Lagere kosten per persoon' },
          { EN: 'Interactive group dynamics', NL: 'Interactieve groepsdynamiek' },
          { EN: 'Online or Science Park', NL: 'Online of op Science Park' }
        ],
        popular: true,
        cta: {
          text: { EN: 'Get Started', NL: 'Begin Nu' },
          href: '/contact'
        }
      },
      {
        name: { EN: 'Thesis & Research', NL: 'Scriptie & Onderzoek' },
        price: { EN: 'From €90', NL: 'Vanaf €90' },
        interval: { EN: 'per hour', NL: 'per uur' },
        features: [
          { EN: 'Statistics & Research', NL: 'Statistiek & Onderzoek' },
          { EN: 'Data Science & AI', NL: 'Data Science & AI' },
          { EN: 'Advanced SPSS/R/Python', NL: 'Geavanceerde SPSS/R/Python' },
          { EN: 'Complete thesis support', NL: 'Volledige scriptiebegeleiding' }
        ],
        cta: {
          text: { EN: 'Contact Us', NL: 'Neem Contact Op' },
          href: '/contact'
        }
      }
    ]
  },
  faq: {
    title: { EN: 'Frequently Asked Questions', NL: 'Veelgestelde Vragen' },
    questions: [
      {
        question: {
          EN: 'How long are the tutoring sessions?',
          NL: 'Hoe lang duren de bijlessen?'
        },
        answer: {
          EN: 'Standard sessions are 1 hour long, but I can accommodate longer sessions if needed.',
          NL: 'Standaard sessies duren 1 uur, maar ik kan langere sessies inplannen indien nodig.'
        }
      },
      {
        question: {
          EN: "What if the approach doesn't suit me?",
          NL: 'Wat als de aanpak niet bij me past?'
        },
        answer: {
          EN: "During the free trial lesson you can see, with no obligation, whether my approach suits you. If it doesn't work out we simply stop — you're tied to nothing. Stephen teaches every lesson himself.",
          NL: 'Tijdens de gratis proefles ontdek je vrijblijvend of mijn aanpak bij je past. Werkt het toch niet, dan stoppen we gewoon — je zit nergens aan vast. Stephen geeft alle lessen zelf.'
        }
      },
      {
        question: {
          EN: 'Do you offer online sessions?',
          NL: 'Bieden jullie online sessies aan?'
        },
        answer: {
          EN: 'Yes, I offer both online and in-person tutoring sessions to accommodate your preferences.',
          NL: 'Ja, ik bied zowel online als persoonlijke bijlessen aan om aan je voorkeuren te voldoen.'
        }
      }
    ]
  },
  contact: {
    title: { EN: 'Start Your Learning Journey', NL: 'Begin Je Leertraject' },
    subtitle: {
      EN: "Fill out the form below and I'll get back to you within 24 hours.",
      NL: 'Vul het onderstaande formulier in en ik neem binnen 24 uur contact met je op.'
    },
    form: {
      name: { EN: 'Your Name', NL: 'Je Naam' },
      email: { EN: 'Email Address', NL: 'Email Adres' },
      subject: {
        label: { EN: 'Subject of Interest', NL: 'Interessegebied' },
        options: [
          { EN: 'Mathematics', NL: 'Wiskunde' },
          { EN: 'Programming', NL: 'Programmeren' },
          { EN: 'Statistics', NL: 'Statistiek' },
          { EN: 'Data Science', NL: 'Data Science' }
        ]
      },
      message: { EN: 'Your Message', NL: 'Je Bericht' },
      submit: { EN: 'Send Message', NL: 'Verstuur Bericht' }
    }
  }
}; 