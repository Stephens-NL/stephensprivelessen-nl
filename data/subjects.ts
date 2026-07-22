/**
 * Source of truth for the "Het volledige vakkenpalet" section
 * (components/SubjectsPalette.tsx) — the full interactive breadth showcase.
 *
 * Ported verbatim from the locked mockup. The subject content (course names,
 * discipline/section titles, who-lines, code snippets) is Dutch-only: these are
 * Dutch studiegids course names and the mockup itself is NL-only. The section
 * *chrome* (title, subline, level labels, notes, search UI) is bilingual and
 * lives in messages/{nl,en}/about.json. Bilingual accommodation for the content
 * is by design handled through search: EN→NL query translation (EN2NL) and a
 * grey English gloss per result (NL2EN).
 */

// ── Levels ───────────────────────────────────────────────────────────────
export type LevelKey = 'basis' | 'vo' | 'ho' | 'prog';

/** Level order + emoji. Labels/sublabels are chrome (about.json). */
export const LEVELS: { key: LevelKey; emoji: string }[] = [
  { key: 'basis', emoji: '🎒' },
  { key: 'vo', emoji: '📐' },
  { key: 'ho', emoji: '🎓' },
  { key: 'prog', emoji: '💻' },
];

// ── Basis & Voortgezet cards ───────────────────────────────────────────────
export interface SubjectCard {
  accent: string;
  icon: string;
  title: string;
  who: string;
  chips: string[];
}

export const BASIS: SubjectCard[] = [
  {
    accent: 'var(--sage)',
    icon: '123',
    title: 'Rekenen',
    who: 'groep 3–8 · Cito-voorbereiding · bijspijkeren',
    chips: ['Tafels & hoofdrekenen', 'Breuken & procenten', 'Meten & meetkunde', 'Cito-training'],
  },
  {
    accent: 'var(--ink-light)',
    icon: 'Aa',
    title: 'Taal',
    who: 'lezen, spelling & woordenschat',
    chips: ['Begrijpend lezen', 'Spelling', 'Woordenschat'],
  },
];

export const VO: SubjectCard[] = [
  {
    accent: 'var(--sage)',
    icon: '∑',
    title: 'Wiskunde',
    who: 'vmbo · havo · vwo — incl. eindexamentraining',
    chips: ['Wiskunde A', 'Wiskunde B', 'Wiskunde C', 'Wiskunde D', 'Rekenen'],
  },
  {
    accent: 'var(--sage-light)',
    icon: '⚗',
    title: 'Natuurwetenschappen',
    who: 'onderbouw t/m eindexamen',
    chips: ['Natuurkunde', 'Scheikunde', 'Biologie', 'NLT'],
  },
  {
    accent: 'var(--ink-light)',
    icon: 'Aa',
    title: 'Talen & economie',
    who: 'onderbouw t/m eindexamen',
    chips: ['Engels', 'Nederlands', 'Economie', 'M&O', 'Bedrijfseconomie'],
  },
];

// ── Hoger onderwijs: discipline cards with nested ≤7-course subsections ──────
export interface Subsection {
  label: string;
  count: number;
  chips: string[];
}

export interface Discipline {
  accent: string;
  laneTitle: string;
  laneWhich: string;
  subsections: Subsection[];
}

export const HO: Discipline[] = [
  {
    accent: 'var(--sage-light)',
    laneTitle: 'Bèta & technische wiskunde',
    laneWhich: 'wiskunde · econometrie · KI · informatica · natuurkunde · 38 vakken',
    subsections: [
      {
        label: 'Analyse & Calculus',
        count: 7,
        chips: ['Calculus', 'Analyse 1', 'Analyse 2', 'Analyse 3', 'Reële Analyse', 'Complexe Functietheorie', 'Maat- & Integratietheorie'],
      },
      {
        label: 'Algebra & structuren',
        count: 7,
        chips: ['Lineaire Algebra 1', 'Lineaire Algebra 2', 'Groepentheorie', 'Ringen & Lichamen', 'Galoistheorie', 'Discrete Wiskunde', 'Verzamelingenleer'],
      },
      {
        label: 'Kansrekening & statistiek',
        count: 6,
        chips: ['Kansrekening', 'Kansrekening & Statistiek', 'Wiskundige Statistiek', 'Stochastische Processen', 'Markovketens', 'Tijdreeksanalyse'],
      },
      {
        label: 'Toegepast & numeriek',
        count: 6,
        chips: ['Differentiaalvergelijkingen', 'Numerieke Wiskunde', 'Optimalisering', 'Lineair Programmeren', 'Operations Research', 'Wiskundig Modelleren'],
      },
      {
        label: 'Informatica & AI',
        count: 6,
        chips: ['Inleiding Programmeren', 'Datastructuren & Algoritmen', 'Algoritmen & Complexiteit', 'Machine Learning', 'Logica', 'Inleiding KI'],
      },
      {
        label: 'Econometrie',
        count: 6,
        chips: ['Econometrie 1', 'Econometrie 2', 'Micro-econometrie', 'Wiskunde voor Econometristen', 'Speltheorie', 'Statistical Learning'],
      },
    ],
  },
  {
    accent: 'var(--amber)',
    laneTitle: 'Psychologie & sociale wetenschappen',
    laneWhich: 'psychologie · pedagogiek · sociologie · communicatie · gezondheid · 22 vakken',
    subsections: [
      {
        label: 'Methoden & onderzoeksopzet',
        count: 6,
        chips: ['Onderzoekspracticum 1', 'Onderzoekspracticum 2', 'Onderzoekspracticum 3', 'Methoden & Technieken van Onderzoek', 'Onderzoeksmethodologie', 'Onderzoeksopzet'],
      },
      {
        label: 'Statistiek',
        count: 6,
        chips: ['Beschrijvende Statistiek', 'Inferentiële Statistiek', 'Toetsende Statistiek', 'Statistiek 1', 'Statistiek 2', 'Statistiek 3'],
      },
      {
        label: 'Data-analyse',
        count: 4,
        chips: ['Multivariate Data-analyse', 'Toegepaste Data-analyse', 'Data-analyse in de Sociale Wetenschappen', 'SPSS-practicum'],
      },
      {
        label: 'Meten & testen',
        count: 3,
        chips: ['Psychometrie', 'Testtheorie & Testconstructie', 'Meetinstrumenten & Dataverzameling'],
      },
      {
        label: 'Kwalitatief & filosofie',
        count: 3,
        chips: ['Kwalitatieve Onderzoeksmethoden', 'Methoden van kwalitatief onderzoek', 'Wetenschapsfilosofie'],
      },
    ],
  },
  {
    accent: 'var(--terracotta)',
    laneTitle: 'Economie & bedrijfskunde',
    laneWhich: 'economie · bedrijfskunde · accountancy · finance · fiscaal · 30 vakken',
    subsections: [
      {
        label: 'Wiskunde',
        count: 4,
        chips: ['Wiskunde voor economen', 'Wiskunde voor bedrijfseconomen', 'Wiskunde 1', 'Wiskunde 2'],
      },
      {
        label: 'Statistiek',
        count: 7,
        chips: ['Statistiek 1', 'Statistiek 2', 'Bedrijfsstatistiek', 'Statistiek voor Bedrijfskunde', 'Beschrijvende & Inferentiële Statistiek', 'Toegepaste Statistiek', 'Voortgezette Statistiek'],
      },
      {
        label: 'Kwantitatieve methoden',
        count: 4,
        chips: ['Kwantitatieve Methoden', 'Kwantitatieve Methoden en Technieken', 'Kwantitatieve Onderzoeksmethoden', 'Kwantitatieve Bedrijfsanalyse'],
      },
      {
        label: 'Econometrie & analytics',
        count: 5,
        chips: ['Inleiding Econometrie', 'Econometrie', 'Data-analyse voor Economen', 'Business Analytics', 'Kansrekening & Statistiek'],
      },
      {
        label: 'OR & besliskunde',
        count: 5,
        chips: ['Operations Research', 'Beslissingsmodellen', 'Optimalisatie', 'Speltheorie', 'Operationeel Management'],
      },
      {
        label: 'Bedrijfseconomie & finance',
        count: 5,
        chips: ['Bedrijfseconomie', 'Financial Accounting', 'Kostencalculatie', 'Financiële Rekenkunde', 'Marktonderzoek'],
      },
    ],
  },
  {
    accent: '#8FB3C9',
    laneTitle: 'Scriptie & data-analyse',
    laneWhich: 'bachelor- & masterscriptie · thesis · analysetechnieken & tools · 28 vakken',
    subsections: [
      {
        label: 'Opzet & methodologie',
        count: 3,
        chips: ['Scriptiebegeleiding', 'Methodologie & onderzoeksopzet', 'Hypothesetoetsing'],
      },
      {
        label: 'Regressie & variantie',
        count: 7,
        chips: ['Regressieanalyse', 'Multipele Regressie', 'Logistische Regressie', 'ANOVA', 'Repeated Measures ANOVA', 'MANOVA', 'ANCOVA'],
      },
      {
        label: 'Multivariate technieken',
        count: 7,
        chips: ['Factoranalyse', 'PCA', 'SEM', 'Padanalyse', 'Clusteranalyse', 'Discriminantanalyse', 'Multilevel & Mixed Models'],
      },
      {
        label: 'Overige toetsen',
        count: 5,
        chips: ['t-toetsen', 'Correlatieanalyse', 'Non-parametrische toetsen', 'Tijdreeksanalyse', 'Betrouwbaarheidsanalyse'],
      },
      {
        label: 'Tools',
        count: 6,
        chips: ['SPSS', 'R / R-Studio', 'Python', 'JASP', 'Jamovi', 'Stata'],
      },
    ],
  },
];

// ── Programmeren: code-morph card ───────────────────────────────────────────
export interface ProgLang {
  id: string;
  label: string;
}

export const PROG = {
  accent: 'var(--terracotta)',
  icon: '</>',
  title: 'Programmeren — van eerstejaars tot data science',
  who: 'Een echte mini-Cijferlijst-class — met classes (OOP) en een SQL CTE. Kies een taal; de syntax verandert mee. Van eerstejaars-opdracht tot scriptie.',
  langs: [
    { id: 'python', label: 'Python' },
    { id: 'r', label: 'R' },
    { id: 'javascript', label: 'JavaScript' },
    { id: 'java', label: 'Java' },
    { id: 'c', label: 'C' },
    { id: 'cpp', label: 'C++' },
    { id: 'csharp', label: 'C#' },
    { id: 'matlab', label: 'MATLAB' },
    { id: 'sql', label: 'SQL' },
  ] as ProgLang[],
  web: ['HTML', 'CSS', 'JavaScript', 'React'],
};

/**
 * Pre-highlighted code snippets, verbatim from the mockup's SNIP object.
 * Rendered via dangerouslySetInnerHTML — static author-controlled constants,
 * no user input, so injection is safe. Token classes (.k/.fn/.s/.n/.op/.c) are
 * styled scoped inside `.codebox` in SubjectsPalette.module.css.
 */
export const SNIP: Record<string, string> = {
  python: `<span class="k">class</span> <span class="fn">Cijferlijst</span>:
    <span class="k">def</span> <span class="fn">__init__</span>(self, cijfers): self.cijfers = cijfers
    <span class="k">def</span> <span class="fn">gemiddelde</span>(self):
        <span class="k">return</span> <span class="fn">sum</span>(self.cijfers) / <span class="fn">len</span>(self.cijfers)
    <span class="k">def</span> <span class="fn">geslaagd</span>(self): <span class="k">return</span> self.<span class="fn">gemiddelde</span>() &gt;= <span class="n">5.5</span>

toetsen = <span class="fn">Cijferlijst</span>([<span class="n">7</span>, <span class="n">8</span>, <span class="n">4</span>, <span class="n">9</span>, <span class="n">6</span>, <span class="n">8</span>])
<span class="fn">print</span>(toetsen.<span class="fn">gemiddelde</span>(), toetsen.<span class="fn">geslaagd</span>())  <span class="c"># 7.0 True</span>`,
  r: `Cijferlijst &lt;- <span class="fn">setRefClass</span>(<span class="s">"</span>Cijferlijst",
  fields = <span class="fn">list</span>(cijfers = <span class="s">"</span>numeric"),
  methods = <span class="fn">list</span>(
    gemiddelde = <span class="k">function</span>() <span class="fn">mean</span>(cijfers),
    geslaagd  = <span class="k">function</span>() <span class="fn">gemiddelde</span>() &gt;= <span class="n">5.5</span>))

toetsen &lt;- Cijferlijst$new(cijfers = <span class="fn">c</span>(<span class="n">7</span>, <span class="n">8</span>, <span class="n">4</span>, <span class="n">9</span>, <span class="n">6</span>, <span class="n">8</span>))
toetsen$gemiddelde(); toetsen$geslaagd()   <span class="c"># 7 TRUE</span>`,
  javascript: `<span class="k">class</span> <span class="fn">Cijferlijst</span> {
  <span class="fn">constructor</span>(cijfers) { <span class="k">this</span>.cijfers = cijfers; }
  <span class="fn">gemiddelde</span>() { <span class="k">return</span> <span class="k">this</span>.cijfers.<span class="fn">reduce</span>((a, b) =&gt; a + b) / <span class="k">this</span>.cijfers.length; }
  <span class="fn">geslaagd</span>() { <span class="k">return</span> <span class="k">this</span>.<span class="fn">gemiddelde</span>() &gt;= <span class="n">5.5</span>; }
}
<span class="k">const</span> toetsen = <span class="k">new</span> <span class="fn">Cijferlijst</span>([<span class="n">7</span>, <span class="n">8</span>, <span class="n">4</span>, <span class="n">9</span>, <span class="n">6</span>, <span class="n">8</span>]);
console.<span class="fn">log</span>(toetsen.<span class="fn">gemiddelde</span>(), toetsen.<span class="fn">geslaagd</span>());  <span class="c">// 7 true</span>`,
  java: `<span class="k">class</span> <span class="fn">Cijferlijst</span> {
  <span class="k">int</span>[] cijfers;
  <span class="fn">Cijferlijst</span>(<span class="k">int</span>[] c) { cijfers = c; }
  <span class="k">double</span> <span class="fn">gemiddelde</span>() { <span class="k">return</span> Arrays.<span class="fn">stream</span>(cijfers).<span class="fn">average</span>().<span class="fn">orElse</span>(<span class="n">0</span>); }
  <span class="k">boolean</span> <span class="fn">geslaagd</span>() { <span class="k">return</span> <span class="fn">gemiddelde</span>() &gt;= <span class="n">5.5</span>; }
}
<span class="k">var</span> t = <span class="k">new</span> <span class="fn">Cijferlijst</span>(<span class="k">new</span> <span class="k">int</span>[]{<span class="n">7</span>, <span class="n">8</span>, <span class="n">4</span>, <span class="n">9</span>, <span class="n">6</span>, <span class="n">8</span>});
System.out.<span class="fn">println</span>(t.<span class="fn">gemiddelde</span>() + <span class="s">"</span> " + t.<span class="fn">geslaagd</span>());  <span class="c">// 7.0 true</span>`,
  c: `<span class="k">typedef struct</span> { <span class="k">int</span> cijfers[<span class="n">100</span>]; <span class="k">int</span> n; } <span class="fn">Cijferlijst</span>;
<span class="k">double</span> <span class="fn">gemiddelde</span>(<span class="fn">Cijferlijst</span> *c) {
  <span class="k">double</span> s = <span class="n">0</span>;
  <span class="k">for</span> (<span class="k">int</span> i = <span class="n">0</span>; i &lt; c-&gt;n; i++) s += c-&gt;cijfers[i];
  <span class="k">return</span> s / c-&gt;n;
}
<span class="fn">Cijferlijst</span> t = {{<span class="n">7</span>, <span class="n">8</span>, <span class="n">4</span>, <span class="n">9</span>, <span class="n">6</span>, <span class="n">8</span>}, <span class="n">6</span>};
<span class="fn">printf</span>(<span class="s">"</span>%.1f", <span class="fn">gemiddelde</span>(&amp;t));  <span class="c">// 7.0</span>`,
  cpp: `<span class="k">struct</span> <span class="fn">Cijferlijst</span> {
  <span class="k">vector</span>&lt;<span class="k">int</span>&gt; cijfers;
  <span class="k">double</span> <span class="fn">gemiddelde</span>() { <span class="k">return</span> <span class="fn">accumulate</span>(cijfers.<span class="fn">begin</span>(), cijfers.<span class="fn">end</span>(), <span class="n">0.0</span>) / cijfers.<span class="fn">size</span>(); }
  <span class="k">bool</span> <span class="fn">geslaagd</span>() { <span class="k">return</span> <span class="fn">gemiddelde</span>() &gt;= <span class="n">5.5</span>; }
};
<span class="fn">Cijferlijst</span> t{{<span class="n">7</span>, <span class="n">8</span>, <span class="n">4</span>, <span class="n">9</span>, <span class="n">6</span>, <span class="n">8</span>}};
cout &lt;&lt; t.<span class="fn">gemiddelde</span>() &lt;&lt; <span class="s">"</span> " &lt;&lt; t.<span class="fn">geslaagd</span>();  <span class="c">// 7 1</span>`,
  csharp: `<span class="k">class</span> <span class="fn">Cijferlijst</span> {
  <span class="k">public</span> <span class="k">int</span>[] Cijfers;
  <span class="k">public</span> <span class="k">double</span> <span class="fn">Gemiddelde</span>() =&gt; Cijfers.<span class="fn">Average</span>();
  <span class="k">public</span> <span class="k">bool</span> <span class="fn">Geslaagd</span>() =&gt; <span class="fn">Gemiddelde</span>() &gt;= <span class="n">5.5</span>;
}
<span class="k">var</span> t = <span class="k">new</span> <span class="fn">Cijferlijst</span> { Cijfers = <span class="k">new</span>[]{<span class="n">7</span>, <span class="n">8</span>, <span class="n">4</span>, <span class="n">9</span>, <span class="n">6</span>, <span class="n">8</span>} };
Console.<span class="fn">WriteLine</span>($"{t.<span class="fn">Gemiddelde</span>()} {t.<span class="fn">Geslaagd</span>()}");  <span class="c">// 7 True</span>`,
  matlab: `<span class="k">classdef</span> <span class="fn">Cijferlijst</span>
  <span class="k">properties</span>, cijfers, <span class="k">end</span>
  <span class="k">methods</span>
    <span class="k">function</span> m = <span class="fn">gemiddelde</span>(obj), m = <span class="fn">mean</span>(obj.cijfers); <span class="k">end</span>
    <span class="k">function</span> b = <span class="fn">geslaagd</span>(obj),  b = <span class="fn">gemiddelde</span>(obj) &gt;= <span class="n">5.5</span>; <span class="k">end</span>
  <span class="k">end</span>
<span class="k">end</span>

t = <span class="fn">Cijferlijst</span>; t.cijfers = [<span class="n">7</span> <span class="n">8</span> <span class="n">4</span> <span class="n">9</span> <span class="n">6</span> <span class="n">8</span>];
<span class="fn">gemiddelde</span>(t), <span class="fn">geslaagd</span>(t)   <span class="c">% 7  true</span>`,
  sql: `<span class="c">-- hardcoded toetsen + CTE</span>
<span class="k">WITH</span> toetsen(student_id, cijfer) <span class="k">AS</span> (
  <span class="k">VALUES</span> (<span class="n">1</span>,<span class="n">7</span>), (<span class="n">1</span>,<span class="n">8</span>), (<span class="n">1</span>,<span class="n">4</span>), (<span class="n">1</span>,<span class="n">9</span>), (<span class="n">1</span>,<span class="n">6</span>)
),
gem <span class="k">AS</span> (
  <span class="k">SELECT</span> student_id, <span class="fn">AVG</span>(cijfer) <span class="k">AS</span> gemiddelde
  <span class="k">FROM</span> toetsen <span class="k">GROUP BY</span> student_id
)
<span class="k">SELECT</span> student_id, gemiddelde, gemiddelde &gt;= <span class="n">5.5</span> <span class="k">AS</span> geslaagd <span class="k">FROM</span> gem;`,
};

// ── Fuzzy search over every subject (built from the data model, not the DOM) ─

/** English → Dutch query translation (students often type the English name). */
export const EN2NL: Record<string, string> = {
  mathematics: 'wiskunde', math: 'wiskunde', statistics: 'statistiek', statistical: 'statistiek',
  probability: 'kansrekening', 'linear algebra': 'lineaire algebra', analysis: 'analyse', regression: 'regressie',
  variance: 'variantie', physics: 'natuurkunde', chemistry: 'scheikunde', biology: 'biologie',
  economics: 'economie', econometrics: 'econometrie', business: 'bedrijf', accounting: 'accountancy',
  finance: 'financ', research: 'onderzoek', methods: 'methoden', method: 'methode',
  quantitative: 'kwantitatieve', qualitative: 'kwalitatieve', 'time series': 'tijdreeks', 'game theory': 'speltheorie',
  'differential equations': 'differentiaalvergelijkingen', 'set theory': 'verzamelingenleer', 'number theory': 'getaltheorie',
  topology: 'topologie', 'group theory': 'groepentheorie', optimization: 'optimalis', optimisation: 'optimalis',
  'data analysis': 'data-analyse', 'factor analysis': 'factoranalyse', 'cluster analysis': 'clusteranalyse',
  hypothesis: 'hypothese', correlation: 'correlatie', thesis: 'scriptie', programming: 'programmeren',
  algorithms: 'algoritmen', logic: 'logica', geometry: 'meetkunde', psychometrics: 'psychometrie',
};

/** Grey English gloss for a subject (longest Dutch phrase first — order matters). */
export const NL2EN: [string, string][] = [
  ['kansrekening & statistiek', 'Probability & Statistics'], ['differentiaalvergelijkingen', 'Differential Equations'],
  ['numerieke wiskunde', 'Numerical Mathematics'], ['lineaire algebra', 'Linear Algebra'],
  ['discrete wiskunde', 'Discrete Mathematics'], ['verzamelingenleer', 'Set Theory'], ['groepentheorie', 'Group Theory'],
  ['getaltheorie', 'Number Theory'], ['speltheorie', 'Game Theory'], ['tijdreeksanalyse', 'Time Series Analysis'],
  ['scriptiebegeleiding', 'Thesis Supervision'], ['hypothesetoetsing', 'Hypothesis Testing'],
  ['onderzoekspracticum', 'Research Practical'], ['onderzoeksmethodologie', 'Research Methodology'],
  ['onderzoeksopzet', 'Research Design'], ['onderzoeksmethoden', 'Research Methods'],
  ['bedrijfsstatistiek', 'Business Statistics'], ['bedrijfseconomie', 'Business Economics'],
  ['wiskundige statistiek', 'Mathematical Statistics'], ['regressieanalyse', 'Regression Analysis'],
  ['variantieanalyse', 'Analysis of Variance'], ['correlatieanalyse', 'Correlation Analysis'],
  ['factoranalyse', 'Factor Analysis'], ['clusteranalyse', 'Cluster Analysis'], ['data-analyse', 'Data Analysis'],
  ['psychometrie', 'Psychometrics'], ['testtheorie', 'Test Theory'], ['econometrie', 'Econometrics'],
  ['kwantitatieve', 'Quantitative'], ['kwalitatieve', 'Qualitative'], ['kansrekening', 'Probability'],
  ['statistiek', 'Statistics'], ['natuurkunde', 'Physics'], ['scheikunde', 'Chemistry'], ['biologie', 'Biology'],
  ['economie', 'Economics'], ['onderzoek', 'Research'], ['methoden', 'Methods'], ['regressie', 'Regression'],
  ['correlatie', 'Correlation'], ['meetkunde', 'Geometry'], ['topologie', 'Topology'], ['logica', 'Logic'],
  ['wiskunde', 'Mathematics'], ['analyse', 'Analysis'],
];

export interface IndexEntry {
  name: string;
  path: string;
  key: string;
}

/**
 * Build the search index from the data model. `levelLabels` maps each level key
 * to its (localized) display label for the breadcrumb.
 */
export function buildSearchIndex(levelLabels: Record<LevelKey, string>): IndexEntry[] {
  const idx: IndexEntry[] = [];
  const seen = new Set<string>();
  const push = (name: string, parts: string[]) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    const path = parts.filter(Boolean).join(' › ');
    const dk = trimmed + '|' + path;
    if (seen.has(dk)) return;
    seen.add(dk);
    idx.push({ name: trimmed, path, key: trimmed.toLowerCase() });
  };

  BASIS.forEach((card) => card.chips.forEach((c) => push(c, [levelLabels.basis, card.title])));
  VO.forEach((card) => card.chips.forEach((c) => push(c, [levelLabels.vo, card.title])));
  HO.forEach((disc) =>
    disc.subsections.forEach((sub) => sub.chips.forEach((c) => push(c, [levelLabels.ho, disc.laneTitle, sub.label]))),
  );
  PROG.langs.forEach((l) => push(l.label, [levelLabels.prog, PROG.title]));
  PROG.web.forEach((w) => push(w, [levelLabels.prog, PROG.title]));

  return idx;
}

/** In-name match: substring first (high score), else subsequence, else -1. */
export function scoreOf(q: string, key: string): number {
  const at = key.indexOf(q);
  if (at >= 0) return 1000 - at - (key.length - q.length) * 0.5;
  let i = 0;
  for (let j = 0; j < key.length && i < q.length; j++) if (key[j] === q[i]) i++;
  return i === q.length ? 200 - key.length * 0.5 : -1;
}

/** Query + any EN→NL rewrites of it. */
export function variants(q: string): string[] {
  const out = [q];
  for (const en in EN2NL) if (q.includes(en)) out.push(q.split(en).join(EN2NL[en]));
  return [...new Set(out)];
}

export interface Highlight {
  before: string;
  match: string;
  after: string;
}

/** First variant that occurs in `name` → highlight segments; else null (plain). */
export function highlight(name: string, vs: string[]): Highlight | null {
  const lower = name.toLowerCase();
  for (const v of vs) {
    const at = lower.indexOf(v);
    if (at >= 0) return { before: name.slice(0, at), match: name.slice(at, at + v.length), after: name.slice(at + v.length) };
  }
  return null;
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\-]/g, '\\$&');
}

/** Grey English gloss, or '' when no Dutch phrase matched / gloss equals name. */
export function gloss(name: string): string {
  let g = name;
  let changed = false;
  for (const [nl, en] of NL2EN) {
    const re = new RegExp(escapeRegex(nl), 'i');
    if (re.test(g)) {
      g = g.replace(re, en);
      changed = true;
    }
  }
  return changed && g.toLowerCase() !== name.toLowerCase() ? g : '';
}

export interface SearchResult {
  name: string;
  path: string;
  seg: Highlight | null;
  gloss: string;
}

/** Fuzzy search across the whole index. Empty for queries shorter than 2 chars. */
export function searchSubjects(rawQuery: string, index: IndexEntry[]): SearchResult[] {
  const q = rawQuery.trim().toLowerCase();
  if (q.length < 2) return [];
  const vs = variants(q);
  return index
    .map((o) => ({ o, s: Math.max(...vs.map((v) => scoreOf(v, o.key))) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, 40)
    .map(({ o }) => ({ name: o.name, path: o.path, seg: highlight(o.name, vs), gloss: gloss(o.name) }));
}
