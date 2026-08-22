import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx";
import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import EmployeeList from "./pages/EmployeeList.jsx";
import ViewEmployee from "./pages/ViewEmployee.jsx";
import Attendance from "./pages/Attendance.jsx";
import Leaves from "./pages/Leaves.jsx";

function App() {
  const { authUser, checkingAuth } = useAuth();

  if (checkingAuth) {
    return <div className="flex items-center justify-center h-screen text-gray-500">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/login" element={authUser ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/signup" element={authUser ? <Navigate to="/dashboard" /> : <Signup />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employees"
          element={
            <ProtectedRoute hrOnly>
              <EmployeeList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employees/:id"
          element={
            <ProtectedRoute>
              <ViewEmployee />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              {authUser ? <Navigate to={`/employees/${authUser._id}`} replace /> : null}
            </ProtectedRoute>
          }
        />
        <Route
          path="/attendance"
          element={
            <ProtectedRoute>
              <Attendance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/leaves"
          element={
            <ProtectedRoute>
              <Leaves />
            </ProtectedRoute>
          }
        />

        <Route path="/" element={<Navigate to={authUser ? "/dashboard" : "/login"} replace />} />
        <Route path="*" element={<Navigate to={authUser ? "/dashboard" : "/login"} replace />} />
      </Routes>
    </div>
  );
}

export default App;
