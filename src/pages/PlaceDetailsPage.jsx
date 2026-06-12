import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Clock, Heart, MapPin, Navigation, Star } from "lucide-react";
import toast from "react-hot-toast";
import ImageGallery from "../components/ImageGallery";
import PlaceCard from "../components/PlaceCard";
import ReviewForm from "../components/ReviewForm";
import ReviewList from "../components/ReviewList";
import { PageLoader } from "../components/LoadingSkeleton";
import ErrorMessage from "../components/ErrorMessage";
import { getPlaceById, getNearbyPlaces } from "../services/placesService";
import { usePlaces } from "../hooks/usePlaces";
import { useReviews } from "../hooks/useReviews";
import { useAuth } from "../context/AuthContext";

export default function PlaceDetailsPage() {
  const { id } = useParams();
  const { places } = usePlaces();
  const { user, isFavorite, toggleFavorite, markVisited, isVisited } = useAuth();
  const { reviews, loading: reviewsLoading, addReview } = useReviews(id);
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const favorite = isFavorite(id);
  const visited = isVisited(id);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await getPlaceById(id);
        if (!data) {
          setError("Place not found");
        } else {
          setPlace(data);
          setError(null);
        }
      } catch {
        setError("Failed to load place details");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  useEffect(() => {
    if (user && place) {
      markVisited(place.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, place?.id]);

  const handleFavorite = async () => {
    if (!user) {
      toast.error("Sign in to save favorites");
      return;
    }
    await toggleFavorite(id);
    toast.success(favorite ? "Removed from favorites" : "Added to favorites");
  };

  const openDirections = () => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${place.latitude},${place.longitude}`,
      "_blank"
    );
  };

  const mapsEmbedUrl =
    import.meta.env.VITE_GOOGLE_MAPS_API_KEY &&
    !import.meta.env.VITE_GOOGLE_MAPS_API_KEY.includes("your_")
      ? `https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&q=${place?.latitude},${place?.longitude}`
      : null;

  if (loading) return <PageLoader />;
  if (error || !place) {
    return (
      <div className="container-app py-20">
        <ErrorMessage message={error || "Place not found"} />
        <Link to="/attractions" className="btn-primary mx-auto mt-6 block w-fit">
          Back to Attractions
        </Link>
      </div>
    );
  }

  const nearby = getNearbyPlaces(places, place.nearby);

  return (
    <div className="container-app py-10 sm:py-14">
      <ImageGallery images={place.gallery || [place.image]} />

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <span className="rounded-full bg-ocean-100 px-3 py-1 text-xs font-semibold text-ocean-700 dark:bg-ocean-900/40 dark:text-ocean-200">
                {place.category}
              </span>
              <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl dark:text-white">
                {place.name}
              </h1>
              <p className="mt-2 flex items-center gap-2 text-slate-500">
                <MapPin className="h-4 w-4" />
                {place.location}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 rounded-xl bg-sand-100 px-3 py-2 font-semibold text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
                <Star className="h-4 w-4 fill-current" />
                {place.rating}
              </span>
              <button
                type="button"
                onClick={handleFavorite}
                className="rounded-xl border border-slate-200 p-2.5 dark:border-slate-700"
                aria-label="Toggle favorite"
              >
                <Heart className={`h-5 w-5 ${favorite ? "fill-coral-500 text-coral-500" : "text-ocean-600"}`} />
              </button>
            </div>
          </div>

          <p className="mt-6 leading-relaxed text-slate-600 dark:text-slate-300">
            {place.longDescription || place.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <button type="button" onClick={openDirections} className="btn-primary">
              <Navigation className="h-4 w-4" />
              Get Directions
            </button>
            {visited && (
              <span className="inline-flex items-center rounded-xl bg-green-100 px-4 py-2 text-sm font-medium text-green-800 dark:bg-green-900/30 dark:text-green-200">
                Visited
              </span>
            )}
          </div>

          {/* Reviews */}
          <section className="mt-12">
            <h2 className="font-display text-2xl font-bold dark:text-white">Reviews</h2>
            <div className="mt-6 space-y-6">
              <ReviewForm placeId={place.id} onSubmitted={addReview} />
              <ReviewList reviews={reviews} loading={reviewsLoading} />
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <div className="card-surface p-6">
            <h3 className="font-display text-lg font-bold dark:text-white">Visit Info</h3>
            <div className="mt-4 space-y-3 text-sm">
              <p className="flex items-start gap-2 text-slate-600 dark:text-slate-300">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-ocean-600" />
                {place.timings}
              </p>
              <p className="flex items-start gap-2 text-slate-600 dark:text-slate-300">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-ocean-600" />
                {place.latitude.toFixed(4)}, {place.longitude.toFixed(4)}
              </p>
            </div>
          </div>

          <div className="card-surface overflow-hidden">
            {mapsEmbedUrl ? (
              <iframe
                title={`Map of ${place.name}`}
                src={mapsEmbedUrl}
                className="h-64 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div className="flex h-64 flex-col items-center justify-center bg-ocean-50 p-4 text-center dark:bg-slate-800">
                <MapPin className="h-8 w-8 text-ocean-500" />
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  Add <code>VITE_GOOGLE_MAPS_API_KEY</code> for embedded maps
                </p>
                <button type="button" onClick={openDirections} className="btn-primary mt-4">
                  Open in Google Maps
                </button>
              </div>
            )}
          </div>
        </aside>
      </div>

      {nearby.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-2xl font-bold dark:text-white">Nearby Attractions</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {nearby.map((p, i) => (
              <PlaceCard key={p.id} place={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
