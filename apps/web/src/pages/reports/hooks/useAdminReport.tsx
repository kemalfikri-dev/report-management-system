import apiClient, { isAxiosError } from "@/lib/axios";
import { toast } from "sonner";
import { useCallback, useEffect, useState } from "react";

export function useAdminReport() {
  const [allReports, setAllReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    apiClient
      .get("/admin/reports")
      .then((res) => {
        if (!cancelled) {
          setIsError(false);
          setAllReports(Array.isArray(res.data) ? res.data : []);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setIsError(true);
          if (isAxiosError(err)) {
            console.log(err);
            toast.error("Tidak dapat mengambil data report");
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

  const adminRefetch = useCallback(() => {
    setIsLoading(true);
    setIsError(false);
    setRefreshKey((k) => k + 1);
  }, []);

  return { allReports, setAllReports, isLoading, isError, adminRefetch };
}
