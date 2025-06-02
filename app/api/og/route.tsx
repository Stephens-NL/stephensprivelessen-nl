import { NextRequest } from "next/server";
import { generateOGImage } from "@/lib/og-image";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    
    return generateOGImage({
      title: searchParams.get("title") || undefined,
      subtitle: searchParams.get("subtitle") || undefined,
      category: searchParams.get("category") || undefined,
    });
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
} 