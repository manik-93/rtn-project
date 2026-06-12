import HotelCard from "../components/HotelCard";
import { hotels } from "../data/hotels";

export default function HotelsPage() {
  return (
    <div className="container-app py-10 sm:py-14">
      <div className="max-w-2xl">
        <h1 className="section-title">Hotels & Stays</h1>
        <p className="section-subtitle">
          Find comfortable accommodations from beachfront resorts to cozy homestays in mango groves.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {hotels.map((hotel, i) => (
          <HotelCard key={hotel.id} hotel={hotel} index={i} />
        ))}
      </div>
    </div>
  );
}
