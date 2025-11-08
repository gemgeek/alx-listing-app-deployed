import type { NextApiRequest, NextApiResponse } from 'next';
import { Property } from '@/types'; 

const properties: Property[] = [
  {
    id: '1',
    name: 'Cozy Beachfront Cottage',
    location: 'Malibu, California',
    price: 300,
    imageUrl: 'https://placehold.co/600x400/007bff/white?text=Beach+Cottage',
    rating: 4.8,
  },
  {
    id: '2',
    name: 'Modern Downtown Loft',
    location: 'New York, New York',
    price: 250,
    imageUrl: 'https://placehold.co/600x400/444/white?text=Downtown+Loft',
    rating: 4.5,
  },
  {
    id: '3',
    name: 'Rustic Mountain Cabin',
    location: 'Aspen, Colorado',
    price: 450,
    imageUrl: 'https://placehold.co/600x400/28a745/white?text=Mountain+Cabin',
    rating: 4.9,
  },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Property[] | { message: string }>
) {
  if (req.method === 'GET') {
    setTimeout(() => {
      res.status(200).json(properties);
    }, 1000); 
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}