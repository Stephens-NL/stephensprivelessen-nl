import { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { generateSubjectStructuredData } from "@/lib/structured-data";
import { getLocale } from "next-intl/server";

export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  title: "Statistiek Bijles Amsterdam | SPSS voor Psychologie Studenten",
  description: "Statistiek bijles in Amsterdam voor psychologie studenten. SPSS begeleiding, χ²-tests, ANOVA. UvA & VU studenten. Scriptie ondersteuning.",
  keywords: [
    'statistiek bijles amsterdam',
    'spss bijles amsterdam',
    'psychologie statistiek',
    'spss hulp amsterdam',
    'statistiek uva',
    'statistiek vu',
    'chi kwadraat toets',
    'anova bijles'
  ],
  openGraph: {
    title: "Statistiek Bijles Amsterdam | SPSS voor Psychologie",
    description: "Statistiek bijles voor psychologie studenten. SPSS begeleiding, χ²-tests, ANOVA. UvA & VU studenten in Amsterdam.",
    images: [
      {
        url: "/api/og?title=Statistiek%20Bijles%20A'dam&brandText=Stephensprivelessen.nl&buttonText=SPSS%20Hulp&footerText=Psychologie%20%E2%80%A2%20UvA%20%26%20VU&featureImageUrl=/images/og-statistiek-psychologie-feature.jpg",
        width: 1200,
        height: 630,
        alt: "Statistiek Psychologie Bijles Amsterdam (UvA/VU) | Stephensprivelessen.nl",
      },
    ],
  },
};

const structuredData = generateSubjectStructuredData({
  title: "Statistiek Bijles voor Psychologie Studenten | SPSS & Data Analyse",
  description: "Professionele statistiek bijles voor psychologie studenten. SPSS begeleiding, statistische analyses en scriptie ondersteuning.",
  price: 240, // Vanaf €240 (VO online 4 uur, 1 leerling) — laagste standaardtarief
  priceCurrency: "EUR",
  provider: {
    name: "StephensPrivelessen",
    type: "Person",
  },
  areaServed: "Amsterdam",
  category: ["Psychology", "Social Sciences", "Research Methods"],
});

export default async function StatistiekPsychologiePage() {
  const locale = await getLocale();
  const isNl = locale === "nl";

  return (
    <>
      <Script id="psychologie-ld+json" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(structuredData)}
      </Script>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">
            {isNl
              ? "Statistiek bijles voor psychologie studenten"
              : "Statistics tutoring for psychology students"}
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
              ? "Van SPSS tot χ²-tests: maak statistiek begrijpelijk met praktijkvoorbeelden uit de psychologie."
              : "From SPSS to χ²-tests: make statistics understandable with real examples from psychology."}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card>
              <CardHeader>
                <CardTitle>{isNl ? "SPSS Begeleiding" : "SPSS Guidance"}</CardTitle>
                <CardDescription>
                  {isNl
                    ? "Van data invoer tot output interpretatie"
                    : "From data entry to output interpretation"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>{isNl ? "Data invoer & voorbereiding" : "Data entry & preparation"}</li>
                  <li>{isNl ? "Betrouwbaarheidsanalyses" : "Reliability analyses"}</li>
                  <li>{isNl ? "Factor analyses" : "Factor analyses"}</li>
                  <li>{isNl ? "Output interpretatie" : "Output interpretation"}</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{isNl ? "Statistische Analyses" : "Statistical Analyses"}</CardTitle>
                <CardDescription>
                  {isNl ? "Voor tentamens & scripties" : "For exams & theses"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>{isNl ? "T-toetsen & ANOVA" : "T-tests & ANOVA"}</li>
                  <li>{isNl ? "Correlaties & regressie" : "Correlations & regression"}</li>
                  <li>{isNl ? "Chi-kwadraat toetsen" : "Chi-square tests"}</li>
                  <li>{isNl ? "Non-parametrische tests" : "Non-parametric tests"}</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="bg-[var(--cream-dark)] p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold mb-4">
              {isNl ? "Scriptie hulp nodig?" : "Need help with your thesis?"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">
                  {isNl ? "Statistische analyses" : "Statistical analyses"}
                </h3>
                <p>
                  {isNl
                    ? "Van onderzoeksvraag tot resultaten"
                    : "From research question to results"}
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">SPSS output</h3>
                <p>
                  {isNl
                    ? "Professionele interpretatie van je data"
                    : "Professional interpretation of your data"}
                </p>
              </div>
            </div>
            <Button className="mt-4" asChild>
              <Link href="/scriptiebegeleiding">
                {isNl ? "Meer over scriptiebegeleiding" : "More about thesis support"}
              </Link>
            </Button>
          </div>

          <div className="prose max-w-none">
            <h2>
              {isNl
                ? "Succesverhaal: Lisa's statistiek tentamen"
                : "Success story: Lisa's statistics exam"}
            </h2>
            <blockquote>
              {isNl
                ? "\"In 2 weken van een 4.5 naar een 7.5 voor mijn statistiek tentamen. De praktijkvoorbeelden maakten het eindelijk duidelijk!\""
                : "\"In 2 weeks I went from a 4.5 to a 7.5 on my statistics exam. The practical examples finally made everything click!\""}
            </blockquote>

            <h2>
              {isNl
                ? "Onze aanpak voor psychologie studenten"
                : "Our approach for psychology students"}
            </h2>
            <ul>
              <li>
                {isNl
                  ? "Praktijkvoorbeelden uit de psychologie"
                  : "Real examples from psychology research"}
              </li>
              <li>
                {isNl
                  ? "Stapsgewijze SPSS uitleg"
                  : "Step-by-step SPSS explanations"}
              </li>
              <li>
                {isNl
                  ? "Focus op interpretatie van resultaten"
                  : "Focus on interpreting results"}
              </li>
              <li>
                {isNl
                  ? "Oefenmateriaal van echte onderzoeken"
                  : "Practice material from real studies"}
              </li>
            </ul>

            <h2>
              {isNl ? "Veel voorkomende onderwerpen" : "Common topics covered"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">
                  {isNl ? "Basis statistiek" : "Basic statistics"}
                </h3>
                <ul>
                  <li>{isNl ? "Beschrijvende statistiek" : "Descriptive statistics"}</li>
                  <li>{isNl ? "Normale verdeling" : "Normal distribution"}</li>
                  <li>{isNl ? "Betrouwbaarheidsintervallen" : "Confidence intervals"}</li>
                  <li>{isNl ? "Hypothesetoetsing" : "Hypothesis testing"}</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold">
                  {isNl ? "Gevorderde analyses" : "Advanced analyses"}
                </h3>
                <ul>
                  <li>ANOVA & MANOVA</li>
                  <li>{isNl ? "Factor analyses" : "Factor analyses"}</li>
                  <li>{isNl ? "Mediatie & moderatie" : "Mediation & moderation"}</li>
                  <li>{isNl ? "Multilevel analyses" : "Multilevel analyses"}</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-[var(--cream-dark)] p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold mb-6">
              {isNl ? "Veelgestelde Vragen - Statistiek" : "FAQ - Statistics"}
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  {isNl
                    ? "Welke statistische tests behandelen jullie?"
                    : "Which statistical tests do you cover?"}
                </h3>
                <p className="text-[var(--warm-text)]">
                  {isNl
                    ? "We behandelen alle gangbare tests: t-toetsen, ANOVA, chi-kwadraat toetsen, correlaties, regressie-analyses, factor analyses en non-parametrische tests."
                    : "We cover all common tests: t-tests, ANOVA, chi-square tests, correlations, regression analyses, factor analyses and non-parametric tests."}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  {isNl ? "Hoe help je me met SPSS?" : "How do you help me with SPSS?"}
                </h3>
                <p className="text-[var(--warm-text)]">
                  {isNl
                    ? "Van data invoer tot output interpretatie. We leren je stap voor stap hoe je analyses uitvoert en hoe je de resultaten correct interpreteert en rapporteert."
                    : "From data entry to output interpretation. We show you step by step how to run analyses and how to correctly interpret and report the results."}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  {isNl
                    ? "Wat als ik helemaal geen wiskunde achtergrond heb?"
                    : "What if I have no maths background at all?"}
                </h3>
                <p className="text-[var(--warm-text)]">
                  {isNl
                    ? "Geen probleem! We beginnen bij de absolute basis en bouwen stap voor stap op. We focussen op begrip en praktische toepassing, niet op ingewikkelde formules."
                    : "No problem! We start from the absolute basics and build up step by step. We focus on understanding and practical application, not on complex formulas."}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  {isNl
                    ? "Kunnen jullie ook helpen met mijn scriptie statistiek?"
                    : "Can you also help with the statistics for my thesis?"}
                </h3>
                <p className="text-[var(--warm-text)]">
                  {isNl
                    ? "Ja, we helpen je met de volledige statistische analyse voor je scriptie: van onderzoeksvraag tot resultaten en interpretatie. We begeleiden je door het hele proces."
                    : "Yes, we help you with the full statistical analysis for your thesis: from research question to results and interpretation. We guide you through the entire process."}
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
