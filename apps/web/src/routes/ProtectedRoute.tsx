import { AuthContext } from "@/context/AuthContext";
import { AppLayout } from "@/components/AppLayout";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

export function ProtectedRoute() {
  const { user, isLoading } = useContext(AuthContext) as UserProps;

  if (isLoading === true) {
    return <div className="flex items-center justify-center min-h-screen text-muted-foreground">Loading...</div>;
  }

  if (user === null) {
    return <Navigate to="/login" replace />;
  }

  return <AppLayout />;
}

