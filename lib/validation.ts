import { contactInfo } from '@/data/config';

export const isValidEmail = (email: string): boolean => {
    // RFC 5322 compliant email regex
    const emailRegex = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;
    return emailRegex.test(email);
};

export const isValidPhoneNumber = (phoneNumber: string): boolean => {
    // Regex for international phone numbers with country code
    // Accepts formats: +31647357426, +31 6 47357426, +31-6-47357426
    const phoneRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
    return phoneRegex.test(phoneNumber);
};

export const formatPhoneNumber = (phoneNumber: string): string => {
    // Remove all non-digit characters except +
    const cleaned = phoneNumber.replace(/[^\d+]/g, '');
    
    // If it doesn't start with +, assume it's a Dutch number and add +31
    if (!cleaned.startsWith('+')) {
        // Remove leading 0 if present
        const withoutLeadingZero = cleaned.startsWith('0') ? cleaned.slice(1) : cleaned;
        return `+31${withoutLeadingZero}`;
    }
    
    return cleaned;
};

export const getPhoneNumberError = (phoneNumber: string, t: any): string | null => {
    if (!phoneNumber) return null;
    
    const formattedNumber = formatPhoneNumber(phoneNumber);
    
    if (!isValidPhoneNumber(formattedNumber)) {
        return String(t({
            EN: "Please enter a valid phone number with country code (e.g., +31647357426)",
            NL: "Voer een geldig telefoonnummer in met landcode (bijv. +31647357426)"
        }));
    }
    
    return null;
};

export const getEmailError = (email: string, t: any): string | null => {
    if (!email) return null;
    
    if (!isValidEmail(email)) {
        return String(t({
            EN: "Please enter a valid email address",
            NL: "Voer een geldig e-mailadres in"
        }));
    }
    
    return null;
}; 