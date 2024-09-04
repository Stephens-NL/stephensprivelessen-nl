import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      try {
        const testimonials = await prisma.testimonial.findMany();
        res.status(200).json(testimonials);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching data' });
      }
      break;
    case 'POST':
      try {
        const testimonial = await prisma.testimonial.create({ data: req.body });
        res.status(201).json(testimonial);
      } catch (error) {
        res.status(500).json({ message: 'Error creating data' });
      }
      break;
    case 'PUT':
      try {
        const testimonial = await prisma.testimonial.update({
          where: { id: req.body.id },
          data: req.body,
        });
        res.status(200).json(testimonial);
      } catch (error) {
        res.status(500).json({ message: 'Error updating data' });
      }
      break;
    case 'DELETE':
      try {
        await prisma.testimonial.delete({ where: { id: req.body.id } });
        res.status(204).end();
      } catch (error) {
        res.status(500).json({ message: 'Error deleting data' });
      }
      break;
    default:
      res.status(405).json({ message: 'Method not allowed' });
  }
}