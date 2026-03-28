import Script from "next/script";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { generateStructuredData } from "@/lib/structured-data";
import { getLocale } from "next-intl/server";

export const revalidate = 3600; // Revalidate every hour

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isNl = locale === 'nl';
  return {
    title: isNl
      ? "Calculus Bijles Amsterdam | Differentiëren & Integreren voor Life Sciences"
      : "Calculus Tutoring Amsterdam | Differentiation & Integration for Life Sciences",
    description: isNl
      ? "Calculus bijles in Amsterdam voor Life Sciences en Economie studenten. Differentiëren, integreren en toegepaste wiskunde. 1\u2011op\u20111 begeleiding."
      : "Calculus tutoring in Amsterdam for Life Sciences and Economics students. Differentiation, integration and applied mathematics. 1\u2011on\u20111 guidance.",
    keywords: [
      'calculus bijles amsterdam',
      'differentiëren bijles',
      'integreren bijles',
      'wiskunde life sciences',
      'calculus economie',
      'toegepaste wiskunde bijles',
      'afgeleiden berekenen',
      'integralen berekenen'
    ],
    openGraph: {
      title: isNl
        ? "Calculus Bijles Amsterdam | Differentiëren & Integreren"
        : "Calculus Tutoring Amsterdam | Differentiation & Integration",
      description: isNl
        ? "Calculus bijles voor Life Sciences en Economie studenten. Differentiëren, integreren en toegepaste wiskunde in Amsterdam."
        : "Calculus tutoring for Life Sciences and Economics students. Differentiation, integration and applied mathematics in Amsterdam.",
      images: [
        {
          url: `/api/og?title=${encodeURIComponent("Calculus Bijles A'dam")}&brandText=Stephensprivelessen.nl&buttonText=${encodeURIComponent(isNl ? "Start Calculus" : "Start Calculus")}&footerText=${encodeURIComponent(isNl ? "Differenti\u00ebren \u2022 Integreren" : "Differentiation \u2022 Integration")}&featureImageUrl=/images/og-calculus-feature.jpg`,
          width: 1200,
          height: 630,
          alt: isNl
            ? "Calculus Bijles Amsterdam - Life Sci & Economie | Stephensprivelessen.nl"
            : "Calculus Tutoring Amsterdam - Life Sci & Economics | Stephensprivelessen.nl",
        },
      ],
    },
  };
}

const structuredData = generateStructuredData({
  title: "Calculus Bijles | Differentiëren & Integreren",
  description: "Professionele calculus bijles voor niet-bèta studenten. Van differentiëren tot integreren, wij maken het begrijpelijk.",
  price: 240, // Vanaf €240 (VO online 4 uur, 1 leerling) — laagste standaardtarief
  priceCurrency: "EUR",
  provider: {
    name: "StephensPrivelessen",
    type: "Person",
  },
  areaServed: "Amsterdam",
  category: ["Life Sciences", "Business & Economics"],
  priceValidUntil: true,
});

export default async function CalculusBijlesPage() {
  const locale = await getLocale();
  const isNl = locale === "nl";

  return (
    <>
      <Script id="calculus-ld+json" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(structuredData)}
      </Script>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">
            {isNl
              ? "Calculus bijles voor niet-bèta studenten"
              : "Calculus tutoring for non-STEM students"}
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
              ? "Calculus hoeft niet ingewikkeld te zijn. Wij maken differentiëren en integreren begrijpelijk met praktische voorbeelden uit jouw vakgebied."
              : "Calculus doesn't have to be complicated. We make differentiation and integration understandable using practical examples from your own field."}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card>
              <CardHeader>
                <CardTitle>{isNl ? "Differentiëren" : "Differentiation"}</CardTitle>
                <CardDescription>
                  {isNl ? "Van basis tot gevorderd" : "From beginner to advanced"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>{isNl ? "Afgeleiden berekenen" : "Calculating derivatives"}</li>
                  <li>{isNl ? "Kettingregel & productregel" : "Chain rule & product rule"}</li>
                  <li>{isNl ? "Partiële afgeleiden" : "Partial derivatives"}</li>
                  <li>{isNl ? "Toegepaste voorbeelden" : "Applied examples"}</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{isNl ? "Integreren" : "Integration"}</CardTitle>
                <CardDescription>
                  {isNl ? "Van basis tot gevorderd" : "From beginner to advanced"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    {isNl
                      ? "Bepaalde & onbepaalde integralen"
                      : "Definite & indefinite integrals"}
                  </li>
                  <li>
                    {isNl
                      ? "Substitutie & partiële integratie"
                      : "Substitution & integration by parts"}
                  </li>
                  <li>{isNl ? "Toegepaste integralen" : "Applied integrals"}</li>
                  <li>{isNl ? "Praktijkvoorbeelden" : "Real-world examples"}</li>
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
                <p>
                  {isNl
                    ? "Voorbeelden uit jouw vakgebied"
                    : "Examples from your field of study"}
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">
                  {isNl ? "Stapsgewijs" : "Step by step"}
                </h3>
                <p>
                  {isNl
                    ? "Van basis tot gevorderd niveau"
                    : "From beginner to advanced level"}
                </p>
              </div>
            </div>
          </div>

          <div className="prose max-w-none">
            <h2>{isNl ? "Voor wie is deze bijles?" : "Who is this tutoring for?"}</h2>
            <ul>
              <li>{isNl ? "Life Sciences studenten" : "Life Sciences students"}</li>
              <li>
                {isNl
                  ? "Economie & Business studenten"
                  : "Economics & Business students"}
              </li>
              <li>
                {isNl
                  ? "Studenten met calculus in hun curriculum"
                  : "Students who have calculus in their curriculum"}
              </li>
              <li>
                {isNl
                  ? "Iedereen die calculus beter wil begrijpen"
                  : "Anyone who wants to understand calculus better"}
              </li>
            </ul>

            <h2>{isNl ? "Wat zeggen studenten?" : "What students say"}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <blockquote className="border-l-4 border-[var(--ink)] pl-4">
                {isNl
                  ? "\"Eindelijk begrijp ik differentiëren! De praktijkvoorbeelden uit mijn vakgebied helpen enorm.\""
                  : "\"I finally understand differentiation! The practical examples from my field make a huge difference.\""}
                <footer className="mt-2 text-sm">
                  - Lisa, {isNl ? "Life Sciences" : "Life Sciences"}
                </footer>
              </blockquote>
              <blockquote className="border-l-4 border-[var(--ink)] pl-4">
                {isNl
                  ? "\"De stapsgewijze aanpak heeft me door mijn calculus tentamen geholpen. Zeer aan te raden!\""
                  : "\"The step-by-step approach got me through my calculus exam. Highly recommended!\""}
                <footer className="mt-2 text-sm">
                  - Thomas, {isNl ? "Economie" : "Economics"}
                </footer>
              </blockquote>
            </div>
          </div>

          <div className="bg-[var(--cream-dark)] p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold mb-6">
              {isNl ? "Veelgestelde Vragen - Calculus" : "FAQ - Calculus"}
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  {isNl
                    ? "Wat is calculus en waarom is het belangrijk?"
                    : "What is calculus and why does it matter?"}
                </h3>
                <p className="text-[var(--warm-text)]">
                  {isNl
                    ? "Calculus is de wiskunde van verandering en beweging. Het is essentieel voor life sciences (groei van populaties, medicijnconcentraties) en economie (marginale kosten, optimalisatie)."
                    : "Calculus is the mathematics of change and motion. It is essential for life sciences (population growth, drug concentrations) and economics (marginal costs, optimisation)."}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  {isNl
                    ? "Hoe lang duurt het om calculus onder de knie te krijgen?"
                    : "How long does it take to get to grips with calculus?"}
                </h3>
                <p className="text-[var(--warm-text)]">
                  {isNl
                    ? "Met onze 1-op-1 begeleiding zien studenten meestal binnen 4-6 lessen significante verbetering. Het hangt af van je basiskennis en hoeveel tijd je erin steekt."
                    : "With our 1-on-1 tutoring, students typically see significant improvement within 4–6 sessions. It depends on your prior knowledge and how much time you put in."}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  {isNl
                    ? "Welke calculus onderwerpen behandelen jullie?"
                    : "Which calculus topics do you cover?"}
                </h3>
                <p className="text-[var(--warm-text)]">
                  {isNl
                    ? "We behandelen differentiëren (afgeleiden, kettingregel), integreren (bepaalde/onbepaalde integralen, substitutie) en toegepaste calculus voor jouw vakgebied."
                    : "We cover differentiation (derivatives, chain rule), integration (definite/indefinite integrals, substitution) and applied calculus for your field."}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  {isNl
                    ? "Is calculus bijles ook geschikt voor beginners?"
                    : "Is calculus tutoring suitable for complete beginners?"}
                </h3>
                <p className="text-[var(--warm-text)]">
                  {isNl
                    ? "Ja, we beginnen altijd bij jouw niveau. Of je nu helemaal opnieuw wilt beginnen of specifieke onderwerpen wilt oefenen - we passen ons aan."
                    : "Yes, we always start at your level. Whether you want to start from scratch or practise specific topics — we adapt to you."}
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
