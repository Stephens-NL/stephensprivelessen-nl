/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

interface OGImageParams {
  title?: string;
  brandText?: string;
  buttonText?: string;
  footerText?: string;
  featureImageUrl?: string;
}

export async function generateOGImage(params: OGImageParams) {
  try {
    const {
      title = "Expert Wiskunde & Statistiek Bijles | Amsterdam", // Default Title
      brandText = "stephensprivelessen.nl",
      buttonText = "Lees Meer",
      footerText = "Persoonlijke Begeleiding op Elk Niveau",
      // featureImageUrl should be an absolute URL passed from the API route
      // The API route /api/og/route.tsx is responsible for constructing the absolute URL
      featureImageUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/images/og-default-banner.jpg`, // Default fallback
    } = params;

    console.log('[og-image.tsx] Generating OG Image with Params:', { title, brandText, buttonText, footerText, featureImageUrl });

    const fontStack = `Inter, Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, 'Noto Sans', sans-serif`;

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#1a202c",
            position: 'relative',
            fontFamily: fontStack,
          }}
        >
          <img
            src={featureImageUrl} 
            alt="Background Banner"
            width={1200}
            height={630}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%', 
              height: '100%', 
              objectFit: 'cover', 
              zIndex: 0, // Unitless
              filter: 'brightness(0.6) blur(1px)',
            }}
          />
          <div 
            style={{
              zIndex: 1, // Unitless
              position: 'relative',
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center', 
              alignItems: 'center',
              width: '90%',
              maxWidth: '1000px',
              padding: '40px',
              textAlign: 'center',
              color: '#ffffff',
            }}
          >
            {brandText && (
              <p style={{ fontSize: '28px', color: '#cbd5e0', margin: '0 0 12px 0', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                {brandText}
              </p>
            )}
            <h1 style={{ 
              fontSize: '60px', 
              fontWeight: 800, 
              margin: '0 0 24px 0', 
              lineHeight: 1.2,
              letterSpacing: '-2px',
              textShadow: '0 3px 6px rgba(0,0,0,0.7)',
            }}>
              {title}
            </h1>
            {buttonText && (
              <div // This div acts as the button
                style={{
                  display: 'flex', // Use flex to center content if needed, or 'block'
                  backgroundColor: "#3182ce",
                  color: "white",
                  padding: "14px 32px",
                  borderRadius: "8px",
                  fontSize: "26px",
                  fontWeight: 600,
                  marginTop: '20px',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                  textShadow: '0 1px 2px rgba(0,0,0,0.4)',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {buttonText}
              </div>
            )}
          </div>
          {footerText && (
            <div 
              style={{
                zIndex: 1, // Unitless
                position: 'absolute', 
                bottom: '30px', 
                width: '100%', 
                textAlign: 'center', 
                fontSize: '24px',
                color: '#a0aec0',
                textShadow: '0 1px 3px rgba(0,0,0,0.6)',
              }}
            >
              {footerText}
            </div>
          )}
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error: any) {
    console.error('[og-image.tsx] Error generating OG Image:', error.message, error.stack);
    return new Response(`Failed to generate OG image: ${error.message}`, { status: 500 });
  }
}

// Commented out the old GET handler as it's no longer needed here
// export async function GET(req: NextRequest) { ... } 