import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import RouteFallback from "./components/route-fallback";
import { useAuthStore } from "./features/auth/store/auth.store";
import { PrivateRoute } from "./routes/private-routes.tsx";
import { PublicRoute } from "./routes/public-routes.tsx";
import Accrount from "./features/accrount/accrount.view.tsx";

const App = lazy(() => import("./App"));
const Dashboard = lazy(() => import("./features/dashboard/dashboard.view"));
const Transactions = lazy(
  () => import("./features/transactions/transactions.view"),
);

export function AppRouter() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
        }
      />

      <Route element={<PublicRoute />}>
        <Route
          path="/login"
          element={
            <Suspense fallback={<RouteFallback fullPage />}>
              <App />
            </Suspense>
          }
        />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route
          path="/transactions"
          element={
            <Suspense fallback={<RouteFallback />}>
              <Transactions />
            </Suspense>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Suspense fallback={<RouteFallback />}>
              <Dashboard />
            </Suspense>
          }
        />
        <Route
          path="/accrount"
          element={
            <Suspense fallback={<RouteFallback />}>
              <Accrount />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}
