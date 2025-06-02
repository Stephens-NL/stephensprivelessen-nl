import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

export async function GET() {
  try {
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'black',
            position: 'relative',
            fontFamily: `Inter, Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, 'Noto Sans', sans-serif`,
          }}
        >
          <img
            src="http://localhost:3000/images/og-default-banner.jpg"
            width={1200}
            height={630}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 0,
              filter: 'brightness(0.7) blur(0.5px)',
            }}
            alt="OG Banner"
          />
          <div
            style={{
              zIndex: 1,
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              padding: '40px',
              textAlign: 'center',
            }}
          >
            <span
              style={{
                color: '#fff',
                fontSize: 56,
                fontWeight: 800,
                letterSpacing: '-2px',
                textShadow: '0 4px 24px rgba(0,0,0,0.7)',
                marginBottom: 24,
                lineHeight: 1.1,
                display: 'block',
              }}
            >
              OG Image with Local Banner
            </span>
            <span
              style={{
                color: '#e0e0e0',
                fontSize: 32,
                fontWeight: 500,
                textShadow: '0 2px 12px rgba(0,0,0,0.5)',
                marginTop: 8,
                display: 'block',
              }}
            >
              stephensprivelessen.nl
            </span>
            <span
              style={{
                marginTop: 32,
                background: '#2d3748',
                color: '#fff',
                fontSize: 28,
                fontWeight: 600,
                borderRadius: 8,
                padding: '12px 36px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                textShadow: '0 1px 4px rgba(0,0,0,0.4)',
                display: 'block',
              }}
            >
              Info & Aanmelden
            </span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (e) {
    console.error('Error generating OG image:', e);
    return new Response(`Failed to generate the image: ${e.message}`, {
      status: 500,
    });
  }
} 