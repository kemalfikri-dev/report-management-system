interface Report {
  id: string;
  title: string;
  category: string;
  status: string;
  description: string;
  createdAt: string;
}

interface User {
  id: string;
  name: string;
  email: string;
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

interface UserProps {
  user: User | null;
  isLoading: boolean;
  checkUser: () => Promise<void>;
}

interface AdminReportListProps {
  refetch: () => void;
  selectedReport: Report;
}

interface ApproveReportProps {
  selectedReport: Report;
  refetch: () => void;
}
