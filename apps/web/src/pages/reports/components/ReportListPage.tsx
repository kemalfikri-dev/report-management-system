import { Button } from "@/components/ui/button";
import { CreateDialogReport } from "./CreateDialogReport";
import { EditDialogReport } from "./EditDialogReport";
import { DeleteReport } from "./DeleteReport";
import { DialogReport } from "./DialogReport";
import { useState, useEffect } from "react";
import { useReport } from "../hooks/useReport";
import { ReportCard } from "./ReportCard";
import { ReportFilters } from "./ReportFilters";
import { FileSearch } from "lucide-react";

export function ReportListPage() {
  const [page, setPage] = useState(1);
  const [searchFilter, setSearchFilter] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchFilter), 500);
    return () => clearTimeout(timer);
  }, [searchFilter]);

  const { reports, meta, refetch, isLoading } = useReport({
    page,
    limit: 10,
    search: debouncedSearch,
    category: categoryFilter,
    status: statusFilter,
  });

  return (
    <div className="mx-auto max-w-5xl px-6 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Laporan Saya</h1>
          <p className="text-muted-foreground mt-1">
            Kelola dan pantau status laporan yang telah Anda buat.
          </p>
        </div>
        <CreateDialogReport refetch={refetch} />
      </div>

      <ReportFilters
        searchFilter={searchFilter}
        setSearchFilter={setSearchFilter}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        onFilterChange={() => setPage(1)}
      />

      {meta && meta.total > 0 && (
        <div className="text-sm text-muted-foreground font-medium">
          Menampilkan {reports.length} dari {meta.total} laporan
        </div>
      )}

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
          Memuat laporan...
        </div>
      ) : reports.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 px-4 border-2 border-dashed rounded-xl bg-card/50 text-center">
          <div className="bg-muted p-4 rounded-full mb-4">
            <FileSearch className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Tidak ada laporan</h3>
          <p className="text-muted-foreground max-w-md mb-6">
            Anda belum memiliki laporan atau tidak ada laporan yang sesuai dengan filter pencarian Anda.
          </p>
          <CreateDialogReport refetch={refetch} />
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {reports.map((report) => (
              <ReportCard
                key={report.id}
                report={report}
                actions={
                  <>
                    <DialogReport selectedReport={report} />
                    <EditDialogReport refetch={refetch} selectedReport={report} />
                    <DeleteReport refetch={refetch} selectedReport={report} />
                  </>
                }
              />
            ))}
          </div>

          {/* Pagination Controls */}
          {meta && meta.totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 pt-6 pb-12">
              <Button
                variant="outline"
                size="sm"
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Sebelumnya
              </Button>
              <span className="text-sm font-medium text-muted-foreground">
                Halaman {page} dari {meta.totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={page >= meta.totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Selanjutnya
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
