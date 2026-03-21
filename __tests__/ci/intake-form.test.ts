import fs from 'fs';
import path from 'path';

const PROJECT_ROOT = path.resolve(__dirname, '../..');

describe('Intake form configuration', () => {
  test('submit-form API route exists and posts to Platform API', () => {
    const routePath = path.join(PROJECT_ROOT, 'app/api/submit-form/route.ts');
    expect(fs.existsSync(routePath)).toBe(true);

    const content = fs.readFileSync(routePath, 'utf-8');
    // Should POST to Platform API, not Google Script
    expect(content).toContain('PLATFORM_API_URL');
    expect(content).toContain('/api/intake');
    expect(content).not.toContain('GOOGLE_SCRIPT_URL');
  });

  test('submit-form sends required fields (studentName, email)', () => {
    const routePath = path.join(PROJECT_ROOT, 'app/api/submit-form/route.ts');
    const content = fs.readFileSync(routePath, 'utf-8');
    expect(content).toContain('studentName');
    expect(content).toContain('email');
  });

  test('PLATFORM_API_URL is configured in docker-compose', () => {
    const composePath = path.join(PROJECT_ROOT, 'docker-compose.yml');
    const content = fs.readFileSync(composePath, 'utf-8');
    expect(content).toContain('PLATFORM_API_URL');
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
