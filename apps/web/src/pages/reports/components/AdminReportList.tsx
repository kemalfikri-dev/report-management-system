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
import { EditDialogReport } from "./EditDialogReport";
import { ApproveButton } from "./ApproveButton";
import { useState } from "react";
import { useAdminReport } from "../hooks/useAdminReport";

export function AdminReportList() {
  const { allReports, adminRefetch } = useAdminReport();
  const [searchFilter, setSearchFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const filteredReports = allReports.filter((report) => {
    const matchSearch =
      report.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      report.description.toLowerCase().includes(searchFilter.toLowerCase());

    const matchCategory =
      categoryFilter === "ALL" ? true : report.category === categoryFilter;

    const matchStatus =
      statusFilter === "ALL" ? true : report.status === statusFilter;

    return matchSearch && matchCategory && matchStatus;
  });

  return (
    <div className="mx-auto max-w-3xl p-4 space-y-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">My Reports</h2>
        </div>

        <div className="flex gap-2 items-center">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
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

          <Select value={statusFilter} onValueChange={setStatusFilter}>
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
          onChange={(event) => setSearchFilter(event.target.value)}
        />

        {allReports.length > 0 ? (
          <p className="text-sm text-muted-foreground">
            {filteredReports.length} reports found
          </p>
        ) : null}
      </div>

      {filteredReports.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4 border-2 border-dashed rounded-xl bg-card/50 mt-4 text-center">
          {allReports.length > 0 && filteredReports.length === 0 ? (
            <>
              <h3 className="text-xl font-semibold mb-2">
                No reports matched found
              </h3>
              <p className="text-muted-foreground max-w-md mb-8">
                No reports match your current filters
              </p>
            </>
          ) : (
            <>
              <h3 className="text-xl font-semibold mb-2">No reports found</h3>
              <p className="text-muted-foreground max-w-md mb-8">
                You don't have any reports yet.
              </p>
              <Button size="lg">
                <Plus className="mr-2 h-5 w-5" />
                Create Report
              </Button>
            </>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredReports.map((report) => (
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
                  <EditDialogReport
                    refetch={adminRefetch}
                    selectedReport={report}
                  />
                  <DialogReport selectedReport={report} />
                  <ApproveButton
                    selectedReport={report}
                    refetch={adminRefetch}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
