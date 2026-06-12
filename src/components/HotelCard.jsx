import { motion } from "framer-motion";
import { MapPin, Star, Wifi, Waves } from "lucide-react";
import toast from "react-hot-toast";

const iconMap = {
  "Sea View": Waves,
  "Free WiFi": Wifi,
};

export default function HotelCard({ hotel, index = 0 }) {
  const handleBook = () => {
    toast.success(`Demo booking request sent for ${hotel.name}!`);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="card-surface overflow-hidden transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="aspect-[16/10] overflow-hidden">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="h-full w-full object-cover transition hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-xl font-bold dark:text-white">{hotel.name}</h3>
          <span className="flex items-center gap-1 rounded-lg bg-ocean-50 px-2 py-1 text-xs font-semibold text-ocean-700 dark:bg-ocean-900/40 dark:text-ocean-200">
            <Star className="h-3.5 w-3.5 fill-current" />
            {hotel.rating}
          </span>
        </div>

        <p className="mt-2 flex items-center gap-1 text-sm text-slate-500">
          <MapPin className="h-4 w-4" />
          {hotel.location}
        </p>

        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{hotel.description}</p>

        <p className="mt-3 font-semibold text-ocean-700 dark:text-ocean-300">{hotel.priceRange}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {hotel.facilities.map((facility) => {
            const Icon = iconMap[facility];
            return (
              <span
                key={facility}
                className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
              >
                {Icon && <Icon className="h-3 w-3" />}
                {facility}
              </span>
            );
          })}
        </div>

        <button type="button" onClick={handleBook} className="btn-primary mt-5 w-full">
          Book Now (Demo)
        </button>
      </div>
    </motion.article>
  );
}
