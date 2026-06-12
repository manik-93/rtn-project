import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

export default function TestimonialCard({ testimonial, index = 0 }) {
  return (
    <motion.blockquote
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="card-surface relative p-6"
    >
      <Quote className="absolute right-4 top-4 h-8 w-8 text-ocean-100 dark:text-ocean-900" />
      <div className="flex gap-1">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
        ))}
      </div>
      <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        &ldquo;{testimonial.text}&rdquo;
      </p>
      <footer className="mt-6 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ocean-600 text-sm font-bold text-white">
          {testimonial.avatar}
        </span>
        <div>
          <p className="font-semibold text-slate-900 dark:text-white">{testimonial.name}</p>
          <p className="text-xs text-slate-500">{testimonial.location}</p>
        </div>
      </footer>
    </motion.blockquote>
  );
}
