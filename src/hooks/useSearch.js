import { useMemo, useState } from "react";
import { filterPlaces } from "../services/placesService";

/** Search and category filter for attractions */
export function useSearch(places) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const filteredPlaces = useMemo(
    () => filterPlaces(places, { category, search }),
    [places, category, search]
  );

  return {
    search,
    setSearch,
    category,
    setCategory,
    filteredPlaces,
  };
}
