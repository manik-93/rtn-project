import { useState } from "react";
import { Star } from "lucide-react";
import toast from "react-hot-toast";
import { submitReview } from "../services/reviewService";
import { useAuth } from "../context/AuthContext";

export default function ReviewForm({ placeId, onSubmitted }) {
  const { user } = useAuth();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Sign in to leave a review");
      return;
    }

    if (!comment.trim()) {
      toast.error("Please write a comment");
      return;
    }

    setSubmitting(true);
    try {
      const review = await submitReview({
        placeId,
        userId: user.uid,
        userName: user.displayName || "Traveler",
        comment: comment.trim(),
        rating,
      });
      setComment("");
      setRating(5);
      onSubmitted?.(review);
      toast.success("Review submitted!");
    } catch {
      toast.error("Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card-surface p-6">
      <h3 className="font-display text-xl font-bold dark:text-white">Write a Review</h3>

      <div className="mt-4">
        <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Rating</label>
        <div className="mt-2 flex gap-1">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setRating(value)}
              aria-label={`Rate ${value} stars`}
            >
              <Star
                className={`h-6 w-6 ${
                  value <= rating ? "fill-amber-400 text-amber-400" : "text-slate-300"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="comment" className="text-sm font-medium text-slate-600 dark:text-slate-400">
          Your experience
        </label>
        <textarea
          id="comment"
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your visit experience..."
          className="mt-2 w-full rounded-xl border border-slate-200 bg-white p-3 text-sm outline-none focus:ring-2 focus:ring-ocean-400 dark:border-slate-700 dark:bg-slate-900"
        />
      </div>

      <button type="submit" disabled={submitting} className="btn-primary mt-4">
        {submitting ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}
