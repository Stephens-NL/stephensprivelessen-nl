import { NavItem, Bilingual } from './types2';

export const siteTitle: Bilingual = {
    EN: "Stephen's Private Lessons",
    NL: "Stephen's Privélessen"
};

export const navigation: NavItem[] = [
    { href: '/', label: { EN: 'Home', NL: 'Home' } },
    { href: '/about', label: { EN: 'About', NL: 'Over Ons' } },
    { href: '/services', label: { EN: 'Services', NL: 'Diensten' } },
    { href: '/blog', label: { EN: 'Blog', NL: 'Blog' } },
    { href: '/contact', label: { EN: 'Contact', NL: 'Contact' } },
{ href: '/FAQ2', label: { EN: 'FAQ', NL: 'Vragen' } },
];