# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

Stephen's Privélessen — the public-facing tutoring website at `stephensprivelessen.nl`. A bilingual (NL/EN) Next.js 15 marketing site for math, statistics, and programming tutoring in Amsterdam. Dutch is the default locale. Part of the monorepo npm workspaces.

## Commands

```bash
npm run dev          # Dev server on :3000
npm run build        # Production build (standalone output)
npm run lint         # ESLint
npm run test         # Jest (all tests)

# Single test file:
npx jest __tests__/components/About.test.ts
npx jest --testPathPattern="sitemap"

# Docker (production):
docker compose up -d --build   # Runs on :4302
```

## Architecture

### Routing & i18n

- **next-intl** with `localePrefix: 'as-needed'` — NL URLs have no prefix, EN gets `/en/`
- All routes under `app/[locale]/` — pages use `setRequestLocale()` for static generation
- Translation files: `messages/nl/*.json` and `messages/en/*.json` (one JSON per namespace)
- Middleware (`middleware.ts`): handles locale routing + rate limiting on `/api/aantekeningen/` routes

```typescript
// Client components:
import { useTranslations } from 'next-intl';
const t = useTranslations('Namespace');

// Server components:
import { getTranslations } from 'next-intl/server';
```

### Data Layer

Content lives in two places with an ongoing migration from the old system to i18n:

1. **`data/`** — TypeScript data files (`businessData.ts`, `weekendTutoring.ts`, `pricingData.ts`, etc.) using a `Bilingual` type (`{ NL: string; EN: string }`). Legacy pattern — being replaced by `messages/` JSON.
2. **`messages/{nl,en}/`** — next-intl JSON translation files. The target for all user-facing text.

Components may still use either pattern. When modifying text, check which system the component uses.

### Route Groups

- `app/[locale]/(marketing)/` — SEO landing pages (grouped, no layout impact)
- `app/[locale]/privelessen/`, `workshops/`, `mbo-rekenen/`, `scriptiebegeleiding/`, `consultancy/` — service pages
- `app/[locale]/booking/` — lesson booking
- `app/[locale]/blog/` — blog posts
- `app/[locale]/aantekeningen/` — notes/OCR feature
- `app/api/` — API routes (contact form, feedback, blog, OG image generation, aantekeningen)

### Component Organization

- `components/` — page-level components (`Hero/`, `About.tsx`, `Services.tsx`, `Footer.tsx`, etc.)
- `components/ui/` — shadcn/ui primitives
- `components/shared/` — reusable components (WhatsApp button, etc.)
- `components/contact/`, `components/mbo-rekenen/`, `components/workshops/`, `components/privelessen/` — domain-specific
- `components/BookingSystem/`, `components/FeedbackSystem/` — feature modules

### Styling

- TailwindCSS 3 with custom color scheme: primary yellow-300→yellow-500, background amber-950
- Fonts: Cormorant Garamond (headings, `--font-cormorant`) + Outfit (body, `--font-outfit`)
- Framer Motion for all animations

### Other Directories

- **`hooks/`** — Custom React hooks (`useOutsideClick`, `useFooter`, `useScrollPosition`)
- **`stores/`** — State stores (currently empty, reserved for Zustand or similar)
- **`scripts/`** — Build-time scripts (`generateSitemap.ts`)
- **`private/`** — Non-public assets (`favicon/` — source favicon files and manifest)
- **`docs/`** — Superpowers plans (`docs/superpowers/plans/`)

### Key Files

- `data/config.ts` — business config (site URL, contact info)
- `lib/structured-data.ts` — SEO JSON-LD schemas
- `lib/og-image.tsx` — dynamic OG image generation
- `i18n/routing.ts` — locale routing config
- `i18n/config.ts` — locale definitions (`nl`, `en`)

## Deployment

Dockerized standalone Next.js on port 4302. Public URL: `https://www.stephensprivelessen.nl`. Deployed via GitHub Actions on push to main.

## Testing

Jest with ts-jest. Tests in `__tests__/` (unit/component) and `tests/` (i18n, e2e). Playwright available for e2e (`playwright.config.ts`). Module alias `@/` maps to project root. Next.js navigation is mocked at `mocks/nextNavigation.ts`.
