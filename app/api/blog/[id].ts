import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  switch (req.method) {
    case 'GET':
      try {
        const blogPost = await prisma.blogPost.findUnique({ where: { id: Number(id) } });
        if (blogPost) {
          res.status(200).json(blogPost);
        } else {
          res.status(404).json({ message: 'Post not found' });
        }
      } catch (error) {
        res.status(500).json({ message: 'Error fetching data' });
      }
      break;
    case 'PUT':
      try {
        const blogPost = await prisma.blogPost.update({
          where: { id: Number(id) },
          data: req.body,
        });
        res.status(200).json(blogPost);
      } catch (error) {
        res.status(500).json({ message: 'Error updating data' });
      }
      break;
    case 'DELETE':
      try {
        await prisma.blogPost.delete({ where: { id: Number(id) } });
        res.status(204).end();
      } catch (error) {
        res.status(500).json({ message: 'Error deleting data' });
      }
      break;
    default:
      res.status(405).json({ message: 'Method not allowed' });
  }
}