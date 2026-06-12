import { motion } from "framer-motion";
import { Heart, MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function PlaceCard({ place, index = 0 }) {
  const { user, isFavorite, toggleFavorite } = useAuth();
  const favorite = isFavorite(place.id);

  const handleFavorite = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Sign in to save favorites");
      return;
    }
    await toggleFavorite(place.id);
    toast.success(favorite ? "Removed from favorites" : "Added to favorites");
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="group card-surface overflow-hidden transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={place.image}
          alt={place.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ocean-700">
          {place.category}
        </span>
        <button
          type="button"
          onClick={handleFavorite}
          aria-label={favorite ? "Remove favorite" : "Add favorite"}
          className="absolute right-3 top-3 rounded-full bg-white/90 p-2 text-ocean-600 transition hover:bg-white"
        >
          <Heart className={`h-4 w-4 ${favorite ? "fill-coral-500 text-coral-500" : ""}`} />
        </button>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
            {place.name}
          </h3>
          <span className="flex shrink-0 items-center gap-1 rounded-lg bg-sand-100 px-2 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
            <Star className="h-3.5 w-3.5 fill-current" />
            {place.rating}
          </span>
        </div>

        <p className="mt-2 flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
          <MapPin className="h-4 w-4 shrink-0" />
          {place.location}
        </p>

        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {place.description}
        </p>

        <Link
          to={`/places/${place.id}`}
          className="btn-primary mt-4 w-full"
        >
          View Details
        </Link>
      </div>
    </motion.article>
  );
}
