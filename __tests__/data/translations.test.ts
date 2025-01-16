import { testComponentTranslations } from '../utils/testUtils';

// Import data files
import { about, introductionContent } from '@/data/about';
import { services, generalContent } from '@/data/services';
import { hero } from '@/data/hero';
import { workshops } from '@/data/workshopsData';
import { feedbackFormData } from '@/data/feedbackFormData';

describe('Page Content Translations', () => {
  describe('Data Files', () => {
    it('about data should have all required translations', () => {
      testComponentTranslations(about, 'About');
      testComponentTranslations(introductionContent, 'Introduction');
    });

    it('services data should have all required translations', () => {
      testComponentTranslations(services, 'Services');
      testComponentTranslations(generalContent, 'GeneralContent');
    });

    it('hero data should have all required translations', () => {
      testComponentTranslations(hero, 'Hero');
    });

    it('workshops data should have all required translations', () => {
      testComponentTranslations(workshops, 'Workshops');
    });

    it('feedback form data should have all required translations', () => {
      testComponentTranslations(feedbackFormData, 'FeedbackForm');
    });
  });

  describe('Page Content', () => {
    it('consultancy page content should have all required translations', () => {
      const content = {
        title: {
          EN: "We're Building Something Special",
          NL: "We Bouwen aan Iets Bijzonders"
        },
        description: {
          EN: "Our consultancy services are coming soon. We're working hard to bring you expert guidance and solutions.",
          NL: "Onze consultancydiensten komen eraan. We werken hard om je deskundige begeleiding en oplossingen te bieden."
        },
        buttons: {
          explore: {
            EN: "Explore Other Services",
            NL: "Bekijk Andere Diensten"
          },
          contact: {
            EN: "Contact Us",
            NL: "Neem Contact Op"
          }
        }
      };
      testComponentTranslations(content, 'ConsultancyPage');
    });

    it('tutoring page content should have all required translations', () => {
      const content = {
        hero: {
          title: {
            EN: 'Expert Private Tutoring Tailored to Your Needs',
            NL: 'Professionele Bijles op Maat'
          },
          description: {
            EN: 'Get personalized support in mathematics, statistics, programming, and more. Our one-on-one sessions are designed to help you achieve your academic goals.',
            NL: 'Krijg persoonlijke ondersteuning in wiskunde, statistiek, programmeren en meer. Onze één-op-één sessies zijn ontworpen om je te helpen je academische doelen te bereiken.'
          },
          cta: {
            trial: {
              EN: 'Schedule a Free Trial',
              NL: 'Plan een Gratis Proefles'
            },
            subjects: {
              EN: 'View Subjects',
              NL: 'Bekijk Vakken'
            }
          }
        },
        benefits: {
          title: {
            EN: 'Why Choose Our Tutoring Services?',
            NL: 'Waarom Kiezen voor Onze Bijles?'
          },
          items: [
            {
              title: { EN: 'Personalized Approach', NL: 'Persoonlijke Aanpak' },
              description: {
                EN: 'Lessons tailored to your learning style, pace, and specific needs.',
                NL: 'Lessen aangepast aan jouw leerstijl, tempo en specifieke behoeften.'
              }
            },
            {
              title: { EN: 'Experienced Tutors', NL: 'Ervaren Docenten' },
              description: {
                EN: 'Learn from qualified professionals with extensive teaching experience.',
                NL: 'Leer van gekwalificeerde professionals met uitgebreide onderwijservaring.'
              }
            },
            {
              title: { EN: 'Flexible Schedule', NL: 'Flexibel Rooster' },
              description: {
                EN: 'Choose from online or in-person sessions at times that work for you.',
                NL: 'Kies uit online of persoonlijke sessies op tijden die jou uitkomen.'
              }
            }
          ]
        },
        subjects: {
          title: {
            EN: 'Subjects We Cover',
            NL: 'Vakken die We Aanbieden'
          },
          categories: [
            {
              title: { EN: 'Mathematics', NL: 'Wiskunde' },
              subjects: [
                { EN: 'Calculus', NL: 'Calculus' },
                { EN: 'Linear Algebra', NL: 'Lineaire Algebra' },
                { EN: 'Discrete Mathematics', NL: 'Discrete Wiskunde' },
                { EN: 'Statistics', NL: 'Statistiek' }
              ]
            },
            {
              title: { EN: 'Programming', NL: 'Programmeren' },
              subjects: [
                { EN: 'Python', NL: 'Python' },
                { EN: 'Java', NL: 'Java' },
                { EN: 'JavaScript', NL: 'JavaScript' },
                { EN: 'Web Development', NL: 'Webontwikkeling' }
              ]
            },
            {
              title: { EN: 'Statistics', NL: 'Statistiek' },
              subjects: [
                { EN: 'Probability Theory', NL: 'Kansrekening' },
                { EN: 'Statistical Analysis', NL: 'Statistische Analyse' },
                { EN: 'Data Science', NL: 'Data Science' },
                { EN: 'R Programming', NL: 'R Programmeren' }
              ]
            }
          ]
        },
        cta: {
          title: {
            EN: 'Ready to Get Started?',
            NL: 'Klaar om te Beginnen?'
          },
          description: {
            EN: 'Book your free trial session today and experience the difference personalized tutoring can make.',
            NL: 'Plan vandaag nog je gratis proefles en ervaar het verschil dat persoonlijke bijles kan maken.'
          },
          button: {
            EN: 'Schedule Your Free Trial',
            NL: 'Plan Je Gratis Proefles'
          }
        }
      };
      testComponentTranslations(content, 'TutoringPage');
    });

    it('scriptiebegeleiding page content should have all required translations', () => {
      const content = {
        title: {
          EN: 'Thesis Supervision Amsterdam',
          NL: 'Scriptiebegeleiding Amsterdam'
        },
        subtitle: {
          EN: 'Professional guidance for your thesis or dissertation. Expert in statistics, methodology and data analysis. Personal approach for bachelor and master students.',
          NL: 'Professionele begeleiding voor je scriptie of thesis. Expert in statistiek, methodologie en data-analyse. Persoonlijke aanpak voor bachelor en master studenten.'
        },
        services: {
          title: {
            EN: 'Our Services',
            NL: 'Onze Diensten'
          },
          methodology: {
            title: {
              EN: 'Methodology',
              NL: 'Methodologie'
            },
            items: {
              EN: ['Research Design', 'Research Questions', 'Hypothesis Formulation', 'Methodological Foundation'],
              NL: ['Onderzoeksopzet', 'Onderzoeksvragen', 'Hypothesen formulering', 'Methodologische onderbouwing']
            }
          },
          dataAnalysis: {
            title: {
              EN: 'Data Analysis',
              NL: 'Data Analyse'
            },
            items: {
              EN: ['Statistical Analysis', 'SPSS & R Studio', 'Python for Data Science', 'Result Interpretation'],
              NL: ['Statistische analyses', 'SPSS & R Studio', 'Python voor Data Science', 'Resultaatinterpretatie']
            }
          },
          guidance: {
            title: {
              EN: 'Guidance',
              NL: 'Begeleiding'
            },
            items: {
              EN: ['Personal Feedback', 'Structure Advice', 'Planning & Deadlines', 'Final Editing'],
              NL: ['Persoonlijke feedback', 'Structuur advies', 'Planning & deadlines', 'Eindredactie']
            }
          }
        },
        why: {
          title: {
            EN: 'Why Choose Our Thesis Supervision?',
            NL: 'Waarom Kiezen voor Onze Scriptiebegeleiding?'
          },
          items: {
            EN: [
              'Experienced supervisor with academic background',
              'Specialization in statistics and methodology',
              'Personal one-on-one guidance',
              'Flexible appointments (online or on location)',
              'Expertise in various analysis software',
              'Focus on independent learning and understanding'
            ],
            NL: [
              'Ervaren begeleider met academische achtergrond',
              'Specialisatie in statistiek en methodologie',
              'Persoonlijke één-op-één begeleiding',
              'Flexibele afspraken (online of op locatie)',
              'Expertise in diverse analyse software',
              'Focus op zelfstandig leren en begrip'
            ]
          }
        }
      };
      testComponentTranslations(content, 'ScriptiebegeleidingPage');
    });

    // Note: Workshops page content is handled by WorkshopsContent component
    // which uses the workshops data we're already testing
  });
}); 