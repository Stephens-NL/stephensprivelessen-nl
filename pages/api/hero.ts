import type { NextApiRequest, NextApiResponse } from 'next'
import { hero, introductionContent } from '../../data'

type ResponseData = {
  hero: typeof hero
  error?: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === 'GET') {
    try {
      if (!hero) {
        throw new Error('Hero data or introduction content is undefined')
      }
      res.status(200).json({ hero })
    } catch (error) {
      console.error('Error fetching hero data:', error)
      res.status(500).json({ 
        hero: {} as typeof hero, 
        error: 'Failed to fetch Hero data' 
      })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}