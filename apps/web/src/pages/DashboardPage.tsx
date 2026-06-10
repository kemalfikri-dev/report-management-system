import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import "../App.css";

export function DashboardPage() {
  const navigate = useNavigate();

  function removeLocal() {
    localStorage.removeItem("authToken");
    navigate("/login");
  }
  return (
    <>
      <h1>Hello User!</h1>
      <p>Welcome to Dashboard</p>
      <Button
        variant="outline"
        className="w-full cursor-pointer"
        onClick={removeLocal}
      >
        Logout
      </Button>
    </>
  );
}
