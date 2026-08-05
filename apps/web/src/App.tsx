import { Routes, Route } from "react-router-dom";
import { DashboardPage } from "./pages/DashboardPage";
import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/RegisterPage";
import { Toaster } from "sonner";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { AutoRoute } from "./routes/AutoRoute";
import { ShowReport } from "./pages/reports/ShowReport";
import { AdminReportList } from "./pages/reports/components/AdminReportList";

import { ProtectedAdminRoute } from "./routes/ProtectedAdminRoute";

function App() {
  return (
    <>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<DashboardPage />}></Route>
          <Route path="/reports" element={<ShowReport />}></Route>
        </Route>
        <Route element={<ProtectedAdminRoute />}>
          <Route path="/admin/reports" element={<AdminReportList />}></Route>
        </Route>
        <Route element={<AutoRoute />}>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
        </Route>

        <Route
          path="*"
          element={<div>Halaman Tidak Ditemukan / Salah Alamat</div>}
        />
      </Routes>

      <Toaster />
    </>
  );
}

export default App;
