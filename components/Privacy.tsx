import { useTranslations } from "next-intl"
import LegalDocument, { type LegalDoc } from "@/components/LegalDocument"

export default function Privacy() {
  const t = useTranslations("privacy")
  return (
    <LegalDocument
      doc={{ title: t("title"), intro: t.raw("intro") as string[], sections: t.raw("sections") as LegalDoc["sections"] }}
    />
  )
}
