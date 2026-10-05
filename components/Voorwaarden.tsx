import { useLocale, useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import LegalDocument, { type LegalDoc } from "@/components/LegalDocument"
import { businessConfig } from "@/data/business-config.generated"

// Cancellation tiers and teaching hours come from the business config, so the published terms cannot drift from it.
const tiers = businessConfig.cancellation.published_terms.fee_tiers
const tierLabel = (id: string) => tiers.find((t) => t.id === id)?.label_nl ?? ""

export default function Voorwaarden() {
  const t = useTranslations("voorwaarden")
  const locale = useLocale()
  const tokens: Record<string, string> = {
    feeFree: tierLabel("free"),
    feeNoon: tierLabel("same_day_before_noon"),
    feeLate: tierLabel("same_day_after_noon_or_no_show"),
    hours: businessConfig.policy.teaching_window.display[locale === "nl" ? "nl" : "en"],
  }
  const fill = (s: string) => s.replace(/\[\[(\w+)\]\]/g, (m, k) => tokens[k] ?? m)
  const raw = t.raw("sections") as LegalDoc["sections"]
  const doc: LegalDoc = {
    title: t("title"),
    intro: (t.raw("intro") as string[]).map(fill),
    sections: raw.map((s) => ({
      title: s.title,
      blocks: s.blocks.map((b) => (b.type === "ul" ? { ...b, items: b.items.map(fill) } : { ...b, text: fill(b.text) })),
    })),
  }

  return (
    <LegalDocument doc={doc}>
      <div className="mt-12 text-center">
        <p className="text-muted-text mb-4">{t("cta")}</p>
        <Link
          href="/contact"
          className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-medium hover:opacity-90 transition"
        >
          Contact
        </Link>
      </div>
    </LegalDocument>
  )
}
