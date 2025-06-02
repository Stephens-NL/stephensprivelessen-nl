# SEO Strategy & Objectives for Quant-skills voor niet-bèta‐studenten

## 🎯 Core Focus
"Quant-skills voor niet-bèta‐studenten"

### Target Audience
- UvA & VU students in:
  - Business
  - Psychology
  - Life Sciences
  - Economics
  - Communication
- Key characteristics:
  - Struggle with statistics, calculus, or data programming
  - Experience "math anxiety"
  - Need quick, practical results

## 📊 Market Analysis

### Competition Overview
1. **Marktplaats Profiles**
   - Example: Superprof (statistics, econometrics, calculus)
   - Weakness: Thin content, no brand, limited campus focus

2. **Specialist Agencies**
   - Example: Sigma Plus Statistics (€60/h)
   - Weakness: Statistics only, expensive, no programming

3. **UvA Help Pages**
   - Example: "Help with methods & statistics"
   - Weakness: No 1-on-1 tutoring, no external tutor links

### Market Gap
Unique combination of statistics + calculus + Python/R specifically for non-beta studies with personal tutoring in Amsterdam.

## 🔍 Keyword Strategy

### Key Clusters
1. **Statistics for Psychology**
   - "bijles statistiek SPSS psychologie Amsterdam"
   - "statistische analyse psych scriptie hulp"

2. **Econometrics & Business Math**
   - "wiskunde voor bedrijfskunde Amsterdam bijles"
   - "econometrie tentamen VU bijles"

3. **Calculus for Life Sciences**
   - "calculus biologie studenten Amsterdam"
   - "differential equations biomedisch bijles"

4. **Programming for Data Courses**
   - "Python data-analyse cursus voor COM‐students Amsterdam"
   - "R Studio bijles UvA"

5. **Exam & Thesis Support**
   - "statistiek scriptie spoed hulp Amsterdam"
   - "herkansing calculus UvA bijles"

## 🏗️ Site Architecture (Next.js)

```
/bijles
 ├── amsterdam            // generic hub
 ├── onderwerp/
 │    ├── statistiek/
 │    │      ├── psychologie/page.tsx
 │    │      └── economie/page.tsx
 │    ├── calculus/
 │    │      └── life-sciences/page.tsx
 │    └── programmeren/
 │           └── python-data/page.tsx
 └── campus/
      ├── uva/page.tsx
      └── vu/page.tsx
```

### Page Features
- Campus pages: Route descriptions, student discounts, embedded testimonials
- Subject subpages: Pain points + success stories
- Dynamic OG-images via @vercel/og

## 📝 Content Strategy

### Tone of Voice
- Reassuring
- Jargon-free
- Humorous ("ik praat liever in pizza dan in pi")

### Quick-Win Elements
- "Tentamen over 10 dagen? Boek spoedtraject."
- "Scriptie vast op statistiek? 48-uurs hulplijn."

### Technical Elements
- LaTeX rendering for formulas
- Structured data implementation

## 🔗 Link Building Strategy

### Campus-Focused Assets
1. **Mini-workshop "SPSS Crash Course in 60 min."**
   - Target: VSPA (psychology student association)
   - Strategy: Free lunch session → website link + Instagram tag

2. **Cheat-sheet PDF "ANOVA in R in 2 stappen"**
   - Target: Economics & Business
   - Strategy: Canvas course forums upload

3. **Blog "5 calculus-hacks voor BioMed"**
   - Target: Life-Sci study advisors
   - Strategy: Monthly newsletter mention

4. **GitHub repo "Stats101-Python notebooks"**
   - Target: Data team / Honours Programme
   - Strategy: Strong .edu backlinks

## 💡 Conversion Optimization

### UI Elements
- Floating 'Chat with tutor' (WhatsApp API button visible 19:00-23:00)
- Campus review slider (photo + quote + rating)
- Pricing anchor ("€40/h with 5h bundle" vs "Sigma Plus €60/h")

## 🛠️ Technical Implementation

### Vercel Features
- Edge Middleware for campaign tracking
- ISG for blog posts (revalidate 86400s)
- Next.js route handlers for keyword logging

## 📈 KPIs & Monitoring

| KPI | Target | Tool & Frequency |
|-----|--------|------------------|
| Campus pages CTR | ≥ 6% | GSC weekly export |
| Conversion rate | 4% | GA4 Events |
| Organic top-3 keywords | 20 in 6 months | Open-SERP API |
| .edu/.sv backlinks | +12 in 12 months | Ahrefs alerts |

## 📋 Action Items

### Priority Tasks
1. [ ] Campus landing component with dynamic OG-image
2. [ ] Python script for GSC query data scraping
3. [ ] Email template for student association outreach
4. [ ] ISG implementation for blog posts

## 🔄 Updates & Revisions

### Latest Updates
- Initial strategy document created
- Core focus and target audience defined
- Site architecture mapped
- KPI framework established

### Next Review
- [ ] Review keyword performance
- [ ] Assess conversion rates
- [ ] Evaluate backlink growth
- [ ] Update content strategy based on analytics

---
*Last updated: [Current Date]*
*Next review: [Date + 1 month]* 