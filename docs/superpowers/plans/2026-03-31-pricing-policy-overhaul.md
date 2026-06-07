# Pricing & Policy Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace per-hour pricing with 4-hour package model, update all policies (payment, cancellation, availability), delete discontinued weekend Zuidoost page, and shift site persona from "we" to "I".

**Architecture:** Data-first approach — update `data/pricingData.ts` and `data/config.ts` as the source of truth, then cascade to translation files (`messages/{nl,en}/*.json`), then delete unused pages/components, then sweep persona across all content files.

**Tech Stack:** Next.js 15, next-intl, TypeScript, TailwindCSS

---

## File Structure

**Modify:**
- `data/pricingData.ts` — fix HBO/WO prices, remove weekend packages, remove legacy pricing, add policy data
- `data/config.ts` — remove legacy pricing constants, note Google Meet as platform, update payment info
- `data/faq.ts` — update persona from "we" to "I" throughout
- `components/PricingPage.tsx` — remove flexibility premium and travel cost sections
- `components/privelessen/SpecialProgramsSection.tsx` — remove weekend program link (or entire component if only entry)
- `i18n/request.ts` — remove weekend message import
- `messages/nl/faq.json` — rewrite with updated pricing, payment, availability, persona
- `messages/en/faq.json` — rewrite with updated pricing, payment, availability, persona
- `messages/nl/about.json` — persona sweep: "we/wij/onze/ons" → "I/ik/mijn"
- `messages/en/about.json` — persona sweep: "we/our" → "I/my"
- `messages/nl/services.json` — persona sweep
- `messages/en/services.json` — persona sweep
- `messages/nl/terms.json` — update payment method and cancellation policy
- `messages/en/terms.json` — update payment method and cancellation policy

**Delete:**
- `app/[locale]/privelessen/zuidoost-weekend/page.tsx`
- `app/[locale]/privelessen/zuidoost-weekend/ZuidoostWeekendContent.tsx`
- `app/[locale]/privelessen/zuidoost-weekend/layout.tsx`
- `app/[locale]/privelessen/zuidoost-weekend/metadata.ts`
- `components/privelessen/zuidoost/ZuidoostStudentForm.tsx`
- `components/privelessen/zuidoost/ZuidoostOfferVariant.tsx`
- `components/privelessen/zuidoost/ZuidoostLocationMap.tsx`
- `components/privelessen/zuidoost/ZuidoostSubjectsSection.tsx`
- `data/weekendTutoring.ts`
- `data/businessInfo.ts`
- `data/faq.ts` (after migrating any needed content to messages JSON)
- `messages/nl/weekend.json`
- `messages/en/weekend.json`

---

### Task 1: Fix HBO/WO prices and remove weekend packages from pricingData.ts

**Files:**
- Modify: `data/pricingData.ts:147-173`

- [ ] **Step 1: Update hboWoOnlinePackages**

In `data/pricingData.ts`, replace lines 147-152:

```typescript
export const hboWoOnlinePackages = [
  { students: 1, packagePrice: 300, pricePerPerson: 300 },
  { students: 2, packagePrice: 400, pricePerPerson: 200 },
  { students: 3, packagePrice: 510, pricePerPerson: 170 },
  { students: 4, packagePrice: 600, pricePerPerson: 150 },
];
```

- [ ] **Step 2: Update hboWoPhysicalPackages**

Replace lines 154-159:

```typescript
export const hboWoPhysicalPackages = [
  { students: 1, packagePrice: 400, pricePerPerson: 400 },
  { students: 2, packagePrice: 520, pricePerPerson: 260 },
  { students: 3, packagePrice: 660, pricePerPerson: 220 },
  { students: 4, packagePrice: 800, pricePerPerson: 200 },
];
```

- [ ] **Step 3: Update emergency prices**

Replace `spoedPrices` (lines 176-181):

```typescript
export const spoedPrices = {
  voOnline: 120,
  voPhysical: 180,
  hboWoOnline: 180,
  hboWoPhysical: 260,
};
```

(VO prices are already correct. HBO/WO emergency prices should already match but verify.)

- [ ] **Step 4: Delete weekend HvA package arrays**

Remove `weekendHvaOnlinePackages` (lines 161-166) and `weekendHvaPhysicalPackages` (lines 168-173) entirely. Also remove the comment on line 131 referencing "Weekend HvA".

- [ ] **Step 5: Verify no compile errors**

Run: `cd /home/stephen/projects/stephensprivelessen-nl && npx tsc --noEmit 2>&1 | head -30`

Expected: If weekend packages are imported elsewhere, we'll see errors — those are fixed in Task 3.

- [ ] **Step 6: Commit**

```bash
git add data/pricingData.ts
git commit -m "fix: correct HBO/WO prices and remove weekend HvA packages"
```

---

### Task 2: Remove legacy pricing from config.ts and pricingData.ts

**Files:**
- Modify: `data/config.ts:20-36, 68-72`
- Modify: `data/pricingData.ts:183-210`

- [ ] **Step 1: Remove legacy constants from config.ts**

In `data/config.ts`, delete the `TRAVEL_COSTS` constant (lines 21-25), `LAST_MINUTE_SURCHARGES` (lines 27-30), and `FLEXIBILITY_PREMIUM` (lines 32-36).

Then remove from the `config` export object (lines 67-71):

```typescript
// DELETE this entire block from config:
pricing: {
    travelCosts: TRAVEL_COSTS,
    lastMinuteSurcharges: LAST_MINUTE_SURCHARGES,
    flexibilityPremium: FLEXIBILITY_PREMIUM
}
```

Also remove the `import { config } from './config';` from `pricingData.ts` (line 3) since it will no longer be needed after removing the legacy `prices` object.

- [ ] **Step 2: Remove legacy prices object from pricingData.ts**

Delete the entire `prices` export (lines 183-210) — this is the legacy shape that references config pricing. The `rekentrajectenComparison` export at the top should remain if still used.

Also delete the `scriptieRates` export (lines 213-216) — verify if it's used anywhere first by searching: `grep -r "scriptieRates" --include="*.ts" --include="*.tsx"`. If used, keep it.

- [ ] **Step 3: Update data/index.ts if needed**

The barrel export `export * from './pricingData'` at `data/index.ts:4` should still work since the package arrays are still exported. But verify no component imports the deleted `prices` object:

Run: `grep -rn "from.*data.*import.*prices\b\|{ prices" --include="*.ts" --include="*.tsx" /home/stephen/projects/stephensprivelessen-nl/`

- [ ] **Step 4: Update PricingPage.tsx**

In `components/PricingPage.tsx`, remove the flexibility premium and travel cost sections. The component currently imports `prices` from `@/data` — this import and the sections using it need to be removed or replaced.

Replace the entire file:

```typescript
// components/PricingPage.tsx
'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

const PricingPage = () => {
  const t = useTranslations('tutoring');

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--ink)] to-[var(--ink-light)] py-12 px-6 sm:px-8 lg:px-12">
      <div className="max-w-6xl mx-auto bg-[var(--ink)] p-8 rounded-lg shadow-sm border border-[var(--sage)]/20">
        <h1 className="text-4xl font-display font-bold text-center text-[var(--amber)] mb-12">
          {t('pricing.title')}
        </h1>
        {/* Package pricing is now rendered by the tutoring page — this component may need further refactoring */}
      </div>
    </div>
  );
};

export default PricingPage;
```

Note: If PricingPage.tsx is actively used and renders real pricing, we should check what `PricingTable` and `LocationPricingTable` expect and whether we need to feed them the new package arrays instead. Check usage:

Run: `grep -rn "PricingPage\|PricingTable\|LocationPricingTable" --include="*.ts" --include="*.tsx" /home/stephen/projects/stephensprivelessen-nl/`

- [ ] **Step 5: Verify build**

Run: `cd /home/stephen/projects/stephensprivelessen-nl && npx tsc --noEmit 2>&1 | head -30`

- [ ] **Step 6: Commit**

```bash
git add data/config.ts data/pricingData.ts components/PricingPage.tsx
git commit -m "refactor: remove legacy per-hour pricing, travel costs, and flexibility premiums"
```

---

### Task 3: Delete weekend Zuidoost page and related files

**Files:**
- Delete: `app/[locale]/privelessen/zuidoost-weekend/` (entire directory)
- Delete: `components/privelessen/zuidoost/` (entire directory — all 4 files are weekend-specific)
- Delete: `data/weekendTutoring.ts`
- Delete: `data/businessInfo.ts`
- Delete: `messages/nl/weekend.json`
- Delete: `messages/en/weekend.json`
- Modify: `i18n/request.ts:26`
- Modify: `components/privelessen/SpecialProgramsSection.tsx`

- [ ] **Step 1: Delete weekend page directory**

```bash
rm -rf /home/stephen/projects/stephensprivelessen-nl/app/\[locale\]/privelessen/zuidoost-weekend/
```

- [ ] **Step 2: Delete zuidoost components**

```bash
rm -rf /home/stephen/projects/stephensprivelessen-nl/components/privelessen/zuidoost/
```

- [ ] **Step 3: Delete weekend data and translations**

```bash
rm /home/stephen/projects/stephensprivelessen-nl/data/weekendTutoring.ts
rm /home/stephen/projects/stephensprivelessen-nl/data/businessInfo.ts
rm /home/stephen/projects/stephensprivelessen-nl/messages/nl/weekend.json
rm /home/stephen/projects/stephensprivelessen-nl/messages/en/weekend.json
```

- [ ] **Step 4: Remove weekend import from i18n/request.ts**

In `i18n/request.ts`, delete line 26:

```typescript
// DELETE this line:
weekend: (await import(`../messages/${locale}/weekend.json`)).default,
```

- [ ] **Step 5: Update SpecialProgramsSection.tsx**

The component at `components/privelessen/SpecialProgramsSection.tsx` only has one program entry (weekend Zuidoost). Since there are no other special programs, either:
- Delete the entire component if nothing else imports it, OR
- Empty the `programs` array

First check if it's imported:

Run: `grep -rn "SpecialProgramsSection" --include="*.ts" --include="*.tsx" /home/stephen/projects/stephensprivelessen-nl/`

If only imported in one place, remove both the component file and the import from its parent.

- [ ] **Step 6: Check for any remaining weekend references**

Run: `grep -rn "zuidoost-weekend\|weekendTutoring\|weekendHva\|weekend\.json\|Weekend Bijles\|Weekend Tutoring" --include="*.ts" --include="*.tsx" --include="*.json" /home/stephen/projects/stephensprivelessen-nl/`

Fix any remaining references found.

- [ ] **Step 7: Verify build**

Run: `cd /home/stephen/projects/stephensprivelessen-nl && npx tsc --noEmit 2>&1 | head -30`

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: remove discontinued weekend Zuidoost page and related files"
```

---

### Task 4: Update terms.json (payment and cancellation policy)

**Files:**
- Modify: `messages/nl/terms.json`
- Modify: `messages/en/terms.json`

- [ ] **Step 1: Update Dutch terms**

Replace entire content of `messages/nl/terms.json`:

```json
{
  "items": [
    {
      "title": "Betaling",
      "content": [
        "Betaling gaat vooraf per Tikkie.",
        "Een factuur is mogelijk op verzoek.",
        "Een les of plek staat pas definitief vast na bevestiging en betaling."
      ]
    },
    {
      "title": "Annulering en Verplaatsing",
      "content": [
        "Een les verzetten kan alleen in overleg en op basis van beschikbaarheid.",
        "Annuleren of verzetten moet minimaal 24 uur van tevoren.",
        "Bij afmelding binnen 24 uur vervalt de les.",
        "Inhalen is alleen mogelijk op zondag tussen 14:00 en 18:00, online."
      ]
    }
  ]
}
```

- [ ] **Step 2: Update English terms**

Replace entire content of `messages/en/terms.json`:

```json
{
  "items": [
    {
      "title": "Payment",
      "content": [
        "Payment is made in advance via Tikkie.",
        "An invoice is available on request.",
        "A lesson or spot is only confirmed after payment and confirmation."
      ]
    },
    {
      "title": "Cancellation and Rescheduling",
      "content": [
        "Rescheduling is only possible by arrangement and subject to availability.",
        "Cancellations or rescheduling must be communicated at least 24 hours in advance.",
        "Cancellation within 24 hours means the lesson is forfeited.",
        "Make-up lessons are only available on Sundays between 14:00 and 18:00, online."
      ]
    }
  ]
}
```

- [ ] **Step 3: Commit**

```bash
git add messages/nl/terms.json messages/en/terms.json
git commit -m "fix: update payment and cancellation terms to match current policy"
```

---

### Task 5: Update FAQ content (pricing, payment, availability, persona)

**Files:**
- Modify: `messages/nl/faq.json`
- Modify: `messages/en/faq.json`
- Delete: `data/faq.ts` (legacy bilingual FAQ — content now lives in messages JSON)

- [ ] **Step 1: Rewrite Dutch FAQ**

Replace entire content of `messages/nl/faq.json`. Key changes:
- All "we/wij/onze/ons" → "ik/mijn" (first person singular)
- Item 7 (pricing): update to package model, remove weekend reference
- Item 9 (payment): Tikkie prepayment, not bank transfer/iDEAL
- Item 10 (trial): free trial is online, on Sundays
- Item 13 (scheduling): update availability hours
- Item 20 (frequency): update to package-based model

```json
{
  "title": "Veelgestelde Vragen",
  "description": "Vind antwoorden op veelvoorkomende vragen over mijn privélessen.",
  "searchPlaceholder": "Zoeken...",
  "languageToggle": "EN",
  "scrollToTopLabel": "Scroll naar boven",
  "items": [
    { "question": "Wat inspireerde je om bijles en onderwijs aan te bieden?", "answer": "Mijn passie voor bijles en onderwijs komt voort uit mijn eigen ervaringen. Mijn reis door uitdagingen in wiskunde op de middelbare school leidde tot een diep begrip van het vak en een sterke motivatie om anderen te helpen. Die ervaring — weten hoe het voelt om vast te zitten en hoe je er doorheen breekt — is de basis van alles wat ik doe." },
    { "question": "Hoe zou je jouw onderwijsaanpak omschrijven?", "answer": "Mijn aanpak is sterk gericht op persoonlijke begeleiding en maatwerk. Ik gebruik technologie zoals iPad-aantekeningen en bied tot zeven dagen na de les ondersteuning via WhatsApp. Mijn doel is om een leeromgeving te creëren waarin studenten op hun eigen tempo kunnen groeien en bloeien." },
    { "question": "Wat maakt jouw bijlessen uniek in vergelijking met andere aanbieders?", "answer": "Mijn bijlessen onderscheiden zich door een multidisciplinaire achtergrond in wiskunde, statistiek, programmeren en data-analyse. Ik benader complexe onderwerpen op een begrijpelijke manier en focus sterk op de persoonlijke groei van mijn studenten." },
    { "question": "Hoe ga je om met verschillende leerstijlen en -niveaus van studenten?", "answer": "Ik pas mijn lessen aan op de specifieke leerstijl van elke student. De lessen zijn interactief en dynamisch, met een combinatie van theoretische uitleg, praktische oefeningen en toepassingen in de echte wereld. Ik gebruik differentiatie technieken zoals scaffolding om effectief in te spelen op verschillende leerstijlen." },
    { "question": "Welke resultaten en successen heb je gezien bij je studenten?", "answer": "Mijn bijlessen hebben veel studenten geholpen om hun academische prestaties te verbeteren en hun zelfvertrouwen te vergroten. Ik heb talloze succesverhalen, waaronder een volwassen student die het CCVX-examen succesvol aflegde en zijn universitaire studie hervatte." },
    { "question": "Hoe worden de bijlessen georganiseerd?", "answer": "De bijlessen vinden doordeweeks plaats tussen 18:00 en 21:00, online via Google Meet of fysiek op Science Park in Amsterdam. Ik werk uitsluitend met pakketten van 4 uur — er zijn dus geen losse lessen meer. Maximaal 2 uur les per week." },
    { "question": "Wat zijn de kosten van de bijlessen?", "answer": "Ik werk met pakketten van 4 uur. Voor voortgezet onderwijs: online vanaf €240 per pakket (€60/u), fysiek op Science Park vanaf €300 (€75/u). Voor hoger onderwijs (HBO/WO): online vanaf €300 per pakket (€75/u), fysiek vanaf €400 (€100/u). Groepskortingen zijn beschikbaar tot 4 studenten. Voor spoedhulp is er een 2-uurspakket beschikbaar." },
    { "question": "Hoe kan ik me aanmelden voor bijles?", "answer": "Je kunt je aanmelden door een bericht te sturen via WhatsApp, het contactformulier op de website in te vullen, of door te bellen. Ik bespreek graag je specifieke behoeften en hoe ik je het beste kan helpen." },
    { "question": "Hoe verloopt de betalingsprocedure?", "answer": "Betaling gaat vooraf per Tikkie. Een factuur is mogelijk op verzoek. Een les of plek staat pas definitief vast na bevestiging en betaling." },
    { "question": "Is er een mogelijkheid tot een proefles?", "answer": "Ja, ik bied een gratis proefles aan zodat je kunt kennismaken met mijn werkwijze. De proefles vindt online plaats op zondag. Dit is een goede gelegenheid om te ervaren hoe de lessen worden gegeven en om te bepalen of mijn aanpak bij je past." },
    { "question": "Bied je ook bijles voor beroepsspecifieke vakken?", "answer": "Ja, ik bied bijles voor beroepsspecifieke vakken, voornamelijk op het gebied van scriptiebegeleiding en studievaardigheden. Ik help studenten met het structureren van teksten, het ontwikkelen van logische argumenten en het uitvoeren van statistische analyses." },
    { "question": "Hoe integreer je AI-taalmodellen en technologie in de lessen?", "answer": "Ik maak gebruik van de nieuwste technologieën, waaronder AI-taalmodellen zoals ChatGPT en Claude, om complexe concepten te verduidelijken en interactieve leerervaringen te bieden. Ik gebruik ook een iPad voor digitale aantekeningen, die ik na de les deel met de student." },
    { "question": "Hoe ondersteun je studenten bij het ontwikkelen van soft skills?", "answer": "Ik ondersteun studenten door hen te helpen met het plannen van hun studie, het stellen van prioriteiten en het behouden van overzicht. Mijn aanpak is gericht op het bevorderen van zelfvertrouwen en het ontwikkelen van praktische vaardigheden die studenten in hun dagelijkse leven kunnen toepassen." },
    { "question": "Welke ervaringen heb je met het begeleiden van studenten met leerproblemen?", "answer": "Ik heb ervaring met het begeleiden van studenten met leerproblemen, zoals lichte autisme. Ik bied een gestructureerde en geduldige leeromgeving, waarbij ik rekening houd met hun specifieke behoeften en uitdagingen." },
    { "question": "Hoe zorg je ervoor dat studenten gemotiveerd blijven?", "answer": "Ik creëer een positieve en ondersteunende omgeving waarin studenten worden aangemoedigd om nieuwsgierig te zijn en hun passie voor leren te ontdekken. Ik ben er om te ondersteunen, maar de uiteindelijke motivatie hangt af van de student zelf." },
    { "question": "Welke rol speelt feedback in jouw onderwijsaanpak?", "answer": "Feedback is een essentieel onderdeel van mijn aanpak. Ik ben constant bezig met het verbeteren van mijn methoden en sta open voor suggesties van studenten en ouders. Feedback helpt mij om de lessen te verfijnen en aan te passen aan de behoeften van mijn studenten." },
    { "question": "Bied je maatwerk en gespecialiseerde programma's voor bedrijven?", "answer": "Ja, ik bied op maat gemaakte programma's en trainingen voor bedrijven en instellingen, afgestemd op hun specifieke behoeften en doelen. Dit kan variëren van het trainen van personeel in het gebruik van statistische programma's en data management tools tot het introduceren van nieuwe technologieën zoals prompt engineering." },
    { "question": "Hoe kan ik contact opnemen voor meer informatie?", "answer": "Voor vragen of meer informatie kun je contact met mij opnemen via info@stephenadei.nl of bellen naar +31 6 47357426. Ik beantwoord graag al je vragen en sta klaar om je te helpen. Je kunt ook een berichtje sturen via WhatsApp." },
    { "question": "Welke materialen en hulpmiddelen worden tijdens de lessen gebruikt?", "answer": "Tijdens de lessen gebruik ik verschillende materialen en hulpmiddelen, afhankelijk van het onderwerp en de behoeften van de student. Dit varieert van digitale tools zoals tablets en software voor statistische analyse tot traditionele materialen zoals tekstboeken en oefenopgaven." },
    { "question": "Hoe vaak vinden de bijlessen plaats en hoe lang duren ze?", "answer": "Ik werk met pakketten van 4 uur. Lessen vinden meestal wekelijks plaats, maximaal 2 uur per week, doordeweeks tussen 18:00 en 21:00. Een gemiste les kan alleen worden ingehaald op zondag tussen 14:00 en 18:00, online." },
    { "question": "Hoe werken groepslessen?", "answer": "Groepsprijzen gelden alleen als studenten zelf een groepje vormen. Dus als je een klasgenoot of studiegenoot hebt die ook hulp nodig heeft, kunnen jullie samen lessen volgen tegen het groepstarief. Groepen tot maximaal 4 studenten." }
  ]
}
```

- [ ] **Step 2: Rewrite English FAQ**

Replace entire content of `messages/en/faq.json`:

```json
{
  "title": "Frequently Asked Questions",
  "description": "Find answers to common questions about my private tutoring services.",
  "searchPlaceholder": "Search...",
  "languageToggle": "NL",
  "scrollToTopLabel": "Scroll to top",
  "items": [
    { "question": "What inspired you to offer tutoring and education?", "answer": "My passion for tutoring and education stems from my own experiences. My journey through challenges in high school mathematics led to a deep understanding of the subject and a strong motivation to help others. That experience — knowing what it feels like to be stuck and how to break through — is the foundation of everything I do." },
    { "question": "How would you describe your teaching approach?", "answer": "My approach is strongly focused on personal guidance and customization. I use technology such as iPad notes and offer support via WhatsApp for up to seven days after the lesson. My goal is to create a learning environment where students can grow and flourish at their own pace." },
    { "question": "What makes your tutoring unique compared to other providers?", "answer": "My tutoring stands out due to a multidisciplinary background in mathematics, statistics, programming, and data analysis. I approach complex topics in an understandable way and have a strong focus on the personal growth of my students." },
    { "question": "How do you handle different learning styles and levels?", "answer": "I adapt my lessons to each student's specific learning style. The lessons are interactive and dynamic, combining theoretical explanation, practical exercises, and real-world applications. I use differentiation techniques such as scaffolding to effectively cater to different learning styles." },
    { "question": "What results and successes have you seen with your students?", "answer": "My tutoring has helped many students improve their academic performance and increase their confidence. I have numerous success stories, including an adult student who successfully passed the CCVX exam and resumed his university studies." },
    { "question": "How are the tutoring sessions organized?", "answer": "Tutoring sessions take place on weekdays between 18:00 and 21:00, online via Google Meet or in person at Science Park in Amsterdam. I work exclusively with 4-hour packages — no single lessons. Maximum 2 hours of lessons per week." },
    { "question": "What are the costs of the tutoring sessions?", "answer": "I work with 4-hour packages. For secondary education: online from €240 per package (€60/hr), in person at Science Park from €300 (€75/hr). For higher education (HBO/WO): online from €300 per package (€75/hr), in person from €400 (€100/hr). Group discounts are available for up to 4 students. For urgent help, a 2-hour emergency package is available." },
    { "question": "How can I sign up for tutoring?", "answer": "You can sign up by sending a message via WhatsApp, filling out the contact form on the website, or by calling. I'd be happy to discuss your specific needs and how I can best help you." },
    { "question": "How does the payment procedure work?", "answer": "Payment is made in advance via Tikkie. An invoice is available on request. A lesson or spot is only confirmed after payment and confirmation." },
    { "question": "Is there an option for a trial lesson?", "answer": "Yes, I offer a free trial lesson so you can get acquainted with my methods. The trial lesson takes place online on Sundays. This is a good opportunity to experience how the lessons work and to determine if my approach suits you." },
    { "question": "Do you also offer tutoring for profession-specific subjects?", "answer": "Yes, I offer tutoring for profession-specific subjects, mainly in the areas of thesis guidance and study skills. I help students with structuring texts, developing logical arguments, and performing statistical analyses." },
    { "question": "How do you integrate AI language models and technology into lessons?", "answer": "I use the latest technologies, including AI language models like ChatGPT and Claude, to clarify complex concepts and provide interactive learning experiences. I also use an iPad for digital notes, which I share with the student after the lesson." },
    { "question": "How do you support students in developing soft skills?", "answer": "I support students by helping them plan their studies, set priorities, and maintain an overview. My approach is aimed at fostering confidence and developing practical skills that students can apply in their daily lives." },
    { "question": "What experience do you have with guiding students with learning difficulties?", "answer": "I have experience guiding students with learning difficulties, such as mild autism. I provide a structured and patient learning environment, taking into account their specific needs and challenges." },
    { "question": "How do you ensure that students stay motivated?", "answer": "I create a positive and supportive environment where students are encouraged to be curious and discover their passion for learning. I'm there to support, but the ultimate motivation depends on the student themselves." },
    { "question": "What role does feedback play in your teaching approach?", "answer": "Feedback is an essential part of my approach. I'm constantly improving my methods and am open to suggestions from students and parents. Feedback helps me refine my lessons and adapt to the needs of my students." },
    { "question": "Do you offer customized programs for companies?", "answer": "Yes, I offer customized programs and trainings for companies and institutions, tailored to their specific needs and goals. This can range from training staff in the use of statistical programs and data management tools to introducing new technologies such as prompt engineering." },
    { "question": "How can I contact you for more information?", "answer": "For questions or more information, you can contact me via info@stephenadei.nl or call +31 6 47357426. I'm happy to answer all your questions and ready to help. You can also send a message via WhatsApp." },
    { "question": "What materials and tools are used during the lessons?", "answer": "During lessons, I use various materials and tools depending on the subject and the student's needs. This ranges from digital tools such as tablets and statistical analysis software to traditional materials such as textbooks and practice exercises." },
    { "question": "How often do the tutoring sessions take place and how long do they last?", "answer": "I work with 4-hour packages. Lessons usually take place weekly, maximum 2 hours per week, on weekdays between 18:00 and 21:00. A missed lesson can only be made up on Sundays between 14:00 and 18:00, online." },
    { "question": "How do group lessons work?", "answer": "Group prices only apply when students form their own group. So if you have a classmate or fellow student who also needs help, you can take lessons together at the group rate. Groups up to a maximum of 4 students." }
  ]
}
```

- [ ] **Step 3: Delete legacy data/faq.ts**

The bilingual FAQ data in `data/faq.ts` is a legacy duplicate — all FAQ content now lives in `messages/{nl,en}/faq.json`. Check if anything imports it:

Run: `grep -rn "from.*data/faq\|from.*@/data/faq" --include="*.ts" --include="*.tsx" /home/stephen/projects/stephensprivelessen-nl/`

Also check for the JSON version: `grep -rn "from.*data/faq.json\|faq.json" --include="*.ts" --include="*.tsx" /home/stephen/projects/stephensprivelessen-nl/`

If `data/faq.ts` is imported, update those imports to use the messages JSON via next-intl instead. If `data/faq.json` is imported (as seen in `app/[locale]/faq/page.tsx:4`), that's a separate file — check its content and whether it duplicates the messages JSON.

- [ ] **Step 4: Commit**

```bash
git add messages/nl/faq.json messages/en/faq.json
git commit -m "fix: rewrite FAQ with package pricing, updated policies, and first-person persona"
```

---

### Task 6: Persona sweep — about.json

**Files:**
- Modify: `messages/nl/about.json`
- Modify: `messages/en/about.json`

- [ ] **Step 1: Update Dutch about.json**

Replace entire content of `messages/nl/about.json`:

```json
{
  "title": "Over Mij",
  "introduction": {
    "heading": "Van Worstelen naar Excelleren",
    "paragraphs": [
      "Mijn reis begon met een vijf gemiddeld voor wiskunde in de derde klas. In plaats van op te geven koos ik voor een radicaal andere aanpak: élke opgave maken, élke stap laten controleren. Het resultaat? Een 9,8 op de eerstvolgende toets en een gemiddelde van een 10 in het vierde en vijfde jaar. Die ervaring — weten hoe het voelt om vast te zitten én hoe je er doorheen breekt — is de basis van alles wat ik doe.",
      "Vandaag begeleid ik studenten aan de UvA, VU en hogescholen in wiskunde, statistiek, data-analyse en programmeren. Van eerstejaars die worstelen met calculus tot masterstudenten die hun scriptie afronden met SPSS, R of Python. De lessen zijn online via Google Meet of op locatie bij Science Park. Elke les is op maat — want ik weet uit eigen ervaring dat het juiste zetje op het juiste moment alles kan veranderen."
    ],
    "altText": "Stephen Adei — oprichter Stephen's Privélessen"
  },
  "philosophyTitle": "Mijn Filosofie",
  "philosophyPoints": [
    {
      "title": "Persoonlijke Aanpak",
      "description": "Ik pas mijn lessen aan op de unieke behoeften en leerstijlen van elke student, zodat iedereen de ondersteuning krijgt die hij of zij nodig heeft om te slagen."
    },
    {
      "title": "Brede Expertise",
      "description": "Mijn diverse achtergrond in wiskunde, statistiek, programmeren en data-analyse stelt mij in staat om verbinding te maken met studenten uit verschillende disciplines, waardoor complexe onderwerpen toegankelijk en boeiend worden."
    },
    {
      "title": "Flexibel Leren",
      "description": "Ik bied flexibele planningen en ondersteuning via verschillende kanalen, waaronder WhatsApp, om de drukke levens van mijn studenten te accommoderen."
    }
  ],
  "cta": {
    "title": "Aan de Slag",
    "description": "Klaar om je vaardigheden te verbeteren en je academische doelen te bereiken? Neem vandaag nog contact met mij op om te beginnen.",
    "buttonText": "Neem Contact Op"
  },
  "detailedTitle": "Gedetailleerde Informatie",
  "detailedInfo": {
    "items": [
      {
        "question": "Wat inspireerde je om bijles en onderwijs aan te bieden?",
        "answer": "Mijn reis in het onderwijs begon met uitdagingen op de middelbare school, maar door doorzettingsvermogen en een strategische aanpak excelleerde ik. Deze ervaring wakkerde een passie aan om anderen te helpen soortgelijke obstakels te overwinnen."
      },
      {
        "question": "Hoe zou je jouw onderwijsaanpak omschrijven?",
        "answer": "Mijn aanpak is persoonlijk en adaptief, gericht op de individuele behoeften van elke student. Ik maak gebruik van technologie, zoals iPad-aantekeningen en WhatsApp-ondersteuning, om het leren te verbeteren en voortdurende ondersteuning te bieden."
      },
      {
        "question": "Wat maakt jouw bijlessen uniek in vergelijking met andere aanbieders?",
        "answer": "Mijn diverse achtergrond in wiskunde, programmeren, muziek en fotografie stelt mij in staat een breed perspectief te bieden. Ik creëer een relatable en boeiende leeromgeving, waardoor complexe onderwerpen toegankelijk worden."
      },
      {
        "question": "Hoe ga je om met verschillende leerstijlen en niveaus van studenten?",
        "answer": "Ik gebruik verschillende differentiatie technieken, waaronder scaffolding, om studenten op verschillende niveaus te ondersteunen. Mijn flexibele en interactieve lessen zijn afgestemd op visuele, auditieve en kinesthetische leerlingen."
      },
      {
        "question": "Welke resultaten en successen heb je gezien bij je studenten?",
        "answer": "Ik heb veel studenten geholpen hun cijfers en zelfvertrouwen te verbeteren, van het overwinnen van academische uitdagingen tot het excelleren in examens. Mijn focus ligt op het bieden van efficiënte en waardevolle hulp, zelfs in slechts een paar sessies."
      }
    ]
  },
  "introductionContent": {
    "title": "Mijn Aanpak",
    "sections": [
      {
        "title": "Welkom",
        "content": "Welkom bij mijn bijlessen en cursussen! Ik geloof in een persoonlijke en flexibele benadering, afgestemd op de unieke behoeften van elke student. Ik bied ondersteuning op maat, van basisvaardigheden tot geavanceerde onderwerpen, in een vriendelijke en stimulerende leeromgeving. Of je nu studeert voor een examen, je vaardigheden wilt verbeteren of een nieuw vak wilt leren, ik sta voor je klaar om je te helpen slagen."
      },
      {
        "title": "Persoonlijk Leren",
        "content": "Ik pas mijn onderwijsmethoden aan op jouw leerstijl en tempo. Elke student is uniek, en ik pas mijn aanpak daarop aan."
      },
      {
        "title": "Expert Ondersteuning",
        "content": "Met ervaring in verschillende vakken bied ik begeleiding zodat je hoogwaardig onderwijs en ondersteuning krijgt."
      }
    ]
  }
}
```

- [ ] **Step 2: Update English about.json**

Replace entire content of `messages/en/about.json`:

```json
{
  "title": "About Me",
  "introduction": {
    "heading": "From Struggling to Excelling",
    "paragraphs": [
      "My journey started with a failing grade in math during my third year of high school. Instead of giving up, I chose a radically different approach: complete every single problem, have every step checked. The result? A 9.8 on the very next test and a perfect 10 average in years four and five. That experience — knowing what it feels like to be stuck and how to break through — is the foundation of everything I do.",
      "Today I guide students at UvA, VU, and universities of applied sciences in mathematics, statistics, data analysis, and programming. From first-years struggling with calculus to master's students completing their thesis with SPSS, R, or Python. Lessons are online via Google Meet or on-site at Science Park. Every lesson is tailored — because I know from experience that the right push at the right moment can change everything."
    ],
    "altText": "Stephen Adei — founder of Stephen's Private Lessons"
  },
  "philosophyTitle": "My Philosophy",
  "philosophyPoints": [
    {
      "title": "Personalized Approach",
      "description": "I tailor my lessons to the unique needs and learning styles of each student, ensuring that everyone receives the support they need to succeed."
    },
    {
      "title": "Broad Expertise",
      "description": "My diverse background in mathematics, statistics, programming, and data analysis allows me to connect with students from various disciplines, making complex topics accessible and engaging."
    },
    {
      "title": "Flexible Learning",
      "description": "I offer flexible scheduling and support through various channels, including WhatsApp, to accommodate the busy lives of my students."
    }
  ],
  "cta": {
    "title": "Get Started",
    "description": "Ready to improve your skills and achieve your academic goals? Contact me today to get started.",
    "buttonText": "Contact Me"
  },
  "detailedTitle": "Detailed Information",
  "detailedInfo": {
    "items": [
      {
        "question": "What inspired you to offer tutoring and education?",
        "answer": "My journey in education began with challenges in high school, but through perseverance and a strategic approach, I excelled. This experience ignited a passion for helping others overcome similar obstacles."
      },
      {
        "question": "How would you describe your teaching approach?",
        "answer": "My approach is personal and adaptive, focusing on the individual needs of each student. I utilize technology, such as iPad notes and WhatsApp support, to enhance learning and provide ongoing assistance."
      },
      {
        "question": "What makes your tutoring unique compared to other providers?",
        "answer": "My diverse background in mathematics, programming, music, and photography allows me to offer a broad perspective. I create a relatable and engaging learning environment, making complex subjects approachable."
      },
      {
        "question": "How do you handle different learning styles and levels?",
        "answer": "I employ various differentiation techniques, including scaffolding, to support students at different levels. My flexible and interactive lessons cater to visual, auditory, and kinesthetic learners."
      },
      {
        "question": "What results and successes have you seen with your students?",
        "answer": "I've helped many students improve their grades and confidence, from overcoming academic challenges to excelling in exams. My focus is on providing efficient and valuable assistance, even in just a few sessions."
      }
    ]
  },
  "introductionContent": {
    "title": "My Approach",
    "sections": [
      {
        "title": "Welcome",
        "content": "Welcome to my tutoring and courses! I believe in a personalized and flexible approach, tailored to the unique needs of each student. I provide customized support, from basic skills to advanced topics, in a friendly and stimulating learning environment. Whether you're studying for an exam, looking to improve your skills, or wanting to learn a new subject, I'm here to help you succeed."
      },
      {
        "title": "Personalized Learning",
        "content": "I tailor my teaching methods to match your learning style and pace. Every student is unique, and I adapt my approach accordingly."
      },
      {
        "title": "Expert Support",
        "content": "With experience across various subjects, I provide guidance ensuring you receive high-quality education and support."
      }
    ]
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add messages/nl/about.json messages/en/about.json
git commit -m "fix: update About page to first-person 'I' persona throughout"
```

---

### Task 7: Persona sweep — services.json

**Files:**
- Modify: `messages/nl/services.json`
- Modify: `messages/en/services.json`

- [ ] **Step 1: Update Dutch services.json**

Replace entire content of `messages/nl/services.json`:

```json
{
  "ourServices": "Mijn Diensten",
  "whatWeOffer": "Wat Ik Bied",
  "close": "Sluiten",
  "serviceDetails": "Ontdek mijn aanbod van bijlessen en onderwijsdiensten, ontworpen om je te helpen uitblinken in wiskunde, programmeren, en meer.",
  "learnMore": "Meer Informatie",
  "items": [
    {
      "id": "mathematics-tutoring",
      "title": "Wiskunde & Algemene Bijles",
      "shortDescription": "Uitgebreide bijlessen voor alle niveaus, inclusief CCVX en volwassenenonderwijs.",
      "longDescription": "Mijn bijlessen dekken een breed scala aan vakken voor studenten van alle leeftijden en niveaus, van basisschool tot universiteit en volwassenenonderwijs. Of je nu hulp nodig hebt met basisrekenen, gevorderde calculus, examentraining (inclusief CCVX), of professionele certificeringen, ik bied op maat gemaakte lessen die aan jouw behoeften voldoen."
    },
    {
      "id": "programming-lessons",
      "title": "Programmeerlessen",
      "shortDescription": "Leer coderen in Python, Java, en meer.",
      "longDescription": "Mijn programmeercursussen dekken een breed scala aan talen en vaardigheden, waaronder Python, Java, C++, en webontwikkeling. Of je nu een beginner bent of een gevorderde student, de lessen zijn afgestemd op jouw behoeften. Ik bied praktische projecten, real-world toepassingen en begeleiding bij de beste praktijken in coderen."
    },
    {
      "id": "creative-workshops",
      "title": "Creatieve Workshops",
      "shortDescription": "Ontdek creativiteit door muziek, fotografie, en meer.",
      "longDescription": "Mijn creatieve workshops bieden hands-on leren in verschillende artistieke vakgebieden, waaronder muziekproductie, DJ-vaardigheden en fotografie. Perfect voor zowel beginners als gevorderden, deze workshops kunnen worden aangepast voor kinderen, volwassenen of professionals."
    },
    {
      "id": "non-creative-workshops",
      "title": "Niet-Creatieve Workshops",
      "shortDescription": "Praktische, vaardigheidsgerichte workshops voor verschillende vakgebieden.",
      "longDescription": "Mijn niet-creatieve workshops richten zich op het ontwikkelen van praktische vaardigheden op gebieden zoals data-analyse, AI-tools en professionele certificeringen. Deze workshops zijn ideaal voor professionals die hun vaardigheden willen verbeteren, studenten die zich voorbereiden op gevorderde studies, of teams die hun technische capaciteiten willen verbeteren."
    },
    {
      "id": "consultancy",
      "title": "Consultancy & Advies",
      "shortDescription": "Deskundig advies voor bedrijven en individuen.",
      "longDescription": "Ik bied consultancy en adviesdiensten voor bedrijven en individuen die op zoek zijn naar expertise in data-analyse, AI en softwareontwikkeling. Mijn op maat gemaakte oplossingen helpen je bij het aanpakken van complexe problemen en het implementeren van effectieve strategieën."
    },
    {
      "id": "custom-solutions",
      "title": "Maatwerkoplossingen",
      "shortDescription": "Maatwerkoplossingen voor unieke uitdagingen.",
      "longDescription": "Als je een uniek probleem of project hebt dat een gespecialiseerde oplossing vereist, bied ik maatwerkdiensten aan om aan jouw specifieke behoeften te voldoen. Of het nu gaat om een data-analyse-uitdaging, softwareontwikkelingsproject of onderwijsbehoefte, ik werk met je samen om een oplossing te creëren die perfect past."
    }
  ]
}
```

- [ ] **Step 2: Update English services.json**

Replace entire content of `messages/en/services.json`:

```json
{
  "ourServices": "My Services",
  "whatWeOffer": "What I Offer",
  "close": "Close",
  "serviceDetails": "Explore my range of tutoring and education services, designed to help you excel in mathematics, programming, and more.",
  "learnMore": "Learn More",
  "items": [
    {
      "id": "mathematics-tutoring",
      "title": "Mathematics & General Tutoring",
      "shortDescription": "Comprehensive tutoring for all levels, including CCVX and adult education.",
      "longDescription": "My tutoring services cover a wide range of subjects for students of all ages and levels, from elementary school to university and adult education. Whether you need help with basic arithmetic, advanced calculus, exam preparation (including CCVX), or professional certifications, I offer tailored lessons to meet your needs."
    },
    {
      "id": "programming-lessons",
      "title": "Programming Lessons",
      "shortDescription": "Learn coding in Python, Java, and more.",
      "longDescription": "My programming courses cover a wide range of languages and skills, including Python, Java, C++, and web development. Whether you're a beginner or an advanced student, the lessons are tailored to your needs. I offer hands-on projects, real-world applications, and guidance on best practices in coding."
    },
    {
      "id": "creative-workshops",
      "title": "Creative Workshops",
      "shortDescription": "Explore creativity through music, photography, and more.",
      "longDescription": "My creative workshops offer hands-on learning in a range of artistic fields, including music production, DJ skills, and photography. Perfect for both beginners and advanced learners, these workshops can be tailored to suit children, adults, or professionals."
    },
    {
      "id": "non-creative-workshops",
      "title": "Non-Creative Workshops",
      "shortDescription": "Practical, skill-based workshops for various fields.",
      "longDescription": "My non-creative workshops focus on developing practical skills in areas such as data analysis, AI tools, and professional certifications. These workshops are ideal for professionals seeking to enhance their skills, students preparing for advanced studies, or teams looking to improve their technical capabilities."
    },
    {
      "id": "consultancy",
      "title": "Consultancy & Advisory",
      "shortDescription": "Expert guidance for businesses and individuals.",
      "longDescription": "I offer consultancy and advisory services for businesses and individuals seeking expertise in data analysis, AI, and software development. My tailored solutions help you tackle complex problems and implement effective strategies."
    },
    {
      "id": "custom-solutions",
      "title": "Custom Solutions",
      "shortDescription": "Tailored solutions for unique challenges.",
      "longDescription": "If you have a unique problem or project that requires a specialized solution, I offer custom services to meet your specific needs. Whether it's a data analysis challenge, software development project, or educational requirement, I'll work with you to create a solution that fits perfectly."
    }
  ]
}
```

- [ ] **Step 3: Commit**

```bash
git add messages/nl/services.json messages/en/services.json
git commit -m "fix: update services to first-person 'I' persona"
```

---

### Task 8: Add policy data to pricingData.ts

**Files:**
- Modify: `data/pricingData.ts`

- [ ] **Step 1: Add structured policy exports**

Add the following at the end of `data/pricingData.ts` (after the `spoedPrices` export):

```typescript
// Policies
export const availabilityPolicy = {
  weekdays: { NL: 'Doordeweeks tussen 18:00 en 21:00', EN: 'Weekdays between 18:00 and 21:00' },
  maxPerWeek: { NL: 'Maximaal 2 uur les per week', EN: 'Maximum 2 hours of lessons per week' },
  makeUp: { NL: 'Gemiste les inhalen op zondag 14:00–18:00, online', EN: 'Make-up lessons on Sundays 14:00–18:00, online only' },
};

export const cancellationPolicy = {
  reschedule: { NL: 'Verzetten kan alleen in overleg en op basis van beschikbaarheid', EN: 'Rescheduling is only possible by arrangement and subject to availability' },
  notice: { NL: 'Minimaal 24 uur van tevoren doorgeven', EN: 'At least 24 hours notice required' },
  lateCancel: { NL: 'Bij afmelding binnen 24 uur vervalt de les', EN: 'Cancellation within 24 hours means the lesson is forfeited' },
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
```

- [ ] **Step 2: Commit**

```bash
git add data/pricingData.ts
git commit -m "feat: add structured policy data for availability, cancellation, and payment"
```

---

### Task 9: Final verification and cleanup

**Files:** All modified files

- [ ] **Step 1: Check for remaining "we" persona in Dutch message files**

Run: `grep -rn '"wij \|"Wij \| wij \| onze \| Onze \|"Ons \| ons team' --include="*.json" /home/stephen/projects/stephensprivelessen-nl/messages/nl/`

Review results — fix any remaining instances in files we haven't touched (mbo.json, contact.json, feedback.json, consultancy.json, workshops.json, tutoring.json). These may need persona updates too, but only if they contain first-person service descriptions (not student-facing form labels).

- [ ] **Step 2: Check for remaining "we" persona in English message files**

Run: `grep -rn '"We \| we offer\| we use\| our team\| Our \| we provide\| we work\| we create\| we support\| we help\| we believe' --include="*.json" /home/stephen/projects/stephensprivelessen-nl/messages/en/`

Review and fix remaining instances.

- [ ] **Step 3: Check for remaining weekend references**

Run: `grep -rn "weekend\|Weekend\|zuidoost\|Zuidoost" --include="*.ts" --include="*.tsx" --include="*.json" /home/stephen/projects/stephensprivelessen-nl/ | grep -v node_modules | grep -v .next`

Any references to the deleted weekend page should be removed.

- [ ] **Step 4: Check for broken imports**

Run: `cd /home/stephen/projects/stephensprivelessen-nl && npx tsc --noEmit 2>&1 | head -50`

Fix any TypeScript errors from deleted files or removed exports.

- [ ] **Step 5: Full build check**

Run: `cd /home/stephen/projects/stephensprivelessen-nl && npm run build 2>&1 | tail -30`

Expected: Build succeeds with no errors.

- [ ] **Step 6: Lint check**

Run: `cd /home/stephen/projects/stephensprivelessen-nl && npm run lint 2>&1 | tail -20`

Expected: No lint errors.

- [ ] **Step 7: Final commit for any cleanup fixes**

```bash
git add -A
git commit -m "fix: final cleanup — remaining persona fixes and broken reference removal"
```
