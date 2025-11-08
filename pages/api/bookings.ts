import type { NextApiRequest, NextApiResponse } from 'next';

interface BookingData {
  firstName: string;
  lastName: string;
  email: string;
  [key: string]: any; 
}

interface SuccessResponse {
  message: string;
  bookingId: string;
}

interface ErrorResponse {
  message: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  try {
    const data: BookingData = req.body;

    if (!data.firstName || !data.lastName || !data.email) {
      return res.status(400).json({ message: 'Missing required fields: firstName, lastName, and email are required.' });
    }

    setTimeout(() => {
      const newBookingId = `bk_${Date.now()}`;

      console.log('Booking successful:', data);

      return res.status(200).json({ 
        message: 'Booking confirmed!', 
        bookingId: newBookingId 
      });
    }, 1500); 

  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}