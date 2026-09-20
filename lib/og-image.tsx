/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";

interface OGImageParams {
  title?: string;
  brandText?: string;
  buttonText?: string;
  footerText?: string;
  featureImageUrl?: string;
}

function normaliseLabel(value: string | undefined, fallback: string): string {
  if (!value) return fallback;
  return value
    .replace(/https?:\/\//gi, '')
    .replace(/^www\./i, '')
    .replace(/stephensprivelessen\.nl/gi, "Stephen's Privélessen")
    .trim();
}

export async function generateOGImage(params: OGImageParams) {
  try {
    const {
      title = "Math & Statistics Tutoring Amsterdam",
      brandText = "stephensprivelessen.nl",
      buttonText = "Bijles",
      footerText = "Wiskunde · Statistiek · Coaching",
    } = params;

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://stephensprivelessen.nl';
    const silhouetteUrl = `${siteUrl}/images/brand/silhouette-green.svg`;
    const displayBrand = normaliseLabel(brandText, "Stephen's Privélessen");
    const displayFooter = normaliseLabel(footerText, "Lessen · Lenzen · Meer");
    const displayTag = normaliseLabel(buttonText, "Bijles");

    const displayTitle = title
      .replace(/\s*\|\s*Stephen's Private Tutoring/gi, '')
      .replace(/\s*\|\s*Stephen's Privélessen/gi, '')
      .trim();

    const sans = `Space Grotesk, Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif`;
    const mono = `IBM Plex Mono, 'SFMono-Regular', Consolas, monospace`;

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            backgroundColor: "#f4f0e7",
            position: 'relative',
            fontFamily: sans,
            color: '#294328',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 36,
              border: '2px solid rgba(41, 67, 40, 0.08)',
              display: 'flex',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: 54,
              left: 70,
              right: 70,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontFamily: mono,
              fontSize: 18,
              letterSpacing: 8,
              textTransform: 'uppercase',
              color: 'rgba(41, 67, 40, 0.48)',
            }}
          >
            <div>{displayBrand}</div>
            <div>{displayTag}</div>
          </div>

          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: 18,
            }}
          >
            <img
              src={silhouetteUrl}
              alt=""
              width={224}
              height={228}
              style={{
                objectFit: 'contain',
                marginBottom: 28,
              }}
            />
            <div
              style={{
                fontSize: 102,
                fontWeight: 800,
                lineHeight: 0.92,
                letterSpacing: 3,
                textAlign: 'center',
                color: '#294328',
                textTransform: 'uppercase',
              }}
            >
              STEPHEN'S
            </div>
            <div
              style={{
                marginTop: 16,
                fontFamily: mono,
                fontSize: 29,
                letterSpacing: 18,
                color: 'rgba(41, 67, 40, 0.64)',
                textTransform: 'uppercase',
                textAlign: 'center',
              }}
            >
              PRIVÉLESSEN
            </div>
            <div
              style={{
                width: 660,
                height: 1,
                backgroundColor: 'rgba(41, 67, 40, 0.16)',
                marginTop: 30,
                marginBottom: 24,
              }}
            />
            <div
              style={{
                maxWidth: 860,
                fontSize: 34,
                lineHeight: 1.18,
                textAlign: 'center',
                color: '#3f5a32',
              }}
            >
              {displayTitle}
            </div>
          </div>

          <div
            style={{
              position: 'absolute',
              left: 70,
              right: 70,
              bottom: 54,
              display: 'flex',
              justifyContent: 'center',
              fontFamily: mono,
              fontSize: 22,
              letterSpacing: 12,
              textTransform: 'uppercase',
              color: 'rgba(41, 67, 40, 0.52)',
            }}
          >
            {displayFooter}
          </div>

          <div
            style={{
              position: 'absolute',
              right: 58,
              bottom: 48,
              width: 14,
              height: 14,
              borderRadius: 999,
              backgroundColor: '#ff8a3d',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 58,
              top: 48,
              width: 14,
              height: 14,
              borderRadius: 999,
              backgroundColor: '#ff8a3d',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 58,
              bottom: 48,
              width: 66,
              height: 2,
              backgroundColor: 'rgba(41, 67, 40, 0.35)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              right: 58,
              top: 48,
              width: 66,
              height: 2,
              backgroundColor: 'rgba(41, 67, 40, 0.35)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 58,
              bottom: 48,
              width: 2,
              height: 66,
              backgroundColor: 'rgba(41, 67, 40, 0.35)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              right: 58,
              top: 48,
              width: 2,
              height: 66,
              backgroundColor: 'rgba(41, 67, 40, 0.35)',
            }}
          />
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
