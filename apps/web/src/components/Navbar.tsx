import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import apiClient, { isAxiosError } from "@/lib/axios";
import type { ApiErrorResponse } from "@/types/auth";
import { LayoutDashboard, FileText, ShieldCheck, LogOut } from "lucide-react";

export function Navbar() {
  const auth = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  if (!auth || !auth.user) return null;

  const { user, checkUser } = auth;
  const isAdmin = user.role === "ADMIN";

  const navItems = [
    { label: "Dashboard", path: "/", icon: LayoutDashboard },
    { label: "Laporan Saya", path: "/reports", icon: FileText },
    ...(isAdmin
      ? [{ label: "Admin Reports", path: "/admin/reports", icon: ShieldCheck }]
      : []),
  ];

  async function handleLogout() {
    setIsLoggingOut(true);
    try {
      const res = await apiClient.post("/logout");
      if (res.status === 201) {
        toast.success("Logout Berhasil!");
        checkUser();
        navigate("/login");
      }
    } catch (err) {
      if (isAxiosError<ApiErrorResponse>(err)) {
        if (err.response) {
          toast.error(err.response?.data?.error);
        } else if (err.request) {
          toast.error("Tidak dapat terhubung ke server");
        } else {
          toast.error("Terjadi kesalahan yang tidak diketahui");
        }
      }
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-lg font-semibold tracking-tight">
            RMS
          </Link>
          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground hidden sm:inline">
            {user.name}
            {isAdmin && (
              <span className="ml-1.5 rounded bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary">
                Admin
              </span>
            )}
          </span>
          <Button
            variant="ghost"
            size="sm"
            disabled={isLoggingOut}
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-1.5" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
