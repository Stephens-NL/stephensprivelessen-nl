import Voorwaarden from "@/components/Voorwaarden"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const isNl = locale === "nl"
  return {
    title: isNl
      ? "Voorwaarden | Stephens Privelessen"
      : "Terms | Stephen's Private Lessons",
    description: isNl
      ? "Voorwaarden en werkwijze voor bijlessen bij Stephens Privelessen"
      : "Terms and conditions for tutoring with Stephen's Private Lessons",
  }
}

export default function VoorwaardenPage() {
  return <Voorwaarden />
}
