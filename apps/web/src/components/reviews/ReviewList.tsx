import { Star, ThumbsUp } from 'lucide-react';

interface Review {
  id: string;
  rating: number;
  title: string | null;
  body: string | null;
  createdAt: Date;
  user: { name: string | null };
}

export function ReviewList({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-xl">
        <p className="text-gray-500">No reviews yet. Be the first to review!</p>
      </div>
    );
  }

  const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="flex items-center gap-4 bg-blue-50 rounded-xl p-4">
        <div className="text-center">
          <p className="text-3xl font-bold text-blue-700">{avgRating.toFixed(1)}</p>
          <div className="flex gap-0.5 justify-center mt-1">
            {[1,2,3,4,5].map(s => (
              <Star key={s} className={`w-4 h-4 ${s <= Math.round(avgRating) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} />
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-1">{reviews.length} review{reviews.length !== 1 ? 's' : ''}</p>
        </div>
        <div className="flex-1 space-y-1">
          {[5,4,3,2,1].map(stars => {
            const count = reviews.filter(r => r.rating === stars).length;
            const pct = (count / reviews.length) * 100;
            return (
              <div key={stars} className="flex items-center gap-2">
                <span className="text-xs text-gray-500 w-3">{stars}</span>
                <Star className="w-3 h-3 text-yellow-500 fill-current" />
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-500 rounded-full" style={{ width: `${pct}%` }} />
                </div>
                <span className="text-xs text-gray-500 w-6">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="border rounded-xl p-5">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-medium text-sm">
                    {review.user.name?.charAt(0) || '?'}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">{review.user.name || 'Anonymous'}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              </div>
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} className={`w-4 h-4 ${s <= review.rating ? 'text-yellow-500 fill-current' : 'text-gray-200'}`} />
                ))}
              </div>
            </div>
            {review.title && <p className="font-medium text-gray-900 mb-1">{review.title}</p>}
            {review.body && <p className="text-sm text-gray-600">{review.body}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
