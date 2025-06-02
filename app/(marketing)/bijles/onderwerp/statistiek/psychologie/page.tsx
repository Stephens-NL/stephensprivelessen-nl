import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { generateSubjectStructuredData } from "@/lib/structured-data";
import Script from "next/script";

export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  title: "Statistiek Bijles voor Psychologie Studenten | SPSS & Data Analyse",
  description: "Professionele statistiek bijles voor psychologie studenten. SPSS begeleiding, statistische analyses en scriptie ondersteuning. Boek direct!",
  openGraph: {
    title: "Statistiek Bijles voor Psychologie Studenten | SPSS & Data Analyse",
    description: "Professionele statistiek bijles voor psychologie studenten. SPSS begeleiding, statistische analyses en scriptie ondersteuning. Boek direct!",
    images: [
      {
        url: "/images/og/statistiek-psychologie.jpg",
        width: 1200,
        height: 630,
        alt: "Statistiek bijles voor psychologie",
      },
    ],
  },
};

export default function StatistiekPsychologiePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">
          Statistiek bijles voor psychologie studenten
        </h1>
        
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
            <a href="/scriptiebegeleiding/statistiek">Meer over scriptiebegeleiding</a>
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

        <div className="mt-8">
          <Button size="lg" asChild>
            <a href="/contact">Boek een proefles</a>
          </Button>
        </div>
      </div>
    </div>
  );
} 