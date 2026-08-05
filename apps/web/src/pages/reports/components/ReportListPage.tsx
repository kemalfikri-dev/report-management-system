import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import dayjs from "dayjs";
import { DialogReport } from "./DialogReport";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { CreateDialogReport } from "./CreateDialogReport";
import { EditDialogReport } from "./EditDialogReport";
import { DeleteReport } from "./DeleteReport";
import { useState, useEffect } from "react";
import { useReport } from "../hooks/useReport";

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
    <div className="mx-auto max-w-3xl p-4 space-y-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">My Reports</h2>
          <CreateDialogReport refetch={refetch} />
        </div>

        <div className="flex gap-2 items-center">
          <Select
            value={categoryFilter}
            onValueChange={(val) => {
              setCategoryFilter(val);
              setPage(1);
            }}
          >
            <SelectTrigger id="checkout-category-ts6">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="ALL">ALL</SelectItem>
                <SelectItem value="MAINTENANCE">MAINTENANCE</SelectItem>
                <SelectItem value="COMPLAINT">COMPLAINT</SelectItem>
                <SelectItem value="BUG">BUG</SelectItem>
                <SelectItem value="FEATURE">FEATURE</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select
            value={statusFilter}
            onValueChange={(val) => {
              setStatusFilter(val);
              setPage(1);
            }}
          >
            <SelectTrigger id="checkout-category-ts7">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="ALL">ALL</SelectItem>
                <SelectItem value="PENDING">PENDING</SelectItem>
                <SelectItem value="APPROVED">APPROVED</SelectItem>
                <SelectItem value="REJECTED">REJECTED</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <Input
          placeholder="Search Reports..."
          className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          value={searchFilter}
          onChange={(event) => {
            setSearchFilter(event.target.value);
            setPage(1);
          }}
        />

        {meta ? (
          <p className="text-sm text-muted-foreground">
            {meta.total} reports found (Page {meta.page} of {meta.totalPages || 1})
          </p>
        ) : null}
      </div>

      {isLoading ? (
        <div className="flex justify-center p-8">Loading reports...</div>
      ) : reports.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4 border-2 border-dashed rounded-xl bg-card/50 mt-4 text-center">
          <h3 className="text-xl font-semibold mb-2">No reports found</h3>
          <p className="text-muted-foreground max-w-md mb-8">
            You don't have any reports yet or no reports match your current filters.
          </p>
          <CreateDialogReport refetch={refetch} />
        </div>
      ) : (
        <div className="space-y-4">
          {reports.map((report) => (
            <div
              key={report.id}
              className="border rounded-lg p-4 space-y-3 bg-card shadow-sm"
            >
              <h3 className="font-semibold text-lg truncate">{report.title}</h3>

              <div className="flex gap-2">
                <Badge variant="secondary">{report.category}</Badge>
                <Badge variant="default">{report.status}</Badge>
              </div>

              <div className="flex justify-between items-center pt-2">
                <p className="text-sm text-muted-foreground">
                  {dayjs(report.createdAt).format("DD MMMM YYYY, HH:mm")}
                </p>
                <div className="flex gap-2">
                  <EditDialogReport refetch={refetch} selectedReport={report} />
                  <DialogReport selectedReport={report} />
                  <DeleteReport refetch={refetch} selectedReport={report} />
                </div>
              </div>
            </div>
          ))}

          {/* Pagination Controls */}
          {meta && meta.totalPages > 1 && (
            <div className="flex justify-center gap-4 items-center pt-4">
              <Button
                variant="outline"
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Previous
              </Button>
              <span className="text-sm font-medium">
                Page {page} of {meta.totalPages}
              </span>
              <Button
                variant="outline"
                disabled={page >= meta.totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
