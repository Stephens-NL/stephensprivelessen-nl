/**
 * Intake Pipeline End-to-End Tests
 *
 * Tests the full flow: website form → Platform API → database.
 * Requires Platform API on localhost:8082 and PostgreSQL via Docker.
 * Tests are skipped if services are not reachable.
 */
import { execSync } from 'child_process';

const PLATFORM_API = process.env.PLATFORM_API_URL || 'http://localhost:8082';

async function isReachable(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(2000) });
    return res.ok;
  } catch {
    return false;
  }
}

function dbQuery(sql: string): string {
  // Write SQL to a temp approach that avoids shell quoting issues
  return execSync(
    `docker exec -i platform-postgres psql -U postgres -d platform -t -A`,
    { input: sql, encoding: 'utf-8' }
  ).trim();
}

describe('Intake Pipeline E2E', () => {
  let platformAvailable = false;

  beforeAll(async () => {
    platformAvailable = await isReachable(`${PLATFORM_API}/health`);
    if (!platformAvailable) console.warn('Platform API not reachable — skipping E2E tests');
  });

  describe('Submission → Storage → Retrieval', () => {
    let submissionId: string | null = null;

    test('1. Submit intake form via Platform API', async () => {
      if (!platformAvailable) return;

      const res = await fetch(`${PLATFORM_API}/api/intake`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName: '__e2e_pipeline_test',
          email: '__e2e@pipeline.test',
          phone: '+31600000000',
          age: 17,
          educationLevel: 'havo',
          parentName: 'E2E Parent',
          parentEmail: 'parent@pipeline.test',
          parentPhone: '+31600000001',
          subject: 'wiskunde',
          goals: 'End-to-end pipeline test submission',
          preferredDays: ['monday', 'thursday'],
          preferredTimes: ['evening'],
          unavailableDays: ['friday'],
          location: 'online',
          locale: 'nl',
        }),
      });

      expect(res.status).toBe(201);
      const data = await res.json();
      expect(data.success).toBe(true);
      expect(data.data.id).toBeDefined();
      submissionId = data.data.id;
    });

    test('2. Submission is stored with status "new"', async () => {
      if (!platformAvailable || !submissionId) return;

      const status = dbQuery(
        `SELECT status FROM intake_submissions WHERE id = '${submissionId}'`
      );
      expect(status).toBe('new');
    });

    test('3. Submission has correct student data', async () => {
      if (!platformAvailable || !submissionId) return;

      const result = dbQuery(
        `SELECT "studentName", email, age, "educationLevel", "parentEmail", subject, location FROM intake_submissions WHERE id = '${submissionId}'`
      );

      const [name, email, age, level, parentEmail, subject, location] = result.split('|');
      expect(name).toBe('__e2e_pipeline_test');
      expect(email).toBe('__e2e@pipeline.test');
      expect(age).toBe('17');
      expect(level).toBe('havo');
      expect(parentEmail).toBe('parent@pipeline.test');
      expect(subject).toBe('wiskunde');
      expect(location).toBe('online');
    });

    test('4. Submission has array fields stored correctly', async () => {
      if (!platformAvailable || !submissionId) return;

      const result = dbQuery(
        `SELECT "preferredDays", "preferredTimes", "unavailableDays" FROM intake_submissions WHERE id = '${submissionId}'`
      );

      const [days, times, unavailable] = result.split('|');
      expect(days).toContain('monday');
      expect(days).toContain('thursday');
      expect(times).toContain('evening');
      expect(unavailable).toContain('friday');
    });

    afterAll(() => {
      if (submissionId) {
        try {
          dbQuery(`DELETE FROM intake_submissions WHERE id = '${submissionId}'`);
        } catch { /* ignore cleanup errors */ }
      }
    });
  });

  describe('Validation', () => {
    test('rejects submission without required fields', async () => {
      if (!platformAvailable) return;

      const res = await fetch(`${PLATFORM_API}/api/intake`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ age: 20 }),
      });
      expect(res.status).toBe(400);
    });

    test('rejects submission without email', async () => {
      if (!platformAvailable) return;

      const res = await fetch(`${PLATFORM_API}/api/intake`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentName: 'No Email' }),
      });
      expect(res.status).toBe(400);
    });

    test('accepts minimal submission (name + email only)', async () => {
      if (!platformAvailable) return;

      const res = await fetch(`${PLATFORM_API}/api/intake`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName: '__e2e_minimal',
          email: '__e2e_minimal@test.dev',
        }),
      });
      expect(res.status).toBe(201);

      // Clean up
      const data = await res.json();
      try {
        dbQuery(`DELETE FROM intake_submissions WHERE id = '${data.data.id}'`);
      } catch { /* ignore */ }
    });
  });
});
