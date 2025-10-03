import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const studentName = searchParams.get('student');

  // Create dynamic SVG with student name
  const svg = `
    <svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="630" fill="url(#gradient)"/>
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
        </linearGradient>
      </defs>
      <text x="600" y="200" font-family="Arial, sans-serif" font-size="80" font-weight="bold" fill="white" text-anchor="middle">📚 Aantekeningen</text>
      ${studentName ? `<text x="600" y="280" font-family="Arial, sans-serif" font-size="60" font-weight="bold" fill="#ffd700" text-anchor="middle">${studentName}</text>` : ''}
      <text x="600" y="${studentName ? '360' : '300'}" font-family="Arial, sans-serif" font-size="40" fill="rgba(255, 255, 255, 0.8)" text-anchor="middle">Stephen's Privelessen</text>
      <text x="600" y="${studentName ? '440' : '380'}" font-family="Arial, sans-serif" font-size="30" fill="rgba(255, 255, 255, 0.9)" text-anchor="middle">${studentName ? `${studentName}'s aantekeningen` : 'Vind je aantekeningen'}</text>
      <text x="600" y="${studentName ? '490' : '430'}" font-family="Arial, sans-serif" font-size="24" fill="rgba(255, 255, 255, 0.7)" text-anchor="middle">Alle notities georganiseerd en direct toegankelijk</text>
    </svg>
  `;

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
    },
  });
}
