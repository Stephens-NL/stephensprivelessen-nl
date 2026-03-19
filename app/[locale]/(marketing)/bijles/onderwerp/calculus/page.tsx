import { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { generateSubjectStructuredData } from "@/lib/structured-data";

export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  title: "Calculus Bijles Amsterdam | Differentiëren & Integreren voor Life Sciences",
  description: "Calculus bijles in Amsterdam voor Life Sciences en Economie studenten. Differentiëren, integreren en toegepaste wiskunde. 1‑op‑1 begeleiding.",
  keywords: [
    'calculus bijles amsterdam',
    'differentiëren bijles',
    'integreren bijles',
    'wiskunde life sciences',
    'calculus economie',
    'toegepaste wiskunde bijles',
    'afgeleiden berekenen',
    'integralen berekenen'
  ],
  openGraph: {
    title: "Calculus Bijles Amsterdam | Differentiëren & Integreren",
    description: "Calculus bijles voor Life Sciences en Economie studenten. Differentiëren, integreren en toegepaste wiskunde in Amsterdam.",
    images: [
      {
        url: "/api/og?title=Calculus%20Bijles%20A'dam&brandText=Stephensprivelessen.nl&buttonText=Start%20Calculus&footerText=Differentiëren%20%E2%80%A2%20Integreren&featureImageUrl=/images/og-calculus-feature.jpg",
        width: 1200,
        height: 630,
        alt: "Calculus Bijles Amsterdam - Life Sci & Economie | Stephensprivelessen.nl",
      },
    ],
  },
};

const structuredData = generateSubjectStructuredData({
  title: "Calculus Bijles | Differentiëren & Integreren",
  description: "Professionele calculus bijles voor niet-bèta studenten. Van differentiëren tot integreren, wij maken het begrijpelijk.",
  price: 45,
  priceCurrency: "EUR",
  provider: {
    name: "StephensPrivelessen",
    type: "Person",
  },
  areaServed: "Amsterdam",
  category: ["Life Sciences", "Business & Economics"],
});

export default function CalculusBijlesPage() {
  return (
    <>
      <Script id="calculus-ld+json" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(structuredData)}
      </Script>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">
            Calculus bijles voor niet-bèta studenten
          </h1>
          <div className="mb-6">
            <Link href="/bijles/amsterdam" className="text-blue-600 hover:underline">
              &laquo; Terug naar Bijles Amsterdam Overzicht
            </Link>
          </div>
          
          <p className="text-xl mb-8">
            Calculus hoeft niet ingewikkeld te zijn. Wij maken differentiëren en integreren 
            begrijpelijk met praktische voorbeelden uit jouw vakgebied.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card>
              <CardHeader>
                <CardTitle>Differentiëren</CardTitle>
                <CardDescription>Van basis tot gevorderd</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Afgeleiden berekenen</li>
                  <li>Kettingregel & productregel</li>
                  <li>Partiële afgeleiden</li>
                  <li>Toegepaste voorbeelden</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Integreren</CardTitle>
                <CardDescription>Van basis tot gevorderd</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Bepaalde & onbepaalde integralen</li>
                  <li>Substitutie & partiële integratie</li>
                  <li>Toegepaste integralen</li>
                  <li>Praktijkvoorbeelden</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold mb-4">Onze aanpak</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Praktijkgericht</h3>
                <p>Voorbeelden uit jouw vakgebied</p>
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
              <li>Life Sciences studenten</li>
              <li>Economie & Business studenten</li>
              <li>Studenten met calculus in hun curriculum</li>
              <li>Iedereen die calculus beter wil begrijpen</li>
            </ul>

            <h2>Wat zeggen studenten?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <blockquote className="border-l-4 border-blue-500 pl-4">
                "Eindelijk begrijp ik differentiëren! De praktijkvoorbeelden uit mijn vakgebied helpen enorm."
                <footer className="mt-2 text-sm">- Lisa, Life Sciences</footer>
              </blockquote>
              <blockquote className="border-l-4 border-blue-500 pl-4">
                "De stapsgewijze aanpak heeft me door mijn calculus tentamen geholpen. Zeer aan te raden!"
                <footer className="mt-2 text-sm">- Thomas, Economie</footer>
              </blockquote>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold mb-6">Veelgestelde Vragen - Calculus</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Wat is calculus en waarom is het belangrijk?</h3>
                <p className="text-gray-700">Calculus is de wiskunde van verandering en beweging. Het is essentieel voor life sciences (groei van populaties, medicijnconcentraties) en economie (marginale kosten, optimalisatie).</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Hoe lang duurt het om calculus onder de knie te krijgen?</h3>
                <p className="text-gray-700">Met onze 1-op-1 begeleiding zien studenten meestal binnen 4-6 lessen significante verbetering. Het hangt af van je basiskennis en hoeveel tijd je erin steekt.</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Welke calculus onderwerpen behandelen jullie?</h3>
                <p className="text-gray-700">We behandelen differentiëren (afgeleiden, kettingregel), integreren (bepaalde/onbepaalde integralen, substitutie) en toegepaste calculus voor jouw vakgebied.</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Is calculus bijles ook geschikt voor beginners?</h3>
                <p className="text-gray-700">Ja, we beginnen altijd bij jouw niveau. Of je nu helemaal opnieuw wilt beginnen of specifieke onderwerpen wilt oefenen - we passen ons aan.</p>
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