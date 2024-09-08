// File: pages/api/feedbackComponentData.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { feedbackFormData } from '../../../data'
import fs from 'fs'
import path from 'path'

type ResponseData = {
  feedbackFormData: typeof feedbackFormData
  error?: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
    console.log(feedbackFormData)
  if (req.method === 'GET') {
    console.log('GET request received for feedback component data')
    try {
      const dataFilePath = path.join(process.cwd(), 'data', 'feedbackComponentData.json')

      if (!fs.existsSync(dataFilePath)) {
        throw new Error('Feedback component data file not found')
      }

      const fileContent = fs.readFileSync(dataFilePath, 'utf8')
      const feedbackFormData = JSON.parse(fileContent)

      if (!feedbackFormData) {
        throw new Error('Feedback form data is undefined')
      }

      res.status(200).json({ feedbackFormData })
    } catch (error) {
      console.error('Error fetching feedback component data:', error)
      res.status(500).json({
        feedbackFormData: {} as typeof feedbackFormData,
        error: 'Failed to fetch feedback component data'
      })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}



