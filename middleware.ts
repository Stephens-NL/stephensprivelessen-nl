import createMiddleware from 'next-intl/middleware';
import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';
import {routing} from './i18n/routing';

// Rate limiting (kept from original)
const rateLimitMap = new Map<string, {count: number; resetTime: number}>();
const RATE_LIMIT_WINDOW = 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 30;

function getRateLimitKey(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : 'unknown';
  return ip;
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(key);
  if (!record || now > record.resetTime) {
    rateLimitMap.set(key, {count: 1, resetTime: now + RATE_LIMIT_WINDOW});
    return false;
  }
  if (record.count >= RATE_LIMIT_MAX_REQUESTS) return true;
  record.count++;
  return false;
}

const intlMiddleware = createMiddleware(routing);

export function middleware(request: NextRequest) {
  // Rate limit API routes first
  if (request.nextUrl.pathname.startsWith('/api/aantekeningen/')) {
    const key = getRateLimitKey(request);
    if (isRateLimited(key)) {
      return NextResponse.json(
        {error: 'Te veel verzoeken. Probeer het over een minuut opnieuw.', retryAfter: 60},
        {
          status: 429,
          headers: {
            'Retry-After': '60',
            'X-RateLimit-Limit': RATE_LIMIT_MAX_REQUESTS.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(Date.now() + RATE_LIMIT_WINDOW).toISOString(),
          },
        }
      );
    }
    return NextResponse.next();
  }

  // All other routes go through next-intl
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)', '/api/aantekeningen/:path*'],
};
