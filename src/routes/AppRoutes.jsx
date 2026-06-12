import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import HomePage from "../pages/HomePage";
import AttractionsPage from "../pages/AttractionsPage";
import FoodPage from "../pages/FoodPage";
import HotelsPage from "../pages/HotelsPage";
import MapPage from "../pages/MapPage";
import PlaceDetailsPage from "../pages/PlaceDetailsPage";
import DashboardPage from "../pages/DashboardPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="attractions" element={<AttractionsPage />} />
        <Route path="food" element={<FoodPage />} />
        <Route path="hotels" element={<HotelsPage />} />
        <Route path="map" element={<MapPage />} />
        <Route path="places/:id" element={<PlaceDetailsPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={
            <div className="container-app py-20 text-center">
              <h1 className="section-title">Page Not Found</h1>
              <p className="section-subtitle mx-auto">The page you&apos;re looking for doesn&apos;t exist.</p>
            </div>
          }
        />
      </Route>
    </Routes>
  );
}
