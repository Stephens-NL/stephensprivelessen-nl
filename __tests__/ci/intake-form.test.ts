import fs from 'fs';
import path from 'path';

const PROJECT_ROOT = path.resolve(__dirname, '../..');

describe('Intake form configuration', () => {
  // These three used to assert app/api/submit-form/route.ts, which POSTed to
  // PLATFORM_API_URL/api/intake. Nothing has listened on that port since the CRM
  // POST was retired, the route had zero callers, and the assertions were what
  // kept the dead design and its dead env var in place. The live path is
  // /api/contact recording into the portaal; that is what these now pin.
  test('contact route records the lead in the portaal', () => {
    const routePath = path.join(PROJECT_ROOT, 'app/api/contact/route.ts');
    expect(fs.existsSync(routePath)).toBe(true);

    const content = fs.readFileSync(routePath, 'utf-8');
    expect(content).toContain('PORTAAL_INTERNAL_URL');
    expect(content).toContain('/api/intake/submit-internal');
    expect(content).toContain('x-internal-key');
    // The dead path must not come back.
    expect(content).not.toContain('PLATFORM_API_URL');
    expect(content).not.toContain('GOOGLE_SCRIPT_URL');
  });

  test('the lead payload carries the fields the intake table requires', () => {
    const mapperPath = path.join(PROJECT_ROOT, 'lib/intake-payload.ts');
    const content = fs.readFileSync(mapperPath, 'utf-8');
    expect(content).toContain('studentName');
    expect(content).toContain('email');
    // source is the portaal's to set — the review poller filters on it.
    expect(content).not.toMatch(/^\s*source:/m);
  });

  test('PORTAAL_INTERNAL_URL is configured in docker-compose, on the portaal network', () => {
    const composePath = path.join(PROJECT_ROOT, 'docker-compose.yml');
    const content = fs.readFileSync(composePath, 'utf-8');
    expect(content).toContain('PORTAAL_INTERNAL_URL');
    // Without joining data-network the hostname above does not resolve at all.
    expect(content).toContain('data-network');
    expect(content).not.toContain('PLATFORM_API_URL');
  });

  test('InitialChoice has no Coming Soon badge', () => {
    const filePath = path.join(PROJECT_ROOT, 'components/contact/steps/InitialChoice.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');
    // Should not have disabled button or coming soon overlay
    expect(content).not.toContain('disabled');
    expect(content).not.toContain('cursor-not-allowed');
    expect(content).not.toContain('comingSoon');
    expect(content).not.toContain('opacity-50');
    // Should have onChooseLesson handler wired up
    expect(content).toContain('onChooseLesson');
  });

  test('all intake form steps exist', () => {
    const steps = [
      'components/contact/steps/InitialChoice.tsx',
      'components/contact/steps/InfoSection.tsx',
      'components/contact/steps/LessonForm.tsx',
      'components/contact/steps/form-steps/PersonalDetails.tsx',
      'components/contact/steps/form-steps/SubjectSelection.tsx',
      'components/contact/steps/form-steps/GoalsSection.tsx',
      'components/contact/steps/form-steps/ScheduleSelection.tsx',
      'components/contact/steps/form-steps/LocationChoice.tsx',
      'components/contact/steps/form-steps/Confirmation.tsx',
    ];

    const missing = steps.filter(
      (s) => !fs.existsSync(path.join(PROJECT_ROOT, s))
    );

    expect(missing).toEqual([]);
  });

  test('Contact component handles all form steps', () => {
    const contactPath = path.join(PROJECT_ROOT, 'components/contact/Contact.tsx');
    const content = fs.readFileSync(contactPath, 'utf-8');

    // All steps should be handled
    const requiredSteps = [
      'initial',
      'info',
      'personal-details',
      'subject-selection',
      'goals',
      'schedule',
      'location',
      'confirmation',
    ];

    for (const step of requiredSteps) {
      expect(content).toContain(step);
    }
  });

  test('thesis pricing table is bilingual', () => {
    const infoPath = path.join(PROJECT_ROOT, 'components/contact/steps/InfoSection.tsx');
    const content = fs.readFileSync(infoPath, 'utf-8');
    // Should not have hardcoded Dutch-only text
    expect(content).not.toMatch(/>\s*Tarief\s*</);
    expect(content).not.toMatch(/>\s*Eenmalig consult\s*</);
    // Should use language variable
    expect(content).toContain("'Tarief' : 'Rate'");
    expect(content).toContain("'Eenmalig consult' : 'Single consultation'");
  });
});
