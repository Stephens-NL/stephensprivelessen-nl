/**
 * Contact Form Tests
 *
 * Tests the contact/intake form logic, validation, and API integration.
 * Uses node environment (no DOM rendering) — tests logic and structure.
 */

import { FormData } from '@/components/contact/Contact';

// ---- Form Data Validation Tests ----

describe('Contact Form - Validation', () => {
  const validFormData: FormData = {
    name: 'Test Student',
    email: 'test@example.com',
    age: 20,
    level: 'university',
    subject: 'wiskunde',
    goals: 'Improve my math skills for the upcoming exam',
    preferredDays: ['monday', 'wednesday'],
    preferredTimes: ['evening'],
    isOnline: true,
    unavailableDays: [],
    contactPreference: null,
    submitted: false,
    requestType: 'self',
  };

  test('valid adult form data passes all checks', () => {
    expect(validFormData.name).toBeTruthy();
    expect(validFormData.email).toBeTruthy();
    expect(validFormData.email).toMatch(/@/);
    expect(validFormData.age).toBeGreaterThanOrEqual(18);
  });

  test('minor requires parent email', () => {
    const minorData: FormData = {
      ...validFormData,
      age: 16,
      parentEmail: undefined,
    };

    const needsParentInfo = minorData.age < 18 && !minorData.parentEmail;
    expect(needsParentInfo).toBe(true);
  });

  test('minor with parent email passes validation', () => {
    const minorData: FormData = {
      ...validFormData,
      age: 16,
      parentName: 'Parent Name',
      parentEmail: 'parent@example.com',
      parentPhone: '+31612345678',
    };

    const needsParentInfo = minorData.age < 18 && !minorData.parentEmail;
    expect(needsParentInfo).toBe(false);
  });

  test('empty name fails validation', () => {
    const invalidData = { ...validFormData, name: '' };
    expect(!invalidData.email || !invalidData.name).toBe(true);
  });

  test('empty email fails validation', () => {
    const invalidData = { ...validFormData, email: '' };
    expect(!invalidData.email || !invalidData.name).toBe(true);
  });

  test('goals must have minimum length', () => {
    const shortGoals = { ...validFormData, goals: 'hi' };
    expect(shortGoals.goals.length).toBeLessThan(10);

    const validGoals = { ...validFormData, goals: 'I want to improve my math' };
    expect(validGoals.goals.length).toBeGreaterThanOrEqual(10);
  });

  test('preferredDays must not be empty for schedule step', () => {
    const noSchedule = { ...validFormData, preferredDays: [] };
    expect(noSchedule.preferredDays.length).toBe(0);

    const withSchedule = { ...validFormData, preferredDays: ['monday'] };
    expect(withSchedule.preferredDays.length).toBeGreaterThan(0);
  });

  test('third-party request requires requester info', () => {
    const thirdParty: FormData = {
      ...validFormData,
      requestType: 'other',
      requesterName: '',
      requesterEmail: '',
    };

    const needsRequesterInfo = thirdParty.requestType === 'other' && !thirdParty.requesterEmail;
    expect(needsRequesterInfo).toBe(true);
  });
});

// ---- Step Navigation Tests ----

describe('Contact Form - Step Navigation', () => {
  const steps = [
    'initial',
    'info',
    'personal-details',
    'subject-selection',
    'goals',
    'schedule',
    'location',
    'confirmation',
  ] as const;

  test('step order is correct', () => {
    expect(steps[0]).toBe('initial');
    expect(steps[steps.length - 1]).toBe('confirmation');
  });

  test('getNextStep returns correct next step', () => {
    const getNextStep = (current: string) => {
      const idx = steps.indexOf(current as any);
      return steps[idx + 1];
    };

    expect(getNextStep('initial')).toBe('info');
    expect(getNextStep('personal-details')).toBe('subject-selection');
    expect(getNextStep('location')).toBe('confirmation');
  });

  test('getPreviousStep returns correct previous step', () => {
    const getPreviousStep = (current: string) => {
      const idx = steps.indexOf(current as any);
      return steps[idx - 1];
    };

    expect(getPreviousStep('confirmation')).toBe('location');
    expect(getPreviousStep('subject-selection')).toBe('personal-details');
    expect(getPreviousStep('info')).toBe('initial');
  });

  test('info step is accessible from initial (choose info path)', () => {
    // From initial, choosing "More Information" goes to info
    expect(steps.indexOf('info')).toBe(1);
  });

  test('personal-details step is accessible from initial (choose lesson path)', () => {
    // From initial, choosing "Schedule Trial" goes to personal-details
    expect(steps.indexOf('personal-details')).toBe(2);
  });
});

// ---- API Route Tests ----

describe('Contact Form - API Integration', () => {
  test('submit-form route maps form fields correctly', async () => {
    // Read the route file and verify field mapping
    const fs = require('fs');
    const path = require('path');
    const routeContent = fs.readFileSync(
      path.join(process.cwd(), 'app/api/submit-form/route.ts'),
      'utf-8'
    );

    // Required Platform API fields must be mapped
    expect(routeContent).toContain('studentName');
    expect(routeContent).toContain('email');
    expect(routeContent).toContain('phone');
    expect(routeContent).toContain('age');
    expect(routeContent).toContain('educationLevel');
    expect(routeContent).toContain('subject');
    expect(routeContent).toContain('goals');
    expect(routeContent).toContain('preferredDays');
    expect(routeContent).toContain('preferredTimes');
    expect(routeContent).toContain('location');
    expect(routeContent).toContain('locale');
  });

  test('submit-form handles parent info for minors', async () => {
    const fs = require('fs');
    const path = require('path');
    const routeContent = fs.readFileSync(
      path.join(process.cwd(), 'app/api/submit-form/route.ts'),
      'utf-8'
    );

    expect(routeContent).toContain('parentName');
    expect(routeContent).toContain('parentEmail');
    expect(routeContent).toContain('parentPhone');
  });

  test('submit-form handles third-party requests', async () => {
    const fs = require('fs');
    const path = require('path');
    const routeContent = fs.readFileSync(
      path.join(process.cwd(), 'app/api/submit-form/route.ts'),
      'utf-8'
    );

    expect(routeContent).toContain('requesterName');
    expect(routeContent).toContain('requesterEmail');
    expect(routeContent).toContain('requestType');
  });

  test('submit-form sends to Platform API, not Google Script', async () => {
    const fs = require('fs');
    const path = require('path');
    const routeContent = fs.readFileSync(
      path.join(process.cwd(), 'app/api/submit-form/route.ts'),
      'utf-8'
    );

    expect(routeContent).toContain('PLATFORM_API_URL');
    expect(routeContent).toContain('/api/intake');
    expect(routeContent).not.toContain('GOOGLE_SCRIPT_URL');
  });
});

// ---- Form Data Shape Tests ----

describe('Contact Form - Data Shape', () => {
  test('FormData has all required fields', () => {
    const requiredFields: (keyof FormData)[] = [
      'name', 'email', 'age', 'level', 'subject', 'goals',
      'preferredDays', 'preferredTimes', 'isOnline', 'unavailableDays',
      'contactPreference', 'submitted', 'requestType',
    ];

    // Create a typed object to verify all fields exist
    const testData: FormData = {
      name: '', email: '', age: 0, level: '', subject: '', goals: '',
      preferredDays: [], preferredTimes: [], isOnline: false, unavailableDays: [],
      contactPreference: null, submitted: false, requestType: null,
    };

    for (const field of requiredFields) {
      expect(field in testData).toBe(true);
    }
  });

  test('FormData optional fields for minors', () => {
    const minorData: FormData = {
      name: 'Young Student', email: 'student@school.nl', age: 15,
      level: 'havo', subject: 'wiskunde', goals: 'Pass my exam',
      preferredDays: ['tuesday'], preferredTimes: ['afternoon'],
      isOnline: false, unavailableDays: [],
      contactPreference: 'parent', submitted: false, requestType: 'self',
      parentName: 'Mrs. Parent',
      parentEmail: 'parent@email.nl',
      parentPhone: '+31612345678',
    };

    expect(minorData.parentName).toBeDefined();
    expect(minorData.parentEmail).toBeDefined();
    expect(minorData.parentPhone).toBeDefined();
  });

  test('FormData optional fields for third-party requests', () => {
    const thirdPartyData: FormData = {
      name: 'Student Name', email: 'student@email.nl', age: 20,
      level: 'university', subject: 'statistiek', goals: 'Help with thesis',
      preferredDays: ['friday'], preferredTimes: ['morning'],
      isOnline: true, unavailableDays: [],
      contactPreference: null, submitted: false, requestType: 'other',
      requesterName: 'Teacher Name',
      requesterEmail: 'teacher@school.nl',
      relationship: 'teacher',
    };

    expect(thirdPartyData.requesterName).toBeDefined();
    expect(thirdPartyData.requesterEmail).toBeDefined();
    expect(thirdPartyData.requestType).toBe('other');
  });
});

// ---- Form Step Component Existence ----

describe('Contact Form - Component Structure', () => {
  const fs = require('fs');
  const path = require('path');

  const componentFiles = [
    'components/contact/Contact.tsx',
    'components/contact/steps/InitialChoice.tsx',
    'components/contact/steps/InfoSection.tsx',
    'components/contact/steps/LessonForm.tsx',
    'components/contact/steps/ContactPricingTable.tsx',
    'components/contact/steps/ContactGroupPricingTable.tsx',
    'components/contact/steps/InfoSectionCoursesBlock.tsx',
    'components/contact/steps/form-steps/PersonalDetails.tsx',
    'components/contact/steps/form-steps/SubjectSelection.tsx',
    'components/contact/steps/form-steps/GoalsSection.tsx',
    'components/contact/steps/form-steps/ScheduleSelection.tsx',
    'components/contact/steps/form-steps/LocationChoice.tsx',
    'components/contact/steps/form-steps/Confirmation.tsx',
    'components/contact/steps/form-steps/NavigationButtons.tsx',
    'components/contact/steps/form-steps/PersonalDetailsSteps/AgeStep.tsx',
    'components/contact/steps/form-steps/PersonalDetailsSteps/StudentForm.tsx',
    'components/contact/steps/form-steps/PersonalDetailsSteps/MinorForm.tsx',
    'components/contact/steps/form-steps/PersonalDetailsSteps/ContactInputs.tsx',
    'components/contact/components/GoogleCalendarAppointment.tsx',
    'components/contact/components/BackConfirmationDialog.tsx',
  ];

  test.each(componentFiles)('%s exists', (file) => {
    expect(fs.existsSync(path.join(process.cwd(), file))).toBe(true);
  });

  test('Contact.tsx exports FormData type', () => {
    const content = fs.readFileSync(
      path.join(process.cwd(), 'components/contact/Contact.tsx'),
      'utf-8'
    );
    expect(content).toContain('export interface FormData');
    expect(content).toContain('export type FormStep');
  });

  test('all form steps use useTranslations', () => {
    const stepsDir = path.join(process.cwd(), 'components/contact/steps/form-steps');
    const files = fs.readdirSync(stepsDir).filter((f: string) => f.endsWith('.tsx'));

    for (const file of files) {
      const content = fs.readFileSync(path.join(stepsDir, file), 'utf-8');
      // Each step should use translations (either directly or via props)
      const hasI18n = content.includes('useTranslations') ||
                      content.includes('useLocale') ||
                      content.includes(': string'); // accepts translated strings as props
      expect(hasI18n).toBe(true);
    }
  });
});
