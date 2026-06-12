import FoodCard from "../components/FoodCard";
import { foodHighlights, restaurants } from "../data/food";

export default function FoodPage() {
  return (
    <div className="container-app py-10 sm:py-14">
      <div className="max-w-2xl">
        <h1 className="section-title">Food & Restaurants</h1>
        <p className="section-subtitle">
          Savor the flavors of Ratnagiri — from world-famous Alphonso mangoes to fresh Konkani seafood.
        </p>
      </div>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-bold dark:text-white">Famous Ratnagiri Food</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {foodHighlights.map((item, i) => (
            <FoodCard key={item.id} item={item} index={i} type="highlight" />
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-display text-2xl font-bold dark:text-white">Restaurant Listings</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Top-rated places to enjoy Konkani cuisine and fresh seafood.
        </p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {restaurants.map((item, i) => (
            <FoodCard key={item.id} item={item} index={i} type="restaurant" />
          ))}
        </div>
      </section>
    </div>
  );
}
