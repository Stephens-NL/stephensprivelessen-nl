import { NextRequest } from "next/server";
import { generateOGImage } from "@/lib/og-image";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    console.log('OG Image request received for URL:', req.url);
    const { searchParams } = new URL(req.url);
    
    const title = searchParams.get("title") || undefined;
    const brandText = searchParams.get("brandText") || undefined;
    const buttonText = searchParams.get("buttonText") || undefined;
    const footerText = searchParams.get("footerText") || undefined;
    let featureImageUrl = searchParams.get("featureImageUrl") || undefined;

    // Prepend site URL if featureImageUrl is relative (e.g., /images/banner.jpg)
    // This assumes NEXT_PUBLIC_SITE_URL is set in your environment variables
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    if (featureImageUrl && featureImageUrl.startsWith('/')) {
      featureImageUrl = `${siteUrl}${featureImageUrl}`;
    } else if (!featureImageUrl) {
      // Fallback to a default image if none is provided
      featureImageUrl = `${siteUrl}/images/og-default-banner.jpg`; 
    }


    console.log('Parameters for OG Image:', { title, brandText, buttonText, footerText, featureImageUrl });

    const response = await generateOGImage({
      title,
      brandText,
      buttonText,
      footerText,
      featureImageUrl, // This should now be an absolute URL
    });

    console.log('OG Image generated successfully from API route.');
    return response;
  } catch (e: any) {
    console.error('Error in GET /api/og:', e);
    return new Response(`Failed to generate the image: ${e.message}`, {
      status: 500,
    });
  }
} 