import { useRouter } from 'next/router';
import axios from 'axios';
import { useState, useEffect } from 'react';
import PropertyDetail from '@/components/property/PropertyDetail';
import { Property } from '@/types'; 


function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-red-500 text-xl bg-red-100 p-6 rounded-lg shadow-md">
        <p>Error: {message}</p>
        <p>Please try refreshing the page or go back home.</p>
      </div>
    </div>
  );
}


export default function PropertyDetailPage() {
  const router = useRouter();
  const { id } = router.query; 

  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) return; 
      
      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/properties/${id}`);
        setProperty(response.data);
      } catch (err: unknown) {
        console.error('Error fetching property details:', err);
        let message = 'Property not found';
        if (axios.isAxiosError(err)) {
          message = err.response?.data?.message || err.message;
        } else if (err instanceof Error) {
          message = err.message;
        }
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]); 

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }
  
  if (!property) {
     return <ErrorMessage message="Property not found" />;
  }

  return <PropertyDetail property={property} />;
}