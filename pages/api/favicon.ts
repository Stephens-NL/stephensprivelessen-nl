// pages/api/favicon.ts
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const filePath = path.resolve('.', 'private/favicon.ico');
  const imageBuffer = fs.readFileSync(filePath);
  res.setHeader('Content-Type', 'image/x-icon');
  res.send(imageBuffer);
};