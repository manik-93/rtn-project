import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "../firebase/config";
import { sampleReviews } from "../data/reviews";

const COLLECTION = "reviews";
const LOCAL_REVIEWS_KEY = "explore-ratnagiri-reviews";

function getLocalReviews() {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_REVIEWS_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveLocalReviews(reviewsByPlace) {
  localStorage.setItem(LOCAL_REVIEWS_KEY, JSON.stringify(reviewsByPlace));
}

/** Get reviews for a place */
export async function getReviewsForPlace(placeId) {
  if (!isFirebaseConfigured() || !db) {
    const local = getLocalReviews();
    return local[placeId] || sampleReviews[placeId] || [];
  }

  try {
    const q = query(
      collection(db, COLLECTION),
      where("placeId", "==", placeId),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return sampleReviews[placeId] || [];
    }

    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (error) {
    console.warn("Reviews fetch failed, using sample data:", error);
    const local = getLocalReviews();
    return local[placeId] || sampleReviews[placeId] || [];
  }
}

/** Submit a new review */
export async function submitReview({ placeId, userId, userName, comment, rating }) {
  const review = {
    placeId,
    userId,
    userName,
    comment,
    rating,
    createdAt: new Date().toISOString(),
  };

  if (!isFirebaseConfigured() || !db) {
    const local = getLocalReviews();
    const placeReviews = local[placeId] || sampleReviews[placeId] || [];
    const newReview = { ...review, id: `local-${Date.now()}` };
    local[placeId] = [newReview, ...placeReviews];
    saveLocalReviews(local);
    return newReview;
  }

  const docRef = await addDoc(collection(db, COLLECTION), review);
  return { id: docRef.id, ...review };
}
