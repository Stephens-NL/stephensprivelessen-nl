import { NextRequest, NextResponse } from 'next/server';
import { feedbackFormData } from '@/data';

export async function GET() {
    try {
        if (!feedbackFormData) {
            throw new Error('Feedback form data is undefined');
        }
        
        return NextResponse.json(
            { feedbackFormData },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error fetching feedback data:', error);
        return NextResponse.json(
            {
                feedbackFormData: {},
                error: 'Failed to fetch feedback data'
            },
            { status: 500 }
        );
    }
}

// Handle unsupported methods
export async function POST() {
    return new NextResponse(null, { status: 405 });
}

export async function PUT() {
    return new NextResponse(null, { status: 405 });
}

export async function DELETE() {
    return new NextResponse(null, { status: 405 });
}

export async function PATCH() {
    return new NextResponse(null, { status: 405 });
} 