import { NextResponse } from 'next/server';
import { about, introductionContent } from '@/data';

export async function GET() {
  try {
    if (!about || !introductionContent) {
      throw new Error('About data or introduction content is undefined');
    }
    return NextResponse.json({ about, introductionContent });
  } catch (error) {
    console.error('Error fetching about data:', error);
    return NextResponse.json(
      { 
        about: {}, 
        introductionContent: {},
        error: 'Failed to fetch about data' 
      },
      { status: 500 }
    );
  }
} 