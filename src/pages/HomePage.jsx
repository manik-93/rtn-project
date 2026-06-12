import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Map, Utensils } from "lucide-react";
import Hero from "../components/Hero";
import PlaceCard from "../components/PlaceCard";
import CategoryCard from "../components/CategoryCard";
import TestimonialCard from "../components/TestimonialCard";
import { GridSkeleton } from "../components/LoadingSkeleton";
import ErrorMessage from "../components/ErrorMessage";
import { usePlaces } from "../hooks/usePlaces";
import { getFeaturedPlaces } from "../services/placesService";
import { quickCategories, testimonials } from "../data/places";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const { places, loading, error } = usePlaces();
  const navigate = useNavigate();
  const featured = getFeaturedPlaces(places, 4);

  const handleSearch = (query) => {
    navigate(`/attractions?search=${encodeURIComponent(query)}`);
  };

  return (
    <>
      <Hero onSearch={handleSearch} />

      {/* Featured Attractions */}
      <section className="container-app py-16 sm:py-20">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="section-title">Featured Attractions</h2>
            <p className="section-subtitle">
              Handpicked destinations showcasing the best of Ratnagiri&apos;s coast and heritage.
            </p>
          </div>
          <Link to="/attractions" className="btn-secondary shrink-0">
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10">
          {loading && <GridSkeleton count={4} />}
          {error && <ErrorMessage message={error} />}
          {!loading && !error && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((place, i) => (
                <PlaceCard key={place.id} place={place} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Quick Categories */}
      <section className="bg-ocean-50 py-16 dark:bg-slate-900/50 sm:py-20">
        <div className="container-app">
          <h2 className="section-title text-center">Explore by Category</h2>
          <p className="section-subtitle mx-auto text-center">
            From sun-kissed beaches to ancient forts — find your perfect adventure.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {quickCategories.map((cat, i) => (
              <CategoryCard key={cat.id} category={cat} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Sections */}
      <section className="container-app py-16 sm:py-20">
        <div className="grid gap-6 lg:grid-cols-2">
          <motion.div
            whileHover={{ y: -4 }}
            className="relative overflow-hidden rounded-2xl bg-ocean-600 p-8 text-white shadow-xl"
          >
            <div className="relative z-10">
              <Map className="h-10 w-10 text-ocean-200" />
              <h3 className="mt-4 font-display text-2xl font-bold">Interactive Map</h3>
              <p className="mt-2 max-w-md text-ocean-100">
                Navigate all tourist spots on an interactive map with directions and your current location.
              </p>
              <Link to="/map" className="btn-secondary mt-6 border-white/30 bg-white/10 text-white hover:bg-white/20">
                Open Map
              </Link>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="relative overflow-hidden rounded-2xl bg-coral-500 p-8 text-white shadow-xl"
          >
            <div className="relative z-10">
              <Utensils className="h-10 w-10 text-orange-100" />
              <h3 className="mt-4 font-display text-2xl font-bold">Taste Konkan</h3>
              <p className="mt-2 max-w-md text-orange-100">
                Discover Alphonso mangoes, fresh seafood, and authentic Konkani flavors.
              </p>
              <Link to="/food" className="btn-secondary mt-6 border-white/30 bg-white/10 text-white hover:bg-white/20">
                Explore Food
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-slate-100 py-16 dark:bg-slate-900 sm:py-20">
        <div className="container-app">
          <h2 className="section-title text-center">Traveler Stories</h2>
          <p className="section-subtitle mx-auto text-center">
            Hear from visitors who explored Ratnagiri with us.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <TestimonialCard key={t.id} testimonial={t} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
