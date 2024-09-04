import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      try {
        const about = await prisma.about.findMany();
        res.status(200).json(about);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching data' });
      }
      break;
    case 'POST':
      try {
        const about = await prisma.about.create({ data: req.body });
        res.status(201).json(about);
      } catch (error) {
        res.status(500).json({ message: 'Error creating data' });
      }
      break;
    case 'PUT':
      try {
        const about = await prisma.about.update({
          where: { id: req.body.id },
          data: req.body,
        });
        res.status(200).json(about);
      } catch (error) {
        res.status(500).json({ message: 'Error updating data' });
      }
      break;
    case 'DELETE':
      try {
        await prisma.about.delete({ where: { id: req.body.id } });
        res.status(204).end();
      } catch (error) {
        res.status(500).json({ message: 'Error deleting data' });
      }
      break;
    default:
      res.status(405).json({ message: 'Method not allowed' });
  }
}