import type { NextApiRequest, NextApiResponse } from 'next'
import { feedbackFormData } from '../../../data'

type ResponseData = {
  feedbackFormData: typeof feedbackFormData
  error?: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === 'GET') {
    console.log('GOT')
    try {
      if (!feedbackFormData) {
        throw new Error('HEADER data or introduction content is undefined')
      }
      res.status(200).json({ feedbackFormData: feedbackFormData })
    } catch (error) {
      console.error('Error fetching about data:', error)
      res.status(500).json({ 
        feedbackFormData: {} as typeof feedbackFormData, 
        error: 'Failed to fetch about data' 
      })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}