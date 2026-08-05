import apiClient, { isAxiosError } from "@/lib/axios";
import { toast } from "sonner";
import { useCallback, useEffect, useState } from "react";

export interface DashboardStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
}

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    apiClient
      .get("/dashboard")
      .then((res) => {
        if (!cancelled) {
          setIsError(false);
          setStats(res.data?.stats || null);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setIsError(true);
          if (isAxiosError(err)) {
            console.log(err);
            toast.error("Tidak dapat mengambil data statistik");
          }
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  const refetchStats = useCallback(() => {
    setIsLoading(true);
    setIsError(false);
    setRefreshKey((k) => k + 1);
  }, []);

  return { stats, isLoading, isError, refetchStats };
}
