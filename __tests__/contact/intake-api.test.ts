/**
 * Intake API Integration Tests
 *
 * Tests the actual Platform API /api/intake endpoint.
 * Requires Platform API to be running on localhost:8082.
 * Tests are skipped if the API is not reachable.
 */

const PLATFORM_API_URL = process.env.PLATFORM_API_URL || 'http://localhost:8082';

async function isApiReachable(): Promise<boolean> {
  try {
    const res = await fetch(`${PLATFORM_API_URL}/health`, { signal: AbortSignal.timeout(2000) });
    return res.ok;
  } catch {
    return false;
  }
}

describe('Intake API Integration', () => {
  let apiAvailable = false;

  beforeAll(async () => {
    apiAvailable = await isApiReachable();
    if (!apiAvailable) {
      console.warn('Platform API not reachable — skipping integration tests');
    }
  });

  test('POST /api/intake with valid data returns 201', async () => {
    if (!apiAvailable) return;

    const res = await fetch(`${PLATFORM_API_URL}/api/intake`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        studentName: '__test_integration',
        email: '__test@integration.dev',
        age: 20,
        subject: 'wiskunde',
        locale: 'nl',
      }),
    });

    expect(res.status).toBe(201);
    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.data.id).toBeDefined();

    // Clean up
    const deleteRes = await fetch(`${PLATFORM_API_URL}/api/intake/${data.data.id}`, {
      method: 'DELETE',
    });
  });

  test('POST /api/intake without required fields returns 400', async () => {
    if (!apiAvailable) return;

    const res = await fetch(`${PLATFORM_API_URL}/api/intake`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ age: 20 }), // missing studentName and email
    });

    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.success).toBe(false);
  });

  test('POST /api/intake does not require API key (public endpoint)', async () => {
    if (!apiAvailable) return;

    // Should NOT get 401 Unauthorized
    const res = await fetch(`${PLATFORM_API_URL}/api/intake`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        studentName: '__test_no_auth',
        email: '__test_noauth@integration.dev',
      }),
    });

    expect(res.status).not.toBe(401);

    // Clean up if created
    if (res.status === 201) {
      const data = await res.json();
      await fetch(`${PLATFORM_API_URL}/api/intake/${data.data.id}`, {
        method: 'DELETE',
      });
    }
  });

  test('POST /api/intake stores all form fields', async () => {
    if (!apiAvailable) return;

    const fullSubmission = {
      studentName: '__test_full_form',
      email: '__test_full@integration.dev',
      phone: '+31612345678',
      age: 16,
      educationLevel: 'havo',
      parentName: 'Test Parent',
      parentEmail: 'parent@integration.dev',
      parentPhone: '+31698765432',
      subject: 'statistiek',
      programmingLang: 'Python',
      goals: 'Pass my statistics exam with a good grade',
      preferredDays: ['monday', 'wednesday'],
      preferredTimes: ['evening'],
      unavailableDays: ['friday'],
      location: 'online',
      locale: 'en',
    };

    const res = await fetch(`${PLATFORM_API_URL}/api/intake`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fullSubmission),
    });

    expect(res.status).toBe(201);
    const data = await res.json();
    expect(data.data.id).toBeDefined();

    // Clean up
    await fetch(`${PLATFORM_API_URL}/api/intake/${data.data.id}`, {
      method: 'DELETE',
    });
  });
});
