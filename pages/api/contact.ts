import type { NextApiRequest, NextApiResponse } from 'next';
import { FormData } from '@/components/contact/Contact';
import nodemailer from 'nodemailer';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const formData = req.body as FormData;

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT || '465'),
            secure: true,
            authMethod: 'LOGIN',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS?.replace(/['"]/g, '')
            },
            debug: true,
            logger: true
        });

        // Verify connection configuration
        try {
            await transporter.verify();
            console.log('SMTP connection verified successfully');
        } catch (error) {
            console.error('SMTP verification error:', error);
            throw error;
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

        await transporter.sendMail({
            from: process.env.MAIL_FROM,
            to: process.env.MAIL_TO,
            subject: `Nieuwe lesaanvraag van ${formData.name}`,
            html: emailBody,
        });

        res.status(200).json({ message: 'Success' });
    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({ message: 'Error sending email' });
    }
}
