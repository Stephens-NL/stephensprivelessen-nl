// AUTO-GENERATED — do not edit by hand.
// Source: packages/business-config/rates.json (v3.0.0)
// Regenerate: npm run generate:ts  (drift-guarded in CI via src/codegen.test.ts)

export const businessConfig = {
  "version": "3.0.0",
  "updated_at": "2026-10-05T00:00:00Z",
  "currency": "EUR",
  "policy": {
    "packages_only": true,
    "max_hours_per_week": 2,
    "availability": "monday-thursday 18:00-21:00",
    "makeup_lessons": "sunday 14:00-18:00 online only",
    "payment_method": "tikkie_upfront",
    "invoice_on_request": true,
    "teaching_window": {
      "days": [
        "monday",
        "tuesday",
        "wednesday",
        "thursday"
      ],
      "first_start": "18:00",
      "last_start": "20:00",
      "window_end": "21:00",
      "lesson_minutes": 60,
      "slot_minutes": 30,
      "start_times": [
        "18:00",
        "18:30",
        "19:00",
        "19:30",
        "20:00"
      ],
      "display": {
        "nl": "maandag t/m donderdag, 18:00–21:00",
        "en": "Monday to Thursday, 18:00–21:00"
      }
    },
    "group_rates": {
      "self_formed_only": true,
      "note": "Groepsprijzen gelden alleen als leerlingen zelf een groepje vormen."
    },
    "hbo_wo_group_mode": {
      "online_requires_device": true,
      "note": "HBO/WO-groepslessen zijn in-person, tenzij iedereen een iPad of laptop heeft."
    },
    "hbo_wo_package_carryover": {
      "returning_client_only": true,
      "note": "Een terugkerende HBO/WO-klant mag een pakket van 4 uur kopen en de resterende uren later gebruiken."
    }
  },
  "thresholds": {
    "saldo_low_hours": 2,
    "silence_streak_days": 14,
    "saldo_floor_hours": -2
  },
  "cancellation": {
    "published_terms": {
      "note": "Het enige annuleringsbeleid dat de klant ziet (alle segmenten, besluit 2026-09-27, ADR-0015). fee_pct is een percentage van het lesbedrag, afgeschreven als lesuren van het pakketsaldo.",
      "timezone": "Europe/Amsterdam",
      "reschedule_free_until": "day_before_21:00",
      "fee_tiers": [
        {
          "id": "free",
          "until": "day_before_21:00",
          "fee_pct": 0,
          "label_nl": "Verzetten of annuleren is kosteloos tot 21:00 de avond vóór de les"
        },
        {
          "id": "same_day_before_noon",
          "until": "lesson_day_12:00",
          "fee_pct": 50,
          "label_nl": "Op de lesdag zelf vóór 12:00: 50% van het lesbedrag"
        },
        {
          "id": "same_day_after_noon_or_no_show",
          "until": null,
          "fee_pct": 100,
          "label_nl": "Op de lesdag na 12:00, of niet komen opdagen (no-show): 100% van het lesbedrag"
        }
      ],
      "package_refunds": "none",
      "lesson_confirmed_after_payment": true
    }
  },
  "leerling_status": {
    "priority": [
      "silent",
      "saldo-low",
      "deadline",
      "active"
    ]
  },
  "scriptie": {
    "per_unit": "hour",
    "rates": [
      {
        "rate_id": "scriptie_statistiek",
        "label": "Statistiek & Onderzoek",
        "amount_cents": 9000,
        "status": "definitive"
      },
      {
        "rate_id": "scriptie_datascience",
        "label": "Data Science & AI",
        "amount_cents": 10000,
        "status": "definitive"
      }
    ]
  },
  "consultancy": {
    "per_unit": "session",
    "vat": "excl",
    "note": "Zakelijke consultancy: tarieven excl. btw (tutoring is btw-vrij, CRKBO). Geen onderdeel van rates[]; buiten alle tutoring-filters.",
    "rates": [
      {
        "rate_id": "consultancy_single",
        "label": "Eenmalig consult",
        "amount_cents": 10000,
        "sessions": 1,
        "status": "definitive"
      },
      {
        "rate_id": "consultancy_4",
        "label": "4 sessies",
        "amount_cents": 25000,
        "sessions": 4,
        "status": "definitive"
      },
      {
        "rate_id": "consultancy_10",
        "label": "10 sessies",
        "amount_cents": 55000,
        "sessions": 10,
        "status": "definitive"
      }
    ]
  },
  "surcharges": {
    "meeneem_leerling_cents": 5000
  },
  "private_arrangements": {
    "weekend": {
      "audience": "private",
      "basis_segment": "vo",
      "discount_pct": 50,
      "note": "Onderhands weekendtarief = 50% van het reguliere VO-tarief; markeer audience=private zodat codegen het niet publiek emit."
    },
    "avondblok": {
      "audience": "private",
      "hours_clock": 3,
      "break_minutes": 30,
      "teaching_hours": 2.5,
      "discount_pct": 10,
      "note": "Intern avondproduct (niet publiek op de website): een hele avond = 3 klok-uur incl. 30 min pauze (2,5 lesuur effectief). Avondtarief = 3x het uurtarief uit het reguliere 1-student pakket (pakketbedrag / pakketuren) minus discount_pct. audience=private => hoort niet in de publieke rates[]; website toont alleen publieke kaarten. Bij offerte afronden op hele euro's. Bewust afgeleid van het pakket-uurtarief (niet het spoedtarief)."
    }
  },
  "rates": [
    {
      "rate_id": "vo_online_1",
      "segment": "vo",
      "mode": "online",
      "label": "Middelbare school – 1 leerling (4u pakket, online)",
      "amount_cents": 24000,
      "per_unit": "package",
      "package_hours": 4,
      "student_count": 1,
      "valid_from": "2025-09-01",
      "valid_to": null,
      "status": "definitive"
    },
    {
      "rate_id": "vo_online_2",
      "segment": "vo",
      "mode": "online",
      "label": "Middelbare school – 2 leerlingen (4u pakket, online)",
      "amount_cents": 32000,
      "per_unit": "package",
      "package_hours": 4,
      "student_count": 2,
      "per_person_cents": 16000,
      "valid_from": "2025-09-01",
      "valid_to": null,
      "status": "definitive"
    },
    {
      "rate_id": "vo_online_3",
      "segment": "vo",
      "mode": "online",
      "label": "Middelbare school – 3 leerlingen (4u pakket, online)",
      "amount_cents": 42000,
      "per_unit": "package",
      "package_hours": 4,
      "student_count": 3,
      "per_person_cents": 14000,
      "valid_from": "2025-09-01",
      "valid_to": null,
      "status": "definitive"
    },
    {
      "rate_id": "vo_online_4",
      "segment": "vo",
      "mode": "online",
      "label": "Middelbare school – 4 leerlingen (4u pakket, online)",
      "amount_cents": 52000,
      "per_unit": "package",
      "package_hours": 4,
      "student_count": 4,
      "per_person_cents": 13000,
      "valid_from": "2025-09-01",
      "valid_to": null,
      "status": "definitive"
    },
    {
      "rate_id": "vo_physical_1",
      "segment": "vo",
      "mode": "physical",
      "label": "Middelbare school – 1 leerling (4u pakket, Science Park/Roeterseiland)",
      "amount_cents": 30000,
      "per_unit": "package",
      "package_hours": 4,
      "student_count": 1,
      "location": "Science Park of Roeterseiland",
      "valid_from": "2025-09-01",
      "valid_to": null,
      "status": "definitive"
    },
    {
      "rate_id": "vo_physical_2",
      "segment": "vo",
      "mode": "physical",
      "label": "Middelbare school – 2 leerlingen (4u pakket, Science Park/Roeterseiland)",
      "amount_cents": 40000,
      "per_unit": "package",
      "package_hours": 4,
      "student_count": 2,
      "per_person_cents": 20000,
      "location": "Science Park of Roeterseiland",
      "valid_from": "2025-09-01",
      "valid_to": null,
      "status": "definitive"
    },
    {
      "rate_id": "vo_physical_3",
      "segment": "vo",
      "mode": "physical",
      "label": "Middelbare school – 3 leerlingen (4u pakket, Science Park/Roeterseiland)",
      "amount_cents": 52500,
      "per_unit": "package",
      "package_hours": 4,
      "student_count": 3,
      "per_person_cents": 17500,
      "location": "Science Park of Roeterseiland",
      "valid_from": "2025-09-01",
      "valid_to": null,
      "status": "definitive"
    },
    {
      "rate_id": "vo_physical_4",
      "segment": "vo",
      "mode": "physical",
      "label": "Middelbare school – 4 leerlingen (4u pakket, Science Park/Roeterseiland)",
      "amount_cents": 64000,
      "per_unit": "package",
      "package_hours": 4,
      "student_count": 4,
      "per_person_cents": 16000,
      "location": "Science Park of Roeterseiland",
      "valid_from": "2025-09-01",
      "valid_to": null,
      "status": "definitive"
    },
    {
      "rate_id": "vo_spoed_online",
      "segment": "vo",
      "mode": "online",
      "label": "Middelbare school – spoedles 2 uur (online)",
      "amount_cents": 12000,
      "per_unit": "package",
      "package_hours": 2,
      "student_count": 1,
      "valid_from": "2025-09-01",
      "valid_to": null,
      "status": "definitive"
    },
    {
      "rate_id": "vo_spoed_physical",
      "segment": "vo",
      "mode": "physical",
      "label": "Middelbare school – spoedles 2 uur (Science Park/Roeterseiland)",
      "amount_cents": 18000,
      "per_unit": "package",
      "package_hours": 2,
      "student_count": 1,
      "location": "Science Park of Roeterseiland",
      "valid_from": "2025-09-01",
      "valid_to": null,
      "status": "definitive"
    },
    {
      "rate_id": "hbo_wo_online_1",
      "segment": "hbo_wo",
      "mode": "online",
      "label": "HBO/WO – 1 student (4u pakket, online)",
      "amount_cents": 30000,
      "per_unit": "package",
      "package_hours": 4,
      "student_count": 1,
      "valid_from": "2025-09-01",
      "valid_to": null,
      "status": "definitive"
    },
    {
      "rate_id": "hbo_wo_online_2",
      "segment": "hbo_wo",
      "mode": "online",
      "label": "HBO/WO – 2 studenten (4u pakket, online)",
      "amount_cents": 40000,
      "per_unit": "package",
      "package_hours": 4,
      "student_count": 2,
      "per_person_cents": 20000,
      "valid_from": "2025-09-01",
      "valid_to": null,
      "status": "definitive"
    },
    {
      "rate_id": "hbo_wo_online_3",
      "segment": "hbo_wo",
      "mode": "online",
      "label": "HBO/WO – 3 studenten (4u pakket, online)",
      "amount_cents": 51000,
      "per_unit": "package",
      "package_hours": 4,
      "student_count": 3,
      "per_person_cents": 17000,
      "valid_from": "2025-09-01",
      "valid_to": null,
      "status": "definitive"
    },
    {
      "rate_id": "hbo_wo_online_4",
      "segment": "hbo_wo",
      "mode": "online",
      "label": "HBO/WO – 4 studenten (4u pakket, online)",
      "amount_cents": 60000,
      "per_unit": "package",
      "package_hours": 4,
      "student_count": 4,
      "per_person_cents": 15000,
      "valid_from": "2025-09-01",
      "valid_to": null,
      "status": "definitive"
    },
    {
      "rate_id": "hbo_wo_physical_1",
      "segment": "hbo_wo",
      "mode": "physical",
      "label": "HBO/WO – 1 student (4u pakket, Science Park/Roeterseiland)",
      "amount_cents": 40000,
      "per_unit": "package",
      "package_hours": 4,
      "student_count": 1,
      "location": "Science Park of Roeterseiland",
      "valid_from": "2025-09-01",
      "valid_to": null,
      "status": "definitive"
    },
    {
      "rate_id": "hbo_wo_physical_2",
      "segment": "hbo_wo",
      "mode": "physical",
      "label": "HBO/WO – 2 studenten (4u pakket, Science Park/Roeterseiland)",
      "amount_cents": 52000,
      "per_unit": "package",
      "package_hours": 4,
      "student_count": 2,
      "per_person_cents": 26000,
      "location": "Science Park of Roeterseiland",
      "valid_from": "2025-09-01",
      "valid_to": null,
      "status": "definitive"
    },
    {
      "rate_id": "hbo_wo_physical_3",
      "segment": "hbo_wo",
      "mode": "physical",
      "label": "HBO/WO – 3 studenten (4u pakket, Science Park/Roeterseiland)",
      "amount_cents": 66000,
      "per_unit": "package",
      "package_hours": 4,
      "student_count": 3,
      "per_person_cents": 22000,
      "location": "Science Park of Roeterseiland",
      "valid_from": "2025-09-01",
      "valid_to": null,
      "status": "definitive"
    },
    {
      "rate_id": "hbo_wo_physical_4",
      "segment": "hbo_wo",
      "mode": "physical",
      "label": "HBO/WO – 4 studenten (4u pakket, Science Park/Roeterseiland)",
      "amount_cents": 80000,
      "per_unit": "package",
      "package_hours": 4,
      "student_count": 4,
      "per_person_cents": 20000,
      "location": "Science Park of Roeterseiland",
      "valid_from": "2025-09-01",
      "valid_to": null,
      "status": "definitive"
    },
    {
      "rate_id": "hbo_wo_spoed_online",
      "segment": "hbo_wo",
      "mode": "online",
      "label": "HBO/WO – spoedles 2 uur (online)",
      "amount_cents": 18000,
      "per_unit": "package",
      "package_hours": 2,
      "student_count": 1,
      "valid_from": "2025-09-01",
      "valid_to": null,
      "status": "definitive"
    },
    {
      "rate_id": "hbo_wo_spoed_physical",
      "segment": "hbo_wo",
      "mode": "physical",
      "label": "HBO/WO – spoedles 2 uur (Science Park/Roeterseiland)",
      "amount_cents": 26000,
      "per_unit": "package",
      "package_hours": 2,
      "student_count": 1,
      "location": "Science Park of Roeterseiland",
      "valid_from": "2025-09-01",
      "valid_to": null,
      "status": "definitive"
    },
    {
      "rate_id": "student_tutor_vo_online_1",
      "segment": "vo",
      "mode": "online",
      "tier": "student_tutor",
      "label": "Middelbare school – 1 leerling, student-docent (4u pakket, online)",
      "amount_cents": 15000,
      "per_unit": "package",
      "package_hours": 4,
      "student_count": 1,
      "valid_from": "2026-10-05",
      "valid_to": null,
      "status": "definitive",
      "notes": "Student-docent tarief (multi-tutor model). Alleen individueel; online goedkoper dan op locatie. Geen groepstarieven."
    },
    {
      "rate_id": "student_tutor_vo_physical_1",
      "segment": "vo",
      "mode": "physical",
      "tier": "student_tutor",
      "label": "Middelbare school – 1 leerling, student-docent (4u pakket, op locatie)",
      "amount_cents": 17500,
      "per_unit": "package",
      "package_hours": 4,
      "student_count": 1,
      "valid_from": "2026-10-05",
      "valid_to": null,
      "status": "definitive",
      "notes": "Student-docent tarief (multi-tutor model). Alleen individueel; online goedkoper dan op locatie. Geen groepstarieven."
    },
    {
      "rate_id": "student_tutor_hbo_wo_online_1",
      "segment": "hbo_wo",
      "mode": "online",
      "tier": "student_tutor",
      "label": "HBO/WO – 1 student, student-docent (4u pakket, online)",
      "amount_cents": 20000,
      "per_unit": "package",
      "package_hours": 4,
      "student_count": 1,
      "valid_from": "2026-10-05",
      "valid_to": null,
      "status": "definitive",
      "notes": "Student-docent tarief (multi-tutor model). Alleen individueel; online goedkoper dan op locatie. Geen groepstarieven."
    },
    {
      "rate_id": "student_tutor_hbo_wo_physical_1",
      "segment": "hbo_wo",
      "mode": "physical",
      "tier": "student_tutor",
      "label": "HBO/WO – 1 student, student-docent (4u pakket, op locatie)",
      "amount_cents": 25000,
      "per_unit": "package",
      "package_hours": 4,
      "student_count": 1,
      "valid_from": "2026-10-05",
      "valid_to": null,
      "status": "definitive",
      "notes": "Student-docent tarief (multi-tutor model). Alleen individueel; online goedkoper dan op locatie. Geen groepstarieven."
    },
    {
      "rate_id": "weekend_hva_online_1",
      "segment": "weekend_hva",
      "mode": "online",
      "label": "Weekend HvA – 1 leerling (4u pakket, online)",
      "amount_cents": 12000,
      "per_unit": "package",
      "package_hours": 4,
      "student_count": 1,
      "valid_from": "2025-09-01",
      "valid_to": null,
      "status": "definitive",
      "notes": "50% van regulier VO-tarief"
    },
    {
      "rate_id": "weekend_hva_online_2",
      "segment": "weekend_hva",
      "mode": "online",
      "label": "Weekend HvA – 2 leerlingen (4u pakket, online)",
      "amount_cents": 16000,
      "per_unit": "package",
      "package_hours": 4,
      "student_count": 2,
      "per_person_cents": 8000,
      "valid_from": "2025-09-01",
      "valid_to": null,
      "status": "definitive"
    },
    {
      "rate_id": "weekend_hva_online_3",
      "segment": "weekend_hva",
      "mode": "online",
      "label": "Weekend HvA – 3 leerlingen (4u pakket, online)",
      "amount_cents": 21000,
      "per_unit": "package",
      "package_hours": 4,
      "student_count": 3,
      "per_person_cents": 7000,
      "valid_from": "2025-09-01",
      "valid_to": null,
      "status": "definitive"
    },
    {
      "rate_id": "weekend_hva_online_4",
      "segment": "weekend_hva",
      "mode": "online",
      "label": "Weekend HvA – 4 leerlingen (4u pakket, online)",
      "amount_cents": 26000,
      "per_unit": "package",
      "package_hours": 4,
      "student_count": 4,
      "per_person_cents": 6500,
      "valid_from": "2025-09-01",
      "valid_to": null,
      "status": "definitive"
    },
    {
      "rate_id": "weekend_hva_physical_1",
      "segment": "weekend_hva",
      "mode": "physical",
      "label": "Weekend HvA – 1 leerling (4u pakket, fysiek)",
      "amount_cents": 15000,
      "per_unit": "package",
      "package_hours": 4,
      "student_count": 1,
      "location": "HvA CTH Zuidoost",
      "valid_from": "2025-09-01",
      "valid_to": null,
      "status": "definitive",
      "notes": "50% van regulier VO-tarief"
    },
    {
      "rate_id": "weekend_hva_physical_2",
      "segment": "weekend_hva",
      "mode": "physical",
      "label": "Weekend HvA – 2 leerlingen (4u pakket, fysiek)",
      "amount_cents": 20000,
      "per_unit": "package",
      "package_hours": 4,
      "student_count": 2,
      "per_person_cents": 10000,
      "location": "HvA CTH Zuidoost",
      "valid_from": "2025-09-01",
      "valid_to": null,
      "status": "definitive"
    },
    {
      "rate_id": "weekend_hva_physical_3",
      "segment": "weekend_hva",
      "mode": "physical",
      "label": "Weekend HvA – 3 leerlingen (4u pakket, fysiek)",
      "amount_cents": 26000,
      "per_unit": "package",
      "package_hours": 4,
      "student_count": 3,
      "per_person_cents": 8667,
      "location": "HvA CTH Zuidoost",
      "valid_from": "2025-09-01",
      "valid_to": null,
      "status": "definitive"
    },
    {
      "rate_id": "weekend_hva_physical_4",
      "segment": "weekend_hva",
      "mode": "physical",
      "label": "Weekend HvA – 4 leerlingen (4u pakket, fysiek)",
      "amount_cents": 32000,
      "per_unit": "package",
      "package_hours": 4,
      "student_count": 4,
      "per_person_cents": 8000,
      "location": "HvA CTH Zuidoost",
      "valid_from": "2025-09-01",
      "valid_to": null,
      "status": "definitive"
    }
  ]
} as const;

export type BusinessConfig = typeof businessConfig;

export const contact = {
  "phone": {
    "primary": {
      "number": "+31647357426",
      "display": "+31 6 47 35 74 26",
      "whatsappOnly": true
    },
    "secondary": {
      "number": "+31614189013",
      "display": "+31 6 14 18 90 13",
      "whatsappOnly": false
    }
  },
  "email": {
    "primary": "info@stephenadei.nl",
    "lessons": "lessons@stephensprivelessen.nl"
  },
  "social": {
    "linkedin": "https://www.linkedin.com/in/stephen-adei/",
    "github": "https://github.com/stephenadei",
    "instagram": {
      "tutoring": "https://www.instagram.com/stephensprivelessen/",
      "music": "https://www.instagram.com/callhimdavinci.als/",
      "photography": "https://www.instagram.com/callhimdavinci.jpg/",
      "events": "https://www.instagram.com/stephensevents/"
    }
  },
  "addresses": {
    "main": {
      "label": "Science Park",
      "street": "Science Park 904",
      "postal": "1098 XH",
      "city": "Amsterdam",
      "googleMapsUrl": "https://maps.google.com/?q=Science Park 904, 1098 XH Amsterdam"
    },
    "weekend": {
      "label": "Bijlmerplein",
      "street": "Bijlmerplein 888",
      "postal": "1102 MG",
      "city": "Amsterdam",
      "googleMapsUrl": "https://maps.google.com/?q=Bijlmerplein 888, 1102 MG Amsterdam"
    }
  }
} as const;

export const business = {
  "name": "Stephen's Privelessen",
  "nameNl": "Stephens Privelessen",
  "nameEn": "Stephen's Private Lessons",
  "owner": "Stephen Adei",
  "kvk": "88195910",
  "btw": "NL004558497B41",
  "iban": "NL26INGB0110913620",
  "ibanName": "Stephen's",
  "address": {
    "street": "Hendrik Hosstraat 20",
    "postal": "1106 ZN",
    "city": "Amsterdam"
  },
  "siteUrl": "https://stephensprivelessen.nl",
  "dashboardUrl": "https://dash.stephensprivelessen.nl",
  "portfolioUrl": "https://stephenadei.nl"
} as const;

export const brands = {
  "photography": {
    "name": "Stephen Adei Photography",
    "email": "photography@stephenadei.nl",
    "instagram": "@stevesanalogueadventure",
    "instagramUrl": "https://www.instagram.com/stevesanalogueadventure/",
    "portfolioUrl": "https://portfolio.stephenadei.nl"
  }
} as const;

/** Lesson days + bookable start times. The one source for all four surfaces. */
export const teachingWindow = businessConfig.policy.teaching_window;
