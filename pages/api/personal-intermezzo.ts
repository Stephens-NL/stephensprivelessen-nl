import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      try {
        const personalIntermezzo = await prisma.personalIntermezzo.findMany();
        res.status(200).json(personalIntermezzo);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching data' });
      }
      break;
    case 'POST':
      try {
        const personalIntermezzo = await prisma.personalIntermezzo.create({ data: req.body });
        res.status(201).json(personalIntermezzo);
      } catch (error) {
        res.status(500).json({ message: 'Error creating data' });
      }
      break;
    case 'PUT':
      try {
        const personalIntermezzo = await prisma.personalIntermezzo.update({
          where: { id: req.body.id },
          data: req.body,
        });
        res.status(200).json(personalIntermezzo);
      } catch (error) {
        res.status(500).json({ message: 'Error updating data' });
      }
      break;
    case 'DELETE':
      try {
        await prisma.personalIntermezzo.delete({ where: { id: req.body.id } });
        res.status(204).end();
      } catch (error) {
        res.status(500).json({ message: 'Error deleting data' });
      }
      break;
    default:
      res.status(405).json({ message: 'Method not allowed' });
  }
}