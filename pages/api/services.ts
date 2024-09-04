import type { NextApiRequest, NextApiResponse } from 'next'
import { generalContent, services } from '../../data'

type ResponseData = {
  services: typeof services
  generalContent: typeof generalContent
  error?: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === 'GET') {
    try {
      if (!services || !generalContent) {
        throw new Error('DData or introduction content is undefined')
      }
      res.status(200).json({ services, generalContent })
    } catch (error) {
      console.error('Error fetching hero data:', error)
      res.status(500).json({ 
        services: {} as typeof services, 
        generalContent: {} as typeof generalContent,
        error: 'Failed to fetch Hero data' 
      })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}