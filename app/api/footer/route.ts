import { NextResponse } from 'next/server';
import { footer } from '@/data';

export async function GET() {
    try {
        if (!footer) {
            throw new Error('Footer data is undefined');
        }
        
        return NextResponse.json({ footer }, { status: 200 });
    } catch (error) {
        console.error('Error fetching footer data:', error);
        return NextResponse.json(
            {
                footer: {},
                error: 'Failed to fetch footer data'
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