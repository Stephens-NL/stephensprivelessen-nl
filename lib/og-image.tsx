import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // Get dynamic parameters
    const title = searchParams.get("title") || "Bijles in Amsterdam";
    const subtitle = searchParams.get("subtitle") || "Statistiek, Calculus & Programmeren";
    const category = searchParams.get("category") || "Alle vakken";

    // Create the image
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
            backgroundColor: "white",
            padding: "40px 80px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <h1
              style={{
                fontSize: "60px",
                fontWeight: "bold",
                color: "#1a365d",
                marginBottom: "20px",
                lineHeight: 1.2,
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontSize: "32px",
                color: "#4a5568",
                marginBottom: "40px",
              }}
            >
              {subtitle}
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#ebf8ff",
                padding: "12px 24px",
                borderRadius: "8px",
              }}
            >
              <span
                style={{
                  fontSize: "24px",
                  color: "#2b6cb0",
                  fontWeight: "medium",
                }}
              >
                {category}
              </span>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
} 