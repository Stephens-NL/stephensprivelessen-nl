import { NextResponse } from "next/server";
import { findStudentFolders, getNotabilityFolderId } from "@/lib/gdrive";

// Simple in-memory cache (resets on server restart)
const memoryCache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 60 * 1000; // 1 minute

function getCachedData(key: string) {
  const cached = memoryCache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  memoryCache.delete(key);
  return null;
}

function setCachedData(key: string, data: any) {
  memoryCache.set(key, { data, timestamp: Date.now() });
}

export async function POST(req: Request) {
  try {
    const { name } = await req.json();
    
    // Validate input
    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { error: "Naam is verplicht" }, 
        { status: 400 }
      );
    }

    const trimmedName = name.trim();
    if (trimmedName.length < 2) {
      return NextResponse.json(
        { error: "Naam moet minimaal 2 karakters bevatten" }, 
        { status: 400 }
      );
    }

    // Check cache
    const cacheKey = `search:${trimmedName.toLowerCase()}`;
    const cached = getCachedData(cacheKey);
    if (cached) {
      return NextResponse.json(cached, { 
        headers: { 
          "Cache-Control": "s-maxage=60, stale-while-revalidate=300",
          "X-Cache": "HIT"
        } 
      });
    }

    // Search for student folders
    const parentId = await getNotabilityFolderId();
    const matches = await findStudentFolders(parentId, trimmedName);
    
    // Prepare response
    let payload;
    if (matches.length === 0) {
      payload = { 
        status: "not_found",
        message: `Geen map gevonden voor "${trimmedName}". Probeer een andere spelling of neem contact op met Stephen.`
      };
    } else if (matches.length === 1) {
      payload = { 
        status: "ok", 
        folder: matches[0],
        message: `Map gevonden voor "${trimmedName}"`
      };
    } else {
      payload = { 
        status: "ambiguous", 
        candidates: matches,
        message: `Meerdere mappen gevonden voor "${trimmedName}". Kies de juiste:`
      };
    }

    // Cache the result
    setCachedData(cacheKey, payload);

    return NextResponse.json(payload, { 
      headers: { 
        "Cache-Control": "s-maxage=60, stale-while-revalidate=300",
        "X-Cache": "MISS"
      } 
    });

  } catch (error) {
    console.error('Error in search API:', error);
    
    return NextResponse.json(
      { 
        error: "Er is een fout opgetreden bij het zoeken. Probeer het later opnieuw.",
        details: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : 'Unknown error') : undefined
      }, 
      { status: 500 }
    );
  }
}

// Handle GET requests (for testing)
export async function GET() {
  return NextResponse.json(
    { 
      message: "Use POST method to search for student folders",
      example: { name: "Rachel" }
    },
    { status: 405 }
  );
}
