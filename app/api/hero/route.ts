import { NextResponse } from 'next/server';
import { hero } from '@/data';

export async function GET() {
    try {
        if (!hero) {
            throw new Error('Hero data is undefined');
        }
        
        return NextResponse.json({ hero }, { status: 200 });
    } catch (error) {
        console.error('Error fetching hero data:', error);
        return NextResponse.json(
            {
                hero: {},
                error: 'Failed to fetch hero data'
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