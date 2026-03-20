import Script from "next/script";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { generateCampusStructuredData } from "@/lib/structured-data";
import { getLocale } from "next-intl/server";

export const revalidate = 3600; // Revalidate every hour

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isNl = locale === 'nl';
  return {
    title: isNl
      ? "UvA Bijles Amsterdam | Science Park & Roeterseiland"
      : "UvA Tutoring Amsterdam | Science Park & Roeterseiland",
    description: isNl
      ? "Bijles voor UvA studenten op Science Park en Roeterseiland. Statistiek, calculus, Python & R."
      : "Tutoring for UvA students at Science Park and Roeterseiland. Statistics, calculus, Python & R.",
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
      title: isNl
        ? "UvA Bijles Amsterdam | Science Park & Roeterseiland"
        : "UvA Tutoring Amsterdam | Science Park & Roeterseiland",
      description: isNl
        ? "Bijles voor UvA studenten op Science Park en Roeterseiland. Statistiek, calculus, Python & R."
        : "Tutoring for UvA students at Science Park and Roeterseiland. Statistics, calculus, Python & R.",
      images: [
        {
          url: `/api/og?title=${encodeURIComponent("UvA Bijles A'dam")}&brandText=Stephensprivelessen.nl&buttonText=${encodeURIComponent(isNl ? "Meer info" : "More info")}&footerText=${encodeURIComponent("Science Park \u2022 Roeterseiland")}&featureImageUrl=/images/og-uva-feature.jpg`,
          width: 1200,
          height: 630,
          alt: isNl
            ? "UvA Bijles Amsterdam - Science Park & Roeters | Stephensprivelessen.nl"
            : "UvA Tutoring Amsterdam - Science Park & Roeters | Stephensprivelessen.nl",
        },
      ],
    },
  };
}

const structuredData = generateCampusStructuredData({
      title: "Bijles voor UvA Studenten | Online & Science Park",
  description: "Bijles voor UvA studenten. Statistiek, calculus en programmeren online of op Science Park.",
  provider: {
    name: "StephensPrivelessen",
    type: "Person",
  },
  areaServed: "Amsterdam UvA Science Park, Online",
  category: ["University Tutoring", "STEM Tutoring", "Social Sciences Tutoring"],
});

export default async function UVABijlesPage() {
  const locale = await getLocale();
  const isNl = locale === "nl";

  return (
    <>
      <Script id="uva-ld+json" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(structuredData)}
      </Script>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">
            {isNl ? "Bijles voor UvA studenten" : "Tutoring for UvA students"}
          </h1>
          <div className="mb-6">
            <Link href="/bijles/amsterdam" className="text-[var(--ink)] hover:underline">
              {isNl
                ? "« Terug naar Bijles Amsterdam Overzicht"
                : "« Back to Amsterdam Tutoring Overview"}
            </Link>
          </div>

          <p className="text-xl mb-8">
            {isNl
              ? "Speciaal voor UvA studenten: online bijles of op Science Park. Van statistiek tot programmeren, wij helpen je door je studie."
              : "Specifically for UvA students: online tutoring or at Science Park. From statistics to programming, we'll help you through your degree."}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card>
              <CardHeader>
                <CardTitle>{isNl ? "Online Bijles" : "Online Tutoring"}</CardTitle>
                <CardDescription>
                  {isNl ? "Flexibel en comfortabel" : "Flexible and comfortable"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>{isNl ? "Calculus & wiskunde" : "Calculus & mathematics"}</li>
                  <li>{isNl ? "Python & R programmeren" : "Python & R programming"}</li>
                  <li>{isNl ? "Statistische analyses" : "Statistical analyses"}</li>
                  <li>{isNl ? "Vanaf je eigen kamer" : "From your own room"}</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Science Park</CardTitle>
                <CardDescription>
                  {isNl
                    ? "Voor life sciences & bèta studies"
                    : "For life sciences & STEM degrees"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>{isNl ? "SPSS & statistiek" : "SPSS & statistics"}</li>
                  <li>{isNl ? "Scriptiebegeleiding" : "Thesis guidance"}</li>
                  <li>{isNl ? "Data analyse" : "Data analysis"}</li>
                  <li>
                    {isNl
                      ? "5 minuten lopen van Science Park"
                      : "5 minutes' walk from Science Park"}
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="prose max-w-none">
            <h2>{isNl ? "Locaties" : "Locations"}</h2>

            <h3>{isNl ? "Online Bijles" : "Online Tutoring"}</h3>
            <p>
              {isNl
                ? "Flexibele online bijles via Zoom of Teams. Perfect voor drukke studenten die tijd willen besparen op reizen. Alle vakken beschikbaar."
                : "Flexible online tutoring via Zoom or Teams. Perfect for busy students who want to save time commuting. All subjects available."}
            </p>
            <ul>
              <li>{isNl ? "Geen reistijd" : "No travel time"}</li>
              <li>{isNl ? "Flexibele planning" : "Flexible scheduling"}</li>
              <li>{isNl ? "Screen sharing mogelijk" : "Screen sharing available"}</li>
            </ul>

            <h3>Science Park</h3>
            <p>
              {isNl
                ? "Onze bijleslocatie ligt op 5 minuten lopen van Science Park. Perfect voor studenten van de Faculteit der Natuurwetenschappen, Wiskunde en Informatica (FNWI)."
                : "Our tutoring location is a 5-minute walk from Science Park. Perfect for students of the Faculty of Science (FNWI)."}
            </p>
            <ul>
              <li>
                {isNl
                  ? "5 minuten lopen van Science Park"
                  : "5 minutes' walk from Science Park"}
              </li>
              <li>{isNl ? "Gratis parkeren mogelijk" : "Free parking available"}</li>
              <li>
                {isNl
                  ? "Goed bereikbaar met bus 40"
                  : "Easy access by bus 40"}
              </li>
            </ul>
          </div>

          <div className="mt-8">
            <Button size="lg" asChild>
              <Link href="/contact">
                {isNl ? "Boek een proefles" : "Book a trial lesson"}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
