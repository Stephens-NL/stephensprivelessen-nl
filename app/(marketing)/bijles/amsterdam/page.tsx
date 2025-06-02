import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { generateStructuredData } from "@/lib/structured-data";
import Script from "next/script";

export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  title: "Bijles in Amsterdam | Statistiek, Calculus & Programmeren",
  description: "Professionele bijles in Amsterdam voor statistiek, calculus en programmeren. Speciaal voor UvA & VU studenten. Boek direct je eerste les!",
  openGraph: {
    title: "Bijles in Amsterdam | Statistiek, Calculus & Programmeren",
    description: "Professionele bijles in Amsterdam voor statistiek, calculus en programmeren. Speciaal voor UvA & VU studenten. Boek direct je eerste les!",
    images: [
      {
        url: "/api/og?title=Top%20Bijles%20Amsterdam&brandText=Stephensprivelessen.nl&buttonText=Meer%20Info&footerText=Alle%20Vakken%20-%20Amsterdam&featureImageUrl=/images/og-default-feature.jpg",
        width: 1200,
        height: 630,
        alt: "Top Bijles Amsterdam - Alle Vakken | Stephensprivelessen.nl",
      },
    ],
  },
};

const structuredData = generateStructuredData({
  title: "Bijles in Amsterdam | Statistiek, Calculus & Programmeren",
  description: "Professionele bijles in Amsterdam voor statistiek, calculus en programmeren. Speciaal voor UvA & VU studenten.",
  price: 45,
  priceCurrency: "EUR",
  provider: {
    name: "StephensPrivelessen",
    type: "Person",
  },
  areaServed: "Amsterdam",
  category: ["Psychology", "Business & Economics", "Life Sciences"],
  educationalProgramMode: "One-on-one tutoring",
  timeToComplete: "PT90M", // 90 minutes
});

export default function AmsterdamBijlesPage() {
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
            Bijles in Amsterdam voor niet-bèta studenten
          </h1>
          
          <p className="text-xl mb-8">
            Geen wiskunde-nerd? Hoeft ook niet. In 90 minuten snap jij χ²-tests of integreren zó dat je tentamen doorkomt.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card>
              <CardHeader>
                <CardTitle>Statistiek & SPSS</CardTitle>
                <CardDescription>Voor psychologie, economie & business</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>SPSS begeleiding</li>
                  <li>Statistische analyses</li>
                  <li>Scriptie ondersteuning</li>
                </ul>
                <Button className="mt-4" asChild>
                  <a href="/bijles/onderwerp/statistiek">Meer info</a>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Calculus & Wiskunde</CardTitle>
                <CardDescription>Voor life sciences & economie</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Differentiëren & integreren</li>
                  <li>Lineaire algebra</li>
                  <li>Toegepaste wiskunde</li>
                </ul>
                <Button className="mt-4" asChild>
                  <a href="/bijles/onderwerp/calculus">Meer info</a>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Programmeren</CardTitle>
                <CardDescription>Python & R voor data-analyse</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Python voor data science</li>
                  <li>R Studio begeleiding</li>
                  <li>Data visualisatie</li>
                </ul>
                <Button className="mt-4" asChild>
                  <a href="/bijles/onderwerp/programmeren">Meer info</a>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Campus Specifiek</CardTitle>
                <CardDescription>UvA & VU studenten</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>UvA Science Park</li>
                  <li>VU Campus</li>
                  <li>Studentenkorting</li>
                </ul>
                <Button className="mt-4" asChild>
                  <a href="/bijles/campus">Meer info</a>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold mb-4">Spoed hulp nodig?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Tentamen over 10 dagen?</h3>
                <p>Boek een spoedtraject en haal dat tentamen!</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Scriptie vast op statistiek?</h3>
                <p>48-uurs hulplijn voor scriptiebegeleiding</p>
              </div>
            </div>
          </div>

          <div className="prose max-w-none">
            <h2>Waarom bijles in Amsterdam?</h2>
            <p>
              Als niet-bèta student kan wiskunde, statistiek of programmeren overweldigend zijn. 
              Onze bijles is speciaal gericht op jouw studie en leerstijl. Geen ingewikkelde theorie, 
              maar praktische uitleg die je direct kunt toepassen.
            </p>

            <h2>Onze aanpak</h2>
            <ul>
              <li>1-op-1 begeleiding op jouw tempo</li>
              <li>Praktijkgerichte voorbeelden uit jouw vakgebied</li>
              <li>Flexibele planning, ook 's avonds mogelijk</li>
              <li>Studentenkorting voor UvA & VU studenten</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
} 