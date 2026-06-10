import { Navigate, Outlet } from "react-router-dom";

export function AutoRoute() {
  const token = localStorage.getItem("authToken");

  return token ? <Navigate to="/dashboard" replace /> : <Outlet />;
}
