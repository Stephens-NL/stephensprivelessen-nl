import { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { generateCampusStructuredData } from "@/lib/structured-data";

export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  title: "VU Bijles Amsterdam | Campus & Zuidas",
  description: "Bijles voor VU studenten op campus en Zuidas. Statistiek, econometrie, Python & R.",
  keywords: [
    'vu bijles amsterdam',
    'vu campus bijles',
    'zuidas bijles',
    'vu studenten bijles',
    'econometrie vu',
    'statistiek vu',
    'python vu'
  ],
  openGraph: {
    title: "VU Bijles Amsterdam | Campus & Zuidas",
    description: "Bijles voor VU studenten op campus en Zuidas. Statistiek, econometrie, Python & R.",
    images: [
      {
        url: "/api/og?title=VU%20Bijles%20A'dam&brandText=Stephensprivelessen.nl&buttonText=Meer%20info&footerText=VU%20Campus%20%E2%80%A2%20Zuidas&featureImageUrl=/images/og-vu-feature.jpg",
        width: 1200,
        height: 630,
        alt: "VU Bijles Amsterdam - Campus & Zuidas | Stephensprivelessen.nl",
      },
    ],
  },
};

const structuredData = generateCampusStructuredData({
      title: "Bijles voor VU Studenten | Online & Science Park",
  description: "Bijles voor VU studenten. Statistiek, calculus en programmeren online of op Science Park.",
  provider: {
    name: "StephensPrivelessen",
    type: "Person",
  },
  areaServed: "Science Park, Online",
  category: ["Psychology", "Business & Economics", "Life Sciences"],
});

export default function VUBijlesPage() {
  return (
    <>
      <Script id="vu-ld+json" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(structuredData)}
      </Script>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">
            Bijles voor VU studenten
          </h1>
          <div className="mb-6">
            <Link href="/bijles/amsterdam" className="text-blue-600 hover:underline">
              « Terug naar Bijles Amsterdam Overzicht
            </Link>
          </div>
          
          <p className="text-xl mb-8">
            Speciaal voor VU studenten: online bijles of op Science Park. 
            Van statistiek tot programmeren, wij helpen je door je studie.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card>
              <CardHeader>
                <CardTitle>Online Bijles</CardTitle>
                <CardDescription>Flexibel en comfortabel</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Statistiek & SPSS</li>
                  <li>Calculus & wiskunde</li>
                  <li>Python & R programmeren</li>
                  <li>Vanaf je eigen kamer</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Science Park</CardTitle>
                <CardDescription>Voor alle studies</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Econometrie</li>
                  <li>Business analytics</li>
                  <li>Data analyse</li>
                  <li>Goed bereikbaar vanaf VU</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="prose max-w-none">
            <h2>Locaties</h2>
            
            <h3>Online Bijles</h3>
            <p>
              Flexibele online bijles via Zoom of Teams. Perfect voor drukke studenten die 
              tijd willen besparen op reizen. Alle vakken beschikbaar.
            </p>
            <ul>
              <li>Geen reistijd</li>
              <li>Flexibele planning</li>
              <li>Screen sharing mogelijk</li>
            </ul>

            <h3>Science Park</h3>
            <p>
              Onze bijleslocatie ligt op Science Park, goed bereikbaar vanaf de VU campus. 
              Perfect voor alle VU studenten.
            </p>
            <ul>
              <li>Goed bereikbaar vanaf VU campus</li>
              <li>Gratis parkeren mogelijk</li>
              <li>Goed bereikbaar met bus 40</li>
            </ul>
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