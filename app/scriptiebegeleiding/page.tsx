'use client';

import Script from 'next/script'
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import Image from 'next/image';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Scriptiebegeleiding Amsterdam',
  provider: {
    '@type': 'EducationalOrganization',
    name: 'Stephens Privelessen',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Amsterdam',
      addressRegion: 'NH',
      addressCountry: 'NL'
    }
  },
  serviceType: 'Scriptiebegeleiding',
  areaServed: {
    '@type': 'City',
    name: 'Amsterdam'
  },
  description: 'Professionele scriptiebegeleiding met focus op statistiek en methodologie',
  offers: {
    '@type': 'Offer',
    itemOffered: [
      {
        '@type': 'Service',
        name: 'Methodologie Begeleiding',
        description: 'Hulp bij onderzoeksopzet en methodologie'
      },
      {
        '@type': 'Service',
        name: 'Statistische Analyse',
        description: 'Begeleiding bij data-analyse en statistische verwerking'
      },
      {
        '@type': 'Service',
        name: 'Software Ondersteuning',
        description: 'Hulp met SPSS, R, Python en andere analyse tools'
      }
    ]
  }
};

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function ScriptiebegeleidingPage() {
  const { t } = useTranslation();
  const { language } = useLanguage();

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

  return (
    <main className="min-h-screen bg-white">
      <Script
        id="scriptiebegeleiding-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/thesis-hero.jpg"
            alt="Thesis Supervision Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <motion.div 
          className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <h1 className="text-6xl md:text-7xl font-bold mb-6 font-anton">
            {String(t(content.title))}
          </h1>
          <p className="text-xl md:text-2xl leading-relaxed">
            {String(t(content.subtitle))}
          </p>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-4">
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
            {[content.services.methodology, content.services.dataAnalysis, content.services.guidance].map((service, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 p-8 rounded-lg transform hover:scale-105 transition-transform duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <h3 className="text-2xl font-bold mb-6">
                  {String(t(service.title))}
                </h3>
                <ul className="space-y-4">
                  {service.items[language as keyof typeof service.items].map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="mr-2 text-blue-600">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 px-4 bg-gray-50">
        <motion.div 
          className="max-w-7xl mx-auto"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-4xl font-bold text-center mb-16 font-anton">
            {String(t(content.why.title))}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.why.items[language as keyof typeof content.why.items].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center mb-4">
                  <span className="text-3xl text-blue-600 mr-4">0{index + 1}</span>
                  <p className="text-lg">{item}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-blue-600 text-white">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-4xl font-bold mb-8 font-anton">
            {String(t({
              EN: 'Ready to Excel in Your Thesis?',
              NL: 'Klaar om te Excelleren in Je Scriptie?'
            }))}
          </h2>
          <p className="text-xl mb-12">
            {String(t({
              EN: 'Contact us today to discuss how we can help you achieve academic excellence.',
              NL: 'Neem vandaag nog contact op om te bespreken hoe we je kunnen helpen academisch te excelleren.'
            }))}
          </p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-bold hover:bg-blue-50 transition-colors duration-300">
            {String(t({
              EN: 'Get Started',
              NL: 'Begin Nu'
            }))}
          </button>
        </motion.div>
      </section>
    </main>
  );
} 