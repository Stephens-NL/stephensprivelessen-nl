import { NextRequest } from 'next/server';
import { GET as whatsapp, MAX_TEXT_LENGTH } from '@/app/go/whatsapp/route';
import { GET as boek } from '@/app/go/boek/route';
import { config } from '@/data/config';

const req = (path: string) => new NextRequest(`https://stephensprivelessen.nl${path}`);

describe('/go/whatsapp', () => {
  it('302s to the configured wa.me number', () => {
    const res = whatsapp(req('/go/whatsapp'));
    expect(res.status).toBe(302);
    expect(res.headers.get('location')).toBe(config.contact.whatsapp);
  });

  it('passes ?text= through, URL-encoded', () => {
    const res = whatsapp(req('/go/whatsapp?text=' + encodeURIComponent('Hallo & welkom')));
    expect(res.headers.get('location')).toBe(`${config.contact.whatsapp}?text=Hallo%20%26%20welkom`);
  });

  it('caps the text length', () => {
    const res = whatsapp(req('/go/whatsapp?text=' + 'a'.repeat(MAX_TEXT_LENGTH + 200)));
    expect(res.headers.get('location')).toBe(`${config.contact.whatsapp}?text=${'a'.repeat(MAX_TEXT_LENGTH)}`);
  });
});

describe('/go/boek', () => {
  const saved = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_URL;
  afterEach(() => {
    if (saved === undefined) delete process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_URL;
    else process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_URL = saved;
  });

  it('302s to the booking URL when set', () => {
    process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_URL = 'https://calendar.example/book';
    const res = boek(req('/go/boek'));
    expect(res.status).toBe(302);
    expect(res.headers.get('location')).toBe('https://calendar.example/book');
  });

  it('falls back to /contact when unset', () => {
    delete process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_URL;
    const res = boek(req('/go/boek'));
    expect(res.status).toBe(302);
    expect(res.headers.get('location')).toBe('https://stephensprivelessen.nl/contact');
  });
});
