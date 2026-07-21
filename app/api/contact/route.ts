import { NextRequest, NextResponse } from 'next/server';
import { FormData } from '@/components/contact/Contact';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
    let formData: FormData;
    try {
        formData = await request.json() as FormData;
    } catch {
        return NextResponse.json({ ok: false, message: 'Invalid request body' }, { status: 400 });
    }

    if (!formData?.name || !formData?.email) {
        return NextResponse.json({ ok: false, message: 'Name and email are required' }, { status: 400 });
    }

    const emailBody = `
        <h1>Nieuwe lesaanvraag</h1>

        <h2>Student Informatie</h2>
        <p><strong>Naam:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Leeftijd:</strong> ${formData.age}</p>
        <p><strong>Niveau:</strong> ${formData.level}</p>

        <h2>Vak</h2>
        <p><strong>Vak:</strong> ${formData.subject}</p>
        ${formData.programmingLanguage ? `<p><strong>Programmeertaal:</strong> ${formData.programmingLanguage}</p>` : ''}

        <h2>Voorkeuren</h2>
        <p><strong>Lestype:</strong> ${formData.isOnline ? 'Online' : 'Fysiek'}</p>
        <p><strong>Voorkeursdagen:</strong> ${formData.preferredDays.join(', ')}</p>
        <p><strong>Voorkeurstijden:</strong> ${formData.preferredTimes.join(', ')}</p>

        <h2>Doelen</h2>
        <p>${formData.goals}</p>

        ${formData.requestType === 'other' ? `
            <h2>Aanvrager Informatie</h2>
            <p><strong>Naam:</strong> ${formData.requesterName}</p>
            <p><strong>Email:</strong> ${formData.requesterEmail}</p>
            <p><strong>Relatie tot student:</strong> ${formData.relationship}</p>
        ` : ''}
    `;

    // Best-effort email notification. A mail failure must NEVER return 500 to the
    // student: a 500 turns the whole form into a dead end — which is exactly how a
    // CCVX Wiskunde B lead got turned away (see info@ "Enrollment", 2026-07-21).
    // The real booking happens via the calendar step, and any lead is also caught
    // by the info@ inbox watcher and the WhatsApp fallback on the thank-you screen.
    // ponytail: SMTP is the only email-notify channel here; when the container has
    // no SMTP_* env (current live state) `delivered` stays false and the student is
    // routed to WhatsApp/calendar instead. Restore SMTP env to re-enable email.
    let delivered = false;
    try {
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

        await transporter.sendMail({
            from: process.env.MAIL_FROM,
            to: process.env.MAIL_TO,
            subject: `Nieuwe lesaanvraag van ${formData.name}`,
            html: emailBody,
        });
        delivered = true;
    } catch (error) {
        console.error('Contact form email notification failed (non-fatal):', error);
    }

    // Best-effort Telegram notification — the primary lead alert (email is off in
    // prod). Reuses the vps-bot's TELEGRAM_BOT_TOKEN/TELEGRAM_CHAT_ID (set on the
    // container). Plain text, no parse_mode, so user-supplied fields can't break
    // the message; 5s timeout so a slow Telegram never stalls the student's success.
    let notified = false;
    const tgToken = process.env.TELEGRAM_BOT_TOKEN;
    const tgChat = process.env.TELEGRAM_CHAT_ID;
    if (tgToken && tgChat) {
        try {
            const prefs = [...(formData.preferredDays || []), ...(formData.preferredTimes || [])].join(', ');
            const text = [
                '🎓 Nieuwe lesaanvraag via de site',
                `Naam: ${formData.name}`,
                `Email: ${formData.email}`,
                formData.age ? `Leeftijd: ${formData.age}` : '',
                formData.level ? `Niveau: ${formData.level}` : '',
                formData.subject ? `Vak: ${formData.subject}` : '',
                formData.programmingLanguage ? `Taal: ${formData.programmingLanguage}` : '',
                prefs ? `Voorkeur: ${prefs}` : '',
                formData.isOnline ? 'Online' : 'Fysiek',
                formData.goals ? `Doelen: ${formData.goals}` : '',
            ].filter(Boolean).join('\n');
            const res = await fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: tgChat, text, disable_web_page_preview: true }),
                signal: AbortSignal.timeout(5000),
            });
            notified = res.ok;
            if (!res.ok) {
                console.error('Contact form Telegram notify failed (non-fatal):', res.status, await res.text());
            }
        } catch (error) {
            console.error('Contact form Telegram notify error (non-fatal):', error);
        }
    }

    return NextResponse.json({ ok: true, delivered, notified }, { status: 200 });
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
