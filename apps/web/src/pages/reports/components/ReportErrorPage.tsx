import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCcw } from "lucide-react";

export function ReportErrorPage({ onRetry, isLoading }: ReportErrorProps) {
  return (
    <div className="mx-auto max-w-3xl p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Reports</h2>
      </div>

      <div className="flex flex-col items-center justify-center py-16 px-4 border-2 border-dashed rounded-xl bg-card/50 mt-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10 mb-6">
          <AlertCircle className="h-10 w-10 text-destructive" />
        </div>

        <h3 className="text-xl font-semibold mb-2">Failed to Load Data</h3>

        <p className="text-muted-foreground text-center max-w-md mb-8">
          We couldn't fetch your reports right now. This might be due to a
          network issue or a temporary server error.
        </p>

        <Button
          size="lg"
          disabled={isLoading}
          onClick={onRetry}
          className="min-w-[140px]"
        >
          <RefreshCcw
            className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
          />
          {isLoading ? "Retrying..." : "Try Again"}
        </Button>
      </div>
    </div>
  );
}
