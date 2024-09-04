import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      try {
        const welcomeScreenData = await prisma.welcomeScreenData.findMany();
        res.status(200).json(welcomeScreenData);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching data' });
      }
      break;
    case 'POST':
      try {
        const welcomeScreenData = await prisma.welcomeScreenData.create({ data: req.body });
        res.status(201).json(welcomeScreenData);
      } catch (error) {
        res.status(500).json({ message: 'Error creating data' });
      }
      break;
    case 'PUT':
      try {
        const welcomeScreenData = await prisma.welcomeScreenData.update({
          where: { id: req.body.id },
          data: req.body,
        });
        res.status(200).json(welcomeScreenData);
      } catch (error) {
        res.status(500).json({ message: 'Error updating data' });
      }
      break;
    case 'DELETE':
      try {
        await prisma.welcomeScreenData.delete({ where: { id: req.body.id } });
        res.status(204).end();
      } catch (error) {
        res.status(500).json({ message: 'Error deleting data' });
      }
      break;
    default:
      res.status(405).json({ message: 'Method not allowed' });
  }
}