import Voorwaarden from "@/components/Voorwaarden"
import { buildAlternates } from "@/lib/seo"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const isNl = locale === "nl"
  return {
    title: isNl
      ? "Voorwaarden | Stephen's Privélessen"
      : "Terms | Stephen's Private Tutoring",
    description: isNl
      ? "Voorwaarden en werkwijze voor bijlessen bij Stephen's Privélessen"
      : "Terms and conditions for tutoring with Stephen's Private Tutoring",
    alternates: buildAlternates(locale, '/voorwaarden'),
  }
}

export default function VoorwaardenPage() {
  return <Voorwaarden />
}
