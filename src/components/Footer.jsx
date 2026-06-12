import { Link } from "react-router-dom";
import { Compass, Globe, Mail, MapPin, Phone, Share2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300 dark:border-slate-800">
      <div className="container-app grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 text-white">
            <Compass className="h-6 w-6 text-ocean-400" />
            <span className="font-display text-xl font-bold">Explore Ratnagiri</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            Your complete guide to Ratnagiri&apos;s beaches, forts, temples, cuisine,
            and coastal adventures on Maharashtra&apos;s Konkan coast.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-white">Quick Links</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/attractions" className="hover:text-ocean-400">Attractions</Link></li>
            <li><Link to="/food" className="hover:text-ocean-400">Food & Restaurants</Link></li>
            <li><Link to="/hotels" className="hover:text-ocean-400">Hotels</Link></li>
            <li><Link to="/map" className="hover:text-ocean-400">Interactive Map</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white">Travel Info</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li>Best time: Oct – Mar</li>
            <li>Mango season: Mar – Jun</li>
            <li>Nearest airport: Mumbai (330 km)</li>
            <li>Railway: Ratnagiri Station</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-ocean-400" />
              Ratnagiri, Maharashtra 415612
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-ocean-400" />
              +91 2352 123456
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-ocean-400" />
              info@exploreratnagiri.com
            </li>
          </ul>
          <div className="mt-4 flex gap-3">
            <a href="#" aria-label="Social media" className="rounded-lg bg-slate-800 p-2 hover:bg-ocean-600">
              <Share2 className="h-4 w-4" />
            </a>
            <a href="#" aria-label="Website" className="rounded-lg bg-slate-800 p-2 hover:bg-ocean-600">
              <Globe className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Explore Ratnagiri. Built for Maharashtra tourism.
      </div>
    </footer>
  );
}
