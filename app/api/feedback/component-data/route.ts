import { NextResponse } from 'next/server';
import { feedbackFormData } from '@/data';
import fs from 'fs';
import path from 'path';

export async function GET() {
    console.log('GET request received for feedback component data');
    try {
        const dataFilePath = path.join(process.cwd(), 'data', 'feedbackComponentData.json');

        if (!fs.existsSync(dataFilePath)) {
            throw new Error('Feedback component data file not found');
        }

        const fileContent = fs.readFileSync(dataFilePath, 'utf8');
        const feedbackFormData = JSON.parse(fileContent);

        if (!feedbackFormData) {
            throw new Error('Feedback form data is undefined');
        }

        return NextResponse.json(
            { feedbackFormData },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error fetching feedback component data:', error);
        return NextResponse.json(
            {
                feedbackFormData: {},
                error: 'Failed to fetch feedback component data'
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