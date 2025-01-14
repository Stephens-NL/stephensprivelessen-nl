import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { FormData } from '@/components/contact/Contact';

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
    },
    debug: true,
    logger: true
});

const formatFormData = (formData: FormData): string => {
    const formatDaysList = (days: string[]) => days.map(day => 
        day.charAt(0).toUpperCase() + day.slice(1)
    ).join(', ');

    const getContactInfo = () => {
        if (formData.age < 18) {
            return `
Contact Voorkeur: ${formData.contactPreference === 'student' ? 'Leerling' : formData.contactPreference === 'parent' ? 'Ouder' : 'Beide'}
${formData.contactPreference !== 'student' ? `
Ouder/Verzorger:
- Naam: ${formData.parentName}
- Email: ${formData.parentEmail}
- Telefoon: ${formData.parentPhone}` : ''}`;
        }
        return '';
    };

    return `
Nieuwe Lesaanvraag

Persoonlijke Gegevens:
- Naam: ${formData.name}
- Leeftijd: ${formData.age}
- Email: ${formData.email}
${getContactInfo()}

Lesdetails:
- Niveau: ${formData.level}
- Vak: ${formData.subject}
- Online/Fysiek: ${formData.isOnline ? 'Online' : 'Fysiek'}

Doelen:
${formData.goals}

Beschikbaarheid:
- Voorkeursdagen: ${formatDaysList(formData.preferredDays)}
- Voorkeurstijden: ${formData.preferredTimes.join(', ')}
${formData.unavailableDays.length > 0 ? `- Niet beschikbaar: ${formatDaysList(formData.unavailableDays)}` : ''}
    `;
};

export async function POST(request: NextRequest) {
    try {
        const { to, subject, formData } = await request.json();

        await transporter.sendMail({
            from: process.env.SMTP_FROM,
            to,
            subject,
            text: formatFormData(formData),
        });

        return NextResponse.json(
            { message: 'Email sent successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json(
            { message: 'Error sending email' },
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