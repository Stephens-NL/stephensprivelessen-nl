// components/BlogPost.tsx
interface BlogPostProps {
    post: {
      title: string
      date: string
      content: string
    }
  }
  
  const BlogPost = ({ post }: BlogPostProps) => {
    return (
      <article>
        <h1>{post.title}</h1>
        <p>{post.date}</p>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    )
  }
  
  export default BlogPost