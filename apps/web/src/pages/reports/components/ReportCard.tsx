import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import dayjs from "dayjs";
import type { ReactNode } from "react";

interface ReportCardProps {
  report: {
    id: string;
    title: string;
    description: string;
    category: string;
    status: string;
    createdAt: string;
    user?: {
      name: string;
      email: string;
    };
  };
  actions?: ReactNode;
}

export function ReportCard({ report, actions }: ReportCardProps) {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "default";
      case "REJECTED":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <Card className="flex flex-col h-full hover:border-primary/50 transition-colors shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-4">
          <CardTitle className="text-lg font-semibold line-clamp-1">
            {report.title}
          </CardTitle>
          <Badge variant={getStatusVariant(report.status)} className="shrink-0">
            {report.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 pb-4 text-sm text-muted-foreground flex flex-col justify-between">
        <div className="mb-4">
          <p className="line-clamp-2">{report.description}</p>
          {report.user && (
            <p className="mt-3 text-xs border-l-2 pl-2">
              <span className="font-medium text-foreground">{report.user.name}</span>
              <br />
              <span className="text-muted-foreground">{report.user.email}</span>
            </p>
          )}
        </div>
        <div className="flex items-center justify-between mt-auto">
          <Badge variant="outline" className="text-xs font-normal">
            {report.category}
          </Badge>
          <span className="text-xs">
            {dayjs(report.createdAt).format("DD MMM YYYY, HH:mm")}
          </span>
        </div>
      </CardContent>
      {actions && (
        <CardFooter className="pt-4 border-t bg-muted/20 flex justify-end gap-2">
          {actions}
        </CardFooter>
      )}
    </Card>
  );
}
