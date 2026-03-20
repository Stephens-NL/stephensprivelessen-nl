import { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { generateSubjectStructuredData } from "@/lib/structured-data";
import { getLocale } from "next-intl/server";

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
  price: 240, // Vanaf €240 (VO online 4 uur, 1 leerling) — laagste standaardtarief
  priceCurrency: "EUR",
  provider: {
    name: "StephensPrivelessen",
    type: "Person",
  },
  areaServed: "Amsterdam",
  category: ["Psychology", "Business & Economics", "Life Sciences"],
});

export default async function ProgrammerenBijlesPage() {
  const locale = await getLocale();
  const isNl = locale === "nl";

  return (
    <>
      <Script id="programmeren-ld+json" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(structuredData)}
      </Script>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">
            {isNl
              ? "Programmeren bijles voor niet-bèta studenten"
              : "Programming tutoring for non-STEM students"}
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
              ? "Programmeren hoeft niet moeilijk te zijn. Wij leren je Python en R op een praktische manier, speciaal voor data science en statistiek."
              : "Programming doesn't have to be hard. We teach you Python and R in a practical way, tailored specifically for data science and statistics."}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card>
              <CardHeader>
                <CardTitle>{isNl ? "Python voor Data Science" : "Python for Data Science"}</CardTitle>
                <CardDescription>
                  {isNl ? "Van basis tot gevorderd" : "From beginner to advanced"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>{isNl ? "Data manipulatie met Pandas" : "Data manipulation with Pandas"}</li>
                  <li>{isNl ? "Statistische analyses" : "Statistical analyses"}</li>
                  <li>{isNl ? "Data visualisatie" : "Data visualisation"}</li>
                  <li>{isNl ? "Machine learning basics" : "Machine learning basics"}</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>R Studio & {isNl ? "Statistiek" : "Statistics"}</CardTitle>
                <CardDescription>
                  {isNl
                    ? "Voor psychologie & onderzoek"
                    : "For psychology & research"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>{isNl ? "R Studio begeleiding" : "R Studio guidance"}</li>
                  <li>{isNl ? "Statistische analyses" : "Statistical analyses"}</li>
                  <li>{isNl ? "Data visualisatie" : "Data visualisation"}</li>
                  <li>{isNl ? "Scriptie ondersteuning" : "Thesis support"}</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="bg-[var(--cream-dark)] p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold mb-4">
              {isNl ? "Onze aanpak" : "Our approach"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">
                  {isNl ? "Praktijkgericht" : "Hands-on"}
                </h3>
                <p>{isNl ? "Echte data uit jouw vakgebied" : "Real data from your field of study"}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">
                  {isNl ? "Stapsgewijs" : "Step by step"}
                </h3>
                <p>{isNl ? "Van basis tot gevorderd niveau" : "From beginner to advanced level"}</p>
              </div>
            </div>
          </div>

          <div className="prose max-w-none">
            <h2>{isNl ? "Voor wie is deze bijles?" : "Who is this tutoring for?"}</h2>
            <ul>
              <li>{isNl ? "Psychologie studenten" : "Psychology students"}</li>
              <li>{isNl ? "Business & Economics studenten" : "Business & Economics students"}</li>
              <li>{isNl ? "Life Sciences studenten" : "Life Sciences students"}</li>
              <li>
                {isNl
                  ? "Iedereen die wil leren programmeren"
                  : "Anyone who wants to learn to code"}
              </li>
            </ul>

            <h2>{isNl ? "Wat zeggen studenten?" : "What students say"}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <blockquote className="border-l-4 border-[var(--ink)] pl-4">
                {isNl
                  ? "\"De Python begeleiding heeft me echt geholpen met mijn data science project. Eindelijk begrijp ik hoe ik data kan analyseren!\""
                  : "\"The Python tutoring really helped me with my data science project. I finally understand how to analyse data!\""}
                <footer className="mt-2 text-sm">- Sarah, {isNl ? "Psychologie" : "Psychology"}</footer>
              </blockquote>
              <blockquote className="border-l-4 border-[var(--ink)] pl-4">
                {isNl
                  ? "\"R Studio is nu een stuk duidelijker. De praktijkvoorbeelden uit mijn vakgebied maken het veel begrijpelijker.\""
                  : "\"R Studio is so much clearer now. The real-world examples from my field make everything so much easier to understand.\""}
                <footer className="mt-2 text-sm">- Mark, Business Analytics</footer>
              </blockquote>
            </div>
          </div>

          <div className="bg-[var(--cream-dark)] p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold mb-6">
              {isNl ? "Veelgestelde Vragen - Python & R" : "FAQ - Python & R"}
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  {isNl
                    ? "Moet ik al kunnen programmeren voor deze bijles?"
                    : "Do I need any prior programming experience?"}
                </h3>
                <p className="text-[var(--warm-text)]">
                  {isNl
                    ? "Nee, we beginnen bij de basis. We leren je Python en R vanaf het begin, speciaal gericht op data science en statistiek voor jouw vakgebied."
                    : "No, we start from scratch. We teach you Python and R from the ground up, with a focus on data science and statistics for your specific field."}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  {isNl
                    ? "Wat is het verschil tussen Python en R?"
                    : "What is the difference between Python and R?"}
                </h3>
                <p className="text-[var(--warm-text)]">
                  {isNl
                    ? "Python is veelzijdiger en populair in data science, machine learning en business analytics. R is specifiek ontwikkeld voor statistiek en wordt veel gebruikt in psychologie en life sciences onderzoek."
                    : "Python is more versatile and popular in data science, machine learning and business analytics. R was built specifically for statistics and is widely used in psychology and life sciences research."}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  {isNl
                    ? "Welke tools gebruiken jullie tijdens de lessen?"
                    : "Which tools do you use during sessions?"}
                </h3>
                <p className="text-[var(--warm-text)]">
                  {isNl
                    ? "We gebruiken Jupyter Notebooks voor Python, R Studio voor R, en werken met echte datasets uit jouw vakgebied. Je krijgt ook toegang tot onze oefenmaterialen."
                    : "We use Jupyter Notebooks for Python, R Studio for R, and work with real datasets from your field. You also get access to our practice materials."}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  {isNl
                    ? "Kan ik ook hulp krijgen met mijn scriptie data analyse?"
                    : "Can you help with the data analysis for my thesis?"}
                </h3>
                <p className="text-[var(--warm-text)]">
                  {isNl
                    ? "Ja, we helpen je graag met data analyse voor je scriptie. Van data cleaning tot statistische analyses en visualisaties - we begeleiden je door het hele proces."
                    : "Yes, we're happy to help with thesis data analysis. From data cleaning to statistical analyses and visualisations — we guide you through the entire process."}
                </p>
              </div>
            </div>
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
