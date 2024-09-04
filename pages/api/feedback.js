import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const feedbackData = req.body;
      const feedback = await prisma.feedback.create({
        data: {
          ...feedbackData,
          ratings: JSON.stringify(feedbackData.ratings), // Convert ratings to JSON string
        },
      });
      res.status(200).json(feedback);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create feedback' });
    }
  } else if (req.method === 'GET') {
    try {
      const feedbacks = await prisma.feedback.findMany();
      const parsedFeedbacks = feedbacks.map(feedback => ({
        ...feedback,
        ratings: JSON.parse(feedback.ratings), // Convert ratings string back to JSON
      }));
      res.status(200).json(parsedFeedbacks);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch feedback' });
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}