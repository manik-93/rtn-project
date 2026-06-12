import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { PageLoader } from "./LoadingSkeleton";

export default function ProtectedRoute({ children }) {
  const { user, loading, isConfigured } = useAuth();
  const location = useLocation();

  if (loading) return <PageLoader />;

  if (!isConfigured) {
    return (
      <div className="container-app py-20 text-center">
        <h2 className="section-title">Firebase Not Configured</h2>
        <p className="section-subtitle mx-auto">
          Add your Firebase credentials to <code>.env</code> to enable authentication
          and the user dashboard.
        </p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
