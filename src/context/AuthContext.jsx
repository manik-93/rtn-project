import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider, isFirebaseConfigured } from "../firebase/config";
import {
  createUserProfile,
  getUserProfile,
  toggleFavorite as toggleFavoriteService,
  markVisited as markVisitedService,
  updateDisplayName,
} from "../services/userService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isFirebaseConfigured() || !auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        await createUserProfile(firebaseUser);
        const userProfile = await getUserProfile(firebaseUser.uid);
        setProfile(userProfile);
      } else {
        setProfile(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const register = async (name, email, password) => {
    if (!auth) throw new Error("Firebase is not configured. Add credentials to .env");

    const credential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(credential.user, { displayName: name });
    await createUserProfile(credential.user, { name });
    const userProfile = await getUserProfile(credential.user.uid);
    setProfile(userProfile);
    return credential.user;
  };

  const login = async (email, password) => {
    if (!auth) throw new Error("Firebase is not configured. Add credentials to .env");
    return signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = async () => {
    if (!auth || !googleProvider) {
      throw new Error("Firebase is not configured. Add credentials to .env");
    }
    const result = await signInWithPopup(auth, googleProvider);
    await createUserProfile(result.user);
    const userProfile = await getUserProfile(result.user.uid);
    setProfile(userProfile);
    return result.user;
  };

  const logout = async () => {
    if (!auth) return;
    await signOut(auth);
    setProfile(null);
  };

  const toggleFavorite = async (placeId) => {
    if (!user) return null;
    const updated = await toggleFavoriteService(user.uid, placeId);
    setProfile((prev) => ({ ...prev, favorites: updated }));
    return updated;
  };

  const markVisited = async (placeId) => {
    if (!user) return null;
    const updated = await markVisitedService(user.uid, placeId);
    setProfile((prev) => ({ ...prev, visited: updated }));
    return updated;
  };

  const updateName = async (name) => {
    if (!user) return;
    await updateProfile(user, { displayName: name });
    await updateDisplayName(user.uid, name);
    setProfile((prev) => ({ ...prev, name }));
  };

  const isFavorite = (placeId) => profile?.favorites?.includes(placeId) ?? false;
  const isVisited = (placeId) => profile?.visited?.includes(placeId) ?? false;

  const value = {
    user,
    profile,
    loading,
    isConfigured: isFirebaseConfigured(),
    register,
    login,
    loginWithGoogle,
    logout,
    toggleFavorite,
    markVisited,
    updateName,
    isFavorite,
    isVisited,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
