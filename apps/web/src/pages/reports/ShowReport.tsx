import { ReportListPage } from "./components/ReportListPage";
import { ReportErrorPage } from "./components/ReportErrorPage";
import { LoadingReportPage } from "./components/LoadingReportPage";
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
        <ReportListPage refetch={refetch} reports={reports} />
      )}
    </div>
  );
}
