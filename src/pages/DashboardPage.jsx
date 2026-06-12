import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, MapPin, User } from "lucide-react";
import PlaceCard from "../components/PlaceCard";
import { useAuth } from "../context/AuthContext";
import { usePlaces } from "../hooks/usePlaces";
import toast from "react-hot-toast";

export default function DashboardPage() {
  const { user, profile, updateName } = useAuth();
  const { places } = usePlaces();
  const [name, setName] = useState(profile?.name || user?.displayName || "");
  const [saving, setSaving] = useState(false);

  const favoritePlaces = places.filter((p) => profile?.favorites?.includes(p.id));
  const visitedPlaces = places.filter((p) => profile?.visited?.includes(p.id));

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateName(name.trim());
      toast.success("Profile updated!");
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container-app py-10 sm:py-14">
      <div className="flex items-center gap-4">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-ocean-600 text-white">
          <User className="h-7 w-7" />
        </span>
        <div>
          <h1 className="section-title">My Dashboard</h1>
          <p className="text-sm text-slate-500">{user?.email}</p>
        </div>
      </div>

      {/* Profile */}
      <section className="card-surface mt-10 p-6">
        <h2 className="font-display text-xl font-bold dark:text-white">Manage Profile</h2>
        <form onSubmit={handleSaveProfile} className="mt-4 flex flex-col gap-4 sm:flex-row">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your display name"
            className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-900"
          />
          <button type="submit" disabled={saving} className="btn-primary">
            {saving ? "Saving..." : "Save Profile"}
          </button>
        </form>
      </section>

      {/* Favorites */}
      <section className="mt-12">
        <h2 className="flex items-center gap-2 font-display text-2xl font-bold dark:text-white">
          <Heart className="h-6 w-6 text-coral-500" />
          Saved Favorites
        </h2>
        {favoritePlaces.length === 0 ? (
          <p className="mt-4 text-sm text-slate-500">
            No favorites yet.{" "}
            <Link to="/attractions" className="text-ocean-600 hover:underline">
              Browse attractions
            </Link>
          </p>
        ) : (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {favoritePlaces.map((place, i) => (
              <PlaceCard key={place.id} place={place} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* Visited */}
      <section className="mt-12">
        <h2 className="flex items-center gap-2 font-display text-2xl font-bold dark:text-white">
          <MapPin className="h-6 w-6 text-ocean-600" />
          Visited Places
        </h2>
        {visitedPlaces.length === 0 ? (
          <p className="mt-4 text-sm text-slate-500">
            Places you view will appear here automatically.
          </p>
        ) : (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visitedPlaces.map((place, i) => (
              <PlaceCard key={place.id} place={place} index={i} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
