import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Wiskunde & Statistiek Bijles Amsterdam | Stephens Privelessen',
  description: 'Professionele wiskunde en statistiek bijles in Amsterdam. Persoonlijke begeleiding, scriptiehulp en data-analyse ondersteuning. Online en op locatie beschikbaar.',
  keywords: [
    'wiskunde bijles amsterdam',
    'statistiek bijles',
    'scriptiebegeleiding',
    'wiskunde tutor',
    'statistiek expert',
    'spss hulp',
    'data analyse amsterdam',
    'scriptie hulp',
    'onderzoeksmethoden',
    'statistiek cursus',
    'bijles aan huis amsterdam',
    'online wiskunde bijles',
    'statistiek eindexamen',
    'wiskunde examentraining',
    'statistiek spss',
    'r studio hulp',
    'python data analyse',
    'thesis begeleiding',
  ],
  openGraph: {
    title: 'Wiskunde & Statistiek Bijles Amsterdam | Stephens Privelessen',
    description: 'Professionele wiskunde en statistiek bijles in Amsterdam. Persoonlijke begeleiding, scriptiehulp en data-analyse ondersteuning.',
    type: 'website',
    url: 'https://www.stephensprivelessen.nl/bijles',
  }
}

export default function BijlesPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Wiskunde & Statistiek Bijles Amsterdam
        </h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">
            Professionele begeleiding in wiskunde, statistiek en data-analyse. 
            Persoonlijke aanpak, flexibele tijden, online of op locatie in Amsterdam.
          </p>
          
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Onze Diensten
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3">Wiskunde Bijles</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Alle niveaus (VMBO tot WO)</li>
                  <li>Examentraining</li>
                  <li>Persoonlijke aanpak</li>
                  <li>Flexibele planning</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3">Statistiek Begeleiding</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Data-analyse</li>
                  <li>SPSS & R Studio</li>
                  <li>Python voor Data Science</li>
                  <li>Onderzoeksmethoden</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3">Scriptiebegeleiding</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Onderzoeksopzet</li>
                  <li>Methodologie</li>
                  <li>Data-analyse</li>
                  <li>Resultaatinterpretatie</li>
                </ul>
              </div>
            </div>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Waarom Kiezen voor Onze Bijles?
            </h2>
            <ul className="list-disc list-inside space-y-3 text-gray-600">
              <li>Ervaren docent met academische achtergrond</li>
              <li>Persoonlijke aandacht en maatwerk</li>
              <li>Flexibele tijden en locaties</li>
              <li>Online en offline mogelijkheden</li>
              <li>Focus op begrip en zelfvertrouwen</li>
              <li>Duidelijke uitleg en praktijkvoorbeelden</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  )
} 