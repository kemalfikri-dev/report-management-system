import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { useState } from "react";
import { toast } from "sonner";
import apiClient, { isAxiosError } from "@/lib/axios";
import type { ApiErrorResponse } from "@/types/auth";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { FileText, Clock, CheckCircle, XCircle } from "lucide-react";

export function DashboardPage() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { stats, isLoading } = useDashboardStats();

  if (!auth) {
    throw new Error("AuthContext not found");
  }

  const { checkUser, user } = auth;

  async function handleLogout() {
    setIsLoggingOut(true);
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
      setIsLoggingOut(false);
    }
  }

  return (
    <div className="mx-auto max-w-5xl p-6 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Selamat Datang, {user?.name}!
          </h1>
          <p className="text-muted-foreground mt-1">
            {user?.role === "ADMIN"
              ? "Ini adalah rangkuman seluruh laporan di sistem Anda."
              : "Berikut adalah rangkuman statistik laporan Anda."}
          </p>
        </div>
        <Button
          variant="outline"
          disabled={isLoggingOut}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Laporan</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? "..." : stats?.total || 0}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Menunggu (Pending)</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? "..." : stats?.pending || 0}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Disetujui</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? "..." : stats?.approved || 0}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ditolak</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? "..." : stats?.rejected || 0}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
