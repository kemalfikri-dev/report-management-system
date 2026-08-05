import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { FileText, Clock, CheckCircle, XCircle, Plus, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

export function DashboardPage() {
  const auth = useContext(AuthContext);
  const { stats, recentReports, isLoading } = useDashboardStats();

  if (!auth) {
    throw new Error("AuthContext not found");
  }

  const { user } = auth;
  const isAdmin = user?.role === "ADMIN";

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
    <div className="mx-auto max-w-5xl px-6 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Selamat Datang, {user?.name}!
          </h1>
          <p className="text-muted-foreground mt-1">
            {isAdmin
              ? "Ini adalah rangkuman seluruh laporan di sistem."
              : "Berikut adalah rangkuman statistik laporan Anda."}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {!isAdmin ? (
            <Button asChild>
              <Link to="/reports">
                <Plus className="h-4 w-4 mr-2" />
                Buat Laporan Baru
              </Link>
            </Button>
          ) : (
            <Button asChild>
              <Link to="/admin/reports">
                Lihat Semua Laporan
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Laporan</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? "..." : stats?.total || 0}
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Menunggu</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? "..." : stats?.pending || 0}
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Disetujui</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? "..." : stats?.approved || 0}
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ditolak</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? "..." : stats?.rejected || 0}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Aktivitas Terbaru</CardTitle>
            <CardDescription>
              5 Laporan terakhir yang dibuat di sistem.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-sm text-muted-foreground py-4 text-center">
                Memuat data...
              </div>
            ) : recentReports && recentReports.length > 0 ? (
              <div className="space-y-4">
                {recentReports.map((report) => (
                  <div
                    key={report.id}
                    className="flex items-center justify-between border-b last:border-0 pb-4 last:pb-0"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none line-clamp-1">
                        {report.title}
                      </p>
                      <div className="flex items-center text-xs text-muted-foreground gap-2 mt-1">
                        <span>{report.category}</span>
                        <span>&bull;</span>
                        <span>{dayjs(report.createdAt).format("DD MMM YYYY")}</span>
                      </div>
                    </div>
                    <Badge variant={getStatusVariant(report.status)} className="shrink-0 ml-4">
                      {report.status}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-muted-foreground py-4 text-center border-2 border-dashed rounded-lg bg-muted/20">
                Belum ada aktivitas laporan.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
