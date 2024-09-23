// data/businessData.ts

export const businessInfo = {
    name: process.env.NEXT_PUBLIC_BUSINESS_NAME || "Default Business Name",
    email: process.env.NEXT_PUBLIC_EMAIL || "default@example.com",
    phone: process.env.NEXT_PUBLIC_PHONE || "+0000000000",
    location: process.env.NEXT_PUBLIC_LOCATION || "Default Location",
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://defaultsite.com",
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+0000000000",
  };
  