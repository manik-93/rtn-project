/**
 * Sample reviews keyed by place ID.
 * In production, these are stored in Firestore `reviews` collection.
 */
export const sampleReviews = {
  "ganpatipule-beach": [
    {
      id: "r1",
      placeId: "ganpatipule-beach",
      userId: "demo-user-1",
      userName: "Sneha Patil",
      comment: "Absolutely stunning beach! Clean water and peaceful atmosphere.",
      rating: 5,
      createdAt: "2025-12-10",
    },
    {
      id: "r2",
      placeId: "ganpatipule-beach",
      userId: "demo-user-2",
      userName: "Vikram Joshi",
      comment: "Great for families. Visit the Ganpati temple early morning.",
      rating: 4,
      createdAt: "2025-11-22",
    },
  ],
  "ratnadurg-fort": [
    {
      id: "r3",
      placeId: "ratnadurg-fort",
      userId: "demo-user-3",
      userName: "Meera Nair",
      comment: "Sunset from the fort walls is magical. Wear comfortable shoes.",
      rating: 5,
      createdAt: "2026-01-05",
    },
  ],
  "jaigad-fort": [
    {
      id: "r4",
      placeId: "jaigad-fort",
      userId: "demo-user-4",
      userName: "Arjun Mehta",
      comment: "Less crowded than other forts. The creek view is breathtaking.",
      rating: 5,
      createdAt: "2026-02-14",
    },
  ],
};

export default sampleReviews;
