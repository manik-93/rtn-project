import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Search } from "lucide-react";
import SearchBar from "./SearchBar";

export default function Hero({ onSearch }) {
  return (
    <section className="relative min-h-[85vh] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ocean-900/70 via-ocean-800/60 to-ocean-900/90" />

      <div className="container-app relative flex min-h-[85vh] flex-col justify-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <span className="inline-block rounded-full bg-white/15 px-4 py-1 text-sm font-medium text-sand-100 backdrop-blur">
            Maharashtra&apos;s Coastal Paradise
          </span>
          <h1 className="mt-6 font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Discover the Magic of Ratnagiri
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ocean-100 sm:text-xl">
            Explore pristine beaches, historic forts, Alphonso mangoes, and authentic
            Konkani cuisine on India&apos;s stunning Konkan coast.
          </p>

          <div className="mt-8 max-w-xl">
            <SearchBar onSearch={onSearch} variant="hero" />
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/attractions" className="btn-primary bg-coral-500 hover:bg-coral-600">
              Explore Attractions
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/map" className="btn-secondary border-white/30 bg-white/10 text-white hover:bg-white/20">
              <Search className="h-4 w-4" />
              View Map
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
