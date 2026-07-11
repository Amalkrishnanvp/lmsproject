import { Navigate } from "react-router-dom";
import { useAuthStore } from "./utils/auth.store";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading, user } = useAuthStore();
  console.log({
    loading,
    isAuthenticated,
    user,
  });
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
