import { NavItem, Bilingual } from './types';

export const siteTitle: Bilingual = {
    EN: "Stephen's Private Lessons",
    NL: "Stephen's Privélessen"
};

export const navigation: NavItem[] = [
    { href: '/', label: { EN: 'Home', NL: 'Home' } },
    { href: '/privelessen', label: { EN: 'Tutoring', NL: 'Privelessen' } },
    { href: '/scriptiebegeleiding', label: { EN: 'Thesis Supervision', NL: 'Scriptiebegeleiding' } },
    { href: '/about', label: { EN: 'About', NL: 'Over Ons' } },
    { href: '/services', label: { EN: 'Services', NL: 'Diensten' } },
    { href: '/workshops', label: { EN: 'Workshops', NL: 'Workshops' } },
    { href: '/consultancy', label: { EN: 'Consultancy', NL: 'Consultancy' } },
    { href: '/blog', label: { EN: 'Blog', NL: 'Blog' } },
    { href: '/faq', label: { EN: 'FAQ', NL: 'Vragen' } },
    { href: '/contact', label: { EN: 'Contact', NL: 'Contact' } },
];