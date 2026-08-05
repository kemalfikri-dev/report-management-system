import { Button } from "@/components/ui/button";
import { DialogReport } from "./DialogReport";
import { EditDialogReport } from "./EditDialogReport";
import { ApproveButton } from "./ApproveButton";
import { RejectDialog } from "./RejectDialog";
import { useState, Fragment, useEffect } from "react";
import { useAdminReport } from "../hooks/useAdminReport";
import { ReportCard } from "./ReportCard";
import { ReportFilters } from "./ReportFilters";
import { FileSearch } from "lucide-react";

export function AdminReportList() {
  const [page, setPage] = useState(1);
  const [searchFilter, setSearchFilter] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchFilter), 500);
    return () => clearTimeout(timer);
  }, [searchFilter]);

  const { allReports, meta, adminRefetch, isLoading } = useAdminReport({
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
          <h1 className="text-3xl font-bold tracking-tight">Semua Laporan</h1>
          <p className="text-muted-foreground mt-1">
            Pantau dan kelola seluruh laporan dari pengguna di sistem ini.
          </p>
        </div>
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
          Menampilkan {allReports.length} dari {meta.total} laporan
        </div>
      )}

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
          Memuat laporan...
        </div>
      ) : allReports.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 px-4 border-2 border-dashed rounded-xl bg-card/50 text-center">
          <div className="bg-muted p-4 rounded-full mb-4">
            <FileSearch className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Tidak ada laporan</h3>
          <p className="text-muted-foreground max-w-md mb-8">
            Belum ada laporan yang sesuai dengan filter pencarian saat ini.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {allReports.map((report) => (
              <ReportCard
                key={report.id}
                report={report}
                actions={
                  <>
                    <EditDialogReport refetch={adminRefetch} selectedReport={report} />
                    <DialogReport selectedReport={report} />
                    {report.status === "PENDING" && (
                      <Fragment>
                        <ApproveButton selectedReport={report} refetch={adminRefetch} />
                        <RejectDialog selectedReport={report} refetch={adminRefetch} />
                      </Fragment>
                    )}
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
