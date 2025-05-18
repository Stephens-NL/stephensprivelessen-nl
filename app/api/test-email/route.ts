import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { config } from '@/data/config';

export async function POST() {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '465'),
        secure: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
        tls: {
            rejectUnauthorized: true,
            minVersion: "TLSv1.2"
        }
    });

    try {
        // First verify the connection
        await transporter.verify();
        console.log('SMTP connection verified successfully');

        // Then send a test email
        const info = await transporter.sendMail({
            from: process.env.SMTP_FROM,
            to: config.contact.email,
            subject: 'Test Email',
            text: 'Als je deze email ontvangt, werkt de email configuratie correct!',
        });

        console.log('Test email sent:', info.messageId);
        return NextResponse.json(
            {
                message: 'Test email sent successfully',
                messageId: info.messageId
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Email test failed:', error);
        return NextResponse.json(
            {
                message: 'Email test failed',
                error: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}

// Handle unsupported methods
export async function GET() {
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