import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      try {
        const blogPosts = await prisma.blogPost.findMany();
        res.status(200).json(blogPosts);
      } catch (error) {
        console.error("GET error:", error);
        res.status(500).json({ message: 'Error fetching data', error: error.message });
      }
      break;
    case 'POST':
      try {
        const blogPost = await prisma.blogPost.create({ data: req.body });
        res.status(201).json(blogPost);
      } catch (error) {
        console.error("POST error:", error);
        res.status(500).json({ message: 'Error creating data', error: error.message });
      }
      break;
    default:
      res.status(405).json({ message: 'Method not allowed' });
  }
}