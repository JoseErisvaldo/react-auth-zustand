import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthStore } from "./features/auth/store/auth.store";
import { PrivateRoute } from "./routes/private-routes.tsx";
import { PublicRoute } from "./routes/public-routes.tsx";

const App = lazy(() => import("./App.tsx"));
const Transactions = lazy(
  () => import("./features/transactions/transactions.view.tsx"),
);
const Dashboard = lazy(() => import("./features/dashboard/dashboard.view.tsx"));

function GlobalFallback() {
  return (
    <div className="global-suspense">
      <div className="global-suspense__spinner" />
      <p>Carregando...</p>
    </div>
  );
}

export function AppRouter() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <Suspense fallback={<GlobalFallback />}>
      <Routes>
        <Route
          path="/"
          element={
            <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
          }
        />

        <Route element={<PublicRoute />}>
          <Route path="/login" element={<App />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
