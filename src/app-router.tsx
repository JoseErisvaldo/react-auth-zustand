import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./routes/private-routes.tsx";
import { PublicRoute } from "./routes/public-routes.tsx";

const App = lazy(() => import("./App.tsx"));
const Transactions = lazy(
  () => import("./features/transactions/Transactions.view.tsx"),
);
function GlobalFallback() {
  return (
    <div className="global-suspense">
      <div className="global-suspense__spinner" />
      <p>Carregando...</p>
    </div>
  );
}

export function AppRouter() {
  return (
    <Suspense fallback={<GlobalFallback />}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route element={<PublicRoute />}>
          <Route path="/login" element={<App />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/transactions" element={<Transactions />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
