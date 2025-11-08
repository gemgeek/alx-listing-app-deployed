import axios from 'axios';
import { useEffect, useState } from 'react';
import PropertyCard from '@/components/property/PropertyCard';
import { Property } from '@/types'; 

export async function getServerSideProps() {
  return {
    props: {}, 
  };
}

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
        <p>Please try refreshing the page.</p>
      </div>
    </div>
  );
}

export default function Home() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true); 
        setError(null); 
        
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/properties`);
        setProperties(response.data);
      } catch (err: unknown) {
        console.error('Error fetching properties:', err);
        let message = 'An unknown error occurred';
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

    fetchProperties();
  }, []); 

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Explore Our Properties
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}