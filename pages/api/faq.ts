import type { NextApiRequest, NextApiResponse } from 'next';
import { faqInfo, faqItems } from '../../data';

// Define the structure of the response data
type ResponseData = {
  faqInfo: typeof faqInfo,
  faqItems: typeof faqItems,
  error?: string
};

// API handler function
export default function handler(
  req: NextApiRequest, // Incoming request object
  res: NextApiResponse<ResponseData> // Outgoing response object
) {
  if (req.method === 'GET') { // Handle GET requests
    try {
      // Prepare the FAQ data
      const faqData = {
        faqInfo: faqInfo,
        faqItems: faqItems
      };

      // Send a successful response with the FAQ data
      res.status(200).json(faqData);
    } catch (error) {
      // Log and send an error response in case of failure
      console.error('Error fetching FAQ data:', error);
      res.status(500).json({
        faqInfo: {} as typeof faqInfo,
        faqItems: [] as typeof faqItems,
        error: 'Failed to fetch FAQ data',
      });
    }
  } else {
    // Handle non-GET methods
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}