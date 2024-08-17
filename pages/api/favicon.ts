// pages/api/favicon.ts
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const serveFavicon = (req: NextApiRequest, res: NextApiResponse) => {
  const filePath = path.resolve('.', 'private/favicon/favicon.ico');
  const imageBuffer = fs.readFileSync(filePath);
  res.setHeader('Content-Type', 'image/x-icon');
  res.send(imageBuffer);
};

export default serveFavicon;