import React from 'react'
import {BlogList} from '@/components/Blog'
import {blogPosts as posts} from '../../data'




const Blog = () => {
  return (
    <BlogList posts={posts}/>
  )
}

export default Blog