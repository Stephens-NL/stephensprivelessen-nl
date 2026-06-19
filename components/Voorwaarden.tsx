"use client"

import { useTranslations } from "next-intl"
import Link from "next/link"

export default function Voorwaarden() {
  const t = useTranslations("voorwaarden")

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-2">{t("title")}</h1>
      <p className="text-lg text-muted-text mb-2">{t("subtitle")}</p>
      <p className="text-muted-text mb-8">{t("intro")}</p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">{t("agreement.title")}</h2>
        <ul className="space-y-2 text-warm-text">
          <li>• {t("agreement.cancellation")}</li>
          <li>• {t("agreement.surcharge24h")}</li>
          <li>• {t("agreement.surcharge12h")}</li>
          <li>• {t("agreement.payment")}</li>
          <li>• {t("agreement.invoice")}</li>
          <li>• {t("agreement.maxHours")}</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">{t("hours.title")}</h2>
        <ul className="space-y-2 text-warm-text">
          <li>• {t("hours.weekdays")}</li>
          <li>• {t("hours.sunday")}</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">{t("privacy.title")}</h2>
        <p className="text-warm-text mb-2">{t("privacy.description")}</p>
        <p className="text-warm-text mb-2">{t("privacy.rights")}</p>
        <p className="text-warm-text">{t("privacy.contact")}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">{t("pricing.title")}</h2>
        <p className="text-warm-text">{t("pricing.description")}</p>
      </section>

      <div className="mt-12 text-center">
        <p className="text-muted-text mb-4">{t("cta")}</p>
        <Link
          href="/contact"
          className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-medium hover:opacity-90 transition"
        >
          Contact
        </Link>
      </div>
    </div>
  )
}
