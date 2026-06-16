import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import dayjs from "dayjs";
import { DialogReport } from "./DialogReport";
import { Plus } from "lucide-react";

export function ReportListPage({ reports }: ReportListProps) {
  return (
    <div className="mx-auto max-w-3xl p-4 space-y-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">My Reports</h2>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Report
          </Button>
        </div>

        <input
          type="text"
          placeholder="Search Reports..."
          className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {reports.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4 border-2 border-dashed rounded-xl bg-card/50 mt-4 text-center">
          <h3 className="text-xl font-semibold mb-2">No reports found</h3>
          <p className="text-muted-foreground max-w-md mb-8">
            You don't have any reports yet.
          </p>
          <Button size="lg">
            <Plus className="mr-2 h-5 w-5" />
            Create Report
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {reports.map((report) => (
            <div
              key={report.id}
              className="border rounded-lg p-4 space-y-3 bg-card shadow-sm"
            >
              <h3 className="font-semibold text-lg">{report.title}</h3>

              <div className="flex gap-2">
                <Badge variant="secondary">{report.category}</Badge>
                <Badge variant="default">{report.status}</Badge>
              </div>

              <div className="flex justify-between items-center pt-2">
                <p className="text-sm text-muted-foreground">
                  {dayjs(report.createdAt).format("DD MMMM YYYY, HH:mm")}
                </p>
                <DialogReport selectedReport={report} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
