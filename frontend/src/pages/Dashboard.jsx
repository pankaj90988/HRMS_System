import { useAuth } from "../context/AuthContext.jsx";
import Navbar from "../components/Navbar.jsx";
import HRDashboard from "./HRDashboard.jsx";
import EmployeeDashboard from "./EmployeeDashboard.jsx";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      {user.role === "HR" ? <HRDashboard /> : <EmployeeDashboard />}
    </div>
  );
}
