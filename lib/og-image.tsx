/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

interface OGImageParams {
  title?: string;
  brandText?: string; // e.g., your domain or brand name
  buttonText?: string; // e.g., "Read More"
  footerText?: string; // e.g., Location like "Amsterdam"
  featureImageUrl?: string; // URL for the main image on the card
}

export async function generateOGImage(params: OGImageParams) {
  try {
    console.log('Starting OG image generation with params:', params);
    
    const {
      title = "Ontdek Onze Diensten",
      brandText = "stephensprivelessen.nl",
      buttonText = "Lees Meer",
      footerText = "Amsterdam",
      // IMPORTANT: Replace with your actual image URL or ensure this path is valid in your public folder
      featureImageUrl = "https://www.stephensprivelessen.nl/images/og-fallback.jpg", // Fallback/default image
    } = params;

    console.log('Using feature image URL:', featureImageUrl);

    // Basic font stack, consider loading custom fonts for better aesthetics
    const font = "sans-serif";

    const response = new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#f7fafc", // Light gray background
            borderRadius: "24px",
            border: "2px solid #e2e8f0", // Light border
            boxSizing: "border-box",
          }}
        >
          {/* Main Content Area */}
          <div style={{ display: "flex", flex: 1, width: "100%", padding: "40px" }}>
            {/* Left Column: Image */}
            <div style={{ width: "45%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img 
                src={featureImageUrl} 
                alt=""
                style={{
                  width: "100%", 
                  height: "100%", 
                  objectFit: "cover", 
                  borderRadius: "16px"
                }}
              />
            </div>

            {/* Right Column: Text Content */}
            <div 
              style={{
                width: "55%", 
                display: "flex", 
                flexDirection: "column", 
                justifyContent: "center", 
                paddingLeft: "40px",
                fontFamily: font,
              }}
            >
              <p style={{ fontSize: "24px", color: "#718096", margin: "0 0 10px 0" }}>
                {brandText}
              </p>
              <h1 style={{ fontSize: "48px", fontWeight: 700, color: "#2d3748", margin: "0 0 25px 0", lineHeight: 1.3 }}>
                {title}
              </h1>
              <div
                style={{
                  display: "inline-flex", // To make it wrap content width
                  backgroundColor: "#2d3748", // Dark button background
                  color: "white",
                  padding: "12px 28px",
                  borderRadius: "8px",
                  fontSize: "22px",
                  fontWeight: 500,
                }}
              >
                {buttonText}
              </div>
            </div>
          </div>

          {/* Footer Area */}
          <div 
            style={{
              width: "100%", 
              padding: "20px 40px", 
              textAlign: "center", 
              borderTop: "2px solid #e2e8f0",
              fontSize: "20px",
              color: "#4a5568",
              fontFamily: font,
              boxSizing: "border-box",
            }}
          >
            {footerText}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        // You might need to embed fonts if you use custom ones:
        // fonts: [
        //   {
        //     name: 'YourFontName',
        //     data: yourFontData, // ArrayBuffer
        //     style: 'normal',
        //     weight: 400,
        //   },
        // ],
      }
    );

    console.log('OG image generated successfully');
    return response;
  } catch (error) {
    console.error('Error in generateOGImage:', error);
    throw error;
  }
}

// Commented out the old GET handler as it's no longer needed here
// export async function GET(req: NextRequest) { ... } 