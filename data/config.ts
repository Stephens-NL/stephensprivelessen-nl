// Contact Information
const PHONE_NUMBER = '+31647357426';
const EMAIL = 'info@stephenadei.nl';
const BUSINESS_NAME = "Stephen's Privelessen";
const SITE_URL = 'https://stephensprivelessen.nl';

// Office Locations
const MAIN_OFFICE = {
    address: 'Science Park 904',
    postalCode: '1098 XH',
    city: 'Amsterdam'
};

const WEEKEND_OFFICE = {
    address: 'Bijlmerplein 888',
    postalCode: '1102 MG',
    city: 'Amsterdam'
};

export const config = {
    contact: {
        email: EMAIL,
        phone: PHONE_NUMBER,
        whatsapp: `https://wa.me/${PHONE_NUMBER.replace('+', '')}`,
        display: {
            phone: PHONE_NUMBER.replace('+31', '+31 ').replace(/(\d{2})(\d{2})(\d{4})(\d{4})/, '$1 $2 $3 $4'),
            href: `tel:${PHONE_NUMBER}`
        }
    },
    social: {
        instagram: 'https://www.instagram.com/stephensprivelessen',
    },
    business: {
        name: BUSINESS_NAME,
        nameNl: 'Stephens Privelessen',
        nameEn: "Stephen's Private Lessons",
        owner: 'Stephen Adei',
        siteUrl: SITE_URL,
        dashboardUrl: 'https://dash.stephensprivelessen.nl',
        mainOffice: {
            ...MAIN_OFFICE,
            googleMapsUrl: `https://maps.google.com/?q=${MAIN_OFFICE.address}, ${MAIN_OFFICE.postalCode} ${MAIN_OFFICE.city}`
        },
        weekendOffice: {
            ...WEEKEND_OFFICE,
            googleMapsUrl: `https://maps.google.com/?q=${WEEKEND_OFFICE.address}, ${WEEKEND_OFFICE.postalCode} ${WEEKEND_OFFICE.city}`
        }
    }
} as const;
