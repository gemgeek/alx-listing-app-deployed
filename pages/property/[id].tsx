import axios from 'axios';
import PropertyDetail from '@/components/property/PropertyDetail';
import ReviewSection from '@/components/property/ReviewSection';
import { Property, Review } from '@/types';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

export const getServerSideProps: GetServerSideProps<{
  property: Property | null;
  reviews: Review[];
  error: string | null;
}> = async (context) => {
  try {
    const { id } = context.params!;
    const host = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://127.0.0.1:3000';
    
    const propertyApiUrl = `${host}/api/properties/${id}`;
    const reviewsApiUrl = `${host}/api/properties/${id}/reviews`;

    const [propertyResponse, reviewsResponse] = await Promise.all([
      axios.get(propertyApiUrl),
      axios.get(reviewsApiUrl)
    ]);

    return {
      props: {
        property: propertyResponse.data,
        reviews: reviewsResponse.data,
        error: null,
      },
    };
  } catch (err: unknown) {
    console.error(`Error in getServerSideProps ([id].tsx):`, err);
    let message = 'Could not load property details.';
    if (axios.isAxiosError(err)) {
      message = err.response?.data?.message || err.message;
    } else if (err instanceof Error) {
      message = err.message;
    }

    return {
      props: {
        property: null,
        reviews: [],
        error: message,
      },
    };
  }
};

// Error component
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

export default function PropertyDetailPage({
  property,
  reviews,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  
  if (error) {
    return <ErrorMessage message={error} />;
  }
  
  if (!property) {
    return <ErrorMessage message="Property not found." />;
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <PropertyDetail property={property} />
      <hr className="my-6 max-w-4xl mx-auto border-gray-200" />
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <ReviewSection reviews={reviews} />
      </div>
    </div>
  );
}