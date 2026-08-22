import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import toast from "react-hot-toast";

const Navbar = () => {
  const { authUser, logout, isHR } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  if (!authUser) return null;

  const linkClass = "px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100";

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">
        <div className="flex items-center gap-1">
          <span className="font-bold text-indigo-600 mr-4">HRMS</span>
          <Link to="/dashboard" className={linkClass}>Dashboard</Link>
          {isHR && <Link to="/employees" className={linkClass}>Employees</Link>}
          <Link to="/attendance" className={linkClass}>Attendance</Link>
          <Link to="/leaves" className={linkClass}>Leaves</Link>
          <Link to="/profile" className={linkClass}>My Profile</Link>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">
            {authUser.email} <span className="text-xs text-indigo-600">({authUser.role})</span>
          </span>
          <button
            onClick={handleLogout}
            className="px-3 py-1.5 text-sm rounded-md bg-red-500 text-white hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
