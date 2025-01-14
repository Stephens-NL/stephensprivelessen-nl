import { NextResponse } from 'next/server';
import { navigation, siteTitle } from '@/data';

export async function GET() {
    try {
        if (!navigation || !siteTitle) {
            throw new Error('Header data is undefined');
        }
        
        return NextResponse.json(
            { navigation, siteTitle },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error fetching header data:', error);
        return NextResponse.json(
            {
                navigation: {},
                siteTitle: {},
                error: 'Failed to fetch header data'
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