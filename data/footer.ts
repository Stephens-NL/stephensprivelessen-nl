import { Footer } from "./types";

export const footer: Footer = {
    title: {
        EN: "Stephen's Private Lessons",
        NL: "Stephen's Privélessen"
    },
    description: {
        EN: "Professional guidance in mathematics and programming for all levels.",
        NL: "Professionele begeleiding in wiskunde en programmeren voor alle niveaus."
    },
    servicesLabel: { EN: "Services", NL: "Diensten" },
    services: [
        { href: "/privelessen", label: { EN: "Tutoring", NL: "Privélessen" } },
        { href: "/scriptiebegeleiding", label: { EN: "Thesis Supervision", NL: "Scriptiebegeleiding" } },
        { href: "/workshops", label: { EN: "Workshops", NL: "Workshops" } },
        { href: "/consultancy", label: { EN: "Consultancy", NL: "Consultancy" } },
        { href: "/services", label: { EN: "Services", NL: "Diensten" } },
    ],
    infoLabel: { EN: "Information", NL: "Informatie" },
    info: [
        { href: "/about", label: { EN: "About", NL: "Over Ons" } },
        { href: "/blog", label: { EN: "Blog", NL: "Blog" } },
        { href: "/faq", label: { EN: "FAQ", NL: "Vragen" } },
        { href: "/contact", label: { EN: "Contact", NL: "Contact" } },
    ],
    contactLabel: { EN: "Contact", NL: "Contact" },
    copyright: {
        EN: "All rights reserved.",
        NL: "Alle rechten voorbehouden."
    }
};