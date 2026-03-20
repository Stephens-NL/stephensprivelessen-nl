import Script from "next/script";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { generateCampusStructuredData } from "@/lib/structured-data";
import { getLocale } from "next-intl/server";

export const revalidate = 3600; // Revalidate every hour

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isNl = locale === 'nl';
  return {
    title: isNl
      ? "VU Bijles Amsterdam | Campus & Zuidas"
      : "VU Tutoring Amsterdam | Campus & Zuidas",
    description: isNl
      ? "Bijles voor VU studenten op campus en Zuidas. Statistiek, econometrie, Python & R."
      : "Tutoring for VU students on campus and Zuidas. Statistics, econometrics, Python & R.",
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
      title: isNl
        ? "VU Bijles Amsterdam | Campus & Zuidas"
        : "VU Tutoring Amsterdam | Campus & Zuidas",
      description: isNl
        ? "Bijles voor VU studenten op campus en Zuidas. Statistiek, econometrie, Python & R."
        : "Tutoring for VU students on campus and Zuidas. Statistics, econometrics, Python & R.",
      images: [
        {
          url: `/api/og?title=${encodeURIComponent("VU Bijles A'dam")}&brandText=Stephensprivelessen.nl&buttonText=${encodeURIComponent(isNl ? "Meer info" : "More info")}&footerText=${encodeURIComponent("VU Campus \u2022 Zuidas")}&featureImageUrl=/images/og-vu-feature.jpg`,
          width: 1200,
          height: 630,
          alt: isNl
            ? "VU Bijles Amsterdam - Campus & Zuidas | Stephensprivelessen.nl"
            : "VU Tutoring Amsterdam - Campus & Zuidas | Stephensprivelessen.nl",
        },
      ],
    },
  };
}

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

export default async function VUBijlesPage() {
  const locale = await getLocale();
  const isNl = locale === "nl";

  return (
    <>
      <Script id="vu-ld+json" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(structuredData)}
      </Script>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">
            {isNl ? "Bijles voor VU studenten" : "Tutoring for VU students"}
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
              ? "Speciaal voor VU studenten: online bijles of op Science Park. Van statistiek tot programmeren, wij helpen je door je studie."
              : "Specifically for VU students: online tutoring or at Science Park. From statistics to programming, we'll help you through your degree."}
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
                  <li>{isNl ? "Statistiek & SPSS" : "Statistics & SPSS"}</li>
                  <li>{isNl ? "Calculus & wiskunde" : "Calculus & mathematics"}</li>
                  <li>{isNl ? "Python & R programmeren" : "Python & R programming"}</li>
                  <li>{isNl ? "Vanaf je eigen kamer" : "From your own room"}</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Science Park</CardTitle>
                <CardDescription>
                  {isNl ? "Voor alle studies" : "For all degree programmes"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>{isNl ? "Econometrie" : "Econometrics"}</li>
                  <li>{isNl ? "Business analytics" : "Business analytics"}</li>
                  <li>{isNl ? "Data analyse" : "Data analysis"}</li>
                  <li>
                    {isNl
                      ? "Goed bereikbaar vanaf VU"
                      : "Easy to reach from VU campus"}
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
                ? "Onze bijleslocatie ligt op Science Park, goed bereikbaar vanaf de VU campus. Perfect voor alle VU studenten."
                : "Our tutoring location is at Science Park, easily accessible from the VU campus. Perfect for all VU students."}
            </p>
            <ul>
              <li>
                {isNl
                  ? "Goed bereikbaar vanaf VU campus"
                  : "Easy to reach from VU campus"}
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
