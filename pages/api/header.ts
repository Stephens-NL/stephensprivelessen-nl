import type { NextApiRequest, NextApiResponse } from 'next'
import { navigation, siteTitle } from '../../data'

type ResponseData = {
  navigation: typeof navigation
  siteTitle: typeof siteTitle
  error?: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === 'GET') {
    try {
      if (!navigation|| !siteTitle) {
        throw new Error('HEADER data or introduction content is undefined')
      }
      res.status(200).json({ navigation, siteTitle })
    } catch (error) {
      console.error('Error fetching about data:', error)
      res.status(500).json({ 
        navigation: {} as typeof navigation, 
        siteTitle: {} as typeof siteTitle,
        error: 'Failed to fetch about data' 
      })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}