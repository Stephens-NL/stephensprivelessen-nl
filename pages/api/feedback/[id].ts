// File: pages/api/feedback/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

type FeedbackData = {
  id: string
  [key: string]: any
}

type ResponseData = {
  data?: FeedbackData
  message?: string
  error?: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { id } = req.query
  const dataFilePath = path.join(process.cwd(), 'data', 'feedback.json')

  if (!fs.existsSync(dataFilePath)) {
    return res.status(404).json({ error: 'No feedback data found' })
  }

  const fileContent = fs.readFileSync(dataFilePath, 'utf8')
  const feedbackData: FeedbackData[] = JSON.parse(fileContent)

  switch (req.method) {
    case 'GET':
      console.log(`GET request received for feedback with id: ${id}`)
      const feedback = feedbackData.find(item => item.id === id)
      if (feedback) {
        res.status(200).json({ data: feedback })
      } else {
        res.status(404).json({ error: 'Feedback not found' })
      }
      break

    case 'PUT':
      console.log(`PUT request received for feedback with id: ${id}`)
      const index = feedbackData.findIndex(item => item.id === id)
      if (index !== -1) {
        feedbackData[index] = { ...feedbackData[index], ...req.body, id: id as string }
        fs.writeFileSync(dataFilePath, JSON.stringify(feedbackData, null, 2))
        res.status(200).json({ data: feedbackData[index] })
      } else {
        res.status(404).json({ error: 'Feedback not found' })
      }
      break

    case 'DELETE':
      console.log(`DELETE request received for feedback with id: ${id}`)
      const newData = feedbackData.filter(item => item.id !== id)
      if (newData.length < feedbackData.length) {
        fs.writeFileSync(dataFilePath, JSON.stringify(newData, null, 2))
        res.status(200).json({ message: 'Feedback deleted successfully' })
      } else {
        res.status(404).json({ error: 'Feedback not found' })
      }
      break

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}