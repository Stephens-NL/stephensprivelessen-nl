import { NextRequest, NextResponse } from 'next/server';
import { FormData } from '@/components/contact/Contact';
import { intakePayload } from '@/lib/intake-payload';
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

    // Record the lead where something durable can act on it. The portaal owns the
    // write (ADR-0007 scoped write-policy) behind the same x-internal-key gate
    // vps-bot already uses for onboarding links; once the row exists, vps-bot's
    // crm_web_intake_review job picks it up within 5 minutes and sends a review
    // card whose Accept button mints the onboarding magic-link.
    //
    // This is what was missing: for ~2 years a submission produced an email that
    // never sent and a chat message with no buttons, and no row anywhere —
    // intake_submissions had zero rows the day this was wired. Best-effort like
    // the rest: a portaal outage must never turn the form into a dead end.
    let recorded = false;
    const portaalUrl = process.env.PORTAAL_INTERNAL_URL;
    const internalKey = process.env.INTERNAL_API_KEY;
    if (portaalUrl && internalKey) {
        try {
            const res = await fetch(`${portaalUrl}/api/intake/submit-internal`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'x-internal-key': internalKey },
                body: JSON.stringify(intakePayload(formData)),
                signal: AbortSignal.timeout(5000),
            });
            recorded = res.ok;
            if (!res.ok) {
                console.error('Contact form intake record failed (non-fatal):', res.status, await res.text());
            }
        } catch (error) {
            console.error('Contact form intake record error (non-fatal):', error);
        }
    }

    // Fallback lead alert, only when the lead did NOT get recorded. On the happy
    // path the review card from vps-bot is the notification — sending this too
    // would ping twice for one lead. This fires when the portaal is unreachable,
    // so a failed record is still never a silent one.
    // Plain text, no parse_mode, so user-supplied fields can't break the message;
    // 5s timeout so a slow Telegram never stalls the student's success.
    let notified = false;
    const tgToken = process.env.TELEGRAM_BOT_TOKEN;
    const tgChat = process.env.TELEGRAM_CHAT_ID;
    if (!recorded && tgToken && tgChat) {
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

    return NextResponse.json({ ok: true, delivered, notified, recorded }, { status: 200 });
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
