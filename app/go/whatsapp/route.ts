import { NextRequest, NextResponse } from 'next/server';
import { config } from '@/data/config';

export const dynamic = 'force-dynamic';

export const MAX_TEXT_LENGTH = 500;

export function GET(request: NextRequest) {
  const text = (request.nextUrl.searchParams.get('text') ?? '').slice(0, MAX_TEXT_LENGTH);
  const target = text
    ? `${config.contact.whatsapp}?text=${encodeURIComponent(text)}`
    : config.contact.whatsapp;
  return NextResponse.redirect(target, 302);
}
