import { useEffect, useState } from "react";
import { getAllPlaces } from "../services/placesService";

/** Load and cache all tourism places */
export function usePlaces() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        setLoading(true);
        const data = await getAllPlaces();
        if (active) {
          setPlaces(data);
          setError(null);
        }
      } catch (err) {
        if (active) setError(err.message || "Failed to load places");
      } finally {
        if (active) setLoading(false);
      }
    }

    load();
    return () => {
      active = false;
    };
  }, []);

  return { places, loading, error };
}
