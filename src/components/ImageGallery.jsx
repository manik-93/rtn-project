import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ImageGallery({ images = [] }) {
  const [active, setActive] = useState(0);
  const gallery = images.length ? images : ["https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"];

  const prev = () => setActive((i) => (i === 0 ? gallery.length - 1 : i - 1));
  const next = () => setActive((i) => (i === gallery.length - 1 ? 0 : i + 1));

  return (
    <div className="space-y-4">
      <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
        <AnimatePresence mode="wait">
          <motion.img
            key={gallery[active]}
            src={gallery[active]}
            alt={`Gallery image ${active + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full w-full object-cover"
          />
        </AnimatePresence>

        {gallery.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white backdrop-blur"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white backdrop-blur"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {gallery.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {gallery.map((img, i) => (
            <button
              key={img}
              type="button"
              onClick={() => setActive(i)}
              className={`h-16 w-24 shrink-0 overflow-hidden rounded-lg ring-2 transition ${
                active === i ? "ring-ocean-500" : "ring-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <img src={img} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
