import { Skeleton } from "@/components/ui/skeleton";

export function LoadingReportPage() {
  return (
    <div className="mx-auto max-w-3xl p-4 space-y-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>

        <Skeleton className="h-10 w-full" />
      </div>

      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 space-y-3 bg-card shadow-sm"
          >
            <Skeleton className="h-7 w-3/4" />

            <div className="flex gap-2">
              <Skeleton className="h-5 w-20 rounded-full" />
              <Skeleton className="h-5 w-20 rounded-full" />
            </div>

            <div className="flex justify-between items-center pt-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-9 w-20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
