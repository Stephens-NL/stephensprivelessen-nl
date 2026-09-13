/**
 * The form's day and time buttons are generated from the vendored
 * business-config, not typed into the component. These pin that wiring.
 *
 * Why it exists: the window was retyped in four places across three repos and
 * drifted. The form offered 12:00 (a parent asked for it on 2026-09-08), then
 * 17:00 — both an hour or more outside the hours Stephen actually teaches.
 */
import { teachingWindow } from '@/data/business-config.generated';

describe('teaching window — the value itself', () => {
  it('is Monday to Thursday', () => {
    expect(teachingWindow.days).toEqual(['monday', 'tuesday', 'wednesday', 'thursday']);
    expect(teachingWindow.days).not.toContain('friday');
  });

  it('runs 18:00 to 21:00, with 20:00 the last bookable start', () => {
    expect(teachingWindow.first_start).toBe('18:00');
    expect(teachingWindow.last_start).toBe('20:00');
    expect(teachingWindow.window_end).toBe('21:00');
  });

  it('offers half-hour starts and nothing before 18:00', () => {
    expect(teachingWindow.start_times).toEqual(['18:00', '18:30', '19:00', '19:30', '20:00']);
    // The two that actually got offered to parents, and must not come back.
    expect(teachingWindow.start_times).not.toContain('12:00');
    expect(teachingWindow.start_times).not.toContain('17:00');
  });
});

describe('teaching window — internal consistency', () => {
  const toMin = (hhmm: string) => {
    const [h, m] = hhmm.split(':').map(Number);
    return h * 60 + m;
  };

  it('last_start plus a lesson lands exactly on window_end', () => {
    expect(toMin(teachingWindow.last_start) + teachingWindow.lesson_minutes).toBe(
      toMin(teachingWindow.window_end),
    );
  });

  it('start_times spans first_start to last_start at the slot interval', () => {
    const expected: string[] = [];
    for (
      let t = toMin(teachingWindow.first_start);
      t <= toMin(teachingWindow.last_start);
      t += teachingWindow.slot_minutes
    ) {
      expected.push(
        `${String(Math.floor(t / 60)).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}`,
      );
    }
    expect(teachingWindow.start_times).toEqual(expected);
  });

  it('has display copy in both locales naming the same hours', () => {
    for (const text of [teachingWindow.display.nl, teachingWindow.display.en]) {
      expect(text).toContain('18:00');
      expect(text).toContain('21:00');
    }
  });
});
