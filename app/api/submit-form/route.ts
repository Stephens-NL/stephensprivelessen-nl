import { NextResponse } from 'next/server';

const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;

export async function POST(req: Request) {
  try {
    const formData = await req.json();
    console.log('Received form data:', formData);
    
    const response = await fetch(GOOGLE_SCRIPT_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    console.log('Google Script response:', await response.text());

    if (!response.ok) {
      throw new Error('Failed to submit form');
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