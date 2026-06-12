import { useEffect, useState } from "react";
import { getReviewsForPlace } from "../services/reviewService";

/** Load reviews for a specific place */
export function useReviews(placeId) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!placeId) return;

    let active = true;

    async function load() {
      setLoading(true);
      const data = await getReviewsForPlace(placeId);
      if (active) {
        setReviews(data);
        setLoading(false);
      }
    }

    load();
    return () => {
      active = false;
    };
  }, [placeId]);

  const addReview = (review) => setReviews((prev) => [review, ...prev]);

  return { reviews, loading, addReview };
}
