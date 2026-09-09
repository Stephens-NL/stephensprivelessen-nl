import type { FormData } from '@/components/contact/Contact';

/**
 * Map the contact form onto the portaal's /api/intake/submit-internal body.
 *
 * Extracted from app/api/contact/route.ts purely so the renames are testable —
 * the form and the intake_submissions table use different names for the same
 * five fields, and getting one wrong loses that field silently: the endpoint
 * accepts a partial body on purpose, so a mistyped key is dropped, not rejected.
 *
 * `source` is deliberately absent — the portaal forces it to 'website', because
 * vps-bot's review poller filters on it.
 */
export function intakePayload(formData: FormData): Record<string, unknown> {
    // The two fields intake_submissions has no column for.
    const notes = [
        formData.contactPreference ? `Contact via: ${formData.contactPreference}` : '',
        formData.relationship ? `Relatie tot student: ${formData.relationship}` : '',
    ].filter(Boolean).join('\n');

    return {
        studentName: formData.name,
        email: formData.email,
        age: formData.age,
        educationLevel: formData.level,
        subject: formData.subject,
        programmingLang: formData.programmingLanguage,
        goals: formData.goals,
        preferredDays: formData.preferredDays,
        preferredTimes: formData.preferredTimes,
        unavailableDays: formData.unavailableDays,
        location: formData.isOnline ? 'online' : 'in-person',
        parentName: formData.parentName,
        parentEmail: formData.parentEmail,
        parentPhone: formData.parentPhone,
        requestType: formData.requestType,
        requesterName: formData.requesterName,
        requesterEmail: formData.requesterEmail,
        notes: notes || undefined,
    };
}
