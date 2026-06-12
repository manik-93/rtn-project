import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar({
  onSearch,
  variant = "default",
  placeholder = "Search beaches, forts, temples...",
  initialValue = "",
}) {
  const [query, setQuery] = useState(initialValue);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
      return;
    }
    navigate(`/attractions?search=${encodeURIComponent(query)}`);
  };

  const isHero = variant === "hero";

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <Search
        className={`absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 ${
          isHero ? "text-slate-400" : "text-ocean-500"
        }`}
      />
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-2xl py-3.5 pl-12 pr-4 text-sm shadow-lg outline-none transition focus:ring-2 focus:ring-ocean-400 ${
          isHero
            ? "bg-white/95 text-slate-800 placeholder:text-slate-400"
            : "border border-slate-200 bg-white text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        }`}
      />
    </form>
  );
}
