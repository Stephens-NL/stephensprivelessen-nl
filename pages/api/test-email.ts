import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

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
        // Eerst testen we de verbinding
        await transporter.verify();
        console.log('SMTP connection verified successfully');

        // Dan sturen we een test email
        const info = await transporter.sendMail({
            from: process.env.SMTP_FROM,
            to: 'info@stephenadei.nl',
            subject: 'Test Email',
            text: 'Als je deze email ontvangt, werkt de email configuratie correct!',
        });

        console.log('Test email sent:', info.messageId);
        res.status(200).json({ message: 'Test email sent successfully', messageId: info.messageId });
    } catch (error) {
        console.error('Email test failed:', error);
        res.status(500).json({ 
            message: 'Email test failed', 
            error: error instanceof Error ? error.message : 'Unknown error' 
        });
    }
} 