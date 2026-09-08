/**
 * The contact form and intake_submissions use different names for the same
 * fields. The portaal endpoint accepts a partial body on purpose (a half-filled
 * form is still a lead), which means a mistyped key is silently dropped rather
 * than rejected — so the renames need a test, not just a type.
 *
 * Replaces the old intake-e2e.test.ts, which POSTed to platform-api:8082. Nothing
 * has listened on that port since the CRM POST was removed, and the test skipped
 * itself when unreachable, so it passed green while testing nothing.
 */
import { intakePayload } from '@/lib/intake-payload';
import type { FormData } from '@/components/contact/Contact';

const FILLED: FormData = {
  name: 'Vanessa Frederik',
  email: 'vanessa@example.com',
  age: 35,
  level: 'WO',
  subject: 'Statistics',
  goals: 'Resit in January',
  preferredDays: ['monday', 'tuesday'],
  preferredTimes: ['17:00', '18:30'],
  unavailableDays: ['thursday'],
  isOnline: true,
  contactPreference: 'student',
  requestType: 'self',
  programmingLanguage: 'R',
  submitted: false,
};

describe('intakePayload — the five renames', () => {
  it('maps the form names onto the intake column names', () => {
    const p = intakePayload(FILLED);
    expect(p.studentName).toBe('Vanessa Frederik'); // name
    expect(p.educationLevel).toBe('WO'); // level
    expect(p.programmingLang).toBe('R'); // programmingLanguage
    expect(p.location).toBe('online'); // isOnline
    expect(p.email).toBe('vanessa@example.com'); // unchanged
  });

  it('turns isOnline into the location vocabulary the column uses', () => {
    expect(intakePayload({ ...FILLED, isOnline: true }).location).toBe('online');
    expect(intakePayload({ ...FILLED, isOnline: false }).location).toBe('in-person');
  });

  it('passes the three lists through untouched', () => {
    const p = intakePayload(FILLED);
    expect(p.preferredDays).toEqual(['monday', 'tuesday']);
    expect(p.preferredTimes).toEqual(['17:00', '18:30']);
    expect(p.unavailableDays).toEqual(['thursday']);
  });
});

describe('intakePayload — fields with no column', () => {
  it('folds contactPreference and relationship into notes', () => {
    const p = intakePayload({
      ...FILLED,
      contactPreference: 'parent',
      relationship: 'moeder',
    });
    expect(p.notes).toBe('Contact via: parent\nRelatie tot student: moeder');
  });

  it('leaves notes undefined when neither is set', () => {
    const p = intakePayload({ ...FILLED, contactPreference: null, relationship: undefined });
    expect(p.notes).toBeUndefined();
  });

  it('includes just the one that is set', () => {
    expect(intakePayload({ ...FILLED, relationship: undefined }).notes).toBe(
      'Contact via: student',
    );
  });
});

describe('intakePayload — what it must not send', () => {
  it('never sets source: the portaal forces it, because the poller filters on it', () => {
    expect(intakePayload(FILLED)).not.toHaveProperty('source');
  });

  it('never sets leadStatus or status, leaving the schema defaults', () => {
    const p = intakePayload(FILLED);
    expect(p).not.toHaveProperty('leadStatus');
    expect(p).not.toHaveProperty('status');
  });

  it('does not leak form-only bookkeeping fields', () => {
    const p = intakePayload({ ...FILLED, submitted: true, error: 'nope' });
    expect(p).not.toHaveProperty('submitted');
    expect(p).not.toHaveProperty('error');
  });
});

describe('intakePayload — a barely-filled form', () => {
  it('still produces the two fields the endpoint requires', () => {
    const minimal: FormData = {
      name: 'X',
      email: 'x@y.nl',
      level: '',
      subject: '',
      goals: '',
      preferredDays: [],
      preferredTimes: [],
      unavailableDays: [],
      isOnline: false,
      age: 0,
      contactPreference: null,
      requestType: null,
      submitted: false,
    };
    const p = intakePayload(minimal);
    expect(p.studentName).toBe('X');
    expect(p.email).toBe('x@y.nl');
  });
});
