import { NextRequest, NextResponse } from "next/server";
import { blogPosts } from "@/data";

export async function GET(
    _request: Request,
    { params }: { params: { id: string } }
) {
    // Fetch or prepare your data here
    const post = blogPosts.find((post) => post.id === parseInt(params.id)
    );

    return NextResponse.json(post, { status: 200 });
}


export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }

) {
    const body = await request.json();
    const { content } = body;

    const index = blogPosts.findIndex(post => post.id === parseInt(params.id));
    const editedPost = blogPosts[index];
    editedPost.content = content;

    return NextResponse.json(editedPost, { status: 200 });
}

export async function DELETE(
    _request: NextRequest,
    { params }: { params: { id: string } }
  ) {
    
    const index = blogPosts.findIndex(post => post.id === parseInt(params.id));
    if (index === -1) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    const deletedComment = blogPosts[index];
  
    blogPosts.splice(index, 1);
  
    return NextResponse.json(deletedComment, { status: 200 });
  }