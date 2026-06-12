import MapView from "../components/MapView";
import { PageLoader } from "../components/LoadingSkeleton";
import ErrorMessage from "../components/ErrorMessage";
import { usePlaces } from "../hooks/usePlaces";

export default function MapPage() {
  const { places, loading, error } = usePlaces();

  return (
    <div className="container-app py-10 sm:py-14">
      <div className="max-w-2xl">
        <h1 className="section-title">Interactive Map</h1>
        <p className="section-subtitle">
          Explore all tourist destinations on the map. Click markers for details and directions.
        </p>
      </div>

      <div className="mt-8">
        {loading && <PageLoader />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && <MapView places={places} />}
      </div>
    </div>
  );
}
