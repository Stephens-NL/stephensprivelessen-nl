import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

type FeedbackData = {
    id: string;
    [key: string]: any;
};

export async function GET(request: NextRequest, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const dataFilePath = path.join(process.cwd(), 'data', 'feedback.json');

    if (!fs.existsSync(dataFilePath)) {
        return NextResponse.json(
            { error: 'No feedback data found' },
            { status: 404 }
        );
    }

    const fileContent = fs.readFileSync(dataFilePath, 'utf8');
    const feedbackData: FeedbackData[] = JSON.parse(fileContent);

    console.log(`GET request received for feedback with id: ${params.id}`);
    const feedback = feedbackData.find(item => item.id === params.id);

    if (feedback) {
        return NextResponse.json({ data: feedback }, { status: 200 });
    } else {
        return NextResponse.json(
            { error: 'Feedback not found' },
            { status: 404 }
        );
    }
}

export async function PUT(request: NextRequest, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const dataFilePath = path.join(process.cwd(), 'data', 'feedback.json');

    if (!fs.existsSync(dataFilePath)) {
        return NextResponse.json(
            { error: 'No feedback data found' },
            { status: 404 }
        );
    }

    const fileContent = fs.readFileSync(dataFilePath, 'utf8');
    const feedbackData: FeedbackData[] = JSON.parse(fileContent);

    console.log(`PUT request received for feedback with id: ${params.id}`);
    const index = feedbackData.findIndex(item => item.id === params.id);

    if (index !== -1) {
        const body = await request.json();
        feedbackData[index] = { ...feedbackData[index], ...body, id: params.id };
        fs.writeFileSync(dataFilePath, JSON.stringify(feedbackData, null, 2));
        return NextResponse.json({ data: feedbackData[index] }, { status: 200 });
    } else {
        return NextResponse.json(
            { error: 'Feedback not found' },
            { status: 404 }
        );
    }
}

export async function DELETE(request: NextRequest, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const dataFilePath = path.join(process.cwd(), 'data', 'feedback.json');

    if (!fs.existsSync(dataFilePath)) {
        return NextResponse.json(
            { error: 'No feedback data found' },
            { status: 404 }
        );
    }

    const fileContent = fs.readFileSync(dataFilePath, 'utf8');
    const feedbackData: FeedbackData[] = JSON.parse(fileContent);

    console.log(`DELETE request received for feedback with id: ${params.id}`);
    const newData = feedbackData.filter(item => item.id !== params.id);

    if (newData.length < feedbackData.length) {
        fs.writeFileSync(dataFilePath, JSON.stringify(newData, null, 2));
        return NextResponse.json(
            { message: 'Feedback deleted successfully' },
            { status: 200 }
        );
    } else {
        return NextResponse.json(
            { error: 'Feedback not found' },
            { status: 404 }
        );
    }
}

// Handle unsupported methods
export async function POST() {
    return new NextResponse(null, { status: 405 });
}

export async function PATCH() {
    return new NextResponse(null, { status: 405 });
} 