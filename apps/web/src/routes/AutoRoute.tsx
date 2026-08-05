import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

export function AutoRoute() {
  const { user, isLoading } = useContext(AuthContext) as UserProps;

  if (isLoading === true) {
    return <div>Loading...</div>;
  }

  if (user !== null) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
