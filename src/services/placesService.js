import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "../firebase/config";
import { places as localPlaces } from "../data/places";

const COLLECTION = "places";

/** Fetch all places — Firestore first, local JSON fallback */
export async function getAllPlaces() {
  if (!isFirebaseConfigured() || !db) {
    return localPlaces;
  }

  try {
    const snapshot = await getDocs(collection(db, COLLECTION));
    if (snapshot.empty) return localPlaces;

    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (error) {
    console.warn("Firestore places fetch failed, using local data:", error);
    return localPlaces;
  }
}

/** Fetch a single place by ID */
export async function getPlaceById(id) {
  if (!isFirebaseConfigured() || !db) {
    return localPlaces.find((p) => p.id === id) ?? null;
  }

  try {
    const docRef = doc(db, COLLECTION, id);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() };
    }

    return localPlaces.find((p) => p.id === id) ?? null;
  } catch (error) {
    console.warn("Firestore place fetch failed, using local data:", error);
    return localPlaces.find((p) => p.id === id) ?? null;
  }
}

/** Filter places by category and search query */
export function filterPlaces(places, { category = "all", search = "" }) {
  const term = search.trim().toLowerCase();

  return places.filter((place) => {
    const matchesCategory =
      category === "all" || place.category === category;
    const matchesSearch =
      !term ||
      place.name.toLowerCase().includes(term) ||
      place.description.toLowerCase().includes(term) ||
      place.location.toLowerCase().includes(term) ||
      place.category.toLowerCase().includes(term);

    return matchesCategory && matchesSearch;
  });
}

/** Get featured places for home page */
export function getFeaturedPlaces(places, limit = 4) {
  return places.filter((p) => p.featured).slice(0, limit);
}

/** Resolve nearby place objects from IDs */
export function getNearbyPlaces(allPlaces, nearbyIds = []) {
  return nearbyIds
    .map((id) => allPlaces.find((p) => p.id === id))
    .filter(Boolean);
}

/** Search places in Firestore (optional advanced query) */
export async function searchPlacesByCategory(category) {
  if (!isFirebaseConfigured() || !db || category === "all") {
    return filterPlaces(localPlaces, { category });
  }

  try {
    const q = query(collection(db, COLLECTION), where("category", "==", category));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return filterPlaces(localPlaces, { category });
    }
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch {
    return filterPlaces(localPlaces, { category });
  }
}
