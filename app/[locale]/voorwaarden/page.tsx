import Voorwaarden from "@/components/Voorwaarden"

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
  }
}

export default function VoorwaardenPage() {
  return <Voorwaarden />
}
