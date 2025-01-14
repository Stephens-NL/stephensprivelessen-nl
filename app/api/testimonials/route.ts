import { NextRequest, NextResponse } from 'next/server';

// Dummy data
const dummyTestimonials = [
    {
        id: '1',
        name: 'John Doe',
        content: 'Great tutoring service!',
        rating: 5,
        subject: 'Mathematics',
        date: new Date().toISOString()
    },
    {
        id: '2',
        name: 'Jane Smith',
        content: 'Very helpful and patient teacher.',
        rating: 5,
        subject: 'Physics',
        date: new Date().toISOString()
    }
];

let testimonials = [...dummyTestimonials];

export async function GET() {
    try {
        return NextResponse.json(testimonials, { status: 200 });
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
        const newTestimonial = {
            id: (testimonials.length + 1).toString(),
            ...body,
            date: new Date().toISOString()
        };
        testimonials.push(newTestimonial);
        return NextResponse.json(newTestimonial, { status: 201 });
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
        const index = testimonials.findIndex(t => t.id === body.id);
        if (index === -1) {
            return NextResponse.json(
                { message: 'Testimonial not found' },
                { status: 404 }
            );
        }
        testimonials[index] = { ...testimonials[index], ...body };
        return NextResponse.json(testimonials[index], { status: 200 });
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
        const initialLength = testimonials.length;
        testimonials = testimonials.filter(t => t.id !== body.id);
        
        if (testimonials.length === initialLength) {
            return NextResponse.json(
                { message: 'Testimonial not found' },
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