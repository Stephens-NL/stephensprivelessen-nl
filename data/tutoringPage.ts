import { TutoringPage } from '@/data/types';

export const tutoringPage: TutoringPage = {
  hero: {
    title: {
      EN: 'Transform Your Learning Journey',
      NL: 'Transformeer Je Leertraject'
    },
    subtitle: {
      EN: 'Expert tutoring in mathematics, statistics, and programming with personalized attention and proven results.',
      NL: 'Professionele bijles in wiskunde, statistiek en programmeren met persoonlijke aandacht en bewezen resultaten.'
    },
    stats: [
      {
        value: '98%',
        label: { EN: 'Student Satisfaction', NL: 'Studenttevredenheid' }
      },
      {
        value: '500+',
        label: { EN: 'Students Helped', NL: 'Studenten Geholpen' }
      },
      {
        value: '4.9/5',
        label: { EN: 'Average Rating', NL: 'Gemiddelde Beoordeling' }
      }
    ],
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
        EN: 'Learn from experienced tutors with proven track records.',
        NL: 'Leer van ervaren docenten met bewezen resultaten.'
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
          EN: 'We discuss your goals and assess your current level.',
          NL: 'We bespreken je doelen en beoordelen je huidige niveau.'
        },
        icon: 'Chat'
      },
      {
        number: 2,
        title: { EN: 'Customized Plan', NL: 'Plan op Maat' },
        description: {
          EN: 'We create a learning plan tailored to your needs.',
          NL: 'We maken een leerplan op maat van jouw behoeften.'
        },
        icon: 'Plan'
      },
      {
        number: 3,
        title: { EN: 'Regular Sessions', NL: 'Regelmatige Sessies' },
        description: {
          EN: 'Engage in interactive learning sessions with your tutor.',
          NL: 'Volg interactieve leersessies met je docent.'
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
      EN: 'Hear from our students about their experience.',
      NL: 'Hoor van onze studenten over hun ervaring.'
    },
    slides: [
      {
        quote: {
          EN: 'The personalized approach helped me master calculus in just a few months.',
          NL: 'De persoonlijke aanpak hielp me calculus te beheersen in slechts een paar maanden.'
        },
        author: 'Sarah K.',
        role: { EN: 'Mathematics Student', NL: 'Wiskunde Student' },
        image: '/images/testimonials/sarah.jpg',
        rating: 5,
        subject: { EN: 'Calculus', NL: 'Calculus' }
      },
      {
        quote: {
          EN: 'Finally understood programming concepts that had been confusing me for years.',
          NL: 'Eindelijk programmeerconcepten begrepen die me jarenlang in verwarring brachten.'
        },
        author: 'Michael R.',
        role: { EN: 'Computer Science Student', NL: 'Informatica Student' },
        image: '/images/testimonials/michael.jpg',
        rating: 5,
        subject: { EN: 'Python Programming', NL: 'Python Programmeren' }
      }
    ]
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
      },
      {
        name: { EN: 'Weekend Programs', NL: 'Weekend Programma\'s' },
        price: { EN: 'From €30', NL: 'Vanaf €30' },
        interval: { EN: 'per hour', NL: 'per uur' },
        features: [
          { EN: 'Special community rates', NL: 'Speciale gemeenschapstarieven' },
          { EN: 'Weekend availability', NL: 'Weekend beschikbaarheid' },
          { EN: 'Zuidoost Amsterdam', NL: 'Amsterdam Zuidoost' },
          { EN: 'Home tutoring available', NL: 'Bijles aan huis mogelijk' }
        ],
        cta: {
          text: { EN: 'Discuss Options', NL: 'Bespreek Mogelijkheden' },
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
          EN: 'Standard sessions are 1 hour long, but we can accommodate longer sessions if needed.',
          NL: 'Standaard sessies duren 1 uur, maar we kunnen langere sessies inplannen indien nodig.'
        }
      },
      {
        question: {
          EN: 'Can I change my tutor if I\'m not satisfied?',
          NL: 'Kan ik van docent wisselen als ik niet tevreden ben?'
        },
        answer: {
          EN: 'Yes, we want you to have the best learning experience. You can request a different tutor at any time.',
          NL: 'Ja, we willen dat je de beste leerervaring hebt. Je kunt op elk moment een andere docent aanvragen.'
        }
      },
      {
        question: {
          EN: 'Do you offer online sessions?',
          NL: 'Bieden jullie online sessies aan?'
        },
        answer: {
          EN: 'Yes, we offer both online and in-person tutoring sessions to accommodate your preferences.',
          NL: 'Ja, we bieden zowel online als persoonlijke bijlessen aan om aan je voorkeuren te voldoen.'
        }
      }
    ]
  },
  contact: {
    title: { EN: 'Start Your Learning Journey', NL: 'Begin Je Leertraject' },
    subtitle: {
      EN: 'Fill out the form below and we\'ll get back to you within 24 hours.',
      NL: 'Vul het onderstaande formulier in en we nemen binnen 24 uur contact met je op.'
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