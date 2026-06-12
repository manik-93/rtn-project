import { Star, User } from "lucide-react";
import { GridSkeleton } from "./LoadingSkeleton";

export default function ReviewList({ reviews, loading }) {
  if (loading) return <GridSkeleton count={2} />;

  if (!reviews.length) {
    return (
      <p className="text-sm text-slate-500 dark:text-slate-400">
        No reviews yet. Be the first to share your experience!
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <article key={review.id} className="card-surface p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ocean-100 text-ocean-700 dark:bg-ocean-900/40 dark:text-ocean-200">
                <User className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold dark:text-white">{review.userName}</p>
                <p className="text-xs text-slate-500">
                  {review.createdAt
                    ? new Date(review.createdAt).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "Recently"}
                </p>
              </div>
            </div>
            <div className="flex gap-0.5">
              {Array.from({ length: review.rating }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {review.comment}
          </p>
        </article>
      ))}
    </div>
  );
}
