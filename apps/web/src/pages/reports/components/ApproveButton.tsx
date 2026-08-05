import { Button } from "@/components/ui/button";
import apiClient, { isAxiosError } from "@/lib/axios";
import type { ApiErrorResponse } from "@/types/auth";
import { useState } from "react";
import { toast } from "sonner";

export function ApproveButton({ selectedReport, refetch }: ReportActionProps) {
  const [isLoading, setIsLoading] = useState(false);
  async function handleApprove() {
    setIsLoading(true);
    try {
      await apiClient.patch(`/admin/reports/${selectedReport.id}/status`, {
        status: "APPROVED",
      });
      toast.success("Report di Approve");
      refetch();
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
    <Button disabled={isLoading} onClick={handleApprove}>
      Approve
    </Button>
  );
}
