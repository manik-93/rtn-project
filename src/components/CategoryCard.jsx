import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function CategoryCard({ category, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Link
        to={category.link}
        className="group relative block aspect-[4/5] overflow-hidden rounded-2xl shadow-md"
      >
        <img
          src={category.image}
          alt={category.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ocean-900/90 via-ocean-900/30 to-transparent" />
        <div className="absolute bottom-0 p-5 text-white">
          <h3 className="font-display text-2xl font-bold">{category.title}</h3>
          <p className="mt-1 text-sm text-ocean-100">{category.description}</p>
          <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-sand-200">
            Explore
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
