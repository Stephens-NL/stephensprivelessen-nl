// AUTO-GENERATED — do not edit by hand.
// Source: packages/business-config/rates.json (v2.1.0)
// Regenerate: npm run generate:ts  (drift-guarded in CI via src/codegen.test.ts)

export const businessConfig = {
  "version": "2.1.0",
  "updated_at": "2026-06-18T06:14:00Z",
  "currency": "EUR",
  "policy": {
    "packages_only": true,
    "max_hours_per_week": 2,
    "availability": "weekdays 18:00-21:00",
    "makeup_lessons": "sunday 14:00-18:00 online only",
    "payment_method": "tikkie_upfront",
    "invoice_on_request": true
  },
  "thresholds": {
    "saldo_low_hours": 2,
    "silence_streak_days": 14,
    "saldo_floor_hours": -2
  },
  "cancellation": {
    "free_before_hours": 24,
    "late_before_hours": 4,
    "window_months": 6,
    "strikes": [
      {
        "level": 1,
        "action": "coulance",
        "label": "Coulance — geen gevolg"
      },
      {
        "level": 2,
        "action": "saldo-aftrek",
        "label": "Saldo-aftrek"
      },
      {
        "level": 3,
        "action": "pauze+gesprek",
        "label": "Pauze + gesprek"
      }
    ]
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
  "surcharges": {
    "meeneem_leerling_cents": 5000
  },
  "private_arrangements": {
    "weekend": {
      "audience": "private",
      "basis_segment": "vo",
      "discount_pct": 50,
      "note": "Onderhands weekendtarief = 50% van het reguliere VO-tarief; markeer audience=private zodat codegen het niet publiek emit."
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
      "label": "Middelbare school – 1 leerling (4u pakket, Science Park)",
      "amount_cents": 30000,
      "per_unit": "package",
      "package_hours": 4,
      "student_count": 1,
      "location": "Science Park",
      "valid_from": "2025-09-01",
      "valid_to": null,
      "status": "definitive"
    },
    {
      "rate_id": "vo_physical_2",
      "segment": "vo",
      "mode": "physical",
      "label": "Middelbare school – 2 leerlingen (4u pakket, Science Park)",
      "amount_cents": 40000,
      "per_unit": "package",
      "package_hours": 4,
      "student_count": 2,
      "per_person_cents": 20000,
      "location": "Science Park",
      "valid_from": "2025-09-01",
      "valid_to": null,
      "status": "definitive"
    },
    {
      "rate_id": "vo_physical_3",
      "segment": "vo",
      "mode": "physical",
      "label": "Middelbare school – 3 leerlingen (4u pakket, Science Park)",
      "amount_cents": 52500,
      "per_unit": "package",
      "package_hours": 4,
      "student_count": 3,
      "per_person_cents": 17500,
      "location": "Science Park",
      "valid_from": "2025-09-01",
      "valid_to": null,
      "status": "definitive"
    },
    {
      "rate_id": "vo_physical_4",
      "segment": "vo",
      "mode": "physical",
      "label": "Middelbare school – 4 leerlingen (4u pakket, Science Park)",
      "amount_cents": 64000,
      "per_unit": "package",
      "package_hours": 4,
      "student_count": 4,
      "per_person_cents": 16000,
      "location": "Science Park",
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
      "label": "Middelbare school – spoedles 2 uur (Science Park)",
      "amount_cents": 18000,
      "per_unit": "package",
      "package_hours": 2,
      "student_count": 1,
      "location": "Science Park",
      "valid_from": "2025-09-01",
      "valid_to": null,
      "status": "definitive"
    },
    {
      "rate_id": "hbo_wo_online_1",
      "segment": "hbo_wo",
      "mode": "online",
      "label": "HBO/WO – 1 student (4u pakket, online)",
      "amount_cents": 36000,
      "per_unit": "package",
      "package_hours": 4,
      "student_count": 1,
      "valid_from": "2025-09-01",
      "valid_to": null,
      "status": "draft"
    },
    {
      "rate_id": "hbo_wo_online_2",
      "segment": "hbo_wo",
      "mode": "online",
      "label": "HBO/WO – 2 studenten (4u pakket, online)",
      "amount_cents": 52000,
      "per_unit": "package",
      "package_hours": 4,
      "student_count": 2,
      "per_person_cents": 26000,
      "valid_from": "2025-09-01",
      "valid_to": null,
      "status": "draft"
    },
    {
      "rate_id": "hbo_wo_online_3",
      "segment": "hbo_wo",
      "mode": "online",
      "label": "HBO/WO – 3 studenten (4u pakket, online)",
      "amount_cents": 66000,
      "per_unit": "package",
      "package_hours": 4,
      "student_count": 3,
      "per_person_cents": 22000,
      "valid_from": "2025-09-01",
      "valid_to": null,
      "status": "draft"
    },
    {
      "rate_id": "hbo_wo_physical_1",
      "segment": "hbo_wo",
      "mode": "physical",
      "label": "HBO/WO – 1 student (4u pakket, Science Park)",
      "amount_cents": 45000,
      "per_unit": "package",
      "package_hours": 4,
      "student_count": 1,
      "location": "Science Park",
      "valid_from": "2025-09-01",
      "valid_to": null,
      "status": "draft"
    },
    {
      "rate_id": "hbo_wo_physical_2",
      "segment": "hbo_wo",
      "mode": "physical",
      "label": "HBO/WO – 2 studenten (4u pakket, Science Park)",
      "amount_cents": 60000,
      "per_unit": "package",
      "package_hours": 4,
      "student_count": 2,
      "per_person_cents": 30000,
      "location": "Science Park",
      "valid_from": "2025-09-01",
      "valid_to": null,
      "status": "draft"
    },
    {
      "rate_id": "hbo_wo_physical_3",
      "segment": "hbo_wo",
      "mode": "physical",
      "label": "HBO/WO – 3 studenten (4u pakket, Science Park)",
      "amount_cents": 78000,
      "per_unit": "package",
      "package_hours": 4,
      "student_count": 3,
      "per_person_cents": 26000,
      "location": "Science Park",
      "valid_from": "2025-09-01",
      "valid_to": null,
      "status": "draft"
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
      "status": "draft"
    },
    {
      "rate_id": "hbo_wo_spoed_physical",
      "segment": "hbo_wo",
      "mode": "physical",
      "label": "HBO/WO – spoedles 2 uur (Science Park)",
      "amount_cents": 26000,
      "per_unit": "package",
      "package_hours": 2,
      "student_count": 1,
      "location": "Science Park",
      "valid_from": "2025-09-01",
      "valid_to": null,
      "status": "draft"
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
