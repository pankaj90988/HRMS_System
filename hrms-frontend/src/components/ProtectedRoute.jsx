import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

// hrOnly=true restricts the route to users with role "HR"
const ProtectedRoute = ({ children, hrOnly = false }) => {
  const { authUser, checkingAuth, isHR } = useAuth();

  if (checkingAuth) {
    return <div className="flex items-center justify-center h-screen text-gray-500">Loading...</div>;
  }

  if (!authUser) return <Navigate to="/login" replace />;
  if (hrOnly && !isHR) return <Navigate to="/dashboard" replace />;

  return children;
};

export default ProtectedRoute;
