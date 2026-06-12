import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PlaceCard from "../components/PlaceCard";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import { GridSkeleton } from "../components/LoadingSkeleton";
import ErrorMessage from "../components/ErrorMessage";
import { usePlaces } from "../hooks/usePlaces";
import { useSearch } from "../hooks/useSearch";
import { categories } from "../data/places";

export default function AttractionsPage() {
  const { places, loading, error } = usePlaces();
  const [searchParams, setSearchParams] = useSearchParams();
  const { search, setSearch, category, setCategory, filteredPlaces } = useSearch(places);

  useEffect(() => {
    const urlSearch = searchParams.get("search") || "";
    const urlCategory = searchParams.get("category") || "all";
    setSearch(urlSearch);
    setCategory(urlCategory);
  }, [searchParams, setSearch, setCategory]);

  const updateParams = (nextSearch, nextCategory) => {
    const params = {};
    if (nextSearch) params.search = nextSearch;
    if (nextCategory && nextCategory !== "all") params.category = nextCategory;
    setSearchParams(params);
  };

  return (
    <div className="container-app py-10 sm:py-14">
      <div className="max-w-2xl">
        <h1 className="section-title">Tourist Attractions</h1>
        <p className="section-subtitle">
          Explore beaches, forts, heritage sites, and spiritual destinations across Ratnagiri.
        </p>
      </div>

      <div className="mt-8 space-y-4">
        <SearchBar
          initialValue={search}
          onSearch={(q) => {
            setSearch(q);
            updateParams(q, category);
          }}
        />
        <CategoryFilter
          categories={categories}
          active={category}
          onChange={(cat) => {
            setCategory(cat);
            updateParams(search, cat);
          }}
        />
      </div>

      <p className="mt-6 text-sm text-slate-500">
        Showing {filteredPlaces.length} {filteredPlaces.length === 1 ? "place" : "places"}
      </p>

      <div className="mt-8">
        {loading && <GridSkeleton count={6} />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && filteredPlaces.length === 0 && (
          <p className="text-center text-slate-500">No attractions match your search.</p>
        )}
        {!loading && !error && filteredPlaces.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPlaces.map((place, i) => (
              <PlaceCard key={place.id} place={place} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
