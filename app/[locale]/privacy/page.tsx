import Privacy from "@/components/Privacy"
import { buildAlternates } from "@/lib/seo"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const isNl = locale === "nl"
  return {
    title: isNl ? "Privacyverklaring | Stephen's Privélessen" : "Privacy statement | Stephen's Private Tutoring",
    description: isNl
      ? "Hoe Stephen's Privélessen omgaat met persoonsgegevens"
      : "How Stephen's Private Tutoring handles personal data",
    alternates: buildAlternates(locale, "/privacy"),
  }
}

export default function PrivacyPage() {
  return <Privacy />
}
