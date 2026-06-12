import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Menu,
  Moon,
  Sun,
  User,
  X,
  Compass,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/attractions", label: "Attractions" },
  { to: "/food", label: "Food" },
  { to: "/hotels", label: "Hotels" },
  { to: "/map", label: "Map" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const { darkMode, toggleTheme } = useTheme();

  const linkClass = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition ${
      isActive
        ? "bg-ocean-100 text-ocean-800 dark:bg-ocean-900/50 dark:text-ocean-200"
        : "text-slate-600 hover:bg-slate-100 hover:text-ocean-700 dark:text-slate-300 dark:hover:bg-slate-800"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/90">
      <nav className="container-app flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-ocean-600 text-white">
            <Compass className="h-5 w-5" />
          </span>
          <div>
            <p className="font-display text-lg font-bold leading-tight text-slate-900 dark:text-white">
              Explore Ratnagiri
            </p>
            <p className="text-xs text-ocean-600 dark:text-ocean-300">
              Konkan Coast Guide
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass} end={link.to === "/"}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="rounded-xl p-2 text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          {user ? (
            <Link to="/dashboard" className="btn-secondary hidden sm:inline-flex">
              <User className="h-4 w-4" />
              Dashboard
            </Link>
          ) : (
            <Link to="/login" className="btn-primary hidden sm:inline-flex">
              Sign In
            </Link>
          )}

          <button
            type="button"
            className="rounded-xl p-2 text-slate-600 lg:hidden dark:text-slate-300"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-slate-200 lg:hidden dark:border-slate-800"
          >
            <div className="container-app flex flex-col gap-1 py-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={linkClass}
                  onClick={() => setOpen(false)}
                  end={link.to === "/"}
                >
                  {link.label}
                </NavLink>
              ))}
              <Link
                to={user ? "/dashboard" : "/login"}
                className="btn-primary mt-2"
                onClick={() => setOpen(false)}
              >
                <MapPin className="h-4 w-4" />
                {user ? "Dashboard" : "Sign In"}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
