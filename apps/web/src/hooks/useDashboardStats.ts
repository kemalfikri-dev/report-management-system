import apiClient, { isAxiosError } from "@/lib/axios";
import { toast } from "sonner";
import { useCallback, useEffect, useState } from "react";

export interface DashboardStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
}

export interface RecentReport {
  id: string;
  title: string;
  status: string;
  category: string;
  createdAt: string;
}

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentReports, setRecentReports] = useState<RecentReport[]>([]);
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
          setRecentReports(res.data?.recentReports || []);
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

  return { stats, recentReports, isLoading, isError, refetchStats };
}
