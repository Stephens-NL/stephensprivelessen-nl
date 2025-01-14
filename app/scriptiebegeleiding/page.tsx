'use client';

import Script from 'next/script'
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Syne, Space_Grotesk } from "next/font/google";
import Link from 'next/link';

const syne = Syne({ 
    subsets: ['latin'],
    variable: '--font-syne',
    display: 'swap',
});

const spaceGrotesk = Space_Grotesk({ 
    subsets: ['latin'],
    variable: '--font-space-grotesk',
    display: 'swap',
});

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
    <div className={`${syne.variable} ${spaceGrotesk.variable}`}>
      <div className="relative min-h-screen">
        <Script
          id="scriptiebegeleiding-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        {/* Hero Section */}
        <div className="relative h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800">
          <div className="absolute inset-0 bg-black/30 z-10"></div>
          <Image
            src="/images/thesis-hero.jpg"
            alt="Scriptiebegeleiding Hero"
            fill
            className="object-cover mix-blend-overlay"
            priority
          />
          <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center">
            <div className="max-w-[800px]">
              <h1 className="font-syne text-4xl sm:text-5xl md:text-7xl lg:text-[120px] text-white mb-4 sm:mb-8 leading-[0.95] tracking-tight">
                Scriptie<br />begeleiding
              </h1>
              <p className="font-space-grotesk text-lg sm:text-xl md:text-2xl lg:text-3xl text-blue-100 max-w-2xl">
                Persoonlijke begeleiding bij methodologie, data-analyse en het schrijfproces van je scriptie
              </p>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <section className="py-16 sm:py-24 lg:py-32 bg-blue-950">
          <div className="container mx-auto px-4">
            <h2 className="font-syne text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-blue-100 mb-12 sm:mb-16 lg:mb-24 max-w-[800px]">
              {String(t(content.services.title))}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {[content.services.methodology, content.services.dataAnalysis, content.services.guidance].map((service, index) => (
                <motion.div
                  key={index}
                  className="bg-blue-900/50 backdrop-blur-sm p-6 sm:p-8 lg:p-12 rounded-3xl border border-blue-800/50"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  <span className="text-4xl sm:text-5xl lg:text-7xl font-syne text-blue-500 mb-4 lg:mb-8 block">0{index + 1}</span>
                  <h3 className="font-syne text-xl sm:text-2xl lg:text-3xl text-blue-100 mb-4 lg:mb-8">
                    {String(t(service.title))}
                  </h3>
                  <ul className="space-y-3 lg:space-y-4 font-space-grotesk text-base lg:text-lg text-blue-200">
                    {service.items[language as keyof typeof service.items].map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="mr-3 text-blue-400">—</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section - with improved responsive text */}
        <section className="py-16 sm:py-24 lg:py-32 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="font-syne text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-blue-950 mb-12 sm:mb-16 lg:mb-24 max-w-[800px]">
              {String(t(content.why.title))}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
              {content.why.items[language as keyof typeof content.why.items].map((item, index) => (
                <motion.div
                  key={index}
                  className="group"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="h-1 w-16 bg-blue-500 mb-6 lg:mb-8 group-hover:w-32 transition-all duration-300"></div>
                  <p className="font-space-grotesk text-lg lg:text-xl text-blue-950">{item}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section - with improved responsive text and contact link */}
        <section className="py-16 sm:py-24 lg:py-32 bg-blue-950">
          <div className="container mx-auto px-4">
            <div className="max-w-[800px] mx-auto">
              <h2 className="font-syne text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-blue-100 mb-6 lg:mb-8">
                {String(t({
                  EN: 'Ready to Excel?',
                  NL: 'Klaar om te Excelleren?'
                }))}
              </h2>
              <p className="font-space-grotesk text-lg sm:text-xl lg:text-2xl text-blue-200 mb-8 lg:mb-12">
                {String(t({
                  EN: 'Contact us today to discuss how we can help you achieve academic excellence.',
                  NL: 'Neem vandaag nog contact op om te bespreken hoe we je kunnen helpen academisch te excelleren.'
                }))}
              </p>
              <Link href="/contact">
                <motion.button 
                  className="bg-blue-100 text-blue-950 px-8 sm:px-12 py-4 sm:py-6 rounded-full text-lg sm:text-xl font-space-grotesk hover:bg-white transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {String(t({
                    EN: 'Get Started',
                    NL: 'Begin Nu'
                  }))}
                </motion.button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 