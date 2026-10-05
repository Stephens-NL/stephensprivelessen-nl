import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export function GET(request: NextRequest) {
  const target = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_URL || new URL('/contact', request.url).toString();
  return NextResponse.redirect(target, 302);
}
