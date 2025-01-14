import { NextRequest, NextResponse } from 'next/server';

// Dummy data
const dummyIntermezzo = [
    {
        id: '1',
        title: 'My Journey',
        content: 'Started teaching in 2015...',
        date: new Date().toISOString()
    },
    {
        id: '2',
        title: 'Teaching Philosophy',
        content: 'I believe in personalized learning...',
        date: new Date().toISOString()
    }
];

let personalIntermezzo = [...dummyIntermezzo];

export async function GET() {
    try {
        return NextResponse.json(personalIntermezzo, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: 'Error fetching data' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const newIntermezzo = {
            id: (personalIntermezzo.length + 1).toString(),
            ...body,
            date: new Date().toISOString()
        };
        personalIntermezzo.push(newIntermezzo);
        return NextResponse.json(newIntermezzo, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { message: 'Error creating data' },
            { status: 500 }
        );
    }
}

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const index = personalIntermezzo.findIndex(p => p.id === body.id);
        if (index === -1) {
            return NextResponse.json(
                { message: 'Personal intermezzo not found' },
                { status: 404 }
            );
        }
        personalIntermezzo[index] = { ...personalIntermezzo[index], ...body };
        return NextResponse.json(personalIntermezzo[index], { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: 'Error updating data' },
            { status: 500 }
        );
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const body = await request.json();
        const initialLength = personalIntermezzo.length;
        personalIntermezzo = personalIntermezzo.filter(p => p.id !== body.id);
        
        if (personalIntermezzo.length === initialLength) {
            return NextResponse.json(
                { message: 'Personal intermezzo not found' },
                { status: 404 }
            );
        }
        
        return new NextResponse(null, { status: 204 });
    } catch (error) {
        return NextResponse.json(
            { message: 'Error deleting data' },
            { status: 500 }
        );
    }
}

// Handle unsupported methods
export async function PATCH() {
    return new NextResponse(null, { status: 405 });
} 