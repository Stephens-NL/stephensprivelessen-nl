import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { generateSubjectStructuredData } from "@/lib/structured-data";
import Script from "next/script";
import Link from "next/link";

export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  title: "Python & R Bijles Amsterdam | Data Science voor Psychologie & Economie",
  description: "Python en R bijles in Amsterdam voor data science. Speciaal voor psychologie, economie en life sciences studenten. SPSS, R Studio begeleiding.",
  keywords: [
    'python bijles amsterdam',
    'r studio bijles amsterdam',
    'data science bijles',
    'spss hulp amsterdam',
    'programmeren psychologie',
    'python economie',
    'r studio begeleiding',
    'data analyse bijles'
  ],
  openGraph: {
    title: "Python & R Bijles Amsterdam | Data Science",
    description: "Python en R bijles voor data science. Speciaal voor psychologie, economie en life sciences studenten in Amsterdam.",
    images: [
      {
        url: "/api/og?title=Python%20%26%20R%20Bijles%20A'dam&brandText=Stephensprivelessen.nl&buttonText=Start%20Code&footerText=Data%20Science%20%E2%80%A2%20Statistiek&featureImageUrl=/images/og-programmeren-feature.jpg",
        width: 1200,
        height: 630,
        alt: "Python/R Bijles Amsterdam - Data Science | Stephensprivelessen.nl",
      },
    ],
  },
};

const structuredData = generateSubjectStructuredData({
  title: "Programmeren Bijles | Python & R voor Data Science",
  description: "Professionele programmeren bijles voor niet-bèta studenten. Python & R voor data science en statistiek.",
  price: 45,
  priceCurrency: "EUR",
  provider: {
    name: "StephensPrivelessen",
    type: "Person",
  },
  areaServed: "Amsterdam",
  category: ["Psychology", "Business & Economics", "Life Sciences"],
});

export default function ProgrammerenBijlesPage() {
  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">
            Programmeren bijles voor niet-bèta studenten
          </h1>
          <div className="mb-6">
            <Link href="/bijles/amsterdam" className="text-blue-600 hover:underline">
              &laquo; Terug naar Bijles Amsterdam Overzicht
            </Link>
          </div>
          
          <p className="text-xl mb-8">
            Programmeren hoeft niet moeilijk te zijn. Wij leren je Python en R op een 
            praktische manier, speciaal voor data science en statistiek.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card>
              <CardHeader>
                <CardTitle>Python voor Data Science</CardTitle>
                <CardDescription>Van basis tot gevorderd</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Data manipulatie met Pandas</li>
                  <li>Statistische analyses</li>
                  <li>Data visualisatie</li>
                  <li>Machine learning basics</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>R Studio & Statistiek</CardTitle>
                <CardDescription>Voor psychologie & onderzoek</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>R Studio begeleiding</li>
                  <li>Statistische analyses</li>
                  <li>Data visualisatie</li>
                  <li>Scriptie ondersteuning</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold mb-4">Onze aanpak</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Praktijkgericht</h3>
                <p>Echte data uit jouw vakgebied</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Stapsgewijs</h3>
                <p>Van basis tot gevorderd niveau</p>
              </div>
            </div>
          </div>

          <div className="prose max-w-none">
            <h2>Voor wie is deze bijles?</h2>
            <ul>
              <li>Psychologie studenten</li>
              <li>Business & Economics studenten</li>
              <li>Life Sciences studenten</li>
              <li>Iedereen die wil leren programmeren</li>
            </ul>

            <h2>Wat zeggen studenten?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <blockquote className="border-l-4 border-blue-500 pl-4">
                "De Python begeleiding heeft me echt geholpen met mijn data science project. 
                Eindelijk begrijp ik hoe ik data kan analyseren!"
                <footer className="mt-2 text-sm">- Sarah, Psychologie</footer>
              </blockquote>
              <blockquote className="border-l-4 border-blue-500 pl-4">
                "R Studio is nu een stuk duidelijker. De praktijkvoorbeelden uit mijn 
                vakgebied maken het veel begrijpelijker."
                <footer className="mt-2 text-sm">- Mark, Business Analytics</footer>
              </blockquote>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold mb-6">Veelgestelde Vragen - Python & R</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Moet ik al kunnen programmeren voor deze bijles?</h3>
                <p className="text-gray-700">Nee, we beginnen bij de basis. We leren je Python en R vanaf het begin, speciaal gericht op data science en statistiek voor jouw vakgebied.</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Wat is het verschil tussen Python en R?</h3>
                <p className="text-gray-700">Python is veelzijdiger en populair in data science, machine learning en business analytics. R is specifiek ontwikkeld voor statistiek en wordt veel gebruikt in psychologie en life sciences onderzoek.</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Welke tools gebruiken jullie tijdens de lessen?</h3>
                <p className="text-gray-700">We gebruiken Jupyter Notebooks voor Python, R Studio voor R, en werken met echte datasets uit jouw vakgebied. Je krijgt ook toegang tot onze oefenmaterialen.</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Kan ik ook hulp krijgen met mijn scriptie data analyse?</h3>
                <p className="text-gray-700">Ja, we helpen je graag met data analyse voor je scriptie. Van data cleaning tot statistische analyses en visualisaties - we begeleiden je door het hele proces.</p>
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
    </>
  );
} 