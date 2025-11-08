import Image from 'next/image';
import { Property } from '@/types';
import ReviewSection from './ReviewSection';

interface PropertyDetailProps {
  property: Property;
}

export default function PropertyDetail({ property }: PropertyDetailProps) {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        {/* Property Image */}
        <div className="relative h-96 w-full">
          <Image
            src={property.imageUrl}
            alt={property.name}
            layout="fill"
            objectFit="cover"
            onError={(e) => {
              e.currentTarget.src = 'https://placehold.co/800x600/ccc/white?text=Image+Not+Available';
            }}
          />
        </div>

        <div className="p-6">
          {/* Header with Title and Price */}
          <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
            <h1 className="text-4xl font-bold text-gray-800 mb-2 md:mb-0">
              {property.name}
            </h1>
            <div className="text-3xl font-light text-blue-600">
              ${property.price}
              <span className="text-lg text-gray-500"> / night</span>
            </div>
          </div>

          {/* Location and Rating */}
          <div className="flex justify-between items-center text-gray-600 mb-6">
            <p className="text-lg">{property.location}</p>
            <p className="text-lg font-medium text-gray-800">★ {property.rating} (120 reviews)</p>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">About this place</h2>
            <p className="text-gray-600 leading-relaxed">
              This is a placeholder description. In a real app, this would come from the API.
              Welcome to the {property.name}, a stunning property in {property.location}.
              Enjoy the beautiful views and world-class amenities for just ${property.price} per night.
              This space is perfect for a relaxing getaway or a productive work-from-anywhere trip.
            </p>
          </div>

          {/* Booking Button (for a future task) */}
          <div className="text-center">
            <button
              className="w-full md:w-auto bg-blue-600 text-white font-bold py-3 px-12 rounded-lg text-xl hover:bg-blue-700 transition-colors duration-300"
            >
              Book Now
            </button>
          </div>
        </div>

        <hr className="my-6" />
      <ReviewSection propertyId={property.id} />
      
      </div>
    </div>
  );
}