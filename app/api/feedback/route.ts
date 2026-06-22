import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Feedback payload is dynamic: { language, formType, ...answers } where the
// answer keys depend on the selected form (long/short). We render every field
// generically so new questions never silently drop out of the email.
type FeedbackPayload = Record<string, unknown> & {
    language?: string;
    formType?: string;
};

function escapeHtml(value: unknown): string {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function renderRows(data: FeedbackPayload): string {
    return Object.entries(data)
        .map(([key, value]) => {
            const rendered = Array.isArray(value)
                ? value.map(escapeHtml).join(', ')
                : escapeHtml(value);
            return `<tr><td style="padding:4px 8px;font-weight:bold;vertical-align:top">${escapeHtml(
                key,
            )}</td><td style="padding:4px 8px">${rendered}</td></tr>`;
        })
        .join('');
}

export async function POST(request: NextRequest) {
    try {
        const data = (await request.json()) as FeedbackPayload;

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT || '465'),
            secure: true,
            authMethod: 'LOGIN',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS?.replace(/['"]/g, ''),
            },
        });

        const formType = typeof data.formType === 'string' ? data.formType : 'unknown';
        const emailBody = `
            <h1>Nieuwe feedback (${escapeHtml(formType)})</h1>
            <table style="border-collapse:collapse">${renderRows(data)}</table>
        `;

        await transporter.sendMail({
            from: process.env.MAIL_FROM,
            to: process.env.MAIL_TO,
            subject: `Nieuwe website-feedback (${formType})`,
            html: emailBody,
        });

        return NextResponse.json({ message: 'Success' }, { status: 200 });
    } catch (error) {
        console.error('Feedback form error:', error);
        return NextResponse.json({ message: 'Error sending feedback' }, { status: 500 });
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
