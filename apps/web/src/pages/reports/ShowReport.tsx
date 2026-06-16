import { ReportListPage } from "./ReportListPage";
import { ReportErrorPage } from "./ReportErrorPage";
import { LoadingReportPage } from "./LoadingReportPage";
import { useReport } from "./hooks/useReport";

export function ShowReport() {
  const { isLoading, isError, refetch, reports } = useReport();
  return (
    <div>
      {isLoading ? (
        <LoadingReportPage />
      ) : isError ? (
        <ReportErrorPage onRetry={refetch} isLoading={isLoading} />
      ) : (
        <ReportListPage reports={reports} />
      )}
    </div>
  );
}
