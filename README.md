# Explore Ratnagiri

A modern, responsive travel guide web application for **Ratnagiri, Maharashtra, India**. Discover beaches, forts, temples, local food, hotels, and interactive maps — built with React, Tailwind CSS, Firebase, and Leaflet.

![Explore Ratnagiri](https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80)

## Features

- **Home** — Hero section, search, featured attractions, category cards, testimonials
- **Attractions** — Filterable list with search and categories
- **Food & Restaurants** — Alphonso mango info, Konkani cuisine, seafood, restaurant listings
- **Hotels** — Hotel cards with ratings, facilities, demo booking
- **Interactive Map** — Leaflet map with markers, popups, directions, geolocation
- **Place Details** — Image gallery, timings, map embed, nearby places, reviews
- **User Dashboard** — Favorites, visited places, profile management (Firebase Auth)
- **Dark Mode** — Toggle with system preference detection
- **Toast Notifications** — User feedback for actions
- **Loading Skeletons** — Smooth loading states

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19 + Vite |
| Styling | Tailwind CSS v4 |
| Routing | React Router v7 |
| Auth & DB | Firebase Auth + Firestore |
| Maps | Leaflet + React-Leaflet |
| Animations | Framer Motion |
| Notifications | React Hot Toast |

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Firebase project (for auth & cloud data)
- Optional: Google Maps API key (for embedded maps on place details)

### Installation

```bash
git clone <your-repo-url>
cd explore-ratnagiri
npm install
```

### Environment Variables

Copy the example env file and fill in your credentials:

```bash
cp .env.example .env
```

| Variable | Description |
|----------|-------------|
| `VITE_FIREBASE_API_KEY` | Firebase API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase auth domain |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID |
| `VITE_FIREBASE_APP_ID` | Firebase app ID |
| `VITE_GOOGLE_MAPS_API_KEY` | Optional — Google Maps embed |

> **Note:** The app works without Firebase using local JSON data. Auth, favorites, and reviews fall back to localStorage when Firebase is not configured.

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Build for Production

```bash
npm run build
npm run preview
```

## Firebase Setup

1. Create a project at [Firebase Console](https://console.firebase.google.com)
2. Enable **Email/Password** and **Google** sign-in under Authentication
3. Create a **Firestore Database** in production or test mode
4. Add your web app and copy config values to `.env`

### Firestore Collections

#### `users`
```json
{
  "uid": "string",
  "name": "string",
  "email": "string",
  "favorites": ["place-id"],
  "visited": ["place-id"]
}
```

#### `places`
```json
{
  "name": "string",
  "category": "Beach | Fort | Heritage | Spiritual",
  "description": "string",
  "latitude": "number",
  "longitude": "number",
  "image": "string (URL)",
  "rating": "number"
}
```

#### `reviews`
```json
{
  "placeId": "string",
  "userId": "string",
  "userName": "string",
  "comment": "string",
  "rating": "number",
  "createdAt": "ISO string"
}
```

### Seed Firestore with Sample Data

Static data lives in `src/data/places.js`. To seed Firestore manually, import each place document using the Firebase Console or run a custom script with the Firebase Admin SDK using the same structure and document IDs (e.g. `ganpatipule-beach`).

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/          # Route pages
├── layouts/        # Page layouts (navbar + footer)
├── routes/         # React Router configuration
├── services/       # Firebase & data services
├── hooks/          # Custom React hooks
├── context/        # Auth & theme providers
├── assets/         # Static assets
├── firebase/       # Firebase initialization
└── data/           # Static Ratnagiri tourism data
```

## Pre-loaded Attractions

- Ganpatipule Beach
- Ratnadurg Fort
- Thiba Palace
- Jaigad Fort
- Pawas
- Aare Ware Beach
- Bhatye Beach
- Mandavi Beach

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## License

MIT — Built for Maharashtra tourism exploration.
