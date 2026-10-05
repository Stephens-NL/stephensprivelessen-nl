// Package-based pricing data (4-hour packages are the only offered format)

import { businessConfig } from './business-config.generated';

// Package-based pricing (4-uurs pakketten — enige aangeboden vorm)
// VO = Voortgezet Onderwijs (middelbare school)
// HBO/WO = Hoger onderwijs

// --- SPL Fase 3 (#162): VO + spoed + scriptie afgeleid uit business-config (canoniek). ---
// Een prijswijziging in packages/business-config volgt hier automatisch na een re-sync
// (`npm run sync:business-config`); de business-config CI-drift-guard bewaakt de bron.

type GenRate = {
  rate_id: string;
  segment: string;
  mode: string;
  amount_cents: number;
  package_hours: number;
  student_count: number;
  per_person_cents?: number;
};

// Eigen tarieven hebben geen `tier`-veld; student-docent-kaarten (tier 'student_tutor') staan er apart.
const generatedRates: readonly GenRate[] = businessConfig.rates.filter((r) => !('tier' in r));
const studentTutorRates: readonly GenRate[] = businessConfig.rates.filter((r) => 'tier' in r);

function pkgArray(segment: string, mode: string) {
  return generatedRates
    .filter((r) => r.segment === segment && r.mode === mode && r.package_hours === 4)
    .slice()
    .sort((a, b) => a.student_count - b.student_count)
    .map((r) => ({
      students: r.student_count,
      packagePrice: r.amount_cents / 100,
      pricePerPerson: (r.per_person_cents ?? r.amount_cents) / 100,
    }));
}

function spoedEuro(rateId: string): number {
  const r = generatedRates.find((x) => x.rate_id === rateId);
  if (!r) throw new Error(`pricingData: ontbrekend spoed-tarief '${rateId}' in business-config`);
  return r.amount_cents / 100;
}

function studentTutorEuro(rateId: string): number {
  const r = studentTutorRates.find((x) => x.rate_id === rateId);
  if (!r) throw new Error(`pricingData: ontbrekend tarief '${rateId}' in business-config`);
  return r.amount_cents / 100;
}

export const studentTutorVoPrices = {
  online: studentTutorEuro('student_tutor_vo_online_1'),
  physical: studentTutorEuro('student_tutor_vo_physical_1'),
};

export const voOnlinePackages = pkgArray('vo', 'online');
export const voPhysicalPackages = pkgArray('vo', 'physical');

// HBO/WO staat in business-config nog op `status: draft` én wijkt af van wat hier live
// staat (en mist de 4-leerling-tier). Bewust hardcoded gelaten tot de canonieke HBO/WO-
// tarieven zijn vastgesteld — HBO/WO-convergentie is een #162 follow-up (businessbeslissing).
export const hboWoOnlinePackages = [
  { students: 1, packagePrice: 300, pricePerPerson: 300 },
  { students: 2, packagePrice: 400, pricePerPerson: 200 },
  { students: 3, packagePrice: 510, pricePerPerson: 170 },
  { students: 4, packagePrice: 600, pricePerPerson: 150 },
];

export const hboWoPhysicalPackages = [
  { students: 1, packagePrice: 400, pricePerPerson: 400 },
  { students: 2, packagePrice: 520, pricePerPerson: 260 },
  { students: 3, packagePrice: 660, pricePerPerson: 220 },
  { students: 4, packagePrice: 800, pricePerPerson: 200 },
];

// Spoedpakketten (2 uur) — afgeleid uit business-config
export const spoedPrices = {
  voOnline: spoedEuro('vo_spoed_online'),
  voPhysical: spoedEuro('vo_spoed_physical'),
  hboWoOnline: spoedEuro('hbo_wo_spoed_online'),
  hboWoPhysical: spoedEuro('hbo_wo_spoed_physical'),
};

// "Vanaf"-prijzen per uur: laagste uurprijs van de 4-uurs pakketten (VO + HBO/WO, incl. student-docent).
// Individueel = 1 leerling; groep = per persoon bij 2-4 leerlingen.
const fourHourRates = [...generatedRates, ...studentTutorRates].filter(
  (r) => (r.segment === 'vo' || r.segment === 'hbo_wo') && r.package_hours === 4,
);
const lowestPerHour = (rates: readonly GenRate[]) =>
  Math.min(...rates.map((r) => (r.per_person_cents ?? r.amount_cents) / r.package_hours / 100));
export const fromPerHour = {
  individual: lowestPerHour(fourHourRates.filter((r) => r.student_count === 1)),
  group: lowestPerHour(fourHourRates.filter((r) => r.student_count > 1)),
};

/** Euro-bedrag: hele euro's zonder decimalen, anders twee (NL komma, EN punt). */
export function formatEuro(amount: number, locale: string): string {
  const whole = Number.isInteger(amount);
  const txt = amount.toLocaleString(locale === 'nl' ? 'nl-NL' : 'en-GB', {
    minimumFractionDigits: whole ? 0 : 2,
    maximumFractionDigits: 2,
  });
  return `€${txt}`;
}

export const fromHourLabel = (locale: string) => formatEuro(fromPerHour.individual, locale);
export const fromHourGroupLabel = (locale: string) => formatEuro(fromPerHour.group, locale);

/** Vult [[tokens]] in message-strings met prijzen uit de business-config (spoed + vanaf-uurprijzen). */
export function fillPrices<T>(value: T, locale: string): T {
  const tokens: Record<string, string> = {
    fromHour: fromHourLabel(locale),
    fromHourGroup: fromHourGroupLabel(locale),
    spoedVoOnline: formatEuro(spoedPrices.voOnline, locale),
    spoedVoPhysical: formatEuro(spoedPrices.voPhysical, locale),
    spoedHboOnline: formatEuro(spoedPrices.hboWoOnline, locale),
    spoedHboPhysical: formatEuro(spoedPrices.hboWoPhysical, locale),
  };
  if (typeof value === 'string') {
    return value.replace(/\[\[(\w+)\]\]/g, (m, k) => tokens[k] ?? m) as T;
  }
  if (Array.isArray(value)) return value.map((v) => fillPrices(v, locale)) as T;
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, fillPrices(v, locale)])) as T;
  }
  return value;
}

// Scriptiebegeleiding (uurtarief — apart product) — afgeleid uit business-config
export const scriptieRates = businessConfig.scriptie.rates.map((r) => ({
  duration: r.label,
  price: `€${r.amount_cents / 100}/uur`,
}));

// Policies
export const availabilityPolicy = {
  weekdays: { NL: 'Doordeweeks tussen 18:00 en 21:00', EN: 'Weekdays between 18:00 and 21:00' },
  maxPerWeek: { NL: 'Maximaal 2 uur les per week', EN: 'Maximum 2 hours of lessons per week' },
  makeUp: { NL: 'Gemiste les inhalen op zondag 14:00–18:00, online', EN: 'Make-up lessons on Sundays 14:00–18:00, online only' },
};

export const cancellationPolicy = {
  reschedule: { NL: 'Verzetten kan alleen in overleg en op basis van beschikbaarheid', EN: 'Rescheduling is only possible by arrangement and subject to availability' },
  free: { NL: 'Verzetten of annuleren is kosteloos tot 21:00 de avond vóór de les', EN: 'Rescheduling or cancelling is free until 21:00 the evening before the lesson' },
  sameDayMorning: { NL: 'Op de lesdag zelf vóór 12:00: 50% van het lesbedrag', EN: 'On the lesson day before 12:00: 50% of the lesson fee' },
  lateOrNoShow: { NL: 'Op de lesdag na 12:00, of niet komen opdagen (no-show): 100% van het lesbedrag', EN: 'On the lesson day after 12:00, or a no-show: 100% of the lesson fee' },
};

export const paymentPolicy = {
  method: { NL: 'Betaling vooraf per Tikkie', EN: 'Payment in advance via Tikkie' },
  invoice: { NL: 'Factuur mogelijk op verzoek', EN: 'Invoice available on request' },
  confirmation: { NL: 'Plek pas definitief na bevestiging en betaling', EN: 'Spot confirmed only after payment and confirmation' },
};

export const lessonModel = {
  packageOnly: { NL: 'Uitsluitend pakketten van 4 uur — geen losse lessen', EN: '4-hour packages only — no single lessons' },
  groupNote: { NL: 'Groepsprijzen gelden alleen als studenten zelf een groepje vormen', EN: 'Group prices apply only when students form their own group' },
  maxGroupSize: 4,
  packageHours: 4,
};