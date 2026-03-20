import { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { generateStructuredData } from "@/lib/structured-data";
import { getLocale } from "next-intl/server";

export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  title: "Bijles Amsterdam voor UvA & VU | Statistiek, Calculus & Programmeren",
  description: "Bijles Amsterdam: Statistiek (SPSS, R), calculus & programmeren. Online of Science Park. 4-uurs pakketten v.a. €240. UvA & VU studenten. 1-op-1 begeleiding.",
  keywords: [
    'bijles amsterdam',
    'statistiek bijles amsterdam',
    'calculus bijles amsterdam',
    'programmeren bijles amsterdam',
    'uva bijles',
    'vu bijles',
    'spss hulp amsterdam',
    'r tutor amsterdam'
  ],
  openGraph: {
    title: "Bijles Amsterdam | Statistiek, Calculus & Programmeren",
    description: "Bijles Amsterdam: Statistiek (SPSS, R), calculus & programmeren. Online of Science Park. 4-uurs pakketten v.a. €240. UvA & VU studenten.",
    images: [
      {
        url: "/api/og?title=Bijles%20Amsterdam&brandText=Stephensprivelessen.nl&buttonText=Boek%20les&footerText=Statistiek%20%E2%80%A2%20Calculus%20%E2%80%A2%20Programmeren&featureImageUrl=/images/og-default-feature.jpg",
        width: 1200,
        height: 630,
        alt: "Top Bijles Amsterdam - Alle Vakken | Stephensprivelessen.nl",
      },
    ],
  },
};

const structuredData = generateStructuredData({
  title: "Bijles in Amsterdam | Statistiek, Calculus & Programmeren",
  description: "Professionele bijles in Amsterdam voor statistiek, calculus en programmeren.",
  provider: {
    name: "StephensPrivelessen",
    type: "Person",
  },
  areaServed: "Amsterdam",
  category: ["Psychology", "Business & Economics", "Life Sciences"],
  educationalProgramMode: "One-on-one tutoring",
  timeToComplete: "PT90M",
});

export default async function AmsterdamBijlesPage() {
  const locale = await getLocale();
  const isNl = locale === "nl";

  return (
    <>
      <Script id="amsterdam-ld+json" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(structuredData)}
      </Script>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">
            {isNl
              ? "Bijles in Amsterdam voor niet-bèta studenten"
              : "Tutoring in Amsterdam for non-STEM students"}
          </h1>

          <p className="text-xl mb-8">
            {isNl
              ? "Geen wiskunde-nerd? Hoeft ook niet. In 90 minuten snap jij χ²-tests of integreren zó dat je tentamen doorkomt."
              : "Not a maths nerd? No problem. In 90 minutes you'll understand χ²-tests or integration well enough to pass your exam."}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card>
              <CardHeader>
                <CardTitle>{isNl ? "Statistiek & SPSS" : "Statistics & SPSS"}</CardTitle>
                <CardDescription>
                  {isNl
                    ? "Voor psychologie, economie & business"
                    : "For psychology, economics & business"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>{isNl ? "SPSS begeleiding" : "SPSS guidance"}</li>
                  <li>{isNl ? "Statistische analyses" : "Statistical analyses"}</li>
                  <li>{isNl ? "Scriptie ondersteuning" : "Thesis support"}</li>
                </ul>
                <Button className="mt-4" asChild>
                  <Link href="/bijles/onderwerp/statistiek/psychologie">
                    {isNl ? "Meer info" : "More info"}
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{isNl ? "Calculus & Wiskunde" : "Calculus & Mathematics"}</CardTitle>
                <CardDescription>
                  {isNl ? "Voor life sciences & economie" : "For life sciences & economics"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>{isNl ? "Differentiëren & integreren" : "Differentiation & integration"}</li>
                  <li>{isNl ? "Lineaire algebra" : "Linear algebra"}</li>
                  <li>{isNl ? "Toegepaste wiskunde" : "Applied mathematics"}</li>
                </ul>
                <Button className="mt-4" asChild>
                  <Link href="/bijles/onderwerp/calculus">
                    {isNl ? "Meer info" : "More info"}
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{isNl ? "Programmeren" : "Programming"}</CardTitle>
                <CardDescription>
                  {isNl ? "Python & R voor data-analyse" : "Python & R for data analysis"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>{isNl ? "Python voor data science" : "Python for data science"}</li>
                  <li>{isNl ? "R Studio begeleiding" : "R Studio guidance"}</li>
                  <li>{isNl ? "Data visualisatie" : "Data visualisation"}</li>
                </ul>
                <Button className="mt-4" asChild>
                  <Link href="/bijles/onderwerp/programmeren">
                    {isNl ? "Meer info" : "More info"}
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{isNl ? "Campus Specifiek" : "Campus-specific"}</CardTitle>
                <CardDescription>
                  {isNl ? "UvA & VU studenten" : "UvA & VU students"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>UvA - Science Park & Roeters</li>
                  <li>VU - Campus & Zuidas</li>
                </ul>
                <div className="mt-4 space-x-2">
                  <Button asChild>
                    <Link href="/bijles/campus/uva">Info UvA</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/bijles/campus/vu">Info VU</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-[var(--cream-dark)] p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold mb-4">
              {isNl ? "Spoed hulp nodig?" : "Need urgent help?"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">
                  {isNl ? "Tentamen over 10 dagen?" : "Exam in 10 days?"}
                </h3>
                <p>
                  {isNl
                    ? "Boek een spoedtraject en haal dat tentamen!"
                    : "Book an intensive crash course and pass that exam!"}
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">
                  {isNl ? "Scriptie vast op statistiek?" : "Stuck on thesis statistics?"}
                </h3>
                <p>
                  {isNl
                    ? "48-uurs hulplijn voor scriptiebegeleiding"
                    : "48-hour helpline for thesis guidance"}
                </p>
              </div>
            </div>
          </div>

          <div className="prose max-w-none">
            <h2>{isNl ? "Waarom bijles in Amsterdam?" : "Why tutoring in Amsterdam?"}</h2>
            <p>
              {isNl
                ? "Als niet-bèta student kan wiskunde, statistiek of programmeren overweldigend zijn. Onze bijles is speciaal gericht op jouw studie en leerstijl. Geen ingewikkelde theorie, maar praktische uitleg die je direct kunt toepassen."
                : "As a non-STEM student, maths, statistics or programming can feel overwhelming. Our tutoring is tailored to your degree and learning style — no convoluted theory, just practical explanations you can apply immediately."}
            </p>

            <h2>{isNl ? "Onze aanpak" : "Our approach"}</h2>
            <ul>
              <li>{isNl ? "1-op-1 begeleiding op jouw tempo" : "1-on-1 tutoring at your own pace"}</li>
              <li>
                {isNl
                  ? "Praktijkgerichte voorbeelden uit jouw vakgebied"
                  : "Practical examples from your own field of study"}
              </li>
              <li>
                {isNl
                  ? "Flexibele planning, ook 's avonds mogelijk"
                  : "Flexible scheduling, including evenings"}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
