interface Report {
  id: string;
  title: string;
  category: string;
  status: string;
  description: string;
  createdAt: string;
}

interface ReportErrorProps {
  onRetry: () => void;
  isLoading: boolean;
}

interface ReportListProps {
  reports: Report[];
  refetch: () => void;
}

interface CreateReportProps {
  refetch: () => void;
}

interface EditReportProps {
  refetch: () => void;
  selectedReport: Report;
}

interface DeleteReportProps {
  refetch: () => void;
  selectedReport: Report;
}
