import { NextRequest } from "next/server";
import { generateOGImage } from "@/lib/og-image";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    
    // Extract new parameters, providing defaults or undefined if not present
    const title = searchParams.get("title") || undefined;
    const brandText = searchParams.get("brandText") || undefined;
    const buttonText = searchParams.get("buttonText") || undefined;
    const footerText = searchParams.get("footerText") || undefined;
    const featureImageUrl = searchParams.get("featureImageUrl") || undefined;

    return generateOGImage({
      title,
      brandText,
      buttonText,
      footerText,
      featureImageUrl,
    });
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
} 