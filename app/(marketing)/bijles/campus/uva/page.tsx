import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { generateCampusStructuredData } from "@/lib/structured-data";
import Script from "next/script";
import Link from "next/link";

export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  title: "UvA Bijles Amsterdam | Science Park & Roeterseiland - Studentenkorting",
  description: "Bijles voor UvA studenten op Science Park en Roeterseiland. Statistiek, calculus, Python & R. Studentenkorting €40/uur. 5 minuten van campus.",
  keywords: [
    'uva bijles amsterdam',
    'science park bijles',
    'roeterseiland bijles',
    'uva studenten bijles',
    'statistiek uva',
    'calculus uva',
    'python uva',
    'studentenkorting bijles'
  ],
  openGraph: {
    title: "UvA Bijles Amsterdam | Science Park & Roeterseiland",
    description: "Bijles voor UvA studenten op Science Park en Roeterseiland. Statistiek, calculus, Python & R. Studentenkorting €40/uur.",
    images: [
      {
        url: "/api/og?title=UvA%20Bijles%20A'dam&brandText=Stephensprivelessen.nl&buttonText=Studentenkorting&footerText=Science%20Park%20%E2%80%A2%20Roeterseiland&featureImageUrl=/images/og-uva-feature.jpg",
        width: 1200,
        height: 630,
        alt: "UvA Bijles Amsterdam - Science Park & Roeters | Stephensprivelessen.nl",
      },
    ],
  },
};

const structuredData = generateCampusStructuredData({
  title: "Bijles voor UvA Studenten | Science Park & Roeterseiland",
  description: "Professionele bijles voor UvA studenten. Statistiek, calculus en programmeren bijles op Science Park en Roeterseiland. Studentenkorting!",
  price: 40, // Student price
  priceCurrency: "EUR",
  provider: {
    name: "StephensPrivelessen",
    type: "Person",
  },
  areaServed: "Amsterdam UvA Science Park, Amsterdam UvA Roeterseiland",
  category: ["University Tutoring", "STEM Tutoring", "Social Sciences Tutoring"],
});

export default function UVABijlesPage() {
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
            Bijles voor UvA studenten
          </h1>
          <div className="mb-6">
            <Link href="/bijles/amsterdam" className="text-blue-600 hover:underline">
              &laquo; Terug naar Bijles Amsterdam Overzicht
            </Link>
          </div>
          
          <p className="text-xl mb-8">
            Speciaal voor UvA studenten: professionele bijles op Science Park en Roeterseiland. 
            Van statistiek tot programmeren, wij helpen je door je studie.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card>
              <CardHeader>
                <CardTitle>Science Park</CardTitle>
                <CardDescription>Voor life sciences & beta studies</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Calculus & wiskunde</li>
                  <li>Python & R programmeren</li>
                  <li>Statistische analyses</li>
                  <li>5 minuten lopen van Science Park</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Roeterseiland</CardTitle>
                <CardDescription>Voor sociale wetenschappen</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>SPSS & statistiek</li>
                  <li>Scriptie begeleiding</li>
                  <li>Data analyse</li>
                  <li>Centrale locatie</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold mb-4">UvA Studentenkorting</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Regulier tarief</h3>
                <p className="text-2xl font-bold">€45/uur</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">UvA studenten</h3>
                <p className="text-2xl font-bold">€40/uur</p>
                <p className="text-sm">Toon je studentenpas</p>
              </div>
            </div>
          </div>

          <div className="prose max-w-none">
            <h2>Routebeschrijving</h2>
            
            <h3>Science Park</h3>
            <p>
              Onze bijleslocatie ligt op 5 minuten lopen van Science Park. 
              Perfect voor studenten van de Faculteit der Natuurwetenschappen, Wiskunde en Informatica (FNWI).
            </p>
            <ul>
              <li>5 minuten lopen van Science Park</li>
              <li>Gratis parkeren mogelijk</li>
              <li>Goed bereikbaar met bus 40</li>
            </ul>

            <h3>Roeterseiland</h3>
            <p>
              Centrale locatie voor studenten van de Faculteit der Maatschappij- en Gedragswetenschappen (FMG).
            </p>
            <ul>
              <li>10 minuten lopen van Roeterseiland</li>
              <li>Dichtbij Weesperplein metro</li>
              <li>Studievriendelijke omgeving</li>
            </ul>

            <h2>Wat zeggen UvA studenten?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <blockquote className="border-l-4 border-blue-500 pl-4">
                "De bijles op Science Park was perfect voor mijn calculus tentamen. 
                Eindelijk begreep ik de stof!"
                <footer className="mt-2 text-sm">- Lisa, Psychologie</footer>
              </blockquote>
              <blockquote className="border-l-4 border-blue-500 pl-4">
                "De SPSS begeleiding heeft me echt geholpen met mijn scriptie. 
                Zeer aan te raden!"
                <footer className="mt-2 text-sm">- Thomas, Economie</footer>
              </blockquote>
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