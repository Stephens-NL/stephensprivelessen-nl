import type { NextApiRequest, NextApiResponse } from 'next'
import { blogInfo, blogPosts } from '../../data'

type ResponseData = {
  blogInfo: typeof blogInfo
  blogPosts: typeof blogPosts
  error?: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === 'GET') {
    try {
      if (!blogInfo || !blogPosts) {
        throw new Error('Blog info or posts are undefined')
      }
      res.status(200).json({ blogInfo: blogInfo, blogPosts: blogPosts })
    } catch (error) {
      console.error('Error fetching blog data:', error)
      res.status(500).json({
        blogInfo: {} as typeof blogInfo,
        blogPosts: [] as typeof blogPosts,
        error: 'Failed to fetch blog data'
      })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}