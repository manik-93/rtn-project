import { motion } from "framer-motion";
import { MapPin, Star } from "lucide-react";

export default function FoodCard({ item, index = 0, type = "highlight" }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="card-surface overflow-hidden"
    >
      <div className="aspect-[16/10] overflow-hidden">
        <img
          src={item.image}
          alt={item.title || item.name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-5">
        {type === "highlight" ? (
          <>
            <span className="text-xs font-semibold uppercase tracking-wide text-coral-500">
              {item.category}
            </span>
            <h3 className="mt-1 font-display text-xl font-bold dark:text-white">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {item.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {item.tags?.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-sand-100 px-3 py-1 text-xs font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="flex items-start justify-between">
              <h3 className="font-display text-xl font-bold dark:text-white">{item.name}</h3>
              <span className="flex items-center gap-1 text-sm font-semibold text-ocean-600">
                <Star className="h-4 w-4 fill-current" />
                {item.rating}
              </span>
            </div>
            <p className="mt-1 text-sm text-ocean-600 dark:text-ocean-300">{item.cuisine}</p>
            <p className="mt-2 flex items-center gap-1 text-sm text-slate-500">
              <MapPin className="h-4 w-4" />
              {item.location}
            </p>
            <p className="mt-2 font-medium text-slate-700 dark:text-slate-200">{item.priceRange}</p>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
              Specialties: {item.specialties.join(", ")}
            </p>
          </>
        )}
      </div>
    </motion.article>
  );
}
