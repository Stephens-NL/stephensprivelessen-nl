'use client';

import { m } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useLanguage } from '@/hooks/useLanguage';
import { useRouter } from 'next/navigation';
import { jsonLd } from './metadata';
import { JsonLdScript } from '@/components/JsonLdScript';
import { staggeredFadeInUp, viewportOnce, inViewFadeUp } from '@/lib/animations';
import { scrollToElement } from '@/lib/scroll';

export default function ConsultancyContent() {
  const language = useLanguage();
  const t = useTranslations('consultancy');
  const router = useRouter();

  const handleContactClick = (scrollToContact: boolean = false) => {
    if (scrollToContact) {
      scrollToElement('consultancy-contact');
    } else {
      router.push('/contact?service=consultancy');
    }
  };

  const content = {
    hero: {
      title: {
        EN: 'Data & Statistics Consultancy',
        NL: 'Data & Statistiek Consultancy'
      },
      subtitle: {
        EN: 'Expert guidance in data analysis, statistics, and research methodology. Transform your data into actionable insights.',
        NL: 'Expert begeleiding in data-analyse, statistiek en onderzoeksmethodologie. Transformeer uw data naar bruikbare inzichten.'
      }
    },
    services: {
      title: {
        EN: 'Our Expertise',
        NL: 'Onze Expertise'
      },
      items: {
        EN: [
          {
            title: 'Data Analysis',
            description: 'Advanced statistical analysis and data interpretation',
            items: ['Statistical Modeling', 'Hypothesis Testing', 'Regression Analysis', 'Time Series Analysis']
          },
          {
            title: 'Research Methodology',
            description: 'Expert guidance in research design and methodology',
            items: ['Research Design', 'Sampling Methods', 'Survey Development', 'Experimental Design']
          },
          {
            title: 'Machine Learning',
            description: 'Modern machine learning solutions for business problems',
            items: ['Predictive Analytics', 'Classification Models', 'Clustering Analysis', 'Deep Learning']
          }
        ],
        NL: [
          {
            title: 'Data Analyse',
            description: 'Geavanceerde statistische analyse en data interpretatie',
            items: ['Statistisch Modelleren', 'Hypothese Toetsing', 'Regressie Analyse', 'Tijdreeks Analyse']
          },
          {
            title: 'Onderzoeksmethodologie',
            description: 'Expert begeleiding in onderzoeksopzet en methodologie',
            items: ['Onderzoeksopzet', 'Steekproefmethoden', 'Survey Ontwikkeling', 'Experimenteel Design']
          },
          {
            title: 'Machine Learning',
            description: 'Moderne machine learning oplossingen voor bedrijfsproblemen',
            items: ['Predictive Analytics', 'Classificatie Modellen', 'Clustering Analyse', 'Deep Learning']
          }
        ]
      }
    },
    approach: {
      title: {
        EN: 'Our Approach',
        NL: 'Onze Aanpak'
      },
      steps: {
        EN: [
          {
            title: 'Initial Consultation',
            description: 'We start with a thorough understanding of your needs and objectives'
          },
          {
            title: 'Data Assessment',
            description: 'Comprehensive evaluation of your data and requirements'
          },
          {
            title: 'Solution Design',
            description: 'Development of tailored analytical solutions'
          },
          {
            title: 'Implementation',
            description: 'Expert execution of the proposed solutions'
          },
          {
            title: 'Knowledge Transfer',
            description: 'Ensuring your team understands and can maintain the solutions'
          }
        ],
        NL: [
          {
            title: 'Eerste Gesprek',
            description: 'We beginnen met een grondig begrip van uw behoeften en doelstellingen'
          },
          {
            title: 'Data Evaluatie',
            description: 'Uitgebreide evaluatie van uw data en vereisten'
          },
          {
            title: 'Oplossing Ontwerp',
            description: 'Ontwikkeling van op maat gemaakte analytische oplossingen'
          },
          {
            title: 'Implementatie',
            description: 'Deskundige uitvoering van de voorgestelde oplossingen'
          },
          {
            title: 'Kennisoverdracht',
            description: 'Zorgen dat uw team de oplossingen begrijpt en kan onderhouden'
          }
        ]
      }
    }
  };

  return (
    <>
      <JsonLdScript data={jsonLd} />
      <main className="min-h-screen bg-[var(--cream)]">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/consultancy-hero.jpg"
              alt="Data Consultancy Background"
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--ink)]/90 to-black/50" />
          </div>
          <m.div
            className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto"
            {...staggeredFadeInUp(0)}
          >
            <h1 className="text-6xl md:text-7xl font-bold mb-6 font-display">
              {content.hero.title[language]}
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed mb-8">
              {content.hero.subtitle[language]}
            </p>
            <button
              onClick={() => handleContactClick(true)}
              className="bg-[var(--amber)] text-[var(--ink)] px-8 py-4 rounded-lg text-lg font-bold hover:bg-[var(--amber-hover)] transition-colors duration-300"
            >
              {t('form.moreInfoScheduleNow')}
            </button>
          </m.div>
        </section>

        {/* Services Section */}
        <section className="py-24 px-4 bg-[var(--cream-dark)]">
          <m.div
            className="max-w-7xl mx-auto"
            {...inViewFadeUp}
          >
            <h2 className="text-4xl font-bold text-center mb-16 font-display text-[var(--ink)]">
              {content.services.title[language]}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {content.services.items[language as keyof typeof content.services.items].map((service, index) => (
                <m.div
                  key={service.title}
                  className="bg-[var(--cream)] border border-[var(--border-warm)] p-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
                  {...staggeredFadeInUp(index, 0)}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                >
                  <h3 className="text-2xl font-bold font-display text-[var(--ink)] mb-4">{service.title}</h3>
                  <p className="text-[var(--muted-text)] mb-6">{service.description}</p>
                  <ul className="space-y-3">
                    {service.items.map((item) => (
                      <li key={item} className="flex items-start">
                        <span className="mr-2 text-[var(--amber)]">&bull;</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </m.div>
              ))}
            </div>
          </m.div>
        </section>

        {/* Approach Section */}
        <section className="py-24 px-4">
          <m.div
            className="max-w-7xl mx-auto"
            {...inViewFadeUp}
          >
            <h2 className="text-4xl font-bold text-center mb-16 font-display text-[var(--ink)]">
              {content.approach.title[language]}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {content.approach.steps[language as keyof typeof content.approach.steps].map((step, index) => (
                <m.div
                  key={step.title}
                  className="relative bg-[var(--cream)] p-8 rounded-lg shadow-lg border border-[var(--border-warm)]"
                  {...staggeredFadeInUp(index)}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                >
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-[var(--amber)] text-[var(--ink)] rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold font-display text-[var(--ink)] mb-4">{step.title}</h3>
                  <p className="text-[var(--muted-text)]">{step.description}</p>
                </m.div>
              ))}
            </div>
          </m.div>
        </section>

        {/* CTA Section */}
        <section id="consultancy-contact" className="py-24 px-4 bg-[var(--ink)] text-[var(--cream)]">
          <m.div
            className="max-w-4xl mx-auto text-center"
            {...inViewFadeUp}
          >
            <h2 className="text-4xl font-bold mb-8 font-display">
              {t('form.readyToTransformYourData')}
            </h2>
            <p className="text-xl mb-12">
              {t('form.contactUsTodayToDiscussHowWeCanHelpYouLeverageYour')}
            </p>
            <button
              onClick={() => handleContactClick(false)}
              className="bg-[var(--amber)] text-[var(--ink)] px-8 py-4 rounded-lg text-lg font-bold hover:bg-[var(--amber-hover)] transition-colors duration-300"
            >
              {t('form.scheduleNow')}
            </button>
          </m.div>
        </section>
      </main>
    </>
  );
}
