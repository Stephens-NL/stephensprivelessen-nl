import { NextResponse } from 'next/server';
import { generalContent, services } from '@/data';

export async function GET() {
    try {
        if (!services || !generalContent) {
            throw new Error('Services or general content data is undefined');
        }
        
        return NextResponse.json(
            { services, generalContent },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error fetching services data:', error);
        return NextResponse.json(
            {
                services: {},
                generalContent: {},
                error: 'Failed to fetch services data'
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