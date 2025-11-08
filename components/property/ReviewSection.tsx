import { Review } from '@/types'; 

interface ReviewSectionProps {
  reviews: Review[]; 
}

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex text-yellow-400">
    {[...Array(5)].map((_, i) => (
      <span key={i}>{i < rating ? '★' : '☆'}</span>
    ))}
  </div>
);

export default function ReviewSection({ reviews }: ReviewSectionProps) {

  
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Reviews ({reviews.length})
      </h2>
      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet for this property.</p>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-200 pb-4">
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-lg font-semibold text-gray-800">{review.user}</h3>
                <StarRating rating={review.rating} />
              </div>
              <p className="text-gray-600">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}