import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PrivateRoute } from "./routes/private-routes.tsx";
import { PublicRoute } from "./routes/public-routes.tsx";
import Dashboard from "./features/dashboard/dashboard.view.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route element={<PublicRoute />}>
          <Route path="/login" element={<App />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  </BrowserRouter>,
);
