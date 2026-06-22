import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { useState } from "react";
import { toast } from "sonner";
import apiClient, { isAxiosError } from "@/lib/axios";
import type { ApiErrorResponse } from "@/types/auth";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

export function DashboardPage() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("AuthContext not found");
  }

  const { checkUser } = auth;

  async function handleLogout() {
    setIsLoading(true);
    try {
      const res = await apiClient.post("/logout");
      if (res.status === 201) {
        toast.success("Logout Berhasil!");
        checkUser();
        navigate("/login");
      }
    } catch (err) {
      if (isAxiosError<ApiErrorResponse>(err)) {
        if (err.response) {
          toast.error(err.response?.data?.error);
        } else if (err.request) {
          toast.error("Tidak dapat terhubung ke server");
        } else {
          toast.error("Terjadi kesalahan yang tidak diketahui");
        }
      }
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <>
      <h1>Hello User!</h1>
      <p>Welcome to Dashboard</p>
      <Button
        variant="outline"
        className="w-full cursor-pointer"
        disabled={isLoading}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </>
  );
}
