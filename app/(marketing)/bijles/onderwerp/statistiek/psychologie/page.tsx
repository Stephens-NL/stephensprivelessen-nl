import { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { generateSubjectStructuredData } from "@/lib/structured-data";

export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  title: "Statistiek Bijles Amsterdam | SPSS voor Psychologie Studenten",
  description: "Statistiek bijles in Amsterdam voor psychologie studenten. SPSS begeleiding, χ²-tests, ANOVA. UvA & VU studenten. Scriptie ondersteuning.",
  keywords: [
    'statistiek bijles amsterdam',
    'spss bijles amsterdam',
    'psychologie statistiek',
    'spss hulp amsterdam',
    'statistiek uva',
    'statistiek vu',
    'chi kwadraat toets',
    'anova bijles'
  ],
  openGraph: {
    title: "Statistiek Bijles Amsterdam | SPSS voor Psychologie",
    description: "Statistiek bijles voor psychologie studenten. SPSS begeleiding, χ²-tests, ANOVA. UvA & VU studenten in Amsterdam.",
    images: [
      {
        url: "/api/og?title=Statistiek%20Bijles%20A'dam&brandText=Stephensprivelessen.nl&buttonText=SPSS%20Hulp&footerText=Psychologie%20%E2%80%A2%20UvA%20%26%20VU&featureImageUrl=/images/og-statistiek-psychologie-feature.jpg",
        width: 1200,
        height: 630,
        alt: "Statistiek Psychologie Bijles Amsterdam (UvA/VU) | Stephensprivelessen.nl",
      },
    ],
  },
};

const structuredData = generateSubjectStructuredData({
  title: "Statistiek Bijles voor Psychologie Studenten | SPSS & Data Analyse",
  description: "Professionele statistiek bijles voor psychologie studenten. SPSS begeleiding, statistische analyses en scriptie ondersteuning.",
  price: 45,
  priceCurrency: "EUR",
  provider: {
    name: "StephensPrivelessen",
    type: "Person",
  },
  areaServed: "Amsterdam",
  category: ["Psychology", "Social Sciences", "Research Methods"],
});

export default function StatistiekPsychologiePage() {
  return (
    <>
      <Script id="psychologie-ld+json" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(structuredData)}
      </Script>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">
            Statistiek bijles voor psychologie studenten
          </h1>
          <div className="mb-6">
            <Link href="/bijles/amsterdam" className="text-blue-600 hover:underline">
              &laquo; Terug naar Bijles Amsterdam Overzicht
            </Link>
          </div>
          
          <p className="text-xl mb-8">
            Van SPSS tot χ²-tests: maak statistiek begrijpelijk met praktijkvoorbeelden uit de psychologie.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card>
              <CardHeader>
                <CardTitle>SPSS Begeleiding</CardTitle>
                <CardDescription>Van data invoer tot output interpretatie</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Data invoer & voorbereiding</li>
                  <li>Betrouwbaarheidsanalyses</li>
                  <li>Factor analyses</li>
                  <li>Output interpretatie</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Statistische Analyses</CardTitle>
                <CardDescription>Voor tentamens & scripties</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>T-toetsen & ANOVA</li>
                  <li>Correlaties & regressie</li>
                  <li>Chi-kwadraat toetsen</li>
                  <li>Non-parametrische tests</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold mb-4">Scriptie hulp nodig?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Statistische analyses</h3>
                <p>Van onderzoeksvraag tot resultaten</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">SPSS output</h3>
                <p>Professionele interpretatie van je data</p>
              </div>
            </div>
            <Button className="mt-4" asChild>
              <Link href="/scriptiebegeleiding/statistiek">Meer over scriptiebegeleiding</Link>
            </Button>
          </div>

          <div className="prose max-w-none">
            <h2>Succesverhaal: Lisa's statistiek tentamen</h2>
            <blockquote>
              "In 2 weken van een 4.5 naar een 7.5 voor mijn statistiek tentamen. 
              De praktijkvoorbeelden maakten het eindelijk duidelijk!"
            </blockquote>

            <h2>Onze aanpak voor psychologie studenten</h2>
            <ul>
              <li>Praktijkvoorbeelden uit de psychologie</li>
              <li>Stapsgewijze SPSS uitleg</li>
              <li>Focus op interpretatie van resultaten</li>
              <li>Oefenmateriaal van echte onderzoeken</li>
            </ul>

            <h2>Veel voorkomende onderwerpen</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">Basis statistiek</h3>
                <ul>
                  <li>Beschrijvende statistiek</li>
                  <li>Normale verdeling</li>
                  <li>Betrouwbaarheidsintervallen</li>
                  <li>Hypothesetoetsing</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold">Gevorderde analyses</h3>
                <ul>
                  <li>ANOVA & MANOVA</li>
                  <li>Factor analyses</li>
                  <li>Mediatie & moderatie</li>
                  <li>Multilevel analyses</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold mb-6">Veelgestelde Vragen - Statistiek</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Welke statistische tests behandelen jullie?</h3>
                <p className="text-gray-700">We behandelen alle gangbare tests: t-toetsen, ANOVA, chi-kwadraat toetsen, correlaties, regressie-analyses, factor analyses en non-parametrische tests.</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Hoe help je me met SPSS?</h3>
                <p className="text-gray-700">Van data invoer tot output interpretatie. We leren je stap voor stap hoe je analyses uitvoert en hoe je de resultaten correct interpreteert en rapporteert.</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Wat als ik helemaal geen wiskunde achtergrond heb?</h3>
                <p className="text-gray-700">Geen probleem! We beginnen bij de absolute basis en bouwen stap voor stap op. We focussen op begrip en praktische toepassing, niet op ingewikkelde formules.</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Kunnen jullie ook helpen met mijn scriptie statistiek?</h3>
                <p className="text-gray-700">Ja, we helpen je met de volledige statistische analyse voor je scriptie: van onderzoeksvraag tot resultaten en interpretatie. We begeleiden je door het hele proces.</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <Button size="lg" asChild>
              <Link href="/contact">Boek een proefles</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
} 