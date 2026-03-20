# Site Restructure — Remove Unnecessary Pages & Improve UX/SEO

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reduce 26 routes to 18 by removing redundant/broken/admin pages and consolidating thin location pages, while improving discoverability of special programs.

**Architecture:** Delete pages bottom-up — first remove references (nav, sitemap, internal links), then delete the route files. For location consolidation, add location info to the main `/privelessen` page before removing the 5 separate pages. Cross-link special programs (zuidoost-weekend, boa-me-na-menboa-mo) from the privelessen hub.

**Tech Stack:** Next.js 15, next-intl, TypeScript

---

## File Map

**Delete:**
- `app/[locale]/services/page.tsx` + `app/[locale]/services/metadata.ts` (if exists)
- `app/[locale]/viewData/page.tsx` + `app/[locale]/viewData/ViewDataContent.tsx` (if exists)
- `app/[locale]/booking/page.tsx`
- `app/[locale]/privelessen/[location]/page.tsx` (entire `[location]` directory)

**Modify:**
- `components/Header.tsx` — remove `/services` nav link
- `components/FloatingNavbar.tsx` — remove `/services` nav link
- `components/Footer.tsx` — remove `/services` link
- `data/navigation.ts` — remove `/services` entry
- `scripts/generateSitemap.ts` — remove `/services`, location pages
- `components/InternalLinks.tsx` — remove location-specific links, replace with link to privelessen hub
- `app/[locale]/privelessen/page.tsx` — add location coverage section + special program cards

---

### Task 1: Remove `/services` page and all references

The `/services` page duplicates home page content. Remove it and update all navigation.

**Files:**
- Modify: `components/Header.tsx:15`
- Modify: `components/FloatingNavbar.tsx:13`
- Modify: `components/Footer.tsx:14`
- Modify: `data/navigation.ts:15`
- Modify: `scripts/generateSitemap.ts:39,80`
- Delete: `app/[locale]/services/` (entire directory)

- [ ] **Step 1: Read all files to find exact `/services` references**

Read each file listed above and note the exact lines with `/services`.

- [ ] **Step 2: Remove `/services` from Header.tsx navigation**

Remove the nav item pointing to `/services`. The nav should go: Tutoring, Thesis Supervision, Workshops, Consultancy, About, Blog, FAQ, Contact.

- [ ] **Step 3: Remove `/services` from FloatingNavbar.tsx navigation**

Same change as Header.

- [ ] **Step 4: Remove `/services` from Footer.tsx**

Remove the services link from the footer's service links section.

- [ ] **Step 5: Remove `/services` from data/navigation.ts**

Remove the `/services` entry from the navigation array.

- [ ] **Step 6: Remove `/services` from generateSitemap.ts**

Remove the `/services` entry from the sitemap routes and from the `addedPaths` set.

- [ ] **Step 7: Delete the services page directory**

```bash
rm -rf app/[locale]/services/
```

- [ ] **Step 8: Verify no remaining references**

```bash
grep -r '"/services"' --include="*.tsx" --include="*.ts" -l
```
Expected: zero results (or only test files).

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "refactor: remove redundant /services page and all references"
```

---

### Task 2: Remove `/viewData` and `/booking` pages

Both are orphaned — no nav links point to them. `/viewData` is an exposed admin page, `/booking` is an unfinished prototype.

**Files:**
- Delete: `app/[locale]/viewData/` (entire directory)
- Delete: `app/[locale]/booking/` (entire directory)
- Modify: `scripts/generateSitemap.ts` — remove these routes if present

- [ ] **Step 1: Check for any references to viewData or booking**

```bash
grep -r '"viewData\|"/viewData\|"/booking\|"booking' --include="*.tsx" --include="*.ts" -l
```

- [ ] **Step 2: Delete both page directories**

```bash
rm -rf app/[locale]/viewData/
rm -rf app/[locale]/booking/
```

- [ ] **Step 3: Remove from sitemap if present**

Read `scripts/generateSitemap.ts` and remove any `/viewData` or `/booking` entries.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "refactor: remove /viewData (admin page) and /booking (unfinished prototype)"
```

---

### Task 3: Enhance `/privelessen` hub with location coverage and special programs

Before removing the 5 location pages, add their value to the main privelessen page. Also add cross-links to the special programs.

**Files:**
- Modify: `app/[locale]/privelessen/page.tsx` — may need to make it pass new props
- Modify: `components/privelessen/TutoringPage.tsx` — add location section and special program cards

- [ ] **Step 1: Read the current privelessen page and TutoringPage component**

Read `app/[locale]/privelessen/page.tsx` and `components/privelessen/TutoringPage.tsx` to understand the current structure.

- [ ] **Step 2: Add a "Where We Teach" section to TutoringPage**

After the existing sections, add a section showing location coverage. Use the `useTranslations('tutoring')` pattern. The section should show:

- Amsterdam coverage areas (Zuid, Centrum, Noord, West, Oost) as a visual grid or list
- "Science Park or online" as the primary locations
- This replaces the 5 separate thin pages with one comprehensive section

Add the translation keys to `messages/nl/tutoring.json` and `messages/en/tutoring.json`:
```json
"locations": {
  "title": "Waar We Lesgeven" / "Where We Teach",
  "subtitle": "Lessen op Science Park of online. Beschikbaar voor studenten in heel Amsterdam." / "Lessons at Science Park or online. Available for students across Amsterdam.",
  "areas": ["Amsterdam Zuid", "Amsterdam Centrum", "Amsterdam Noord", "Amsterdam West", "Amsterdam Oost"],
  "sciencePark": "Science Park 904, Amsterdam",
  "online": "Online via Zoom"
}
```

- [ ] **Step 3: Add special program cards below the location section**

Add two cards linking to the special programs:

1. **Weekend Bijles Zuidoost** → links to `/privelessen/zuidoost-weekend`
2. **Boa Me Na Menboa Mo** → links to `/privelessen/boa-me-na-menboa-mo`

Use translation keys:
```json
"specialPrograms": {
  "title": "Speciale Programma's" / "Special Programs",
  "weekend": {
    "title": "Weekend Bijles Zuidoost" / "Weekend Tutoring Zuidoost",
    "description": "Zaterdag- en zondaglessen bij HvA in Amsterdam Zuidoost" / "Saturday and Sunday lessons at HvA in Amsterdam Zuidoost"
  },
  "boa": {
    "title": "Boa Me Na Menboa Mo",
    "description": "Speciaal bijlesprogramma voor jongeren in Zuidoost" / "Special tutoring program for youth in Zuidoost"
  }
}
```

- [ ] **Step 4: Verify the page renders correctly**

Run: `npx tsc --noEmit` — zero errors.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add location coverage and special program sections to privelessen hub"
```

---

### Task 4: Remove `/privelessen/[location]` pages and update internal links

Now that location info is on the main privelessen page, remove the 5 thin location pages.

**Files:**
- Delete: `app/[locale]/privelessen/[location]/` (entire directory)
- Modify: `components/InternalLinks.tsx` — remove location-specific links
- Modify: `scripts/generateSitemap.ts` — remove location page entries

- [ ] **Step 1: Read InternalLinks.tsx to understand current structure**

Read `components/InternalLinks.tsx` to see how location links are rendered.

- [ ] **Step 2: Update InternalLinks.tsx**

Remove the "Per Regio" grid section with 5 location links. Replace with a single link to `/privelessen` or remove the section entirely if not needed.

- [ ] **Step 3: Remove location pages from sitemap**

In `scripts/generateSitemap.ts`, remove the loop/entries that add the 5 location pages (around lines 47-49).

- [ ] **Step 4: Delete the [location] directory**

```bash
rm -rf "app/[locale]/privelessen/[location]/"
```

- [ ] **Step 5: Verify no remaining references**

```bash
grep -r 'amsterdam-zuid\|amsterdam-centrum\|amsterdam-noord\|amsterdam-west\|amsterdam-oost' --include="*.tsx" --include="*.ts" -l
```
Expected: zero results (or only test/data files).

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "refactor: remove thin location pages, consolidated into privelessen hub"
```

---

### Task 5: Add redirects for removed pages

Set up redirects in `next.config.js` so any existing Google-indexed URLs or bookmarks don't 404.

**Files:**
- Modify: `next.config.js`

- [ ] **Step 1: Read next.config.js**

- [ ] **Step 2: Add redirects configuration**

```javascript
const nextConfig = {
  // existing config...
  async redirects() {
    return [
      { source: '/services', destination: '/#services', permanent: true },
      { source: '/en/services', destination: '/en/#services', permanent: true },
      { source: '/booking', destination: '/contact', permanent: true },
      { source: '/en/booking', destination: '/en/contact', permanent: true },
      { source: '/privelessen/amsterdam-zuid', destination: '/privelessen', permanent: true },
      { source: '/privelessen/amsterdam-centrum', destination: '/privelessen', permanent: true },
      { source: '/privelessen/amsterdam-noord', destination: '/privelessen', permanent: true },
      { source: '/privelessen/amsterdam-west', destination: '/privelessen', permanent: true },
      { source: '/privelessen/amsterdam-oost', destination: '/privelessen', permanent: true },
      { source: '/en/privelessen/amsterdam-:area', destination: '/en/privelessen', permanent: true },
    ];
  },
};
```

Note: Do NOT add a redirect for `/viewData` — it was an admin page that shouldn't be discoverable.

- [ ] **Step 3: Verify build still works**

Run: `npx tsc --noEmit`

- [ ] **Step 4: Commit**

```bash
git add next.config.js
git commit -m "feat: add 301 redirects for removed pages"
```

---

### Task 6: Final verification

- [ ] **Step 1: Run full test suite**

```bash
npx jest --ci
```
Expected: all tests pass. The sitemap test may need updating if it checks for removed routes.

- [ ] **Step 2: Fix any failing tests**

If sitemap tests fail because they expect removed routes, update them to match the new route structure.

- [ ] **Step 3: Run TypeScript check**

```bash
npx tsc --noEmit
```
Expected: zero errors.

- [ ] **Step 4: Verify route count**

```bash
find app/[locale] -name "page.tsx" | wc -l
```
Expected: ~18 (down from 26).

- [ ] **Step 5: Commit any test fixes**

```bash
git add -A
git commit -m "test: update tests for new route structure"
```
