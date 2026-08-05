import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedAdminRoute() {
  const { user, isLoading } = useContext(AuthContext) as UserProps;

  if (isLoading === true) {
    return <div>Loading...</div>;
  }

  if (user === null) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
