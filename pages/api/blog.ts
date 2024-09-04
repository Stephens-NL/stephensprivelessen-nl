import { blogInfo, blogPosts } from "@/data";
import { BlogPost } from "../../data";
import { NextRequest, NextResponse } from "next/server";
// import { t } from "../../../hooks/useTranslation";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search');
  const filterdPosts = search
    ? blogPosts.filter(post => post.title.NL.toLowerCase().includes(search.toLowerCase()))
    : blogPosts;

  // Combine blogInfo and blogPosts into a single object
  const blogData = {
    info: blogInfo,
    posts: blogPosts
  };

  // No need to manually stringify the data
  return NextResponse.json(filterdPosts, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}



export async function POST(request: NextRequest) {
  try {
    const posts = blogPosts;
    const post = await request.json();
    // Process the body data here

    const newPost: BlogPost = {
      id: posts.length + 1,
      title: post.title,
      content: post.content,
      date: post.date,
      author: post.author,
      tags: post.tags

    }

    blogPosts.push(newPost);

    return new Response(JSON.stringify(newPost), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
}


