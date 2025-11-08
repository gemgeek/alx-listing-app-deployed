import Link from 'next/link';
import Image from 'next/image';
import { Property } from '@/types'; 

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Link href={`/properties/${property.id}`} legacyBehavior>
      <a className="border rounded-lg shadow-lg overflow-hidden block hover:shadow-xl transition-shadow duration-300">
        <div className="relative h-64 w-full">
          <Image
            src={property.imageUrl}
            alt={property.name}
            layout="fill"
            objectFit="cover"
            onError={(e) => {
              e.currentTarget.src = 'https://placehold.co/600x400/ccc/white?text=Image+Not+Available';
            }}
          />
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-800">{property.name}</h3>
          <p className="text-gray-600">{property.location}</p>
          <div className="flex justify-between items-center mt-4">
            <p className="text-lg font-bold text-blue-600">${property.price} / night</p>
            <p className="text-md font-medium text-gray-700">★ {property.rating}</p>
          </div>
        </div>
      </a>
    </Link>
  );
}