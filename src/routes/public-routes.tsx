import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../features/auth/store/auth.store";

export function PublicRoute() {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
