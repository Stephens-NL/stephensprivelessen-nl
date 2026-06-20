import { NextResponse } from 'next/server';

// GET previously served bilingual form copy; now migrated to next-intl (useTranslations).
export async function GET() {
    return new NextResponse(null, { status: 405 });
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
