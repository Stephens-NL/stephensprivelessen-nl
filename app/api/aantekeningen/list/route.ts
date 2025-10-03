import { NextResponse } from "next/server";
import { listFiles } from "@/lib/gdrive";

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
    const { folderId } = await req.json();
    
    // Validate input
    if (!folderId || typeof folderId !== "string") {
      return NextResponse.json(
        { error: "Folder ID is verplicht" }, 
        { status: 400 }
      );
    }

    // Check cache
    const cacheKey = `list:${folderId}`;
    const cached = getCachedData(cacheKey);
    if (cached) {
      return NextResponse.json(cached, { 
        headers: { 
          "Cache-Control": "s-maxage=60, stale-while-revalidate=300",
          "X-Cache": "HIT"
        } 
      });
    }

    // Get files from Google Drive
    const files = await listFiles(folderId);
    
    // Add additional metadata
    const filesWithMetadata = files.map(file => ({
      ...file,
      // Add file type icon
      fileType: getFileTypeIcon(file.mimeType || ''),
      // Add formatted size (if we had it)
      formattedSize: formatFileSize(0), // We don't have size from the API
      // Add session info if filename follows convention
      sessionInfo: parseSessionInfo(file.name)
    }));

    // Cache the result
    setCachedData(cacheKey, filesWithMetadata);

    return NextResponse.json(filesWithMetadata, { 
      headers: { 
        "Cache-Control": "s-maxage=60, stale-while-revalidate=300",
        "X-Cache": "MISS"
      } 
    });

  } catch (error) {
    console.error('Error in list API:', error);
    
    return NextResponse.json(
      { 
        error: "Er is een fout opgetreden bij het ophalen van bestanden. Probeer het later opnieuw.",
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
      message: "Use POST method to list files in a folder",
      example: { folderId: "your-folder-id" }
    },
    { status: 405 }
  );
}

// Helper functions
function getFileTypeIcon(mimeType: string): string {
  if (mimeType.includes('pdf')) return '📄';
  if (mimeType.includes('image')) return '🖼️';
  if (mimeType.includes('video')) return '🎥';
  if (mimeType.includes('audio')) return '🎵';
  if (mimeType.includes('text')) return '📝';
  return '📄';
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

function parseSessionInfo(filename: string) {
  const match = filename.match(/^(\d{4}-\d{2}-\d{2})__(.+)__v(\d+)\.(.+)$/);
  
  if (match) {
    return {
      date: match[1],
      topic: match[2].replace(/_/g, ' '),
      version: match[3],
      displayName: `${match[1]} - ${match[2].replace(/_/g, ' ')}`
    };
  }
  
  return {
    date: null,
    topic: null,
    version: null,
    displayName: filename
  };
}
