import { NextResponse } from 'next/server';

const PLATFORM_API_URL = process.env.PLATFORM_API_URL || 'http://localhost:8082';

export async function POST(req: Request) {
  try {
    const formData = await req.json();

    const response = await fetch(`${PLATFORM_API_URL}/api/intake`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentName: formData.name || formData.studentName || '',
        email: formData.email || '',
        phone: formData.phone || null,
        age: formData.age || null,
        educationLevel: formData.level || formData.educationLevel || null,
        parentName: formData.parentName || null,
        parentEmail: formData.parentEmail || null,
        parentPhone: formData.parentPhone || null,
        requesterName: formData.requesterName || null,
        requesterEmail: formData.requesterEmail || null,
        requestType: formData.requestType || null,
        subject: formData.subject || null,
        programmingLang: formData.programmingLanguage || formData.programmingLang || null,
        goals: formData.goals || null,
        preferredDays: formData.preferredDays || [],
        preferredTimes: formData.preferredTimes || [],
        unavailableDays: formData.unavailableDays || [],
        location: formData.location || null,
        locale: formData.locale || 'nl',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to submit form');
    }

    return NextResponse.json({ status: 'success' });
  } catch (error) {
    console.error('Form submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit form' },
      { status: 500 }
    );
  }
}
