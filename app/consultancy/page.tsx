'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import { useRef } from 'react';
import { jsonLd } from './metadata';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function ConsultancyPage() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const router = useRouter();
  const contactSectionRef = useRef<HTMLDivElement>(null);

  const handleContactClick = (scrollToContact: boolean = false) => {
    if (scrollToContact && contactSectionRef.current) {
      contactSectionRef.current.scrollIntoView({ behavior: 'smooth' });
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/consultancy-hero.jpg"
              alt="Data Consultancy Background"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-black/50" />
          </div>
          <motion.div 
            className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto"
            initial="initial"
            animate="animate"
            variants={fadeIn}
          >
            <h1 className="text-6xl md:text-7xl font-bold mb-6 font-anton">
              {String(t(content.hero.title))}
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed mb-8">
              {String(t(content.hero.subtitle))}
            </p>
            <button
              onClick={() => handleContactClick(true)}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-bold hover:bg-blue-50 transition-colors duration-300"
            >
              {String(t({
                EN: 'More Info & Schedule Now',
                NL: 'Meer Info & Plan Nu'
              }))}
            </button>
          </motion.div>
        </section>

        {/* Services Section */}
        <section className="py-24 px-4 bg-gray-50">
          <motion.div 
            className="max-w-7xl mx-auto"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-4xl font-bold text-center mb-16 font-anton">
              {String(t(content.services.title))}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {content.services.items[language as keyof typeof content.services.items].map((service, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <ul className="space-y-3">
                    {service.items.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="mr-2 text-blue-600">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Approach Section */}
        <section className="py-24 px-4">
          <motion.div 
            className="max-w-7xl mx-auto"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-4xl font-bold text-center mb-16 font-anton">
              {String(t(content.approach.title))}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {content.approach.steps[language as keyof typeof content.approach.steps].map((step, index) => (
                <motion.div
                  key={index}
                  className="relative bg-white p-8 rounded-lg shadow-lg border border-gray-100"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* CTA Section */}
        <section ref={contactSectionRef} className="py-24 px-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-4xl font-bold mb-8 font-anton">
              {String(t({
                EN: 'Ready to Transform Your Data?',
                NL: 'Klaar om Uw Data te Transformeren?'
              }))}
            </h2>
            <p className="text-xl mb-12">
              {String(t({
                EN: 'Contact us today to discuss how we can help you leverage your data for better decision-making.',
                NL: 'Neem vandaag nog contact op om te bespreken hoe wij u kunnen helpen uw data beter te benutten voor besluitvorming.'
              }))}
            </p>
            <button
              onClick={() => handleContactClick(false)}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-bold hover:bg-blue-50 transition-colors duration-300"
            >
              {String(t({
                EN: 'Schedule Now',
                NL: 'Plan Nu In'
              }))}
            </button>
          </motion.div>
        </section>
      </main>
    </>
  );
} 