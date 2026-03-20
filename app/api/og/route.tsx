import { NextRequest } from "next/server";
import { generateOGImage } from "@/lib/og-image";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    
    const title = searchParams.get("title") || undefined;
    const brandText = searchParams.get("brandText") || undefined;
    const buttonText = searchParams.get("buttonText") || undefined;
    const footerText = searchParams.get("footerText") || undefined;
    let featureImageUrl = searchParams.get("featureImageUrl") || undefined;

    // Prepend site URL if featureImageUrl is relative (e.g., /images/banner.jpg)
    // This assumes NEXT_PUBLIC_SITE_URL is set in your environment variables
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://stephensprivelessen.nl';
    if (featureImageUrl && featureImageUrl.startsWith('/')) {
      featureImageUrl = `${siteUrl}${featureImageUrl}`;
    } else if (!featureImageUrl) {
      // Fallback to a default image if none is provided
      featureImageUrl = `${siteUrl}/images/og-default-banner.jpg`; 
    }


    const response = await generateOGImage({
      title,
      brandText,
      buttonText,
      footerText,
      featureImageUrl, // This should now be an absolute URL
    });

    return response;
  } catch (e: any) {
    console.error('Error in GET /api/og:', e);
    return new Response(`Failed to generate the image: ${e.message}`, {
      status: 500,
    });
  }
} 