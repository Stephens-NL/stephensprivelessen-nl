'use client';

import Script from 'next/script'
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/contexts/LanguageContext';

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
    <main className="min-h-screen bg-gray-50">
      <Script
        id="scriptiebegeleiding-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          {String(t(content.title))}
        </h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">
            {String(t(content.subtitle))}
          </p>
          
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {String(t(content.services.title))}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3">{String(t(content.services.methodology.title))}</h3>
                <ul className="list-disc list-inside space-y-2">
                  {content.services.methodology.items[language as keyof typeof content.services.methodology.items].map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3">{String(t(content.services.dataAnalysis.title))}</h3>
                <ul className="list-disc list-inside space-y-2">
                  {content.services.dataAnalysis.items[language as keyof typeof content.services.dataAnalysis.items].map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3">{String(t(content.services.guidance.title))}</h3>
                <ul className="list-disc list-inside space-y-2">
                  {content.services.guidance.items[language as keyof typeof content.services.guidance.items].map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Experience Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {String(t({
                EN: 'Thesis Supervision Experience',
                NL: 'Scriptiebegeleiding Ervaring'
              }))}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3">
                  {String(t({
                    EN: 'Academic Research',
                    NL: 'Academisch Onderzoek'
                  }))}
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>{String(t({
                    EN: 'Personal research on dynamic systems and entanglement assisted zero error communication',
                    NL: 'Eigen onderzoek naar dynamische systemen en entanglement assisted zero error communication'
                  }))}</li>
                  <li>{String(t({
                    EN: 'Multiple psychology theses supervision',
                    NL: 'Begeleiding van meerdere psychologie scripties'
                  }))}</li>
                  <li>{String(t({
                    EN: 'Master thesis guidance in cybersecurity',
                    NL: 'Masterscriptie begeleiding in cybersecurity'
                  }))}</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3">
                  {String(t({
                    EN: 'Specialized Fields',
                    NL: 'Specialistische Gebieden'
                  }))}
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>{String(t({
                    EN: 'Water security networks research',
                    NL: 'Onderzoek naar water security netwerken'
                  }))}</li>
                  <li>{String(t({
                    EN: 'Dynamic systems analysis',
                    NL: 'Analyse van dynamische systemen'
                  }))}</li>
                  <li>{String(t({
                    EN: 'Quantum communication research',
                    NL: 'Onderzoek naar quantum communicatie'
                  }))}</li>
                </ul>
              </div>
            </div>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {String(t(content.why.title))}
            </h2>
            <ul className="list-disc list-inside space-y-3 text-gray-600">
              {content.why.items[language as keyof typeof content.why.items].map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </main>
  )
} 