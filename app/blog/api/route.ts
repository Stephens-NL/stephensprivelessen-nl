import { blogPosts } from "@/data";
import { BlogPost } from "../../../data";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search');

  const filteredPosts = search
    ? blogPosts.filter(post => {
        const searchLower = search.toLowerCase();
        return Object.values(post.title).some(title => 
          typeof title === 'string' && title.toLowerCase().includes(searchLower)
        );
      })
    : blogPosts;

  return NextResponse.json(filteredPosts, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const post = await request.json();
    const newPost: BlogPost = {
      id: blogPosts.length + 1,
      title: post.title,
      content: post.content,
      date: post.date,
      author: post.author,
      tags: post.tags
    }
    blogPosts.push(newPost);
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
}