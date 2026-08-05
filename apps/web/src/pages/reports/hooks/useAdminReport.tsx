import apiClient, { isAxiosError } from "@/lib/axios";
import { toast } from "sonner";
import { useCallback, useEffect, useState } from "react";

export interface FetchReportsParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  status?: string;
}

export function useAdminReport(params: FetchReportsParams = {}) {
  const [allReports, setAllReports] = useState<Report[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append("page", params.page.toString());
    if (params.limit) queryParams.append("limit", params.limit.toString());
    if (params.search) queryParams.append("search", params.search);
    if (params.category) queryParams.append("category", params.category);
    if (params.status) queryParams.append("status", params.status);

    apiClient
      .get(`/admin/reports?${queryParams.toString()}`)
      .then((res) => {
        if (!cancelled) {
          setIsError(false);
          setAllReports(Array.isArray(res.data?.data) ? res.data.data : []);
          setMeta(res.data?.meta || null);
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
  }, [
    refreshKey,
    params.page,
    params.limit,
    params.search,
    params.category,
    params.status,
  ]);

  const adminRefetch = useCallback(() => {
    setIsLoading(true);
    setIsError(false);
    setRefreshKey((k) => k + 1);
  }, []);

  return { allReports, setAllReports, meta, isLoading, isError, adminRefetch };
}
