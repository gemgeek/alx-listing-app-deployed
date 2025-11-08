import axios from 'axios';
import PropertyCard from '@/components/property/PropertyCard';
import { Property } from '@/types';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

export const getServerSideProps: GetServerSideProps<{
  properties: Property[];
  error: string | null;
}> = async () => {
  try {
    const host = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : 'http://127.0.0.1:3000';
    const apiUrl = `${host}/api/properties`;

    const response = await axios.get(apiUrl);
    
    return {
      props: {
        properties: response.data,
        error: null,
      },
    };
  } catch (err: unknown) {
    console.error('Error in getServerSideProps (index.tsx):', err);
    let message = 'An unknown error occurred';
    if (axios.isAxiosError(err)) {
      message = err.response?.data?.message || err.message;
    } else if (err instanceof Error) {
      message = err.message;
    }
    
    return {
      props: {
        properties: [],
        error: message,
      },
    };
  }
};

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

export default function Home({
  properties,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  
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