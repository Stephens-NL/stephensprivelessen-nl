import { NextRequest, NextResponse } from 'next/server';
import { blogInfo, blogPosts } from '@/data/blog';

export async function GET(request: NextRequest) {
  try {
    if (!blogInfo || !blogPosts) {
      throw new Error('Blog info or posts are undefined');
    }
    
    return NextResponse.json(
      { blogInfo, blogPosts },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching blog data:', error);
    return NextResponse.json(
      {
        blogInfo: {},
        blogPosts: [],
        error: 'Failed to fetch blog data'
      },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function POST() {
  return new NextResponse(null, { status: 405 });
}

export async function PUT() {
  return new NextResponse(null, { status: 405 });
}

export async function DELETE() {
  return new NextResponse(null, { status: 405 });
}

export async function PATCH() {
  return new NextResponse(null, { status: 405 });
} 