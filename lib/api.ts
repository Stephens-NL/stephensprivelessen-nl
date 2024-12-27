import { FormData } from '@/components/contact/Contact';

export const sendContactForm = async (formData: FormData) => {
    const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    if (!response.ok) {
        throw new Error('Er is iets misgegaan bij het versturen van het formulier');
    }

    return response.json();
}; 