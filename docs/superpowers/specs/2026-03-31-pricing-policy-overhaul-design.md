# Pricing & Policy Overhaul — Design Spec

**Date:** 2026-03-31
**Status:** Draft
**Scope:** Data updates, page deletions, persona alignment

## Context

Stephen's pricing model has changed from per-hour rates to **4-hour packages only**, with distinct tiers for VO (secondary) and HBO/WO (higher education), online vs physical, and group discounts up to 4 students. The weekend Zuidoost offering is discontinued. The site persona shifts from "we" to "I" (Stephen speaking directly).

## Authoritative Pricing

### VO (Middelbare School) — per 4-hour package

| Students | Online | Physical (Science Park) |
|----------|--------|------------------------|
| 1 | €240 | €300 |
| 2 | €320 (€160 pp) | €400 (€200 pp) |
| 3 | €420 (€140 pp) | €525 (€175 pp) |
| 4 | €520 (€130 pp) | €640 (€160 pp) |

**Emergency (2 hr):** Online €120, Physical €180

### HBO/WO (Hoger Onderwijs) — per 4-hour package

| Students | Online | Physical (Science Park) |
|----------|--------|------------------------|
| 1 | €300 | €400 |
| 2 | €400 (€200 pp) | €520 (€260 pp) |
| 3 | €510 (€170 pp) | €660 (€220 pp) |
| 4 | €600 (€150 pp) | €800 (€200 pp) |

**Emergency (2 hr):** Online €180, Physical €260

### Scriptiebegeleiding (unchanged)

- Statistiek & Onderzoek: €90/uur
- Data Science & AI: €100/uur

## Policies

### Availability
- Weekdays 18:00–21:00
- Max 2 hours of lessons per week
- Missed lessons: make-up on Sundays 14:00–18:00, online only (even if regular lessons are physical)

### Cancellation
- Rescheduling by arrangement and availability only
- Minimum 24 hours notice required
- Cancellation within 24 hours: lesson forfeited
- Make-up only within Sunday online hours

### Payment
- Tikkie prepayment (replaces bank transfer / iDEAL)
- Invoice available on request
- Spot confirmed only after payment confirmation

### Lesson Model
- 4-hour packages exclusively — no single lessons
- Group prices apply only when students form their own group

## Changes

### 1. Fix HBO/WO prices in `data/pricingData.ts`

Current values are wrong. Update `hboWoOnlinePackages` and `hboWoPhysicalPackages` to match authoritative pricing above.

### 2. Remove weekend packages from `data/pricingData.ts`

Delete `weekendHvaOnlinePackages` and `weekendHvaPhysicalPackages` arrays. Remove any references to them.

### 3. Remove legacy pricing from `data/pricingData.ts` and `data/config.ts`

Remove from pricingData.ts:
- `prices.flexibilityPremium` — replaced by package model
- `prices.travelCosts` — no longer applies (Science Park or online only)
- `prices.lastMinuteSurcharges` — replaced by 24hr cancellation policy

Remove from config.ts:
- `TRAVEL_COSTS`, `LAST_MINUTE_SURCHARGES`, `FLEXIBILITY_PREMIUM` constants
- `config.pricing.travelCosts`, `config.pricing.lastMinuteSurcharges`, `config.pricing.flexibilityPremium`

### 4. Add policy data to `data/pricingData.ts`

Add structured policy exports for availability, cancellation, and payment — bilingual using the existing `{ NL: string; EN: string }` pattern. Components can reference these directly.

### 5. Update `data/config.ts`

- Note Google Meet as the online lesson platform (no fixed link — Stephen sends per-appointment links)
- Update payment method references from iDEAL/bank transfer to Tikkie

### 6. Delete weekend Zuidoost page

Remove entire directory: `app/[locale]/privelessen/zuidoost-weekend/`

Files:
- `page.tsx`
- `ZuidoostWeekendContent.tsx`
- `layout.tsx`
- `metadata.ts`

### 7. Delete weekend-related data and translations

- Delete `data/weekendTutoring.ts`
- Delete `messages/nl/weekend.json`
- Delete `messages/en/weekend.json`
- Remove weekend imports from any message index files

### 8. Delete unused `data/businessInfo.ts`

Not imported anywhere — redundant with `data/config.ts`.

### 9. Update FAQ content

In `data/faq.ts`, update items that reference:
- Pricing (item 7): replace vague "competitive rates and packages" with package model description
- Payment (item 9): replace "bank transfer / iDEAL" with Tikkie prepayment
- Scheduling (item 6): replace "Google Meet" reference with updated availability info
- Trial lesson (item 10): update to specify free trial is online only, on Sundays
- Contact info (item 18): replace placeholder `[e-mailadres]` and `[telefoonnummer]` with actual values from config
- AI reference (item 12): update "GPT-3" to current model name

### 10. Persona: "we" to "I"

Sweep translation files and data files to replace collective "we/our/wij/onze" with first-person singular "I/my/ik/mijn" where Stephen is speaking about his services. The About page opening already uses "I" — extend this voice throughout.

**Primary targets:**
- `messages/nl/about.json` and `messages/en/about.json` — philosophy section uses "we"
- `data/faq.ts` — most answers use "we/our"
- `messages/nl/services.json` and `messages/en/services.json` (if they exist)
- Any other translation files with collective voice

**Exceptions:** Keep "we" where it genuinely refers to student + tutor working together ("we'll work through this together").

## Out of Scope

- About page bio content rewrite (separate review)
- Motion/scroll animations
- Pricing page UI/component redesign (only data changes)
- Navigation changes (weekend link removal if present)

## Verification

- `npm run build` passes
- `npm run lint` passes
- No broken imports referencing deleted files
- Pricing values on live pages match authoritative tables
- No remaining references to weekend Zuidoost, travel costs, flexibility premium, or last-minute surcharges
