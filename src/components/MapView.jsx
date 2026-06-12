import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";
import { MapPin, Navigation } from "lucide-react";
import toast from "react-hot-toast";

// Fix default marker icons in Vite bundler
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const RATNAGIRI_CENTER = [16.9944, 73.3007];

function RecenterMap({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) map.setView(center, 12);
  }, [center, map]);
  return null;
}

export default function MapView({ places, showUserLocation = true }) {
  const [userLocation, setUserLocation] = useState(null);

  const locateUser = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = [pos.coords.latitude, pos.coords.longitude];
        setUserLocation(coords);
        toast.success("Location found!");
      },
      () => toast.error("Unable to retrieve your location")
    );
  };

  useEffect(() => {
    if (showUserLocation) locateUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openDirections = (lat, lng) => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="relative">
      {showUserLocation && (
        <button
          type="button"
          onClick={locateUser}
          className="absolute right-4 top-4 z-[1000] flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-ocean-700 shadow-lg dark:bg-slate-900 dark:text-ocean-200"
        >
          <MapPin className="h-4 w-4" />
          My Location
        </button>
      )}

      <MapContainer
        center={RATNAGIRI_CENTER}
        zoom={10}
        className="h-[60vh] min-h-[400px] w-full rounded-2xl shadow-lg sm:h-[70vh]"
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {userLocation && (
          <>
            <Marker position={userLocation}>
              <Popup>You are here</Popup>
            </Marker>
            <RecenterMap center={userLocation} />
          </>
        )}

        {places.map((place) => (
          <Marker key={place.id} position={[place.latitude, place.longitude]}>
            <Popup>
              <div className="min-w-[180px] space-y-2">
                <img
                  src={place.image}
                  alt={place.name}
                  className="h-24 w-full rounded-lg object-cover"
                />
                <p className="font-semibold">{place.name}</p>
                <p className="text-xs text-slate-600">{place.category}</p>
                <div className="flex flex-col gap-1">
                  <Link
                    to={`/places/${place.id}`}
                    className="text-xs font-semibold text-ocean-600 hover:underline"
                  >
                    View Details
                  </Link>
                  <button
                    type="button"
                    onClick={() => openDirections(place.latitude, place.longitude)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-coral-600 hover:underline"
                  >
                    <Navigation className="h-3 w-3" />
                    Directions
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
