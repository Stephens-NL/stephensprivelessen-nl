import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { generateCampusStructuredData } from "@/lib/structured-data";
import Script from "next/script";
import Link from "next/link";

export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  title: "UvA Bijles Amsterdam | Science Park & Roeterseiland",
  description: "Bijles voor UvA studenten op Science Park en Roeterseiland. Statistiek, calculus, Python & R.",
  keywords: [
    'uva bijles amsterdam',
    'science park bijles',
    'roeterseiland bijles',
    'uva studenten bijles',
    'statistiek uva',
    'calculus uva',
    'python uva'
  ],
  openGraph: {
    title: "UvA Bijles Amsterdam | Science Park & Roeterseiland",
    description: "Bijles voor UvA studenten op Science Park en Roeterseiland. Statistiek, calculus, Python & R.",
    images: [
      {
        url: "/api/og?title=UvA%20Bijles%20A'dam&brandText=Stephensprivelessen.nl&buttonText=Meer%20info&footerText=Science%20Park%20%E2%80%A2%20Roeterseiland&featureImageUrl=/images/og-uva-feature.jpg",
        width: 1200,
        height: 630,
        alt: "UvA Bijles Amsterdam - Science Park & Roeters | Stephensprivelessen.nl",
      },
    ],
  },
};

const structuredData = generateCampusStructuredData({
  title: "Bijles voor UvA Studenten | Science Park & Roeterseiland",
  description: "Bijles voor UvA studenten. Statistiek, calculus en programmeren op Science Park en Roeterseiland.",
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
              « Terug naar Bijles Amsterdam Overzicht
            </Link>
          </div>
          
          <p className="text-xl mb-8">
            Speciaal voor UvA studenten: bijles op Science Park en Roeterseiland. 
            Van statistiek tot programmeren, wij helpen je door je studie.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card>
              <CardHeader>
                <CardTitle>Science Park</CardTitle>
                <CardDescription>Voor life sciences & bèta studies</CardDescription>
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
                  <li>Scriptiebegeleiding</li>
                  <li>Data analyse</li>
                  <li>Centrale locatie</li>
                </ul>
              </CardContent>
            </Card>
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