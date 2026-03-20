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
