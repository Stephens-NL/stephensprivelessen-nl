import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { generateCampusStructuredData } from "@/lib/structured-data";
import Script from "next/script";
import Link from "next/link";

export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  title: "Bijles voor VU Studenten | Campus & Zuidas",
  description: "Professionele bijles voor VU studenten. Statistiek, calculus en programmeren bijles op de VU campus en Zuidas. Studentenkorting!",
  openGraph: {
    title: "VU Bijles Amsterdam | Campus & Zuidas",
    description: "Professionele bijles voor VU studenten. Statistiek, calculus en programmeren bijles op de VU campus en Zuidas. Studentenkorting!",
    images: [
      {
        url: "/api/og?title=VU%20Bijles%20Amsterdam&brandText=Stephensprivelessen.nl&buttonText=Details%20VU&footerText=VU%3A%20Campus%20%26%20Zuidas&featureImageUrl=/images/og-vu-feature.jpg",
        width: 1200,
        height: 630,
        alt: "VU Bijles Amsterdam - Campus & Zuidas | Stephensprivelessen.nl",
      },
    ],
  },
};

const structuredData = generateCampusStructuredData({
  title: "Bijles voor VU Studenten | Campus & Zuidas",
  description: "Professionele bijles voor VU studenten. Statistiek, calculus en programmeren bijles op de VU campus en Zuidas.",
  price: 40,
  priceCurrency: "EUR",
  provider: {
    name: "StephensPrivelessen",
    type: "Person",
  },
  areaServed: "VU Campus, Amsterdam",
  category: ["Psychology", "Business & Economics", "Life Sciences"],
});

export default function VUBijlesPage() {
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
            Bijles voor VU studenten
          </h1>
          <div className="mb-6">
            <Link href="/bijles/amsterdam" className="text-blue-600 hover:underline">
              &laquo; Terug naar Bijles Amsterdam Overzicht
            </Link>
          </div>
          
          <p className="text-xl mb-8">
            Speciaal voor VU studenten: professionele bijles op de VU campus en Zuidas. 
            Van statistiek tot programmeren, wij helpen je door je studie.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card>
              <CardHeader>
                <CardTitle>VU Campus</CardTitle>
                <CardDescription>Voor alle faculteiten</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Statistiek & SPSS</li>
                  <li>Calculus & wiskunde</li>
                  <li>Python & R programmeren</li>
                  <li>5 minuten lopen van VU campus</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Zuidas</CardTitle>
                <CardDescription>Voor economie & business</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Econometrie</li>
                  <li>Business analytics</li>
                  <li>Data analyse</li>
                  <li>Centrale locatie</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold mb-4">VU Studentenkorting</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Regulier tarief</h3>
                <p className="text-2xl font-bold">€45/uur</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">VU studenten</h3>
                <p className="text-2xl font-bold">€40/uur</p>
                <p className="text-sm">Toon je studentenpas</p>
              </div>
            </div>
          </div>

          <div className="prose max-w-none">
            <h2>Routebeschrijving</h2>
            
            <h3>VU Campus</h3>
            <p>
              Onze bijleslocatie ligt op 5 minuten lopen van de VU campus. 
              Perfect voor studenten van alle faculteiten.
            </p>
            <ul>
              <li>5 minuten lopen van VU campus</li>
              <li>Gratis parkeren mogelijk</li>
              <li>Goed bereikbaar met metro 50</li>
            </ul>

            <h3>Zuidas</h3>
            <p>
              Centrale locatie voor studenten van de School of Business and Economics (SBE).
            </p>
            <ul>
              <li>10 minuten lopen van VU campus</li>
              <li>Dichtbij Zuidas metro</li>
              <li>Studievriendelijke omgeving</li>
            </ul>

            <h2>Wat zeggen VU studenten?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <blockquote className="border-l-4 border-blue-500 pl-4">
                "De bijles op de VU campus was perfect voor mijn econometrie tentamen. 
                Eindelijk begreep ik de stof!"
                <footer className="mt-2 text-sm">- Emma, Economie</footer>
              </blockquote>
              <blockquote className="border-l-4 border-blue-500 pl-4">
                "De Python begeleiding heeft me echt geholpen met mijn data science project. 
                Zeer aan te raden!"
                <footer className="mt-2 text-sm">- David, Business Analytics</footer>
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