import fs from 'fs';
import path from 'path';

/**
 * Validates the canonical rates.json file for structural consistency.
 * The rates file lives at /home/stephen/scripts/deploy/rates.json in the monorepo.
 * If running in CI where the monorepo root may differ, we try multiple paths.
 */

const POSSIBLE_PATHS = [
  path.resolve(__dirname, '../../../../scripts/deploy/rates.json'),
  path.resolve(__dirname, '../../../scripts/deploy/rates.json'),
  '/home/stephen/scripts/deploy/rates.json',
];

function findRatesFile(): string | null {
  for (const p of POSSIBLE_PATHS) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

const REQUIRED_FIELDS = ['rate_id', 'segment', 'mode', 'amount_cents', 'per_unit', 'status'];

describe('pricing consistency (rates.json)', () => {
  const ratesPath = findRatesFile();

  beforeAll(() => {
    if (!ratesPath) {
      console.error(
        'rates.json not found at any expected path. Skipping pricing tests.'
      );
    }
  });

  const skipIf = (condition: boolean) => (condition ? test.skip : test);

  skipIf(!ratesPath)('rates.json is valid JSON', () => {
    expect(() => JSON.parse(fs.readFileSync(ratesPath!, 'utf-8'))).not.toThrow();
  });

  skipIf(!ratesPath)('all rates have required fields', () => {
    const data = JSON.parse(fs.readFileSync(ratesPath!, 'utf-8'));
    const rates: any[] = data.rates;
    const problems: string[] = [];

    for (const rate of rates) {
      for (const field of REQUIRED_FIELDS) {
        if (!(field in rate)) {
          problems.push(`${rate.rate_id ?? 'unknown'}: missing field "${field}"`);
        }
      }
    }

    if (problems.length > 0) {
      throw new Error(`Missing required fields:\n${problems.map((p) => `  - ${p}`).join('\n')}`);
    }
  });

  skipIf(!ratesPath)('no duplicate rate_ids', () => {
    const data = JSON.parse(fs.readFileSync(ratesPath!, 'utf-8'));
    const rates: any[] = data.rates;
    const ids = rates.map((r) => r.rate_id);
    const duplicates = ids.filter((id, idx) => ids.indexOf(id) !== idx);

    if (duplicates.length > 0) {
      throw new Error(`Duplicate rate_ids: ${[...new Set(duplicates)].join(', ')}`);
    }
  });

  skipIf(!ratesPath)('all amount_cents > 0', () => {
    const data = JSON.parse(fs.readFileSync(ratesPath!, 'utf-8'));
    const rates: any[] = data.rates;
    const problems: string[] = [];

    for (const rate of rates) {
      if (typeof rate.amount_cents !== 'number' || rate.amount_cents <= 0) {
        problems.push(`${rate.rate_id}: amount_cents = ${rate.amount_cents}`);
      }
    }

    if (problems.length > 0) {
      throw new Error(`Invalid amount_cents:\n${problems.map((p) => `  - ${p}`).join('\n')}`);
    }
  });

  skipIf(!ratesPath)('per_person_cents < amount_cents where both exist', () => {
    const data = JSON.parse(fs.readFileSync(ratesPath!, 'utf-8'));
    const rates: any[] = data.rates;
    const problems: string[] = [];

    for (const rate of rates) {
      if ('per_person_cents' in rate && 'amount_cents' in rate) {
        if (rate.per_person_cents >= rate.amount_cents) {
          problems.push(
            `${rate.rate_id}: per_person_cents (${rate.per_person_cents}) >= amount_cents (${rate.amount_cents})`
          );
        }
      }
    }

    if (problems.length > 0) {
      throw new Error(`Invalid per_person_cents:\n${problems.map((p) => `  - ${p}`).join('\n')}`);
    }
  });

  skipIf(!ratesPath)('all segments have both online and physical rates', () => {
    const data = JSON.parse(fs.readFileSync(ratesPath!, 'utf-8'));
    const rates: any[] = data.rates;

    // Group by segment
    const segmentModes = new Map<string, Set<string>>();
    for (const rate of rates) {
      if (!segmentModes.has(rate.segment)) {
        segmentModes.set(rate.segment, new Set());
      }
      segmentModes.get(rate.segment)!.add(rate.mode);
    }

    const problems: string[] = [];
    for (const [segment, modes] of segmentModes) {
      if (!modes.has('online')) {
        problems.push(`Segment "${segment}" has no online rates`);
      }
      if (!modes.has('physical')) {
        problems.push(`Segment "${segment}" has no physical rates`);
      }
    }

    if (problems.length > 0) {
      throw new Error(`Missing modes:\n${problems.map((p) => `  - ${p}`).join('\n')}`);
    }
  });
});

/**
 * Website-side checks against the vendored business-config (no external rates.json needed):
 * MBO is folded into VO, so its prices must be the VO 4-hour packages, derived and never hardcoded.
 */
import {
  voOnlinePackages,
  voPhysicalPackages,
  studentTutorVoPrices,
  spoedPrices,
  consultancyRates,
  consultancyFromHour,
  scriptieFromHour,
  lowestPackagePrice,
  fromPerHour,
  fillPrices,
  formatEuro,
} from '@/data/pricingData';
import { businessConfig } from '@/data/business-config.generated';

const ROOT = path.resolve(__dirname, '../..');
const read = (rel: string) => fs.readFileSync(path.join(ROOT, rel), 'utf-8');
const rate = (id: string) => businessConfig.rates.find((r) => r.rate_id === id)! as { amount_cents: number; per_person_cents?: number };

describe('MBO pricing = VO packages from business-config', () => {
  it('individual MBO packages are the VO online/physical 1-student rates', () => {
    expect(voOnlinePackages[0].packagePrice).toBe(rate('vo_online_1').amount_cents / 100);
    expect(voPhysicalPackages[0].packagePrice).toBe(rate('vo_physical_1').amount_cents / 100);
    expect(studentTutorVoPrices).toEqual({
      online: rate('student_tutor_vo_online_1').amount_cents / 100,
      physical: rate('student_tutor_vo_physical_1').amount_cents / 100,
    });
  });

  it('no student_tutor rate appears in the online/physical tables', () => {
    const tutorPrices = businessConfig.rates.filter((r) => 'tier' in r).map((r) => r.amount_cents / 100);
    expect(tutorPrices.length).toBe(4);
    const all = [...voOnlinePackages, ...voPhysicalPackages];
    expect(all.length).toBe(8);
    for (const p of all) expect(p.students === 1 && tutorPrices.includes(p.packagePrice)).toBe(false);
  });

  it('group MBO packages are the VO group rates (2-4 students)', () => {
    for (const n of [2, 3, 4]) {
      expect(voOnlinePackages[n - 1].packagePrice).toBe(rate(`vo_online_${n}`).amount_cents / 100);
      expect(voPhysicalPackages[n - 1].packagePrice).toBe(rate(`vo_physical_${n}`).amount_cents / 100);
    }
  });

  it('MBO components hold no hardcoded euro amounts', () => {
    const dir = path.join(ROOT, 'components/mbo-rekenen');
    for (const f of fs.readdirSync(dir)) {
      expect(`${f}: ${(read(`components/mbo-rekenen/${f}`).match(/€\s?\d/g) ?? []).length}`).toBe(`${f}: 0`);
    }
  });

  it('MBO messages and pricingData carry no special courses, instalments or internal economics', () => {
    const shipped = [read('data/pricingData.ts'), read('messages/nl/mbo.json'), read('messages/en/mbo.json')].join('\n');
    for (const bad of ['totalRevenue', 'workTime', 'hourlyRate', 'spoedpakket', 'korte-cursus', 'volledig-commit', 'volledig-flex', 'AANBEVOLEN']) {
      expect(shipped).not.toContain(bad);
    }
  });
});

describe('derived price copy', () => {
  it('"vanaf" per-hour prices are the lowest per-hour of the 4-hour packages', () => {
    expect(fromPerHour.individual).toBe(rate('student_tutor_vo_online_1').amount_cents / 4 / 100);
    expect(fromPerHour.group).toBe(rate('vo_online_4').per_person_cents! / 4 / 100);
  });

  it('fillPrices fills spoed tokens from the config, in both locales', () => {
    expect(fillPrices('[[spoedVoOnline]] [[spoedHboPhysical]]', 'nl')).toBe(
      `${formatEuro(rate('vo_spoed_online').amount_cents / 100, 'nl')} ${formatEuro(rate('hbo_wo_spoed_physical').amount_cents / 100, 'nl')}`,
    );
    expect(fillPrices('[[fromHourGroup]]', 'nl')).toBe('€32,50');
    expect(fillPrices('[[fromHourGroup]]', 'en')).toBe('€32.50');
  });

  it('public/llms.txt rush prices match the config', () => {
    const txt = read('public/llms.txt');
    for (const v of [spoedPrices.voOnline, spoedPrices.voPhysical, spoedPrices.hboWoOnline, spoedPrices.hboWoPhysical]) {
      expect(txt).toContain(`EUR ${v}`);
    }
  });

  it('published terms: EN fee percentages and teaching window match the config', () => {
    const tiers = businessConfig.cancellation.published_terms.fee_tiers;
    const en = read('messages/en/voorwaarden.json');
    for (const t of tiers.filter((t) => t.fee_pct > 0)) expect(en).toContain(`${t.fee_pct}%`);
    expect(businessConfig.policy.teaching_window.days).toEqual(['monday', 'tuesday', 'wednesday', 'thursday']);
    expect(read('messages/nl/voorwaarden.json')).not.toMatch(/vrijdag/i);
    expect(en).not.toMatch(/friday/i);
  });

  it('no stale contact address or "€75 per uur" anywhere in shipped copy', () => {
    for (const rel of ['messages/nl', 'messages/en']) {
      for (const f of fs.readdirSync(path.join(ROOT, rel))) {
        const txt = read(`${rel}/${f}`);
        expect(txt).not.toContain('info@stephenadei.nl');
        expect(txt).not.toContain('€75 per');
      }
    }
    expect(read('data/config.ts')).not.toContain('stephenadei.nl');
  });
});

describe('consultancy, scriptie and FAQ prices are derived', () => {
  it('consultancy rates are the config section, excl. btw, outside rates[]', () => {
    expect(businessConfig.consultancy.vat).toBe('excl');
    expect(consultancyRates.map((r) => [r.sessions, r.price])).toEqual([[1, 100], [4, 250], [10, 550]]);
    expect(consultancyFromHour).toBe(100);
    expect(businessConfig.rates.some((r) => r.rate_id.startsWith('consultancy'))).toBe(false);
  });

  it('tokens fill consultancy, scriptie and FAQ package prices in both locales', () => {
    expect(fillPrices('[[consultancyFromHour]] [[scriptieFromHour]]', 'nl')).toBe(
      `${formatEuro(consultancyFromHour, 'nl')} ${formatEuro(scriptieFromHour, 'nl')}`,
    );
    expect(scriptieFromHour).toBe(Math.min(...businessConfig.scriptie.rates.map((r) => r.amount_cents / 100)));
    expect(fillPrices('[[voOnline1]] [[voOnline1Hr]]', 'nl')).toBe('€240 €60');
    expect(fillPrices('[[hboPhysical1]] [[hboPhysical1Hr]]', 'en')).toBe('€400 €100');
    expect(lowestPackagePrice).toBe(rate('vo_online_1').amount_cents / 100);
  });

  it('no hardcoded euro amount remains in the derived files', () => {
    const files = [
      'components/contact/steps/InfoSection.tsx',
      'app/[locale]/consultancy/metadata.ts',
      'app/[locale]/scriptiebegeleiding/metadata.ts',
      'app/[locale]/(marketing)/bijles/amsterdam/page.tsx',
      'app/[locale]/(marketing)/bijles/onderwerp/calculus/page.tsx',
      'app/[locale]/(marketing)/bijles/onderwerp/programmeren/page.tsx',
      'app/[locale]/(marketing)/bijles/onderwerp/statistiek/psychologie/page.tsx',
      'messages/nl/faq.json',
      'messages/en/faq.json',
      'messages/nl/tutoring.json',
      'messages/en/tutoring.json',
    ];
    for (const f of files) {
      expect(`${f}: ${(read(f).match(/€\s?\d|\bprice: \d/g) ?? []).length}`).toBe(`${f}: 0`);
    }
  });
});
