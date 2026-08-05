interface Report {
  id: string;
  title: string;
  category: string;
  status: string;
  description: string;
  rejectReason?: string | null;
  createdAt: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
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

interface ReportActionProps {
  selectedReport: Report;
  refetch: () => void;
}

interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
