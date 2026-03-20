# Site-Wide Fix & Cleanup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix all broken production code, remove dead code, and correct wrong pricing data across the site.

**Architecture:** Fix P0 broken features first (FeedbackSystem, blog, scriptiebegeleiding), then P1 wrong data (pricing, FAQ placeholders, SEO), then P2 dead code cleanup. Each task is a self-contained commit.

**Tech Stack:** Next.js 15, next-intl, TypeScript, Framer Motion

---

## Task 1: Fix FeedbackSystem — restore missing types

The FeedbackSystem imports 12+ types from `@/data` that were deleted during a prior migration. These types need to be restored in `data/types.ts`.

**Files:**
- Modify: `data/types.ts`

- [ ] **Step 1: Add missing FeedbackSystem types to data/types.ts**

Append these types (inferred from component usage) to `data/types.ts`:

```typescript
// FeedbackSystem types (restored after migration)
export interface FeedbackFormDataImportProps {
  longVersion: QuestionGroup[];
  shortVersion: QuestionGroup[];
}

export interface CustomRadioProps {
  label: string;
  value: string;
  selected: boolean;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export interface FormTypeSelectorProps {
  onSelect: (type: 'long' | 'short') => void;
  language: Language;
}

export interface FeedbackSummaryProps {
  data: FeedbackData;
  language: Language;
}

export interface RenderSummaryItemProps {
  label: string;
  value: string | number;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  label?: string;
}

export type ChartType = 'bar' | 'pie' | 'line';

export interface PieChartDataPoint {
  name: string;
  value: number;
  color?: string;
}

export interface ExpandedEntries {
  [key: string]: boolean;
}

export interface FilterOption {
  label: string;
  value: string;
  active: boolean;
}

export interface LabelGroup {
  id: string;
  label: Bilingual;
  options: Array<{ value: string; label: Bilingual }>;
}

export interface VakkenSelectorLabel {
  id: string;
  label: Bilingual;
  subjects: Array<{ value: string; label: Bilingual }>;
}
```

- [ ] **Step 2: Verify TypeScript compilation for FeedbackSystem**

Run: `npx tsc --noEmit --pretty 2>&1 | grep -c "FeedbackSystem"`
Expected: 0 errors in FeedbackSystem files (may still have errors elsewhere)

- [ ] **Step 3: Commit**

```bash
git add data/types.ts
git commit -m "fix: restore missing FeedbackSystem type definitions"
```

---

## Task 2: Fix FeedbackSystem — remove broken language selector step

The `setLanguage()` call at line 216 references an undefined function. Since next-intl handles locale via URL routing, the entire LanguageSelector step (-2) is architecturally wrong and should be removed.

**Files:**
- Modify: `components/FeedbackSystem/index.tsx`

- [ ] **Step 1: Remove the handleLanguageSelect function and LanguageSelector step**

In `components/FeedbackSystem/index.tsx`:
- Remove the `handleLanguageSelect` function (the one calling `setLanguage`)
- Remove the `case -2:` block in the step renderer that shows `<LanguageSelector />`
- Change the initial step from `-2` to `-1` (or `0` if `-1` is the form type selector)
- Remove the `LanguageSelector` import

- [ ] **Step 2: Verify the feedback page loads without runtime errors**

Run: `npx next build 2>&1 | grep -i "error"` or test manually
Expected: No `setLanguage is not defined` errors

- [ ] **Step 3: Commit**

```bash
git add components/FeedbackSystem/index.tsx
git commit -m "fix: remove broken language selector step from FeedbackSystem"
```

---

## Task 3: Fix FeedbackSystem — create missing API data files

The feedback API routes read from `data/feedback.json` and `data/feedbackComponentData.json` which don't exist.

**Files:**
- Create: `data/feedback.json`
- Create: `data/feedbackComponentData.json`

- [ ] **Step 1: Create empty but valid JSON data files**

`data/feedback.json`:
```json
[]
```

`data/feedbackComponentData.json`:
```json
{}
```

- [ ] **Step 2: Verify API routes return 200 instead of 500**

Run: `curl -s http://localhost:3000/api/feedback | head -1`
Expected: Valid JSON response

- [ ] **Step 3: Commit**

```bash
git add data/feedback.json data/feedbackComponentData.json
git commit -m "fix: create missing feedback API data files"
```

---

## Task 4: Fix blog — FullPageBlogPost prop mismatch

`BlogPostComponent` passes `{post, loadingErrorState}` but `FullPageBlogPost` in `Blog.tsx` expects `{index}`.

**Files:**
- Modify: `components/Blog.tsx` — fix `FullPageBlogPost` signature
- Modify: `components/BlogPostComponent.tsx` — verify props match
- Modify: `app/[locale]/blog/[id]/page.tsx` — fix `post.summary` and `post.category` references
- Modify: `app/[locale]/blog/[id]/default.tsx` — fix "Nah" placeholder

- [ ] **Step 1: Read Blog.tsx FullPageBlogPost to understand the intended behavior**

Read `components/Blog.tsx` from line 136 onward to understand what FullPageBlogPost does with `index` — it likely fetches from `blogPosts[index]` internally. The fix is to change the signature to accept `post` directly since `BlogPostComponent` already fetches and passes the post.

- [ ] **Step 2: Update FullPageBlogPost to accept post and loadingErrorState props**

In `components/Blog.tsx`, change the `FullPageBlogPost` component signature and body to accept and render a `BlogPost` object directly instead of fetching by index.

- [ ] **Step 3: Fix blog/[id]/page.tsx metadata — remove post.summary and post.category**

Replace `post.summary.NL` with `post.content.NL.substring(0, 160)` (or equivalent).
Replace `post.category?.NL` with a fallback or remove the reference.

- [ ] **Step 4: Fix blog/[id]/default.tsx — replace "Nah" with proper fallback**

Replace the component body with a redirect to the blog index or a proper not-found page:
```typescript
import { redirect } from 'next/navigation';
export default function Default() {
  redirect('/blog');
}
```

- [ ] **Step 5: Commit**

```bash
git add components/Blog.tsx components/BlogPostComponent.tsx app/\[locale\]/blog/\[id\]/page.tsx app/\[locale\]/blog/\[id\]/default.tsx
git commit -m "fix: resolve blog FullPageBlogPost prop mismatch and remove placeholder"
```

---

## Task 5: Fix ScriptiebegeleidingContent — Bilingual passed as string

**Files:**
- Modify: `app/[locale]/scriptiebegeleiding/ScriptiebegeleidingContent.tsx`

- [ ] **Step 1: Read the component around lines 170-220 and fix Bilingual → string**

The component passes `{ EN: string, NL: string }` objects where plain strings are expected. Fix by extracting the correct language string using the current locale before passing.

- [ ] **Step 2: Commit**

```bash
git add app/\[locale\]/scriptiebegeleiding/ScriptiebegeleidingContent.tsx
git commit -m "fix: resolve Bilingual type errors in scriptiebegeleiding"
```

---

## Task 6: Fix FAQ — remove dead props and fix placeholder text

**Files:**
- Modify: `app/[locale]/FAQ/page.tsx` — remove unused props passed to Faq component
- Modify: `messages/nl/faq.json` — replace `[e-mailadres]` and `[telefoonnummer]`
- Modify: `messages/en/faq.json` — replace `[email address]` and `[phone number]`

- [ ] **Step 1: Clean up FAQ/page.tsx — remove dead faqData import and props**

The `Faq` component uses `useTranslations('faq')` internally. Remove the `faqData` import and prop passing. Keep the JSON-LD structured data if it's valid.

- [ ] **Step 2: Replace placeholder text in FAQ messages**

In `messages/nl/faq.json`, replace:
- `[e-mailadres]` → `info@stephenadei.nl`
- `[telefoonnummer]` → `+31 6 47357426`

In `messages/en/faq.json`, replace:
- `[email address]` → `info@stephenadei.nl`
- `[phone number]` → `+31 6 47357426`

- [ ] **Step 3: Commit**

```bash
git add app/\[locale\]/FAQ/page.tsx messages/nl/faq.json messages/en/faq.json
git commit -m "fix: clean up FAQ props and replace placeholder contact details"
```

---

## Task 7: Fix broken internal link

**Files:**
- Modify: `app/[locale]/(marketing)/bijles/onderwerp/statistiek/psychologie/page.tsx`

- [ ] **Step 1: Fix link from `/scriptiebegeleiding/statistiek` to `/scriptiebegeleiding`**

The route `/scriptiebegeleiding/statistiek` does not exist. Change to `/scriptiebegeleiding`.

- [ ] **Step 2: Commit**

```bash
git add app/\[locale\]/\(marketing\)/bijles/onderwerp/statistiek/psychologie/page.tsx
git commit -m "fix: correct broken scriptiebegeleiding link"
```

---

## Task 8: Fix pricing data — replace hardcoded prices with rates.json values

The `data/pricingData.ts` file has completely wrong per-hour rates from the old pricing model. The site now uses packages only.

**Files:**
- Modify: `data/pricingData.ts` — rewrite `prices` export to reflect current package-based pricing
- Modify: `data/config.ts` — remove or update obsolete travel/flexibility pricing constants if no longer used

- [ ] **Step 1: Read all components that import from pricingData.ts**

Run: `grep -r "pricingData\|from.*pricing" --include="*.tsx" --include="*.ts" -l` to find all consumers.

- [ ] **Step 2: Rewrite the `prices` export in pricingData.ts**

Replace per-hour prices with the current package rates from `rates.json`. Keep the structure compatible with consuming components (or update consumers).

Current wrong rates (example): `{ duration: 1, price: 90.00 }` for higher education
Correct: 4-hour packages only — €360 online / €450 physical for HBO/WO individual

- [ ] **Step 3: Fix structured data prices in marketing pages**

Check all `(marketing)/bijles/*` pages for `price: 45` in JSON-LD and update to reflect actual starting prices.

- [ ] **Step 4: Commit**

```bash
git add data/pricingData.ts data/config.ts
git commit -m "fix: update pricing data to current package-based rates"
```

---

## Task 9: Remove dead code — components

**Files to delete:**
- `components/AnimatedBackground.tsx`
- `components/Button.tsx`
- `components/Modal.tsx`
- `components/Hero/SecondaryImage.tsx`
- `components/privelessen/ContactSection.tsx`
- `components/privelessen/WeekendZuidoostHero.tsx`
- `components/privelessen/WeekendZuidoostContent.tsx`
- `components/privelessen/StudentInfoModal.tsx`
- `components/BookingSystem/DatePicker.tsx`
- `components/FeedbackSystem/CustomCheckbox.tsx`
- `components/all_files_export/` (entire directory)
- `components/chalk-texture.png`

- [ ] **Step 1: Verify each file is truly unused**

Run `grep -r "AnimatedBackground\|SecondaryImage\|WeekendZuidoostHero\|WeekendZuidoostContent\|StudentInfoModal\|CustomCheckbox" --include="*.tsx" --include="*.ts" -l` to confirm zero imports.

- [ ] **Step 2: Delete all confirmed dead files**

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore: remove dead components and unused files"
```

---

## Task 10: Remove dead code — data files and API routes

**Data files to delete:**
- `data/navigation.ts` (only used in tests, which should use messages)
- `data/contactData.ts`
- `data/questionsData.ts`
- `data/locationData.ts`
- `data/feedbackSummaryData.ts`
- `data/business.ts` (broken import, dead code)

**API routes to delete:**
- `app/api/personal-intermezzo/route.ts`
- `app/api/submit-lesson-request/route.ts` (security issue: accepts arbitrary `to` field)
- `app/api/test-email/route.ts` (debug endpoint)
- `app/api/contact/route.ts` (superseded by submit-form)

- [ ] **Step 1: Verify each file is truly unused**

Grep for imports of each data file and API route usage across the codebase.

- [ ] **Step 2: Delete confirmed dead files**

- [ ] **Step 3: Update `data/index.ts` to remove re-exports of deleted files**

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove dead data files and unused API routes"
```

---

## Task 11: Remove console.log statements

**Files:**
- Modify: `components/FeedbackSystem/LanguageSelector.tsx:25` — remove `console.log('LanguageSelector loaded')`
- Modify: `components/contact/Contact.tsx:127` — remove `console.log('Current step:', currentStep)`

- [ ] **Step 1: Remove console statements**

- [ ] **Step 2: Commit**

```bash
git add components/FeedbackSystem/LanguageSelector.tsx components/contact/Contact.tsx
git commit -m "chore: remove console.log statements from production code"
```

---

## Task 12: Fix duplicate FadeInText

**Files:**
- Delete: `components/FadeInText.tsx` (only used by Faq.tsx)
- Modify: `components/Faq.tsx` — update import to use `components/FeedbackSystem/FadeInText.tsx` OR inline the animation

- [ ] **Step 1: Check if both FadeInText implementations are identical**

If yes, delete one and update the import. If they differ, keep both but rename to avoid confusion.

- [ ] **Step 2: Commit**

```bash
git add components/FadeInText.tsx components/Faq.tsx
git commit -m "chore: deduplicate FadeInText component"
```
