import { NextResponse } from 'next/server';
import { faqInfo, faqItems } from '@/data';

export async function GET() {
    try {
        const faqData = {
            faqInfo,
            faqItems
        };
        
        return NextResponse.json(faqData, { status: 200 });
    } catch (error) {
        console.error('Error fetching FAQ data:', error);
        return NextResponse.json(
            {
                faqInfo: {},
                faqItems: [],
                error: 'Failed to fetch FAQ data'
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