import type { NextApiRequest, NextApiResponse } from 'next';
import { Review } from '@/types'; 

const allReviews: Review[] = [
  { id: 'r1', propertyId: '1', user: 'Alice', rating: 5, comment: 'Absolutely stunning views!' },
  { id: 'r2', propertyId: '1', user: 'Bob', rating: 4, comment: 'Great location, very cozy.' },

  { id: 'r3', propertyId: '2', user: 'Charlie', rating: 5, comment: 'The loft was modern and clean. Loved it.' },

  { id: 'r4', propertyId: '3', user: 'David', rating: 5, comment: 'Perfect mountain getaway. So peaceful.' },
  { id: 'r5', propertyId: '3', user: 'Eve', rating: 4, comment: 'Cabin was great, but the road up was tough.' },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Review[] | { message: string }>
) {
  const { id: propertyId } = req.query; 

  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  const reviews = allReviews.filter((r) => r.propertyId === propertyId);

  setTimeout(() => {
    res.status(200).json(reviews);
  }, 1200); 
}