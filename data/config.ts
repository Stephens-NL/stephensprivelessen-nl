// Contact Information
const PHONE_NUMBER = '+31647357426';
const EMAIL = 'info@stephenadei.nl';
const BUSINESS_NAME = 'Stephen\'s Privelessen';
const SITE_URL = 'https://stephensprivelessen.nl';

// Social Media
const INSTAGRAM_URL = 'https://www.instagram.com/stephensprivelessen';

// Business Details
const BUSINESS_NAME_NL = 'Stephens Privelessen';
const BUSINESS_NAME_EN = "Stephen's Private Lessons";
const BUSINESS_OWNER = 'Stephen Adei';
const DASHBOARD_URL = 'https://dash.stephensprivelessen.nl';

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

// Pricing Constants (travel premiums)
const TRAVEL_COSTS = {
    sciencePark: 0,      // Default fysieke locatie
    vuUva: 20,           // Uni-plekken buiten Science Park
    homeAmsterdam: 50    // Aan huis in Amsterdam e.o.
};

const LAST_MINUTE_SURCHARGES = {
    lessThan24Hours: 20, // percentage
    lessThan12Hours: 50  // percentage
};

const FLEXIBILITY_PREMIUM = {
    twoLessons: 15,
    fourLessons: 30,
    sixOrMoreLessons: 50
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
        instagram: INSTAGRAM_URL,
    },
    business: {
        name: BUSINESS_NAME,
        nameNl: BUSINESS_NAME_NL,
        nameEn: BUSINESS_NAME_EN,
        owner: BUSINESS_OWNER,
        siteUrl: SITE_URL,
        dashboardUrl: DASHBOARD_URL,
        mainOffice: {
            ...MAIN_OFFICE,
            googleMapsUrl: `https://maps.google.com/?q=${MAIN_OFFICE.address}, ${MAIN_OFFICE.postalCode} ${MAIN_OFFICE.city}`
        },
        weekendOffice: {
            ...WEEKEND_OFFICE,
            googleMapsUrl: `https://maps.google.com/?q=${WEEKEND_OFFICE.address}, ${WEEKEND_OFFICE.postalCode} ${WEEKEND_OFFICE.city}`
        }
    },
    pricing: {
        travelCosts: TRAVEL_COSTS,
        lastMinuteSurcharges: LAST_MINUTE_SURCHARGES,
        flexibilityPremium: FLEXIBILITY_PREMIUM
    }
} as const; 