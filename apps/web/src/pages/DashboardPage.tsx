import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { useState } from "react";
import { toast } from "sonner";
import apiClient, { isAxiosError } from "@/lib/axios";
import type { ApiErrorResponse } from "@/types/auth";

export function DashboardPage() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogout() {
    setIsLoading(true);
    try {
      const res = await apiClient.post("/logout");
      if (res.status === 200) {
        toast.success("Logout Berhasil!");
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
    }
    setIsLoading(false);
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
