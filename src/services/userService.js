import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db, isFirebaseConfigured } from "../firebase/config";

const USERS_COLLECTION = "users";
const LOCAL_FAVORITES_KEY = "explore-ratnagiri-favorites";
const LOCAL_VISITED_KEY = "explore-ratnagiri-visited";

function readLocal(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || "[]");
  } catch {
    return [];
  }
}

function writeLocal(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/** Create or update user profile document in Firestore */
export async function createUserProfile(user, extra = {}) {
  if (!isFirebaseConfigured() || !db) return;

  const userRef = doc(db, USERS_COLLECTION, user.uid);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      name: user.displayName || extra.name || "Traveler",
      email: user.email,
      favorites: [],
      visited: [],
      createdAt: new Date().toISOString(),
    });
  }
}

/** Get user profile from Firestore or build from local storage */
export async function getUserProfile(uid) {
  if (!isFirebaseConfigured() || !db) {
    return {
      uid,
      favorites: readLocal(LOCAL_FAVORITES_KEY),
      visited: readLocal(LOCAL_VISITED_KEY),
    };
  }

  try {
    const userRef = doc(db, USERS_COLLECTION, uid);
    const snapshot = await getDoc(userRef);

    if (snapshot.exists()) {
      return snapshot.data();
    }

    return { uid, favorites: [], visited: [] };
  } catch (error) {
    console.warn("Failed to load user profile:", error);
    return {
      uid,
      favorites: readLocal(LOCAL_FAVORITES_KEY),
      visited: readLocal(LOCAL_VISITED_KEY),
    };
  }
}

/** Update user profile fields */
export async function updateUserProfile(uid, data) {
  if (!isFirebaseConfigured() || !db) return;

  const userRef = doc(db, USERS_COLLECTION, uid);
  await updateDoc(userRef, data);
}

/** Toggle favorite place for authenticated user */
export async function toggleFavorite(uid, placeId) {
  const profile = await getUserProfile(uid);
  const favorites = profile.favorites || [];
  const isFavorite = favorites.includes(placeId);
  const updated = isFavorite
    ? favorites.filter((id) => id !== placeId)
    : [...favorites, placeId];

  if (!isFirebaseConfigured() || !db) {
    writeLocal(LOCAL_FAVORITES_KEY, updated);
    return updated;
  }

  await updateUserProfile(uid, { favorites: updated });
  return updated;
}

/** Mark place as visited */
export async function markVisited(uid, placeId) {
  const profile = await getUserProfile(uid);
  const visited = profile.visited || [];

  if (visited.includes(placeId)) return visited;

  const updated = [...visited, placeId];

  if (!isFirebaseConfigured() || !db) {
    writeLocal(LOCAL_VISITED_KEY, updated);
    return updated;
  }

  await updateUserProfile(uid, { visited: updated });
  return updated;
}

/** Update display name */
export async function updateDisplayName(uid, name) {
  if (!isFirebaseConfigured() || !db) {
    localStorage.setItem("explore-ratnagiri-name", name);
    return;
  }

  await updateUserProfile(uid, { name });
}
