import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from ".";

export const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  return loading ? null : user ? <Outlet /> : <Navigate to="/" />;
};
