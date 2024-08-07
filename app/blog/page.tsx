import { BlogList } from '../../components/Blog'
import React from 'react'
import { blogPosts } from '../../data'

const page = () => {
  return (
    <BlogList posts={blogPosts}/>
  )
}

export default page