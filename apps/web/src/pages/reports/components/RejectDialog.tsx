import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import apiClient, { isAxiosError } from "@/lib/axios";
import { toast } from "sonner";
import { ApiErrorResponse } from "@/types/auth";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function RejectDialog({ selectedReport, refetch }: ReportActionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  async function handleReject(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!rejectReason.trim()) {
      toast.error("Alasan penolakan tidak boleh kosong");
      return;
    }

    setIsLoading(true);

    try {
      await apiClient.patch(`/admin/reports/${selectedReport.id}/status`, {
        status: "REJECTED",
        rejectReason: rejectReason,
      });

      toast.success("Laporan berhasil ditolak");
      setIsOpen(false);
      setRejectReason("");
      refetch();
    } catch (err) {
      if (isAxiosError<ApiErrorResponse>(err)) {
        if (err.response) {
          toast.error(err.response.data.error);
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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">Reject</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Tolak Laporan</DialogTitle>
          <DialogDescription>
            Tuliskan alasan spesifik mengapa laporan "{selectedReport.title}"
            ditolak.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleReject}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="rejectReason">Alasan Penolakan</Label>
              <Textarea
                id="rejectReason"
                placeholder="Misalnya: Fitur ini sudah ada, atau bukti kurang jelas..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Batal
            </Button>
            <Button type="submit" variant="destructive" disabled={isLoading}>
              {isLoading ? "Memproses..." : "Konfirmasi Tolak"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
